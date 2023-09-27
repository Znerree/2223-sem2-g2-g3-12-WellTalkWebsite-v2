package com.website.welltalk.models;


import java.time.LocalDateTime;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.print.attribute.standard.DateTimeAtCreation;

import org.apache.tomcat.jni.Local;
import org.hibernate.annotations.ManyToAny;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column
    private LocalDateTime start_date;

    @Column
    private LocalDateTime end_date;

    @ManyToOne
    @JoinColumn(name = "referrer", nullable = false)
    private Teacher teacher;

    @Column
    private String status;

    public Appointment() {
        // Default constructor
    }   

    public Appointment(LocalDateTime start_date, LocalDateTime end_date, String status) {
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Teacher getReferrer() {
        return teacher;
    }

    public void setReferrer(Teacher teacher) {
        this.teacher = teacher;
    }

    public LocalDateTime getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDateTime start_date) {
        this.start_date = start_date;
    }

    public LocalDateTime getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDateTime end_date) {
        this.end_date = end_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    


    
}
