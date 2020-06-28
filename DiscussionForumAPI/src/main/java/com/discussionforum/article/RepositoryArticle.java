package com.discussionforum.article;

import com.discussionforum.user.model.EntityUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryArticle extends JpaRepository<EntityArticle, Long> {

    List<EntityArticle> findByUser(EntityUser user);

}
