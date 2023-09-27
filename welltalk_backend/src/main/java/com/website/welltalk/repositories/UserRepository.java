package com.website.welltalk.repositories;

import com.website.welltalk.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Object> {
    // Custom method to find a user using a username
    User findByUsername(String username);

    //Custom method to find a user using an email
    User findByEmail(String email);
}