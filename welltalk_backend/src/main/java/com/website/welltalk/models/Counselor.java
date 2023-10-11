package com.website.welltalk.models;
import java.util.Set;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@DiscriminatorValue("COUNSELOR")
public class Counselor extends User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "counselor")
    @JsonIgnore
    private Set<Post> posts;

    @OneToMany(mappedBy = "counselor")
    @JsonIgnore
    private Set<Notes> notes;


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

    public Set<Post> getPosts() {
        return posts;
    }

    public void setPosts(Set<Post> posts) {
        this.posts = posts;
    }

    public Set<Notes> getNotes() {
        return notes;
    }

    public void setNotes(Set<Notes> notes) {
        this.notes = notes;
    }
}