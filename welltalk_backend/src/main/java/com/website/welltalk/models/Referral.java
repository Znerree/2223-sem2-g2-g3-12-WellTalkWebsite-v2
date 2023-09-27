package com.website.welltalk.models;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.*;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Entity
@Table(name = "referral")
public class Referral {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher;
    
    @Column
    private LocalDate date_referred;

    @Column
    private String reason;


    public Referral() {
        // Default constructor
    }

    public Referral(String reason) {
        this.reason = reason;
    }

    public Long getId() {
        return id;
    }

    // Getter and Setter for student
    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    // Getter and Setter for teacher
    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
    

    public LocalDate getDate_referred() {
		return date_referred;
	}

	public void setDate_referred(LocalDate localDate) {
		this.date_referred = localDate;
	}

	public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}

