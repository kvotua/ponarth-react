package com.solomennicova.AuthTemplate.Controller;

import com.solomennicova.AuthTemplate.Dto.Authentication.UserDto;
import com.solomennicova.AuthTemplate.Dto.Authentication.UserUpdateDto;
import com.solomennicova.AuthTemplate.Dto.Exception.ErrorDto;
import com.solomennicova.AuthTemplate.Dto.Utils.MappingUtilsUser;
import com.solomennicova.AuthTemplate.Exception.RoleNotFoundException;
import com.solomennicova.AuthTemplate.Security.UserDetailsServiceImpl;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    private final UserDetailsServiceImpl userDetailsService;

    private final MappingUtilsUser mappingUtils;

    public UserController(UserDetailsServiceImpl userDetailsService, MappingUtilsUser mappingUtils) {
        this.userDetailsService = userDetailsService;
        this.mappingUtils = mappingUtils;
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getUsersInfo() {
        return ResponseEntity.ok(userDetailsService.loadAllUserDto());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable Long id) throws RoleNotFoundException {
        userDetailsService.deleteUser(id);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/update")
    public void updateUser(@RequestBody @Validated UserUpdateDto userDto) throws RoleNotFoundException {
        userDetailsService.updateUser(userDto);
    }
}
