package com.website.welltalk.services;

import org.springframework.http.ResponseEntity;

import com.website.welltalk.models.Appointment;

public interface AppointmentService {
    void createAppointment(String stringToken, Long studentid, Long teacherid, Appointment appointment);
    Iterable<Appointment> getAppointments();
    ResponseEntity deleteAppointment(Long id);
    ResponseEntity updateAppointment(Long id, String stringToken, Appointment appointment);
    Iterable<Appointment> getMyAppointments(String stringToken);
}
