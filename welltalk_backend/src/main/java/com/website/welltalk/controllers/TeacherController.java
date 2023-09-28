package com.website.welltalk.controllers;

import com.website.welltalk.models.Teacher;
import com.website.welltalk.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    @PostMapping(value = "/teachers")
    public ResponseEntity<Object> createTeacher(@RequestBody Teacher teacher) {
        teacherService.createTeacher(teacher);
        return new ResponseEntity<>("Teacher created successfully", HttpStatus.OK);
    }

    @GetMapping(value = "/teachers")
    public ResponseEntity<Object> getTeachers(){
        return new ResponseEntity<>(teacherService.getTeachers(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/teachers/{teacherid}")
    public ResponseEntity<Object> deleteTeacher(@PathVariable Long teacherid) {
        return teacherService.deleteTeacher(teacherid);
    }

    @PutMapping(value = "/teachers/{teacherid}")
    public ResponseEntity<Object> updateTeacher(@PathVariable Long teacherid, @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(teacherid, teacher);
    }

    @GetMapping(value = "/teachers/{teacherid}")
    public Optional<Teacher> findById(@PathVariable Long teacherid){
        return teacherService.findById(teacherid);
    }

    @GetMapping(value = "/teachers/username/{username}")
    public Optional<Teacher> findByUsername(@PathVariable String username){
        return teacherService.findByUsername(username);
    }
}

