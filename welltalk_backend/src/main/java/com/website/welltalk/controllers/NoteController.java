package com.website.welltalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.website.welltalk.models.Notes;
import com.website.welltalk.services.NoteService;

// Serializes all responses of the PostController as HTTP responses
// Serialization - An object in Java can be represented as a sequence of bytes that includes the object's data as well as information about the object's type and the types of data stored in the object
@RestController
// Enable cross origin requests via @CrossOrigin
@CrossOrigin
public class NoteController {

    @Autowired
    NoteService noteService;

    @RequestMapping(value = "/notes", method = RequestMethod.POST)
    public ResponseEntity<Object> createNote(@RequestHeader(value = "Authorization") String stringToken,
            @RequestBody Notes note) {
        noteService.createNote(stringToken, note);
        return new ResponseEntity<>("Note created successfully", HttpStatus.CREATED);
    }

    // Get notes
    @RequestMapping(value = "/notes", method = RequestMethod.GET)
    public ResponseEntity<Object> getNotes() {
        return new ResponseEntity<>(noteService.getNotes(), HttpStatus.OK);
    }

    // Delete notes
    @RequestMapping(value = "/notes/{noteid}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deletePost(@PathVariable Long noteid,
            @RequestHeader(value = "Authorization") String stringToken) {
        return noteService.deleteNotes(noteid, stringToken);
    }

    // Update notes
    @RequestMapping(value = "/notes/{noteid}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updatePost(@PathVariable Long noteid,
            @RequestHeader(value = "Authorization") String stringToken, @RequestBody Notes note) {
        return noteService.updateNotes(noteid, stringToken, note);
    }

    // Get user notes
    @RequestMapping(value = "/myNotes", method = RequestMethod.GET)
    public ResponseEntity<Object> getPosts(@RequestHeader(value = "Authorization") String stringToken) {
        return new ResponseEntity<>(noteService.getMyNotes(stringToken), HttpStatus.OK);
    }

}
