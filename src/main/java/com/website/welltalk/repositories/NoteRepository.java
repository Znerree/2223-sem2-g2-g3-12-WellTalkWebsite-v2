package com.website.welltalk.repositories;

import com.website.welltalk.models.Notes;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoteRepository extends CrudRepository<Notes, Object> {
    
}
