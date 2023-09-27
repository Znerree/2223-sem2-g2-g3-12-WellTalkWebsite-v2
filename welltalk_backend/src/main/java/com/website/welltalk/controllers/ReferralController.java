package com.website.welltalk.controllers;

import com.website.welltalk.models.Referral;
import com.website.welltalk.services.ReferralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ReferralController {

    @Autowired
    ReferralService referralService;

    @PostMapping(value = "/referrals")
    public ResponseEntity<Object> createReferral(@RequestParam(value = "student") Long studentid, @RequestParam(value = "teacher") Long teacherid, @RequestBody Referral referral){
        referralService.createReferral(studentid, teacherid, referral);

        return new ResponseEntity<>("Referral created successfully", HttpStatus.OK);
    }

    @GetMapping(value = "/referrals")
    public ResponseEntity<Object> getReferrals(){
        return new ResponseEntity<>(referralService.getReferrals(), HttpStatus.OK);
    }
    @DeleteMapping(value = "/referrals/{id}")
    public ResponseEntity<Object> deleteReferral(@PathVariable("id") Long id){
        referralService.deleteReferral(id);
        return new ResponseEntity<>("Referral deleted successfully", HttpStatus.OK);
    }
}
