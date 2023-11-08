package com.website.welltalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.website.welltalk.services.RequestAppointmentService;

@RestController
@CrossOrigin
@RequestMapping(value = "/requests")
public class RequestAppointmentController {

    @Autowired
    RequestAppointmentService requestAppointmentService;
    
    @GetMapping(value = "/all")
    public ResponseEntity<Object> getRequests() {
        return new ResponseEntity<>(requestAppointmentService.getRequests(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Object> deleteRequest(@RequestHeader(value="Authorization") @PathVariable("id") Long id) {
        requestAppointmentService.deleteRequest(id);
        return new ResponseEntity<>("Request deleted successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> updateAppointment(@RequestHeader(value="Authorization") String stringToken, @PathVariable("id") Long id) {
        requestAppointmentService.updateAppointment( id, stringToken);
        return new ResponseEntity<>("Request updated successfully", HttpStatus.OK);
    }

}
