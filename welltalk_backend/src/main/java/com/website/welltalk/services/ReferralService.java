package com.website.welltalk.services;

import com.website.welltalk.models.Referral;
import org.springframework.http.ResponseEntity;

import java.sql.Ref;

public interface ReferralService {

    void createReferral(Long studentid, Long teacherid, Referral referral);
    Iterable<Referral> getReferrals();
    ResponseEntity deleteReferral(Long id);
    ResponseEntity updateReferral(Long id, Referral referral);
}
