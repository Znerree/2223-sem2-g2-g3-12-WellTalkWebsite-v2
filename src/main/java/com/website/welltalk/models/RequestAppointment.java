package com.website.welltalk.models;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "request_appointments")
public class RequestAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column
    private LocalDate date_created;

    @Column
    private LocalTime time_created;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String message;

    @Column
    private Boolean decision;

    public RequestAppointment() {
        
    }

    public RequestAppointment(Student student, LocalDate date_created, LocalTime time_created, String message, Boolean decision) {
        this.student = student;
        this.date_created = date_created;
        this.time_created = time_created;
        this.message = message;
        this.decision = decision;
    }
    
    //id
    public Long getId() {
        return id;
    }

    //student
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    //date created
    public LocalDate getDate_created() {
        return date_created;
    }

    public void setDate_created(LocalDate date_created) {
        this.date_created = date_created;
    }

    //time created
    public LocalTime getTime_created() {
        return time_created;
    }

    public void setTime_created(LocalTime time_created) {
        this.time_created = time_created;
    }

    //message
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    //decision
    public Boolean getDecision() {
        return decision;
    }

    public void setDecision(Boolean decision) {
        this.decision = decision;
    }
}
