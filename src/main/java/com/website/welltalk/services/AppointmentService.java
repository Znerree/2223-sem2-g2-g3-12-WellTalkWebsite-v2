package com.website.welltalk.services;
import com.website.welltalk.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.website.welltalk.config.JwtToken;
import com.website.welltalk.repositories.AppointmentRepository;
import com.website.welltalk.repositories.CounselorRepository;
import com.website.welltalk.repositories.StudentRepository;
import com.website.welltalk.repositories.UserRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CounselorRepository counselorRepository;
    @Autowired
    JwtToken jwtToken;


    
    public void createAppointment(String stringToken, Long studentid, Appointment appointment) {
        Counselor counselor = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        Student student = studentRepository.findById(studentid).get();

        Appointment newAppointment = new Appointment();

        newAppointment.setStudent(student);
        newAppointment.setCounselor(counselor);
        newAppointment.setStart_date(appointment.getStart_date());
        newAppointment.setIsDone(false);

        appointmentRepository.save(newAppointment);
    }
    
    public Iterable<Appointment> getAppointments() {
        return appointmentRepository.findAll();
    }
    
    public ResponseEntity deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok("Appointment deleted succesfully");
    }
    
    public ResponseEntity updateAppointment(Long id, String stringToken) {
        Appointment appointmentToUpdate = appointmentRepository.findById(id).get();
        String appointmentCounselorUsername = appointmentToUpdate.getCounselor().getUsername();
        String authenticatedCounselorUsername = jwtToken.getUsernameFromToken(stringToken);

        if(authenticatedCounselorUsername.equals(appointmentCounselorUsername)){
            appointmentToUpdate.setIsDone(true);
            
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
