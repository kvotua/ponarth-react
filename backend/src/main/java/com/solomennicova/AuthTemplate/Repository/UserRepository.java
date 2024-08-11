package com.solomennicova.AuthTemplate.Repository;

import com.solomennicova.AuthTemplate.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("SELECT u FROM users u JOIN u.roles r WHERE r.name = :roleName")
    List<User> findAllUsersByRole(@Param("roleName") String roleName);
}
