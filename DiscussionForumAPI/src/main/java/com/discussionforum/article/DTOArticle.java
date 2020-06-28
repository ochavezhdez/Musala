package com.discussionforum.article;

import com.discussionforum.comment.DTOComment;
import com.discussionforum.user.model.DTOUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DTOArticle {

    private long id;

    private DTOUser user;

    private Date date;

    private String title;

    private String body;

    private List<DTOComment> comments;

}
