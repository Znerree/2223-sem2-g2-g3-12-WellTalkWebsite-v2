package com.website.welltalk.config;

import com.website.welltalk.models.User;
import com.website.welltalk.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

// To generate token
@Component
public class JwtToken implements Serializable {

    // taken from application.properties
    @Value("${jwt.secret}")
    private String secret;

    @Autowired
    private UserRepository userRepository;

    private static final long serialVersionUID = -2550185165626007488L;

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60; //5hrs

    private String doGenerateToken(Map<String, Object> claims, String subject) {

        // .setClaims includes the information to show the recipient which is the username
        // .setSubject adds information about the subject
        // .setIssuedAt sets the time and date when the token was created
        // .setExpiration sets the expiration of the token
        // .signWith creates the token using a declared algorithm, with the secret keyword
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();

    }

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();
        User user = userRepository.findByUsername(userDetails.getUsername());
        claims.put("user", user.getId());
        return doGenerateToken(claims, userDetails.getUsername());

    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = getAllClaimsFromToken(token);

        return claimsResolver.apply(claims);

    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public String getUsernameFromToken(String token) {
        String claim = getClaimFromToken(token, Claims::getSubject);
        return claim;

    }

    public Date getExpirationDateFromToken(String token) {

        return getClaimFromToken(token, Claims::getExpiration);

    }

    private Boolean isTokenExpired(String token) {

        final Date expiration = getExpirationDateFromToken(token);

        return expiration.before(new Date());

    }

}
