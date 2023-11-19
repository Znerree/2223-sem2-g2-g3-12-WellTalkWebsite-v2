package com.website.welltalk.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.website.welltalk.config.JwtToken;
import com.website.welltalk.models.Counselor;
import com.website.welltalk.models.Post;
import com.website.welltalk.repositories.CounselorRepository;
import com.website.welltalk.repositories.PostRepository;

// Defined that the class is a service that will contain business logic for the application
// The @Service annotation will allow us to use the CRUD methods inherited from the CrudRepository even though interfaces do not contain implementation/method bodies
@Service
public class PostService {

    // An object cannot be instantiated from interfaces
    // @Autowired allows us to use the interface as if it was an instance of an
    // object and allows us to use the methods from the Crud Repository
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CounselorRepository counselorRepository;
    @Autowired
    JwtToken jwtToken;

    // Create post without photo
    public void createPost(String stringToken, Post post) {
        Counselor counselor = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        Post newPost = new Post();
        newPost.setTitle(post.getTitle());
        newPost.setContent(post.getContent());
        newPost.setCounselor(counselor);
        postRepository.save(newPost);
    }

    // Create post with photo
    public void createPost(String stringToken, String title, String content, MultipartFile photoData)
            throws IOException {
        Counselor counselor = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        Post newPost = new Post();
        newPost.setTitle(title);
        newPost.setContent(content);
        newPost.setCounselor(counselor);

        // sets the photo content to the byte array of the photoData
        newPost.setPhotoContent(photoData.getBytes());

        postRepository.save(newPost);
    }

    // Get posts
    public Iterable<Post> getPosts() {
        return postRepository.findAll();
    }

    // Delete post
    public ResponseEntity deletePost(Long id, String stringToken) {

        Post postForDeleting = postRepository.findById(id).get();
        String postAuthorName = postForDeleting.getCounselor().getUsername();
        String authenticatedUserName = jwtToken.getUsernameFromToken(stringToken);

        if (authenticatedUserName.equals(postAuthorName)) {
            postRepository.deleteById(id);
            return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("You are not authorized to delete this post.", HttpStatus.UNAUTHORIZED);
        }

    }

    // Update post without Photo
    public ResponseEntity updatePost(Long id, String stringToken, Post post) {

        Post postForUpdating = postRepository.findById(id).get();
        String postAuthorName = postForUpdating.getCounselor().getUsername();
        String authenticatedUserName = jwtToken.getUsernameFromToken(stringToken);

        if (authenticatedUserName.equals(postAuthorName)) {

            postForUpdating.setTitle(post.getTitle());
            postForUpdating.setContent(post.getContent());
            postRepository.save(postForUpdating);
            return new ResponseEntity<>("Post updated successfully", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("You are not authorized to edit this post.", HttpStatus.UNAUTHORIZED);
        }
    }

    // Update post with Photo
    public ResponseEntity updatePost(Long id, String stringToken, String title, String content,
            MultipartFile photoData) throws IOException {

        Post postForUpdating = postRepository.findById(id).get();
        String postAuthorName = postForUpdating.getCounselor().getUsername();
        String authenticatedUserName = jwtToken.getUsernameFromToken(stringToken);

        if (authenticatedUserName.equals(postAuthorName)) {

            postForUpdating.setTitle(title);
            postForUpdating.setContent(content);
            postForUpdating.setPhotoContent(photoData.getBytes());
            postRepository.save(postForUpdating);
            return new ResponseEntity<>("Post updated successfully", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("You are not authorized to edit this post.", HttpStatus.UNAUTHORIZED);
        }
    }

    // Get counselor posts
    public Iterable<Post> getMyPosts(String stringToken) {
        Counselor author = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        return author.getPosts();
    }

}
