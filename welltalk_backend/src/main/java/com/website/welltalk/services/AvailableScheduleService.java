package com.website.welltalk.services;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.website.welltalk.config.JwtToken;
import com.website.welltalk.models.AvailableSchedule;
import com.website.welltalk.repositories.AvailableScheduleRepository;
import com.website.welltalk.repositories.CounselorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AvailableScheduleService {

    @Autowired
    private AvailableScheduleRepository availableScheduleRepository;
    @Autowired
    private CounselorRepository counselorRepository;
    @Autowired
    JwtToken jwtToken;

    public Iterable<AvailableSchedule> getAllAvailableSchedules() {
        return availableScheduleRepository.findAll();
    }

    public void createAvailableSchedule(String stringToken, AvailableSchedule availableSchedule) {
        availableSchedule.setCounselor(counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken)));
        availableScheduleRepository.save(availableSchedule);
    }

    public ResponseEntity deleteAvailableSchedule(Long id) {
        availableScheduleRepository.deleteById(id);
        return ResponseEntity.ok("Available Schedule deleted succesfully");
    }

    public ResponseEntity updateAvailableSchedule(Long id, String stringToken, AvailableSchedule availableSchedule) {
        AvailableSchedule availableScheduleToUpdate = availableScheduleRepository.findById(id).get();
        String availableScheduleCounselorUsername = availableScheduleToUpdate.getCounselor().getUsername();
        String authenticatedCounselorUsername = jwtToken.getUsernameFromToken(stringToken);

        if(authenticatedCounselorUsername.equals(availableScheduleCounselorUsername)){
            availableSchedule.setDateTime(availableScheduleToUpdate.getDateTime());
            availableScheduleRepository.save(availableScheduleToUpdate);
            return ResponseEntity.ok("Available Schedule updated succesfully");
        } else {
            return ResponseEntity.status(Response.SC_UNAUTHORIZED).body("You are not authorized to update this available schedule");
        }
    }

}
