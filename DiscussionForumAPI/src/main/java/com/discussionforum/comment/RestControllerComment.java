package com.discussionforum.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({ "comment" })
public class RestControllerComment {

    @Autowired
    private ServiceComment serviceComment;

    @PostMapping
    public ResponseEntity<EntityComment> addComment(@RequestBody EntityComment comment) {
        return ResponseEntity.ok(serviceComment.save(comment));
    }

}
