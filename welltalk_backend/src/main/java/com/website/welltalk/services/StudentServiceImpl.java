package com.website.welltalk.services;

import com.website.welltalk.models.Student;
import com.website.welltalk.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void createStudent(Student student) {
        studentRepository.save(student);
    }

    public Iterable<Student> getStudents() {
        return studentRepository.findAll();
    }

    public ResponseEntity deleteStudent(Long id) {
        studentRepository.deleteById(id);
        return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
    }

    public ResponseEntity updateStudent(Long id, Student student) {
        Student studentForUpdating = studentRepository.findById(id).get();

        studentForUpdating.setName(student.getName());
        studentRepository.save(studentForUpdating);

        return new ResponseEntity<>("Student updated successfully", HttpStatus.OK);
    }
    public Optional<Student> findById(Long id) {
        if(studentRepository.findById(id) != null)
            return studentRepository.findById(id);
        else
            return null;
    }
}
