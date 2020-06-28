package com.discussionforum.user;

import com.discussionforum.user.model.EntityUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryUser extends JpaRepository<EntityUser, Long> {

    EntityUser findByUserName(String userName);

}
