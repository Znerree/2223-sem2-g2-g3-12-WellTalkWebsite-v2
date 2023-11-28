package com.website.welltalk.repositories;

import com.website.welltalk.models.Student;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends CrudRepository<Student, Object> {
}
