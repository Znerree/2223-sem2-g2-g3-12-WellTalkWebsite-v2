package com.website.welltalk.repositories;

import com.website.welltalk.models.Referral;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferralRepository extends CrudRepository<Referral, Object> {
}
