package com.website.welltalk.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "userType", discriminatorType = DiscriminatorType.STRING)
public class User {
    //default constructor
    public User() {
    }
    // Properties
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("userType")
    public String getUserType() {
        return this.getClass().getSimpleName();
    }

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String email;

    @Column
    private int schoolID;

    @Column
    private String username;

    @Column
    private String password;

    @OneToMany(mappedBy = "counselor")
    @JsonIgnore
    private Set<Appointment> appointments;

    // Constructor
    public User( String firstName, String lastName, String email, int schoolID, String username, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.schoolID = schoolID;
        this.username = username;
        this.password = password;
    };

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
    	this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
    	this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
    	this.email = email;
    }

    public int getSchoolID() {
        return schoolID;
    }

    public void setSchoolID(int schoolID) {
    	this.schoolID = schoolID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(Set<Appointment> appointments) {
        this.appointments = appointments;
    }

    public void setId(Long id2) {
    }

    
}

