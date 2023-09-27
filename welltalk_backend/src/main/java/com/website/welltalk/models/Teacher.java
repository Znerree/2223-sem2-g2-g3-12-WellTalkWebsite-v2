package com.website.welltalk.models;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@DiscriminatorValue("TEACHER")
@Table(name="teachers")
public class Teacher extends User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //default constructor
    public Teacher() {
        super();
    }

    // Constructor
    public Teacher(String firstName, String lastName, String email, int schoolID, String username, String password) {
        super(firstName, lastName, email, schoolID, "TEACHER", username, password);
    }       
}