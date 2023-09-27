package com.website.welltalk.models;

import javax.persistence.*;

@Entity
@Table(name = "teachers")
public class Teacher {

    //Properties
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    public Teacher(){}

    public Teacher(String name){
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
