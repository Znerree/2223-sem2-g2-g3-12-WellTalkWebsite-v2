package com.website.welltalk.controllers;

import com.website.welltalk.exceptions.UserException;
import com.website.welltalk.models.Counselor;
import com.website.welltalk.models.Teacher;
import com.website.welltalk.models.User;
import com.website.welltalk.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    UserService userService;

    // Create user
    @RequestMapping(value="/users", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        userService.createUser(user);
        return new ResponseEntity<>("User created successfully", HttpStatus.CREATED);
    }

    // Get users
    @RequestMapping(value="/users", method = RequestMethod.GET)
    public ResponseEntity<Object> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }


    // Delete user
    @RequestMapping(value = "/users/{userid}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteUser(@PathVariable Long userid) {
        return userService.deleteUser(userid);
    }

    // Update user
    @RequestMapping(value="/users/{userid}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateUser(@PathVariable Long userid, @RequestBody User user) {
        return userService.updateUser(userid, user);
    }

    // User registration
    @RequestMapping(value="/users/register", method = RequestMethod.POST)
    public ResponseEntity<Object> register(@RequestBody Map<String, String> body) throws UserException {
        String firstName = body.get("firstName");
        String lastName = body.get("lastName");
        String email = body.get("email");
        int schoolID = Integer.parseInt(body.get("schoolID"));
        String userType = body.get("userType");
        String username = body.get("username");
        
        if(!userService.findByUsername(username).isEmpty()) {
            throw new UserException("Username already exists.");
        } 
        else {
            String password = body.get("password");
            String encodedPassword = new BCryptPasswordEncoder().encode(password);
            User newUser;
        
            if (userType.equals("Teacher")) {
                newUser = new Teacher(firstName, lastName, email, schoolID, username, encodedPassword);
            } else if (userType.equals("Counselor")) {
                newUser = new Counselor(firstName, lastName, email, schoolID, username, encodedPassword);
            } else {
                throw new UserException("Invalid user type.");
            }
            
            userService.createUser(newUser);
            
            Long id = newUser.getId();
            newUser.setId(id);

            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        }
    }

    // Find user by email
    @RequestMapping(value="/users/{email}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByEmail(@PathVariable String email) {
        if(userService.findByEmail(email).isEmpty()) {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(userService.findByEmail(email), HttpStatus.OK);
        }
    }

    @GetMapping(value = "/users/username/{username}")
    public Optional<User> findByUsername(@PathVariable String username){     
        return userService.findByUsername(username);
    }

    // @GetMapping(value = "/users/instance/{username}")
    // public ResponseEntity<Object> findByUsername(@PathVariable String username){
    //     Optional<User> user = userService.findByUsername(username);
    //     if(user.isPresent()){
    //         User foundUser = user.get();
    //         if(foundUser instanceof Counselor){
    //             Counselor counselor = (Counselor) foundUser;
    //             // Do something with counselor object
    //             return new ResponseEntity<>(counselor, HttpStatus.OK);
    //         } else if(foundUser instanceof Teacher){
    //             Teacher teacher = (Teacher) foundUser;
    //             // Do something with teacher object
    //             return new ResponseEntity<>(teacher, HttpStatus.OK);
    //         } else {
    //             return new ResponseEntity<>("User found, but not a Counselor or Teacher", HttpStatus.NOT_FOUND);
    //         }
    //     } else {
    //         return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    //     }
    // }

}
