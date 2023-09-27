package com.website.welltalk.services;

import com.website.welltalk.models.Teacher;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface TeacherService {
    void createTeacher(Teacher teacher);
    Iterable<Teacher> getTeachers();
    ResponseEntity deleteTeacher(Long id);
    ResponseEntity updateTeacher(Long id, Teacher teacher);
    Optional<Teacher> findById(Long id);

}
