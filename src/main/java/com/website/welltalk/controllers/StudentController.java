package com.website.welltalk.controllers;

import com.website.welltalk.models.Student;
import com.website.welltalk.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
public class StudentController {

    @Autowired
    StudentService studentService;

    @PostMapping(value = "/students")
    public ResponseEntity<Object> createStudent(@RequestBody Student student) {
        studentService.createStudent(student);
        return new ResponseEntity<>("Student created successfully", HttpStatus.OK);
    }

    @GetMapping(value = "/students")
    public ResponseEntity<Object> getStudents(){
        return new ResponseEntity<>(studentService.getStudents(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/students/{studentid}")
    public ResponseEntity<Object> deleteStudent(@PathVariable Long studentid) {
        return studentService.deleteStudent(studentid);
    }

    @PutMapping(value = "/students/{studentid}")
    public ResponseEntity<Object> updateStudent(@PathVariable Long studentid, @RequestBody Student student) {
        return studentService.updateStudent(studentid, student);
    }

    @GetMapping(value = "/students/{studentid}")
    public Optional<Student> findById(@PathVariable Long studentid){
        return studentService.findById(studentid);
    }
}

