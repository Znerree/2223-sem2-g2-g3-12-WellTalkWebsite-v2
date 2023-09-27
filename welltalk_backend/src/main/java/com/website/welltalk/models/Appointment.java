package com.website.welltalk.models;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = false)
    private Counselor counselor;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column
    private LocalDateTime start_date;
    
    @ManyToOne
    @JoinColumn(name = "referrer", nullable = false)
    private Teacher teacher;

    @Column
    private String status;

    public Appointment() {
        // Default constructor
    }   

    public Appointment(LocalDateTime start_date, String status) {
        this.start_date = start_date;
        this.status = status;
    }
    //referall id
    public Long getId() {
        return id;
    }

    //counselor
    public Counselor getCounselor() {
        return counselor;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }


    //student
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }


    //teacher
    public Teacher getReferrer() {
        return teacher;
    }

    public void setReferrer(Teacher teacher) {
        this.teacher = teacher;
    }


    //start date
    public LocalDateTime getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDateTime start_date) {
        this.start_date = start_date;
    }


    //status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    


    
}
