package com.website.welltalk.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.Random;

@Service
public class OtpService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private CacheManager cacheManager;

    public String generateOtp(String email) {
        // Generate a random 6-digit OTP
        Random random = new Random();
        String otp = String.format("%06d", random.nextInt(1000000));

        // Store OTP in cache
        cacheManager.getCache("otpCache").put(email, otp);

        return otp;
    }

    public void sendOtpByEmail(String email) {
        String otp = generateOtp(email);
        String subject = "Your One-Time Password (OTP)";
        String body = "Your OTP is: " + otp;

        try {
            emailService.sendOtpEmail(email, subject, body);
        } catch (MessagingException e) {
            // Handle exception
            e.printStackTrace();
        }
    }

    public boolean verifyOtp(String email, String enteredOtp) {
        // Retrieve stored OTP from cache or database
        Cache cache = cacheManager.getCache("otpCache");
        Cache.ValueWrapper valueWrapper = (cache != null) ? cache.get(email) : null;

        // Check if the cache entry for the email is found
        if (valueWrapper != null) {
            // Retrieve stored OTP from cache
            String storedOtp = (String) valueWrapper.get();

            // Check if stored OTP is not null before comparing
            if (storedOtp != null) {
                // Compare entered OTP with stored OTP
                return enteredOtp.equals(storedOtp);
            } else {
                // Handle case where stored OTP is null
                return false;
            }
        } else {
            // Handle case where cache entry is not found
            return false;
        }
    }
}
