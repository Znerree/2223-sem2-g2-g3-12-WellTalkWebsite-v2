package com.website.welltalk.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

// AuthenticationEntryPoint is Spring Security's interface for running an authentication scheme
public class JwtAuthenticate implements AuthenticationEntryPoint, Serializable {
    // serialVersionUID serves as the "state" of a serializable object. This is used by Java in deserializing a
    // serialized object.
    //serialization is the process of transmitting information in a different data structure (ie. an object is
    // serialized into a string to be transmitted and gets deserialized back into an object when it reaches its
    // destination
    private static final long serialVersionUID = -7858869558953243875L;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         // AuthenticationException is a class in Spring Security that contains all exceptions related to an Authentication object being invalid
                         AuthenticationException authException) throws IOException {

        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");

    }
}
