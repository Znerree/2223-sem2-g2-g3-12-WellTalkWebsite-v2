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
@Table(name = "available_schedules")
public class AvailableSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "counselor_id", nullable = false)
    private Counselor counselor;

    public AvailableSchedule(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public AvailableSchedule() {
    }

    //id
    public Long getId() {
        return id;
    }

    //time
    public LocalDateTime getDateTime() {
        return dateTime;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    //counselor_id
    public Counselor getCounselor() {
        return counselor;
    }
    public void setCounselor(Counselor counselor) {
        this.counselor = counselor;
    }
}
