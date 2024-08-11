package com.solomennicova.AuthTemplate.Security;

import com.solomennicova.AuthTemplate.Dto.Authentication.UserDto;
import com.solomennicova.AuthTemplate.Dto.Authentication.UserUpdateDto;
import com.solomennicova.AuthTemplate.Dto.Utils.MappingUtilsUser;
import com.solomennicova.AuthTemplate.Entity.Role;
import com.solomennicova.AuthTemplate.Entity.User;
import com.solomennicova.AuthTemplate.Exception.RoleNotFoundException;
import com.solomennicova.AuthTemplate.Repository.RoleRepository;
import com.solomennicova.AuthTemplate.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;
    private final MappingUtilsUser mappingUtils;

    public UserDetailsServiceImpl(UserRepository userRepository, RoleRepository roleRepository, MappingUtilsUser mappingUtils) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.mappingUtils = mappingUtils;

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        return new UserDetailsImpl(user);
    }

    public User saveUser(User user){
        return userRepository.save(user);
    }

    @Transactional
    public List<UserDto> loadAllUserDto(){

        List<User> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<>();

        for (User user : users){
            UserDto userDto = mappingUtils.UserToUserDto(user);
            if(user.isEnabled()) {
                usersDto.add(userDto);
            }
        }
        return usersDto;
    }

    public List<User> loadAllUser(){

        return userRepository.findAll();
    }

    public boolean userExistByUsername(String username){
        User user = userRepository.findByUsername(username);
        return user != null;
    }

    public boolean userExistById(Long id){
        User user = userRepository.findById(id).orElse(null);
        return user != null;
    }

    public void deleteUser(Long id) throws UsernameNotFoundException {
        User user = userRepository.findById(id).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        user.setEnabled(false);
        userRepository.save(user);
    }

    public void updateUser(UserUpdateDto userUpdateDto) throws RoleNotFoundException {
        User user = userRepository.findById(userUpdateDto.getId()).orElse(null);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        if(userUpdateDto.getUsername() != null && !userUpdateDto.getUsername().isEmpty()) {
            user.setUsername(userUpdateDto.getUsername());
        }
        if(userUpdateDto.getRoles() != null && !userUpdateDto.getRoles().isEmpty()) {
            for (String role : userUpdateDto.getRoles()) {
                Role newRole = roleRepository.findByName(role);
                if (newRole == null) {
                    throw new RoleNotFoundException("Role not found");
                }
                user.addRole(newRole);
            }
        }
        userRepository.save(user);
    }

    public User getUser(String username){
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

    public List<Long> getAllUserRole(String role) throws RoleNotFoundException {
        Role roleUser = roleRepository.findByName(role);
        if (roleUser == null) {
            throw new RoleNotFoundException("Role not found");
        }
        return userRepository.findAllUsersByRole(role).stream().map(User::getId).collect(Collectors.toList());
    }
}
