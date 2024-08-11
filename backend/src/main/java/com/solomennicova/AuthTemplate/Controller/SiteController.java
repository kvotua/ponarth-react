package com.solomennicova.AuthTemplate.Controller;

import com.solomennicova.AuthTemplate.Dto.Exception.ErrorDto;
import com.solomennicova.AuthTemplate.Dto.Site.BeerInfoDto;
import com.solomennicova.AuthTemplate.Dto.Site.VacancyInfoDto;
import com.solomennicova.AuthTemplate.Exception.DontImageException;
import com.solomennicova.AuthTemplate.Exception.RoleNotFoundException;
import com.solomennicova.AuthTemplate.Security.UserDetailsServiceImpl;
import com.solomennicova.AuthTemplate.Service.SiteService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/site")
public class SiteController {

    private final SiteService siteService;

    private final UserDetailsServiceImpl userDetailsService;

    public SiteController(SiteService siteService, UserDetailsServiceImpl userDetailsService) {
        this.siteService = siteService;
        this.userDetailsService = userDetailsService;
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/beer/all")
    public ResponseEntity<List<BeerInfoDto>> getAllBeer() throws IOException, DontImageException {
        return ResponseEntity.ok(siteService.getAllBeer());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/vacancy/all")
    public ResponseEntity<List<VacancyInfoDto>> getAllVacancy() throws IOException, DontImageException {
        return ResponseEntity.ok(siteService.getAllVacancy());
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/users/excursions")
    public ResponseEntity<List<Long>> getPushFormOfExcursions() throws RoleNotFoundException {
        return ResponseEntity.ok(userDetailsService.getAllUserRole("formOfExcursions"));
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/users/partner")
    public ResponseEntity<List<Long>> getPushFormPartner() throws RoleNotFoundException {
        return ResponseEntity.ok(userDetailsService.getAllUserRole("formPartner"));
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/users/shareholder")
    public ResponseEntity<List<Long>> getPushFormShareholder() throws RoleNotFoundException {
        return ResponseEntity.ok(userDetailsService.getAllUserRole("formShareholder"));
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @GetMapping("/users/formVacancy")
    public ResponseEntity<List<Long>> getPushFormVacancy() throws RoleNotFoundException {
        return ResponseEntity.ok(userDetailsService.getAllUserRole("formVacancy"));
    }

}
