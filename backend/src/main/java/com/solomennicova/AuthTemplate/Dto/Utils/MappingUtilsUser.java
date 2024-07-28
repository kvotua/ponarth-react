package com.solomennicova.AuthTemplate.Dto.Utils;

import com.solomennicova.AuthTemplate.Dto.Authentication.UserDto;
import com.solomennicova.AuthTemplate.Dto.Authentication.UserUpdateDto;
import com.solomennicova.AuthTemplate.Entity.Role;
import com.solomennicova.AuthTemplate.Entity.User;
import com.solomennicova.AuthTemplate.Exception.RoleNotFoundException;
import com.solomennicova.AuthTemplate.Repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class MappingUtilsUser {

    private final RoleRepository roleRepository;

    public MappingUtilsUser(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public User UserDtoToUser(UserDto userDto) throws RoleNotFoundException {

        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());

        for (String role : userDto.getRoles()) {
            Role newRole = roleRepository.findByName(role);
            if (newRole == null) {
                throw new RoleNotFoundException("Role not found");
            }
            user.addRole(newRole);
        }
        return user;
    }

    public UserDto UserToUserDto(User user){
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        Set<String> rolesDto = new HashSet<>();

        for(Role role : user.getRoles()){
            rolesDto.add(role.getName());
        }
        userDto.setRoles(rolesDto);
        return userDto;
    }

    public User UserUpdateDtoToUser(UserUpdateDto userDto) throws RoleNotFoundException {

        User user = new User();
        user.setId(userDto.getId());
        user.setUsername(userDto.getUsername());

        for (String role : userDto.getRoles()) {
            Role newRole = roleRepository.findByName(role);
            if (newRole == null) {
                throw new RoleNotFoundException("Role not found");
            }
            user.addRole(newRole);
        }
        return user;
    }

    public UserUpdateDto UserToUserUpdateDto(User user){
        UserUpdateDto userDto = new UserUpdateDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());

        Set<String> rolesDto = new HashSet<>();

        for(Role role : user.getRoles()){
            rolesDto.add(role.getName());
        }
        userDto.setRoles(rolesDto);
        return userDto;
    }

}
