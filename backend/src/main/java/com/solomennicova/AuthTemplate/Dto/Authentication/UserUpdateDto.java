package com.solomennicova.AuthTemplate.Dto.Authentication;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserUpdateDto {

    @NotNull
    private Long id;

    private String username;

    private String nameAndLastname;

    private Set<String> roles = new HashSet<>();

}
