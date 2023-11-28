package com.website.welltalk.repositories;

import com.website.welltalk.models.Referral;
import com.website.welltalk.models.Teacher;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferralRepository extends CrudRepository<Referral, Long> {
    List<Referral> findAllByTeacher(Teacher teacher);
}