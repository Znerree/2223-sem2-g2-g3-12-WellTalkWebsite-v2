package com.website.welltalk.repositories;

import com.website.welltalk.models.Teacher;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends CrudRepository<Teacher, Object> {
    Teacher findByUsername(String username);
}
