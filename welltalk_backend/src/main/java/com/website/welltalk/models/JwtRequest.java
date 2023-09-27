package com.website.welltalk.models;

import java.io.Serializable;

public class JwtRequest implements Serializable {

    // Properties
    private static final long serialVersionUID = 5926468583005150707L;

    private String firstName;

    private String lastName;

    private String email;

    private int schoolID;

    private String userType;

    private String username;

    private String password;

    // Constructors
    // Default constructors
    public JwtRequest(){
    }

    // Parametrized Constructors
    public JwtRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    // Getters and Setters
    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getSchoolID() {
        return this.schoolID;
    }

    public void setSchoolID(int schoolID) {
        this.schoolID = schoolID;
    }

    public String getUserType() {
        return this.userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
