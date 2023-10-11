package com.website.welltalk.services;

import com.website.welltalk.config.JwtToken;
import com.website.welltalk.models.Counselor;
import com.website.welltalk.models.Referral;
import com.website.welltalk.models.Student;
import com.website.welltalk.models.Teacher;
import com.website.welltalk.repositories.CounselorRepository;
import com.website.welltalk.repositories.ReferralRepository;
import com.website.welltalk.repositories.StudentRepository;
import com.website.welltalk.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ReferralService {

    @Autowired
    private ReferralRepository referralRepository;

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CounselorRepository counselorRepository;
    @Autowired
    JwtToken jwtToken;

    public void createReferral(Long studentid, Long teacherid, Referral referral) {
        Student student = studentRepository.findById(studentid).get();
        Teacher teacher = teacherRepository.findById(teacherid).get();

        Referral newReferral = new Referral();

        newReferral.setReason(referral.getReason());
        newReferral.setStudent(student);
        newReferral.setTeacher(teacher);
        newReferral.setIsAccepted(false);

        referralRepository.save(newReferral);

    }

    public Iterable<Referral> getReferrals() {
        return referralRepository.findAll();
    }

    public Iterable<Referral> getReferralsByTeacher(Long teacherId) {
        Teacher teacher = teacherRepository.findById(teacherId).get();
        return referralRepository.findAllByTeacher(teacher);
    }

    public ResponseEntity deleteReferral(Long id) {
        referralRepository.deleteById(id);
        return new ResponseEntity<>("Referral deleted succesfully", HttpStatus.OK);
    }

    public ResponseEntity updateReferral(String stringToken, Long id) {
        Referral referralForUpdating = referralRepository.findById(id).get();
        Counselor counselor = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));

        referralForUpdating.setIsAccepted(true);
        referralForUpdating.setCounselor(counselor);

        referralRepository.save(referralForUpdating);
        return new ResponseEntity<>("Referral updated successfully", HttpStatus.OK);
    }
}
