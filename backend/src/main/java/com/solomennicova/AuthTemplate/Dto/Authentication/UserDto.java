package com.solomennicova.AuthTemplate.Dto.Authentication;

import com.solomennicova.AuthTemplate.Entity.Role;
import com.solomennicova.AuthTemplate.Entity.User;
import com.solomennicova.AuthTemplate.Repository.RoleRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Data
public class UserDto {

    @NotNull
    private Long id;

    @NotEmpty(message = "Имя не должно быть пустым")
    @Size(min = 2, max = 15, message = "Имя должно быть от 2 до 25 символов длиной")
    private String username;

    @NotEmpty(message = "Роль должна присутствовать")
    private Set<String> roles = new HashSet<>();

}
