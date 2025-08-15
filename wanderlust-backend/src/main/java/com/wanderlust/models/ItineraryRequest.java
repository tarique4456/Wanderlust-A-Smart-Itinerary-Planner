// 📁 src/main/java/com/wanderlust/models/ItineraryRequest.java
package com.wanderlust.models;

public class ItineraryRequest {
    private String destination;
    private int days;
    private String interests;
    private int budget;
    private String userEmail; // ✅ Add this

    // Getters and Setters
    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public int getDays() {
        return days;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public String getInterests() {
        return interests;
    }

    public void setInterests(String interests) {
        this.interests = interests;
    }

    public int getBudget() {
        return budget;
    }

    public void setBudget(int budget) {
        this.budget = budget;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}