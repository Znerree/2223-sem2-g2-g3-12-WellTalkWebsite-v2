package com.website.welltalk.services;

import com.website.welltalk.models.User;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface UserService {
    void createUser(User user);
    Iterable<User> getUsers();
    ResponseEntity deleteUser(Long id);
    ResponseEntity updateUser(Long id, User user);
    // Optional - defines if the method may/ may not return an object of the User class
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);
}
