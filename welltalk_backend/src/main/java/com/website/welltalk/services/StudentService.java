package com.website.welltalk.services;

import com.website.welltalk.models.Student;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface StudentService {
    void createStudent(Student student);
    Iterable<Student> getStudents();
    ResponseEntity deleteStudent(Long id);
    ResponseEntity updateStudent(Long id, Student student);
    Optional<Student> findById(Long id);
}
