package com.website.welltalk.services;

import com.website.welltalk.models.Teacher;
import com.website.welltalk.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TeacherService {

        @Autowired
        private TeacherRepository teacherRepository;
    
        public Iterable<Teacher> getTeachers() {
            return teacherRepository.findAll();
        }
    
        public void createTeacher(Teacher teacher) {
            teacherRepository.save(teacher);
        }
    
        public ResponseEntity deleteTeacher(Long id) {
            teacherRepository.deleteById(id);
            return new ResponseEntity<>("Teacher deleted successfully", HttpStatus.OK);
        }
    
        public ResponseEntity updateTeacher(Long id, Teacher updatedTeacher) {
            Teacher teacherForUpdating = teacherRepository.findById(id).get();
    
                teacherForUpdating.setFirstName(updatedTeacher.getFirstName());
                teacherForUpdating.setLastName(updatedTeacher.getLastName());
                teacherForUpdating.setEmail(updatedTeacher.getEmail());
                teacherForUpdating.setSchoolID(updatedTeacher.getSchoolID());
                teacherForUpdating.setUsername(updatedTeacher.getUsername());
                teacherForUpdating.setPassword(updatedTeacher.getPassword());
    
                teacherRepository.save(teacherForUpdating);
                return new ResponseEntity<>("Teacher updated successfully", HttpStatus.OK);
            }
    
        public Optional<Teacher> findById(Long id) {
            return teacherRepository.findById(id);
        }

        public Optional<Teacher> findByUsername(String username){
            return Optional.ofNullable(teacherRepository.findByUsername(username));
        }

}
