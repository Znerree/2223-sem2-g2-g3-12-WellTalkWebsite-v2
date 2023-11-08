package com.website.welltalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.website.welltalk.models.RequestAppointment;

@Repository
public interface RequestAppointmentRepository extends CrudRepository<RequestAppointment, Object> {
    
}
