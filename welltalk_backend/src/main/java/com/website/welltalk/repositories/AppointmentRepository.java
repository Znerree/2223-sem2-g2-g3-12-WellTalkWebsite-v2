package com.website.welltalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.website.welltalk.models.Appointment;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Object> {
    
}
