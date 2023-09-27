package com.website.welltalk.services;

import com.website.welltalk.models.Counselor;
import com.website.welltalk.repositories.CounselorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CounselorService {
    @Autowired
    private CounselorRepository counselorRepository;

    public Iterable<Counselor> getCounselors() {
        return counselorRepository.findAll();
    }

    public void createCounselor(Counselor counselor) {
        counselorRepository.save(counselor);
    }

    public ResponseEntity deleteCounselor(Long id) {
        counselorRepository.deleteById(id);
        return new ResponseEntity<>("Counselor deleted successfully", HttpStatus.OK);
    }

    public ResponseEntity updateCounselor(Long id, Counselor updatedCounselor) {
        Counselor counselorForUpdating = counselorRepository.findById(id).get();

        counselorForUpdating.setFirstName(updatedCounselor.getFirstName());
        counselorForUpdating.setLastName(updatedCounselor.getLastName());
        counselorForUpdating.setEmail(updatedCounselor.getEmail());
        counselorForUpdating.setSchoolID(updatedCounselor.getSchoolID());
        counselorForUpdating.setUsername(updatedCounselor.getUsername());
        counselorForUpdating.setPassword(updatedCounselor.getPassword());

        counselorRepository.save(counselorForUpdating);
        return new ResponseEntity<>("Counselor updated successfully", HttpStatus.OK);
    }

    public Optional<Counselor> findById(Long id) {
        return counselorRepository.findById(id);
    }

    public Optional<Counselor> findByUsername(String username){
        return Optional.ofNullable(counselorRepository.findByUsername(username));
    }
}