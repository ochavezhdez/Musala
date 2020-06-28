package com.discussionforum.user;

import com.discussionforum.article.DTOArticle;
import com.discussionforum.article.EntityArticle;
import com.discussionforum.article.RepositoryArticle;
import com.discussionforum.user.model.DTOUser;
import com.discussionforum.user.model.EntityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class ServiceUser implements UserDetailsService {

    @Autowired
    private RepositoryUser repositoryUser;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        EntityUser user = repositoryUser.findByUserName(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with user name: " + userName);
        }

        return new User(user.getUserName(), user.getPassWord(), new ArrayList<>());
    }

    public DTOUser getUserByUserName(String userName) throws UsernameNotFoundException {
        EntityUser user = repositoryUser.findByUserName(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with user name: " + userName);
        }

        DTOUser dtoUser = new DTOUser();
        dtoUser.setId(user.getId());
        dtoUser.setUserName(user.getUserName());

        return dtoUser;
    }

    public DTOUser save(EntityUser user) throws Exception {
        EntityUser result = repositoryUser.findByUserName(user.getUserName());
        if (result != null) {
            throw new Exception("User already exist.");
        }

        user.setPassWord(bcryptEncoder.encode(user.getPassWord()));
        result = repositoryUser.save(user);

        DTOUser dtoUser = new DTOUser();
        dtoUser.setId(result.getId());
        dtoUser.setUserName(result.getUserName());

        return dtoUser;
    }

}
