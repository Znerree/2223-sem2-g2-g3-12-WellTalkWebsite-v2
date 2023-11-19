package com.website.welltalk.config;

import com.website.welltalk.services.JwtUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// OncePerRequestFilter is a class that guarantees a single execution per request received
@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    private final JwtToken jwtTokenUtil;

    public JwtRequestFilter(JwtToken jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)

            throws ServletException, IOException {

        final String requestTokenHeader = request.getHeader("Authorization");

        String username = null;

        String jwtToken = null;


        if (requestTokenHeader != null) {

            jwtToken = requestTokenHeader;


            try {

                username = jwtTokenUtil.getUsernameFromToken(jwtToken);
                System.out.print("Token: " + jwtToken);

            } catch (IllegalArgumentException e) {

                System.out.println("Unable to get JWT Token");

            } catch (ExpiredJwtException e) {

                System.out.println("JWT Token has expired");

            }

        } else {

            logger.warn("JWT Token is incomplete");

        }


        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = this.jwtUserDetailsService.loadUserByUsername(username);


            if (jwtTokenUtil.validateToken(jwtToken, userDetails)) {

                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(

                        userDetails, null, userDetails.getAuthorities());

                usernamePasswordAuthenticationToken

                        .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            }
        }
        chain.doFilter(request, response);
    }
}
