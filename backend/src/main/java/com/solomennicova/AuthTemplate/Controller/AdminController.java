package com.solomennicova.AuthTemplate.Controller;

import com.solomennicova.AuthTemplate.Dto.Exception.ErrorDto;
import com.solomennicova.AuthTemplate.Dto.Site.*;
import com.solomennicova.AuthTemplate.Exception.BeerNotFoundException;
import com.solomennicova.AuthTemplate.Exception.DontImageException;
import com.solomennicova.AuthTemplate.Exception.ImageDontLoadException;
import com.solomennicova.AuthTemplate.Exception.VacancyNotFoundException;
import com.solomennicova.AuthTemplate.Service.SiteService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/admin")
public class AdminController {

    private final SiteService siteService;

    public AdminController(SiteService siteService) {
        this.siteService = siteService;
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping(path ="/beer/add")
    public ResponseEntity<Long> addBeer(@RequestBody @Validated BeerDto beerDto)  {
        return ResponseEntity.ok(siteService.addBeer(beerDto));
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping(path ="/beer/image/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public void loadImageBeer(@PathVariable Long id , @RequestPart("file") final MultipartFile file) throws BeerNotFoundException, ImageDontLoadException, DontImageException {
        siteService.addBeerImage(id, file);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/beer/update")
    public void updateBeer(@RequestBody BeerUpdateInfoDto beerUpdate) throws BeerNotFoundException {
        siteService.updateBeer(beerUpdate);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(path="/beer/image/update/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public void updateImageBeer(@PathVariable Long id , @RequestPart("file") final MultipartFile file) throws BeerNotFoundException, IOException {
        siteService.updateImageBeer(id, file);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/beer/delete/{id}")
    public void deleteBeer(@PathVariable Long id) throws BeerNotFoundException {
        siteService.deleteBeer(id);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping("/vacancy/add")
    public ResponseEntity<Long> loadVacancy(@RequestBody @Validated VacancyDto vacancyDto) {
        return ResponseEntity.ok(siteService.addVacancy(vacancyDto));
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping(path ="/vacancy/image/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public void loadImageVacancy(@PathVariable Long id , @RequestPart("file") final MultipartFile file) throws ImageDontLoadException, DontImageException, BeerNotFoundException, VacancyNotFoundException {
        siteService.addVacancyImage(id, file);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping("/vacancy/update")
    public void updateVacancy(@RequestBody VacancyUpdateInfoDto vacancyInfoDto) throws VacancyNotFoundException {
        siteService.updateVacancy(vacancyInfoDto);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping(path="/vacancy/image/update/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public void updateImageVacancy(@PathVariable Long id , @RequestPart("file") final MultipartFile file) throws VacancyNotFoundException, IOException {
        siteService.updateImageVacancy(id, file);
    }

    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successful operation"),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = {
                    @Content(schema = @Schema(implementation = ErrorDto.class))
            })
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/vacancy/delete/{id}")
    public void deleteVacancy(@PathVariable Long id) throws VacancyNotFoundException {
        siteService.deleteVacancy(id);
    }
}
