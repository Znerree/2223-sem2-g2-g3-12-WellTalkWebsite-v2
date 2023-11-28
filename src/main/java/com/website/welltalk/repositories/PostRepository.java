package com.website.welltalk.repositories;

import com.website.welltalk.models.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// An interface contains behaviors/methods that a class implements/uses
// An interface marked as @Repository contains methods for database manipulation
// By extending CrudRepository, PostRepository will inherit its pre-defined methods for creating, retrieving, updating, and deleting records
@Repository
// Post is the data type of the data used in the methods
// Object is the data type of the data returned from the database
public interface PostRepository extends JpaRepository<Post, Object> {
}
