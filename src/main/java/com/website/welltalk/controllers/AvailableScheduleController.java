package com.website.welltalk.controllers;

import com.website.welltalk.models.AvailableSchedule;
import com.website.welltalk.services.AvailableScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AvailableScheduleController {

    @Autowired
    AvailableScheduleService availableScheduleService;

    @GetMapping(value = "/availableschedules")
    public ResponseEntity<Object> getAvailableSchedules() {
        return ResponseEntity.ok(availableScheduleService.getAllAvailableSchedules());
    }

    @PostMapping(value = "/availableschedules")
    public ResponseEntity<Object> createAvailableSchedule(@RequestHeader(value="Authorization") String stringToken, @RequestBody AvailableSchedule availableSchedule) {
        availableScheduleService.createAvailableSchedule(stringToken, availableSchedule);
        return ResponseEntity.ok("Available Schedule created successfully");
    }
    
    
}
