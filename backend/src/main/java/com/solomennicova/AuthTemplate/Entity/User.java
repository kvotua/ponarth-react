package com.solomennicova.AuthTemplate.Entity;


import com.solomennicova.AuthTemplate.Dto.Authentication.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.util.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.Serializable;
import java.util.*;

@Entity(name="users")
@Data
@NoArgsConstructor(access=AccessLevel.PUBLIC, force=true)
@AllArgsConstructor
public class User implements Serializable {

    @Id
    private Long id;

    @Column(nullable = false ,unique = true)
    private String username;

    private String nameAndLastname;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name ="user_id", unique = false),
            inverseJoinColumns = @JoinColumn(name ="role_id", unique = false))
    private Set<Role> roles = new HashSet<>();

    private Date dateRegistration;

    private boolean enabled;

    public void addRole(Role role){
        roles.add(role);
    }

}
