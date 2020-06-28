package com.discussionforum.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping({ "article" })
public class RestControllerArticle {

    @Autowired
    private ServiceArticle serviceArticle;

    @PostMapping
    public ResponseEntity<EntityArticle> addArticle(@RequestBody EntityArticle article) {
        return ResponseEntity.ok(serviceArticle.save(article));
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<DTOArticle> getArticle(@PathVariable long id) {
        return serviceArticle.getById(id).map(entityArticle -> ResponseEntity.ok(entityArticle))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<EntityArticle> updateArticle(@PathVariable long id, @RequestBody EntityArticle article) {
        return serviceArticle.update(id, article).map(entityArticle -> ResponseEntity.ok(entityArticle))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<DTOArticle> deleteArticle(@PathVariable long id) {
        return serviceArticle.delete(id).map(entityArticle -> ResponseEntity.ok(entityArticle))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<DTOArticle> getAllArticles() {
        return serviceArticle.findAll();
    }

    @GetMapping("user/{id}")
    public List<DTOArticle> getAllArticlesByUser(@PathVariable long id) {
        return serviceArticle.findAllByUserId(id);
    }

}
