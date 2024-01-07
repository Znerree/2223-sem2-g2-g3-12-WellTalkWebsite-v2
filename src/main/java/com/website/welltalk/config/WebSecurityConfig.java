package com.website.welltalk.config;

import com.website.welltalk.services.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private com.website.welltalk.config.JwtAuthenticate jwtAuthenticate;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    // Filters to be applied on the request
    // Jwt authentication
    // username authentication
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());

    }

    // What to do during authentication
    @Bean
    public JwtAuthenticate jwtAuthenticationEntryPointBean() throws Exception {
        return new JwtAuthenticate();
    }

    // Instantiates a BCryptPasswordEncoder object for password hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();

    }

    // Routes that will not require Jwt Tokens
    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors().and().csrf().disable()

                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/authenticate").permitAll()
                // .antMatchers(HttpMethod.POST, "/send-otp").permitAll()

                // users
                .antMatchers(HttpMethod.POST, "/users/register").permitAll()
                // .antMatchers(HttpMethod.GET, "/users", "/users/{email}").authenticated()
                // .antMatchers("/users/username/{username}").permitAll()

                // referrals
                .antMatchers("/referrals").permitAll()
                .antMatchers(HttpMethod.PUT, "/referrals/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/referrals/teachers").permitAll()

                // posts
                .antMatchers("/posts").permitAll()
                .antMatchers(HttpMethod.PUT, "/posts/{id}").permitAll()
                .antMatchers(HttpMethod.PUT, "/posts/photo/{id}").permitAll()

                // notes
                .antMatchers(HttpMethod.POST, "/notes").permitAll()
                .antMatchers(HttpMethod.GET, "/notes").authenticated()

                // appointments
                .antMatchers(HttpMethod.GET, "/appointments").authenticated()

                // requests
                .antMatchers("/requests/all").permitAll()

                // availableschedules
                .antMatchers(HttpMethod.GET, "/availableschedules").authenticated()

                // students
                .antMatchers("/students").permitAll()
                .antMatchers(HttpMethod.GET, "/students/{studentid}").permitAll()

                // counselors
                .antMatchers("/counselors").permitAll()

                // teachers
                .antMatchers("/teachers").permitAll()
                .antMatchers(HttpMethod.GET, "/teachers/{teacherid}").permitAll()

                // others
                .antMatchers(HttpMethod.POST, "/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                .anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticate).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }

}
