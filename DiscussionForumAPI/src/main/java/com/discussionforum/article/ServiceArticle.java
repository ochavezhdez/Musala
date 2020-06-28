package com.discussionforum.article;

import com.discussionforum.comment.DTOComment;
import com.discussionforum.comment.EntityComment;
import com.discussionforum.comment.RepositoryComment;
import com.discussionforum.user.RepositoryUser;
import com.discussionforum.user.model.DTOUser;
import com.discussionforum.user.model.EntityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceArticle {

    @Autowired
    private RepositoryArticle repositoryArticle;

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private RepositoryComment repositoryComment;

    public EntityArticle save(EntityArticle entityArticle) {
        return repositoryArticle.save(entityArticle);
    }

    public Optional<DTOArticle> getById(long id) {
        EntityArticle entityArticle = repositoryArticle.findById(id).get();

        DTOUser dtoUser = new DTOUser();
        dtoUser.setId(entityArticle.getUser().getId());
        dtoUser.setUserName(entityArticle.getUser().getUserName());

        DTOArticle dtoArticle = new DTOArticle();
        dtoArticle.setId(entityArticle.getId());
        dtoArticle.setUser(dtoUser);
        dtoArticle.setDate(entityArticle.getDate());
        dtoArticle.setTitle(entityArticle.getTitle());
        dtoArticle.setBody(entityArticle.getBody());
        dtoArticle.setComments(getComments(entityArticle));

        return Optional.of(dtoArticle);
    }

    public Optional<EntityArticle> update(long id, EntityArticle article) {
        return getById(id).map(entityArticle -> {
            EntityArticle entityArticle1 = new EntityArticle();
            entityArticle1.setId(article.getId());
            entityArticle1.setUser(article.getUser());
            entityArticle1.setDate(article.getDate());
            entityArticle1.setTitle(article.getTitle());
            entityArticle1.setBody(article.getBody());

            return save(entityArticle1);
        });
    }

    public Optional<DTOArticle> delete(long id) {
        return getById(id).map(entityArticle -> {
            repositoryArticle.deleteById(id);

            return entityArticle;
        });
    }

    public List<DTOArticle> findAll() {
        List<DTOArticle> articles = new LinkedList<>();
        for (EntityUser user : repositoryUser.findAll()) {
            articles.addAll(findAllByUserId(user.getId()));
        }

        return articles;
    }

    public List<DTOArticle> findAllByUserId(long id) {
        EntityUser user = repositoryUser.findById(id).get();
        if (user == null) {
            return null;
        }

        DTOUser dtoUser = new DTOUser();
        dtoUser.setId(user.getId());
        dtoUser.setUserName(user.getUserName());

        List<DTOArticle> articles = new LinkedList<>();
        for (EntityArticle article : repositoryArticle.findByUser(user)) {
            DTOArticle dtoArticle = new DTOArticle();
            dtoArticle.setId(article.getId());
            dtoArticle.setUser(dtoUser);
            dtoArticle.setDate(article.getDate());
            dtoArticle.setTitle(article.getTitle());
            dtoArticle.setBody(article.getBody());
            dtoArticle.setComments(getComments(article));

            articles.add(dtoArticle);
        }

        return articles;
    }

    private List<DTOComment> getComments(EntityArticle article) {
        List<DTOComment> comments = new LinkedList<>();
        for (EntityComment comment : repositoryComment.findByArticle(article)) {
            DTOComment dtoComment = new DTOComment();
            dtoComment.setId(comment.getId());
            dtoComment.setBody(comment.getBody());

            comments.add(dtoComment);
        }

        return comments;
    }

}
