package com.website.welltalk.services;

import com.website.welltalk.models.Referral;
import com.website.welltalk.models.Student;
import com.website.welltalk.models.Teacher;
import com.website.welltalk.repositories.ReferralRepository;
import com.website.welltalk.repositories.StudentRepository;
import com.website.welltalk.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class ReferralService {

    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;


    public void createReferral(Long studentid, Long teacherid, Referral referral) {
        Student student = studentRepository.findById(studentid).get();
        Teacher teacher = teacherRepository.findById(teacherid).get();
      
        Referral newReferral = new Referral();
        
        newReferral.setReason(referral.getReason());
        newReferral.setDate_referred(LocalDate.now());
        newReferral.setStudent(student);
        newReferral.setTeacher(teacher);

        referralRepository.save(newReferral);

    }

    public Iterable<Referral> getReferrals() {
        return referralRepository.findAll();
    }

    public ResponseEntity deleteReferral(Long id) {
        referralRepository.deleteById(id);
        return new ResponseEntity<>("Referral deleted succesfully", HttpStatus.OK);
    }


    public ResponseEntity updateReferral(Long id, Referral referral) {
        Referral referralForUpdating = referralRepository.findById(id).get();

        referralForUpdating.setTeacher(referral.getTeacher());
        referralForUpdating.setStudent(referral.getStudent());
        referralForUpdating.setReason(referral.getReason());

        referralRepository.save(referralForUpdating);
        return new ResponseEntity<>("Referral updated successfully", HttpStatus.OK);
    }
}