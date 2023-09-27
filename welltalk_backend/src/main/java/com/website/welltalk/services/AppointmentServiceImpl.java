package com.website.welltalk.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.website.welltalk.config.JwtToken;
import com.website.welltalk.models.Appointment;
import com.website.welltalk.models.Student;
import com.website.welltalk.models.Teacher;
import com.website.welltalk.models.User;
import com.website.welltalk.repositories.AppointmentRepository;
import com.website.welltalk.repositories.StudentRepository;
import com.website.welltalk.repositories.TeacherRepository;
import com.website.welltalk.repositories.UserRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService{

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    JwtToken jwtToken;


    
    public void createAppointment(String stringToken, Long studentid, Long teacherid, Appointment appointment) {
        User counselor = userRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        Student student = studentRepository.findById(studentid).get();
        Teacher teacher = teacherRepository.findById(teacherid).get();

        Appointment newAppointment = new Appointment();

        newAppointment.setStudent(student);
        newAppointment.setReferrer(teacher);
        newAppointment.setUser(counselor);
        newAppointment.setStart_date(appointment.getStart_date());
        newAppointment.setEnd_date(appointment.getEnd_date());
        newAppointment.setStatus(appointment.getStatus());

        appointmentRepository.save(newAppointment);
    }
    
    public Iterable<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }
    
    public ResponseEntity deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok("Appointment deleted succesfully");
    }
    
    public ResponseEntity updateAppointment(Long id, String stringToken, Appointment appointment) {
        Appointment appointmentToUpdate = appointmentRepository.findById(id).get();
        String appointmentCounselorUsername = appointmentToUpdate.getUser().getUsername();
        String authenticatedCounselorUsername = jwtToken.getUsernameFromToken(stringToken);

        if(authenticatedCounselorUsername.equals(appointmentCounselorUsername)){
            appointmentToUpdate.setStart_date(appointment.getStart_date());
            appointmentToUpdate.setEnd_date(appointment.getEnd_date());
            appointmentToUpdate.setStatus(appointment.getStatus());
            appointmentRepository.save(appointmentToUpdate);
            return ResponseEntity.ok("Appointment updated succesfully");
        }else{
            return ResponseEntity.badRequest().body("You are not authorized to update this appointment");
        }
    }


    //Get all appointments for a specific counselor
    public Iterable<Appointment> getMyAppointments(String stringToken) {
        User counselor = userRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        return counselor.getAppointments();
    }

}
