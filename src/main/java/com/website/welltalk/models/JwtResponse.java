package com.website.welltalk.models;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    //JwtResponse create model for token response
    private static final long serialVersionUID = -8091879091924046844L;

    // Properties
    private final String jwttoken;

    // Parametrized Constructor
    public JwtResponse(String jwttoken) {
        this.jwttoken = jwttoken;
    }

    // Getters and Setters
    public String getToken() {
        return this.jwttoken;
    }

}
