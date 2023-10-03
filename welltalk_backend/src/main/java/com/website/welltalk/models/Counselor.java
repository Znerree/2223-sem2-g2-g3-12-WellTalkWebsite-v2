package com.website.welltalk.models;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@DiscriminatorValue("COUNSELOR")
public class Counselor extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //default constructor

    public Counselor() {
        super();
    }

    // Constructor
    public Counselor(String firstName, String lastName, String email, int schoolID, String username, String password) {
        super(firstName, lastName, email, schoolID, username, password);
    }

    public Long getId() {
        return id;
    }
}