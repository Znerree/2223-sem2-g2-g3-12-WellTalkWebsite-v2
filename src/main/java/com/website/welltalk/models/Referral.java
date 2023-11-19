package com.website.welltalk.models;

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

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = true, columnDefinition = "BIGINT DEFAULT 0")
    private Counselor counselor;
    
    @Column
    private String reason;

    @Column
    private Boolean isAccepted;


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

    public Counselor getCounselor() {
        return counselor;
    }

    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

	public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Boolean getIsAccepted() {
        return isAccepted;
    }

    public void setIsAccepted(Boolean accepted) {
        isAccepted = accepted;
    }
}

