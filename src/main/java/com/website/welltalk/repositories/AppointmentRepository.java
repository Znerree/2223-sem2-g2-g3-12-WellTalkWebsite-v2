package com.website.welltalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import com.website.welltalk.models.Appointment;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {
    List<Appointment> findAllByStudentID(String studentid);
}
