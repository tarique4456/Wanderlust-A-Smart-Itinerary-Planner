package com.wanderlust.models;

import jakarta.persistence.*;

@Entity
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String destination;
    private int days;
    private String interests;
    private int budget;

    @Column(columnDefinition = "TEXT") // allows long text storage
    private String generatedPlan;

    private String userEmail;

    // Getters and Setters
    public Long getId() {
        return id;
    }

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

    public String getGeneratedPlan() {
        return generatedPlan;
    }

    public void setGeneratedPlan(String generatedPlan) {
        this.generatedPlan = generatedPlan;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}