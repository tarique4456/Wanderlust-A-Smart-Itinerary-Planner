// 📁 src/main/java/com/wanderlust/repositories/ItineraryRepository.java
package com.wanderlust.repositories;

import com.wanderlust.models.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItineraryRepository extends JpaRepository<Itinerary, Long> {
    // ✅ Query to find itineraries by user email
    List<Itinerary> findByUserEmail(String userEmail);
}