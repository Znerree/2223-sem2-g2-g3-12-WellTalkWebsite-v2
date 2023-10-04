package com.website.welltalk.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.website.welltalk.models.AvailableSchedule;

@Repository
public interface AvailableScheduleRepository extends JpaRepository<AvailableSchedule, Long> {
    
}
