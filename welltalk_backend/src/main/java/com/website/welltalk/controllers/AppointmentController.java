package com.website.welltalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    public ResponseEntity<Object> createAppointment(@RequestHeader(value="Authorization") String stringToken, @RequestParam(value = "student") Long studentid, @RequestParam(value = "teacher") Long teacherid, @RequestBody Appointment appointment) {
        appointmentService.createAppointment(stringToken, studentid, teacherid, appointment);
        return ResponseEntity.ok("appointment created successfully");
        
    }

    @GetMapping(value = "/appointments")
    public ResponseEntity<Object> getAppointments() {
        return ResponseEntity.ok(appointmentService.getAppointments());
    }


}
