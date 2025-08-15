// 📁 src/main/java/com/wanderlust/controllers/UserController.java
package com.wanderlust.controllers;

import com.wanderlust.models.User;
import com.wanderlust.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ Register a new user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("User already exists");
        }

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    // ✅ Login with response containing name & email (no password)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existing = userRepository.findByEmail(user.getEmail());

        if (existing.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        User foundUser = existing.get();
        if (!foundUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // ✅ Prepare clean response
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("email", foundUser.getEmail());
        response.put("name", foundUser.getName());
        return ResponseEntity.ok(response);
    }

    // ✅ Get profile by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUserProfile(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .<ResponseEntity<?>>map(user -> {
                    Map<String, Object> profile = new HashMap<>();
                    profile.put("name", user.getName());
                    profile.put("email", user.getEmail());
                    profile.put("phone",user.getPhone());
                    return ResponseEntity.ok(profile);
                })
                .orElseGet(() -> ResponseEntity.status(404).body("User not found"));
    }
    }
