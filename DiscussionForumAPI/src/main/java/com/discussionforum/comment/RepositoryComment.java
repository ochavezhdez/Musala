package com.discussionforum.comment;

import com.discussionforum.article.EntityArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryComment extends JpaRepository<EntityComment, Long> {

    List<EntityComment> findByArticle(EntityArticle article);
}
