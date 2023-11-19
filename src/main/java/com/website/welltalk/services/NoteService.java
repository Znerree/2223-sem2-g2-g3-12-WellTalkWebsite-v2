package com.website.welltalk.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.website.welltalk.config.JwtToken;
import com.website.welltalk.models.Counselor;
import com.website.welltalk.models.Notes;
import com.website.welltalk.repositories.CounselorRepository;
import com.website.welltalk.repositories.NoteRepository;

// Defined that the class is a service that will contain business logic for the application
// The @Service annotation will allow us to use the CRUD methods inherited from the CrudRepository even though interfaces do not contain implementation/method bodies
@Service
public class NoteService {

    // An object cannot be instantiated from interfaces
    // @Autowired allows us to use the interface as if it was an instance of an
    // object and allows us to use the methods from the Crud Repository
    @Autowired
    private NoteRepository noteRepository;
    @Autowired
    private CounselorRepository counselorRepository;
    @Autowired
    JwtToken jwtToken;

    // Create notes
    public void createNote(String stringToken, Notes note) {
        Counselor counselor = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        Notes newNotes = new Notes();
        newNotes.setTitle(note.getTitle());
        newNotes.setContent(note.getContent());
        newNotes.setCounselor(counselor);
        noteRepository.save(newNotes);
    }  

    // Get notes
    public Iterable<Notes> getNotes() {
        return noteRepository.findAll();
    }

    // Delete notes
    public ResponseEntity deleteNotes(Long id, String stringToken) {

        Notes noteForDeleting = noteRepository.findById(id).get();
        String noteAuthorName = noteForDeleting.getCounselor().getUsername();
        String authenticatedUserName = jwtToken.getUsernameFromToken(stringToken);

        if (authenticatedUserName.equals(noteAuthorName)) {
            noteRepository.deleteById(id);
            return new ResponseEntity<>("Note deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("You are not authorized to delete this note.", HttpStatus.UNAUTHORIZED);
        }

    }

    // Update post
    public ResponseEntity updateNotes(Long id, String stringToken, Notes note) {

        Notes noteForUpdating = noteRepository.findById(id).get();
        String noteAuthorName = noteForUpdating.getCounselor().getUsername();
        String authenticatedUserName = jwtToken.getUsernameFromToken(stringToken);

        if (authenticatedUserName.equals(noteAuthorName)) {

            noteForUpdating.setTitle(note.getTitle());
            noteForUpdating.setContent(note.getContent());
            noteRepository.save(noteForUpdating);
            return new ResponseEntity<>("Note updated successfully", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("You are not authorized to edit this note.", HttpStatus.UNAUTHORIZED);

        }

    }

    // Get counselor posts
    public Iterable<Notes> getMyNotes(String stringToken) {
        Counselor author = counselorRepository.findByUsername(jwtToken.getUsernameFromToken(stringToken));
        return author.getNotes();
    }

}
