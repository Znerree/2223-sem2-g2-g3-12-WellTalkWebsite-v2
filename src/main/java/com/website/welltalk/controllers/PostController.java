package com.website.welltalk.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.website.welltalk.models.Post;
import com.website.welltalk.services.PostService;

// Serializes all responses of the PostController as HTTP responses
// Serialization - An object in Java can be represented as a sequence of bytes that includes the object's data as well as information about the object's type and the types of data stored in the object
@RestController
// Enable cross origin requests via @CrossOrigin
@CrossOrigin
public class PostController {

    @Autowired
    PostService postService;

    // Create post
    // Automatically deserialize JSON client/frontend input into a Java object via
    // @RequestBody
    // ResponseEntity represents the whole HTTP response: status code, headers and
    // body.

    // this method is used when the user chooses to post w/o a photo
    @RequestMapping(value = "/posts", method = RequestMethod.POST)
    public ResponseEntity<Object> createPost(@RequestHeader(value = "Authorization") String stringToken,
            @RequestBody Post post) {
        postService.createPost(stringToken, post);
        return new ResponseEntity<>("Post created successfully", HttpStatus.CREATED);
    }

    // this method is used when the user chooses to post w/ a photo
    @RequestMapping(value = "/posts/photo", method = RequestMethod.POST)
    public ResponseEntity<Object> createPost(
            @RequestHeader(value = "Authorization") String stringToken,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("photoData") MultipartFile photoData) throws IOException {

        String contentType = photoData.getContentType();
        if (!contentType.equals("image/png") && !contentType.equals("image/jpeg")) {
            return new ResponseEntity<>("Only PNG and JPG images are supported", HttpStatus.BAD_REQUEST);
        }

        postService.createPost(stringToken, title, content, photoData);
        return new ResponseEntity<>("Post created successfully", HttpStatus.CREATED);
    }

    // Get posts
    @RequestMapping(value = "/posts", method = RequestMethod.GET)
    public ResponseEntity<Object> getPosts() {
        return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
    }

    // Delete post
    @RequestMapping(value = "/posts/{postid}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletePost(@PathVariable Long postid,
            @RequestHeader(value = "Authorization") String stringToken) {
        return postService.deletePost(postid, stringToken);
    }

    // Update post without photo
    @RequestMapping(value = "/posts/{postid}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updatePost(@PathVariable Long postid,
            @RequestHeader(value = "Authorization") String stringToken, @RequestBody Post post) {
        return postService.updatePost(postid, stringToken, post);
    }

    // Update post with photo
    @RequestMapping(value = "/posts/photo/{postid}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updatePost(
            @RequestHeader(value = "Authorization") String stringToken,
            @PathVariable Long postid,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("photoData") MultipartFile photoData) throws IOException {

        String contentType = photoData.getContentType();
        if (!contentType.equals("image/png") && !contentType.equals("image/jpeg")) {
            return new ResponseEntity<>("Only PNG and JPG images are supported", HttpStatus.BAD_REQUEST);
        }

        postService.updatePost(postid, stringToken, title, content, photoData);
        return new ResponseEntity<>("Post updated!", HttpStatus.CREATED);
    }

    // Get user posts
    @RequestMapping(value = "/myPosts", method = RequestMethod.GET)
    public ResponseEntity<Object> getPosts(@RequestHeader(value = "Authorization") String stringToken) {
        return new ResponseEntity<>(postService.getMyPosts(stringToken), HttpStatus.OK);
    }


}
