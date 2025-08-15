// ✅ FILE: src/main/java/com/wanderlust/models/User.java
package com.wanderlust.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String phone; // ✅ New field

    @Column(unique = true)
    private String email;

    private String password;
}