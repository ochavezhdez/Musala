package com.discussionforum.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DTOUser {

    private long id;

    private String userName;

    private String token;

}
