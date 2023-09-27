package com.website.welltalk.services;

import com.website.welltalk.models.Teacher;
import com.website.welltalk.repositories.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    public void createTeacher(Teacher teacher) {
        teacherRepository.save(teacher);
    }

    public Iterable<Teacher> getTeachers() {
        return teacherRepository.findAll();
    }

    public ResponseEntity deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
        return new ResponseEntity<>("Teacher deleted successfully", HttpStatus.OK);
    }

    public ResponseEntity updateTeacher(Long id, Teacher teacher) {
        Teacher teacherForUpdating = teacherRepository.findById(id).get();

        teacherForUpdating.setName(teacher.getName());
        teacherRepository.save(teacherForUpdating);

        return new ResponseEntity<>("Teacher updated succesfully", HttpStatus.OK);

    }
    public Optional<Teacher> findById(Long id) {
        if(teacherRepository.findById(id) != null)
            return teacherRepository.findById(id);
        else
            return null;
    }
}
