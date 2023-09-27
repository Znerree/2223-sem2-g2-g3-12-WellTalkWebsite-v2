package com.website.welltalk.repositories;

import com.website.welltalk.models.Counselor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CounselorRepository extends CrudRepository<Counselor, Object> {
    Counselor findByUsername(String username);
}