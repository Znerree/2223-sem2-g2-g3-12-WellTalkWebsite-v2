package com.website.welltalk.services;

import org.springframework.beans.factory.annotation.Autowired;
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
        String storedOtp = (String) cacheManager.getCache("otpCache").get(email).get();

        // Compare entered OTP with stored OTP
        return enteredOtp.equals(storedOtp);
    }
}

