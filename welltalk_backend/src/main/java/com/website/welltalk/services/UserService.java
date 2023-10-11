package com.website.welltalk.services;

import com.website.welltalk.repositories.UserRepository;
import com.website.welltalk.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create user
    public void createUser(User user) {
        userRepository.save(user);
    }

    // Get users
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    // Delete user
    public ResponseEntity deleteUser(Long id) {
        userRepository.deleteById(id);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }

    // Update user
    public ResponseEntity updateUser(Long id, User user) {
        User userForUpdating = userRepository.findById(id).get();

        userForUpdating.setUsername(user.getUsername());
        userForUpdating.setPassword(user.getPassword());
        userRepository.save(userForUpdating);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);

    }

    // Find user by username
    public Optional<User> findByUsername(String username){

        // If the findByUsername method returns null it will throw a NullPointerException.
        // Using the .ofNullable method will avoid this from happening.
        return Optional.ofNullable(userRepository.findByUsername(username));

    }

    // Find user by email
    public Optional<User> findByEmail(String email){

        // If the findByEmail method returns null it will throw a NullPointerException.
        // Using the .ofNullable method will avoid this from happening.
        return Optional.ofNullable(userRepository.findByEmail(email));

    }
    

}
