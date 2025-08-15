// 📁 src/main/java/com/wanderlust/repositories/UserRepository.java
package com.wanderlust.repositories;

import com.wanderlust.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email); // ✅ Used in login/register
}