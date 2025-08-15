// 📁 src/main/java/com/wanderlust/controllers/ItineraryController.java
//package com.wanderlust.controllers;
//
//import com.wanderlust.models.Itinerary;
//import com.wanderlust.models.ItineraryRequest;
//import com.wanderlust.repositories.ItineraryRepository;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//@CrossOrigin(origins = "http://localhost:3000")
//public class ItineraryController {
//
//    private final ItineraryRepository itineraryRepository;
//
//    public ItineraryController(ItineraryRepository itineraryRepository) {
//        this.itineraryRepository = itineraryRepository;
//    }
//
//    // ✅ POST: Save a new itinerary
//    @PostMapping("/itinerary")
//    public ResponseEntity<String> generateItinerary(@RequestBody ItineraryRequest request) {
//        String plan = "🗓 Your " + request.getDays() + "-Day Itinerary for " + request.getDestination() + "\n\n"
//                + "Day 1: Arrival and explore local sights.\n"
//                + "Day 2: Enjoy " + request.getInterests() + " themed activities.\n"
//                + "Day 3: Local cuisine and market visit.\n"
//                + "Day 4: Nature walks or cultural tours.\n"
//                + "Day 5: Leisure day and departure.\n\n"
//                + "💰 Estimated Budget: ₹" + request.getBudget();
//
//        Itinerary itinerary = new Itinerary();
//        itinerary.setDestination(request.getDestination());
//        itinerary.setDays(request.getDays());
//        itinerary.setInterests(request.getInterests());
//        itinerary.setBudget(request.getBudget());
//        itinerary.setGeneratedPlan(plan);
//        itinerary.setUserEmail(request.getUserEmail()); // ✅ Set user email from request
//
//        itineraryRepository.save(itinerary);
//
//        return ResponseEntity.ok(plan);
//    }
//
//    // ✅ GET: Get itineraries by user email
//    @GetMapping("/itinerary/user/{email}")
//    public ResponseEntity<List<Itinerary>> getUserItineraries(@PathVariable String email) {
//        return ResponseEntity.ok(itineraryRepository.findByUserEmail(email));
//    }
//}
package com.wanderlust.controllers;

import com.wanderlust.models.Itinerary;
import com.wanderlust.models.ItineraryRequest;
import com.wanderlust.repositories.ItineraryRepository;

import okhttp3.OkHttpClient;
import okhttp3.MediaType;
import okhttp3.Request;
import okhttp3.Response;

import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ItineraryController {

    private final ItineraryRepository itineraryRepository;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    public ItineraryController(ItineraryRepository itineraryRepository) {
        this.itineraryRepository = itineraryRepository;
    }

    @PostMapping("/itinerary")
    public ResponseEntity<String> generateItinerary(@RequestBody ItineraryRequest request) {
        try {
            String prompt = buildPrompt(request);
            String gptResponse = callOpenAi(prompt);

            Itinerary itinerary = new Itinerary();
            itinerary.setDestination(request.getDestination());
            itinerary.setDays(request.getDays());
            itinerary.setInterests(request.getInterests());
            itinerary.setBudget(request.getBudget());
            itinerary.setGeneratedPlan(gptResponse);
            itinerary.setUserEmail(request.getUserEmail());

            itineraryRepository.save(itinerary);

            return ResponseEntity.ok(gptResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Failed to generate itinerary.");
        }
    }

    @GetMapping("/itinerary/user/{email}")
    public ResponseEntity<List<Itinerary>> getUserItineraries(@PathVariable String email) {
        return ResponseEntity.ok(itineraryRepository.findByUserEmail(email));
    }

    private String buildPrompt(ItineraryRequest r) {
        return "Generate a detailed " + r.getDays() + "-day travel itinerary for " + r.getDestination()
                + ". Interests include: " + r.getInterests()
                + ". Budget is ₹" + r.getBudget()
                + ". Provide a day-wise breakdown in simple format.";
    }

    private String callOpenAi(String prompt) throws IOException {
        OkHttpClient client = new OkHttpClient();
        MediaType mediaType = MediaType.parse("application/json");

        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "gpt-3.5-turbo");

        JSONArray messages = new JSONArray();
        messages.put(new JSONObject().put("role", "system").put("content", "You are a helpful travel planning assistant."));
        messages.put(new JSONObject().put("role", "user").put("content", prompt));
        requestBody.put("messages", messages);

        Request request = new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .post(okhttp3.RequestBody.create(requestBody.toString(), mediaType))  // ✅ fix ambiguity
                .addHeader("Authorization", "Bearer " + openaiApiKey)
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("Unexpected code: " + response);
            JSONObject json = new JSONObject(response.body().string());
            return json.getJSONArray("choices").getJSONObject(0).getJSONObject("message").getString("content");
        }
    }
}