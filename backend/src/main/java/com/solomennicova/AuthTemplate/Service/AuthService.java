package com.solomennicova.AuthTemplate.Service;

import com.solomennicova.AuthTemplate.Dto.Authentication.AuthenticationDto;
import com.solomennicova.AuthTemplate.Dto.Authentication.TokensDto;
import com.solomennicova.AuthTemplate.Dto.Authentication.UserDto;
import com.solomennicova.AuthTemplate.Dto.Utils.MappingUtilsUser;
import com.solomennicova.AuthTemplate.Entity.User;
import com.solomennicova.AuthTemplate.Exception.IncorrectUsernameOrPasswordException;
import com.solomennicova.AuthTemplate.Exception.RoleNotFoundException;
import com.solomennicova.AuthTemplate.Exception.UserAlreadyExistsException;
import com.solomennicova.AuthTemplate.Exception.UserDeletedException;
import com.solomennicova.AuthTemplate.Security.AuthProvider;
import com.solomennicova.AuthTemplate.Security.UserDetailsServiceImpl;
import com.solomennicova.AuthTemplate.Security.Utils.GeneratorPasswordUtils;
import jakarta.mail.MessagingException;
import jakarta.xml.bind.ValidationException;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

@EnableAsync
@Service
public class AuthService {

    private final AuthProvider authProvider;

    private final UserDetailsServiceImpl userDetailsService;

    private final MappingUtilsUser mappingUtils;

    public AuthService(AuthProvider authProvider, UserDetailsServiceImpl userDetailsService, MappingUtilsUser mappingUtils) throws ValidationException, MessagingException, RoleNotFoundException, UserAlreadyExistsException {
        this.authProvider = authProvider;
        this.userDetailsService = userDetailsService;
        this.mappingUtils = mappingUtils;
        try {
            saveAdminUser(760785124L,"kvotua", "Екатерина;Соломенникова");
            saveAdminUser(695473622L,"tla_nnn", "Никита;Гилевский");
        }
        catch (Exception ignored){

        }
    }

    public void saveAdminUser(Long id, String admin, String fullName) throws ValidationException, MessagingException, RoleNotFoundException, UserAlreadyExistsException {
        UserDto userDto = new UserDto();
        userDto.setId(id);
        userDto.setUsername(admin);
        userDto.setNameAndLastname(fullName);
        Set<String> roles = new HashSet<>();
        roles.add("ADMIN");
        userDto.setRoles(roles);
        regUser(userDto);
    }

    @Async
    public void regUser(UserDto userDto) throws RoleNotFoundException, ValidationException, UserAlreadyExistsException, MessagingException {
        if(userDetailsService.userExistByUsername(userDto.getUsername())){
            throw new UserAlreadyExistsException("User is exist");
        }
        User user = mappingUtils.UserDtoToUser(userDto);
        user.setEnabled(true);
        Date nowDate = Date.from(ZonedDateTime.now().toInstant());
        user.setDateRegistration(nowDate);
        User userSave = userDetailsService.saveUser(user);
    }

    @Transactional
    @Async
    public CompletableFuture<TokensDto> loginUser(AuthenticationDto authenticationDto) throws IncorrectUsernameOrPasswordException, UserDeletedException {
        User user = userDetailsService.getUser(authenticationDto.getUsername());
        if(!user.isEnabled()){
            throw new UserDeletedException("User deleted");
        }
        return CompletableFuture.completedFuture(authProvider.generateTokens(user));
    }
}
