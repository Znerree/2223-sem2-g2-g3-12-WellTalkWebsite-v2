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
                .antMatchers("/authenticate").permitAll()
                .antMatchers(HttpMethod.POST, "/send-otp").permitAll()
                .antMatchers(HttpMethod.POST, "/users/register").permitAll()
                .antMatchers("/referrals").permitAll()
                .antMatchers("/posts").permitAll()
                .antMatchers(HttpMethod.POST, "/notes").permitAll()
                .antMatchers("/students").permitAll()
                .antMatchers("/counselors").permitAll()
                .antMatchers("/teachers").permitAll()
                .antMatchers("/referrals").permitAll()
                .antMatchers("/users/{email}").permitAll()
                .antMatchers("/requests/all").permitAll()
                .antMatchers("/users/username/{username}").permitAll()
                .antMatchers(HttpMethod.GET, "/appointments").permitAll()
                .antMatchers(HttpMethod.GET, "/teachers/{teacherid}").permitAll()
                .antMatchers(HttpMethod.GET, "/referrals/teachers").permitAll()
                .antMatchers(HttpMethod.GET, "/students/{studentid}").permitAll()
                .antMatchers(HttpMethod.PUT, "/referrals/{id}").permitAll()
                .antMatchers(HttpMethod.PUT, "/posts/{id}").permitAll()
                .antMatchers(HttpMethod.PUT, "/posts/photo/{id}").permitAll()
                .antMatchers(HttpMethod.GET, "/users").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated().and()
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticate).and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

    }

}
