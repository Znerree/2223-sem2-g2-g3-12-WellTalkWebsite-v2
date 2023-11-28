package com.website.welltalk.services;
import com.website.welltalk.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.website.welltalk.config.JwtToken;
import com.website.welltalk.repositories.RequestAppointmentRepository;

@Service
public class RequestAppointmentService {

    @Autowired
    private RequestAppointmentRepository requestAppointmentRepository;

    @Autowired
    JwtToken jwtToken;
    
    public Iterable<RequestAppointment> getRequests() {
        return requestAppointmentRepository.findAll();
    }
    
    public ResponseEntity deleteRequest(Long id) {
        requestAppointmentRepository.deleteById(id);
        return ResponseEntity.ok("Request deleted succesfully");
    }
    
    public ResponseEntity updateAppointment(Long id, String stringToken) {
        RequestAppointment requestToUpdate = requestAppointmentRepository.findById(id).get();

        if (requestToUpdate.getDecision() == null) {
            requestToUpdate.setDecision(true);
            requestAppointmentRepository.save(requestToUpdate);
            return ResponseEntity.ok("Request accepted");
        } else {
            return ResponseEntity.ok("Request already accepted");
        }
    }

}
