package com.discussionforum.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceComment {

    @Autowired
    private RepositoryComment repositoryComment;

    public EntityComment save(EntityComment entityComment) {
        return repositoryComment.save(entityComment);
    }

}
