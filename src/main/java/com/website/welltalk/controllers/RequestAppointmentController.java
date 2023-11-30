package com.website.welltalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.website.welltalk.services.RequestAppointmentService;
import com.website.welltalk.models.RequestAppointment;
import com.website.welltalk.repositories.RequestAppointmentRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "/requests")
public class RequestAppointmentController {

    @Autowired
    RequestAppointmentService requestAppointmentService;

    @Autowired
    private RequestAppointmentRepository appointmentRepository;

    @GetMapping(value = "/all")
    public ResponseEntity<Object> getRequests() {
        return new ResponseEntity<>(requestAppointmentService.getRequests(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteRequest(@RequestHeader(value = "Authorization") @PathVariable("id") Long id) {
        requestAppointmentService.deleteRequest(id);
        return new ResponseEntity<>("Request deleted successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updateAppointment(@RequestHeader(value = "Authorization") String stringToken,
            @PathVariable("id") Long id) {
        requestAppointmentService.updateAppointment(id, stringToken);
        return new ResponseEntity<>("Request updated successfully", HttpStatus.OK);
    }

    @PostMapping("/setAppointment")
    public ResponseEntity<?> createAppointment(@RequestBody RequestAppointment appointmentEntry) {
        try {
            appointmentRepository.save(appointmentEntry);
            return ResponseEntity.ok("Journal entry saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving journal entry: " + e.getMessage());
        }
    }
}
