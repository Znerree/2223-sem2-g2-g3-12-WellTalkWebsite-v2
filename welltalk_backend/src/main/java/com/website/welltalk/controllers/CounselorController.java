package com.website.welltalk.controllers;

import com.website.welltalk.models.Counselor;
import com.website.welltalk.services.CounselorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
public class CounselorController {

    @Autowired
    CounselorService counselorService;

    @PostMapping(value = "/counselors")
    public ResponseEntity<Object> createCounselor(@RequestBody Counselor counselor ) {
        counselorService.createCounselor(counselor);
        return new ResponseEntity<>("Counselor created successfully", HttpStatus.OK);
    }

    @GetMapping(value = "/counselors")
    public ResponseEntity<Object> getCounselors(){
        return new ResponseEntity<>(counselorService.getCounselors(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/counselors/{counselorid}")
    public ResponseEntity<Object> deleteTeacher(@PathVariable Long counselorid) {
        return counselorService.deleteCounselor(counselorid);
    }

    @PutMapping(value = "/counselors/{counselorid}")
    public ResponseEntity<Object> updateTeacher(@PathVariable Long counselorid, @RequestBody Counselor counselor) {
        return counselorService.updateCounselor(counselorid, counselor);
    }

    @GetMapping(value = "/counselors/{counselorid}")
    public Optional<Counselor> findById(@PathVariable Long counselorid){
        return counselorService.findById(counselorid);
    }
}

