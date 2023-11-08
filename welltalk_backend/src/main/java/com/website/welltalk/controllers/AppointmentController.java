package com.website.welltalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.website.welltalk.models.Appointment;
import com.website.welltalk.services.AppointmentService;

@RestController
@CrossOrigin
public class AppointmentController {
    
    @Autowired
    AppointmentService appointmentService;

    @PostMapping(value = "/appointments")
    public ResponseEntity<Object> createAppointment(@RequestHeader(value="Authorization") String stringToken, @RequestParam(value = "student") Long studentid, @RequestBody Appointment appointment) {
        appointmentService.createAppointment(stringToken, studentid, appointment);
        return ResponseEntity.ok("appointment created successfully");
        
    }

    @GetMapping(value = "/appointments")
    public ResponseEntity<Object> getAppointments() {
        return ResponseEntity.ok(appointmentService.getAppointments());
    }

    @GetMapping(value = "/myappointments")
    public ResponseEntity<Object> getMyAppointments(@RequestHeader(value="Authorization") String stringToken) {
        return ResponseEntity.ok(appointmentService.getMyAppointments(stringToken));
    }

    @PutMapping(value = "/appointments/{id}")
    public ResponseEntity<Object> updateAppointment(@PathVariable Long id, @RequestHeader(value="Authorization") String stringToken) {
        return ResponseEntity.ok(appointmentService.updateAppointment(id, stringToken));
    }

}
