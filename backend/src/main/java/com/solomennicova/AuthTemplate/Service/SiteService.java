package com.solomennicova.AuthTemplate.Service;

import com.solomennicova.AuthTemplate.Dto.Site.*;
import com.solomennicova.AuthTemplate.Dto.Utils.MappingUtilsBeer;
import com.solomennicova.AuthTemplate.Dto.Utils.MappingUtilsVacancy;
import com.solomennicova.AuthTemplate.Entity.Beer;
import com.solomennicova.AuthTemplate.Entity.Vacancy;
import com.solomennicova.AuthTemplate.Exception.BeerNotFoundException;
import com.solomennicova.AuthTemplate.Exception.DontImageException;
import com.solomennicova.AuthTemplate.Exception.ImageDontLoadException;
import com.solomennicova.AuthTemplate.Exception.VacancyNotFoundException;
import com.solomennicova.AuthTemplate.Repository.BeerRepository;
import com.solomennicova.AuthTemplate.Repository.VacancyRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class SiteService {

    private final BeerRepository beerRepository;

    private final VacancyRepository vacancyRepository;

    private final MappingUtilsBeer mappingUtilsBeer;

    private final StoreService storeService;

    private final MappingUtilsVacancy mappingUtilsVacancy;

    public SiteService(BeerRepository beerRepository, VacancyRepository vacancyRepository, MappingUtilsBeer mappingUtilsBeer, StoreService storeService, MappingUtilsVacancy mappingUtilsVacancy) {
        this.beerRepository = beerRepository;
        this.vacancyRepository = vacancyRepository;
        this.mappingUtilsBeer = mappingUtilsBeer;
        this.storeService = storeService;
        this.mappingUtilsVacancy = mappingUtilsVacancy;
    }

    public List<BeerInfoDto> getAllBeer() throws IOException, DontImageException {

        List<Beer> beers = beerRepository.findAll();
        List<BeerInfoDto> beersDto = new ArrayList<>();

        for (Beer beer : beers) {
            BeerInfoDto beerInfoDto = mappingUtilsBeer.BeerToBeerInfoDto(beer);
            if(beerInfoDto.getFileName() != null) {
                beerInfoDto.setImage(storeService.uploadImage(beerInfoDto.getFileName()));
            }
            beersDto.add(beerInfoDto);
        }
        return beersDto;
    }

    public Long addBeer(BeerDto beerDto) {
        Beer beer = mappingUtilsBeer.BeerDtoToBeer(beerDto);
        return beerRepository.save(beer).getId();
    }

    public void addBeerImage(Long id, MultipartFile file) throws BeerNotFoundException, ImageDontLoadException, DontImageException {
        Beer beer = beerRepository.findById(id).orElse(null);
        if(beer == null){
            throw new BeerNotFoundException("Beer not found");
        }else{
            String path = storeService.loadImage(file, file.getOriginalFilename());
            beer.setImage(path);
            beerRepository.save(beer);
        }
    }

    public void updateBeer(BeerUpdateInfoDto beerInfoDto) throws BeerNotFoundException {
        Beer beer = beerRepository.findById(beerInfoDto.getId()).orElse(null);
        if(beer == null){
            throw new BeerNotFoundException("Beer not found");
        }
        if(beerInfoDto.getName() != null && !beerInfoDto.getName().isEmpty()){
            beer.setName(beerInfoDto.getName());
        }
        if(beerInfoDto.getDescription() != null && !beerInfoDto.getDescription().isEmpty()){
            beer.setDescription(beerInfoDto.getDescription());
        }
        if(beerInfoDto.getColor() != null && !beerInfoDto.getColor().isEmpty()){
            beer.setColor(beerInfoDto.getColor());
        }
        beerRepository.save(beer);
    }

    public static boolean isByteArrayEmpty(byte[] array) {
        return array == null || array.length == 0;
    }

    public void deleteBeer(Long idBeer) throws BeerNotFoundException {
        Beer beer = beerRepository.findById(idBeer).orElse(null);
        if(beer == null){
            throw new BeerNotFoundException("Beer not found");
        }
        storeService.deleteImage(beer.getImage());
        beerRepository.deleteById(idBeer);
    }

    public List<VacancyInfoDto> getAllVacancy() throws IOException, DontImageException {
        List<Vacancy> vacancies = vacancyRepository.findAll();
        List<VacancyInfoDto> vacanciesInfoDto = new ArrayList<>();

        for (Vacancy vacancy : vacancies){
            VacancyInfoDto vacancyInfoDto = mappingUtilsVacancy.VacancyToVacancyInfoDto(vacancy);
            if(vacancyInfoDto.getFileName() != null) {
                vacancyInfoDto.setImage(storeService.uploadImage(vacancyInfoDto.getFileName()));
            }
            vacanciesInfoDto.add(vacancyInfoDto);
        }

        return vacanciesInfoDto;
    }

    public Long addVacancy(VacancyDto vacancyDto){
        Vacancy vacancy = mappingUtilsVacancy.VacancyDtoToVacancy(vacancyDto);
        return vacancyRepository.save(vacancy).getId();
    }

    public void addVacancyImage(Long id, MultipartFile file) throws BeerNotFoundException, ImageDontLoadException, DontImageException, VacancyNotFoundException {
        Vacancy vacancy = vacancyRepository.findById(id).orElse(null);
        if(vacancy == null){
            throw new VacancyNotFoundException("Vacancy not found");
        }else{
            String path = storeService.loadImage(file, file.getOriginalFilename());
            vacancy.setImage(path);
            vacancyRepository.save(vacancy);
        }
    }

    public void updateVacancy(VacancyUpdateInfoDto vacancyInfoDto) throws VacancyNotFoundException {
        Vacancy vacancy = vacancyRepository.findById(vacancyInfoDto.getId()).orElse(null);
        if(vacancy == null){
            throw new VacancyNotFoundException("Vacancy not found");
        }
        if(vacancyInfoDto.getName() != null && !vacancyInfoDto.getName().isEmpty()){
            vacancy.setName(vacancyInfoDto.getName());
        }
        if(vacancyInfoDto.getDescription() != null && !vacancyInfoDto.getDescription().isEmpty()){
            vacancy.setDescription(vacancyInfoDto.getDescription());
        }
        vacancyRepository.save(vacancy);
    }

    public void deleteVacancy(Long idVacancy) throws VacancyNotFoundException {
        Vacancy vacancy = vacancyRepository.findById(idVacancy).orElse(null);
        if(vacancy == null){
            throw new VacancyNotFoundException("Vacancy not found");
        }
        storeService.deleteImage(vacancy.getImage());
        vacancyRepository.deleteById(idVacancy);
    }

    public void updateImageVacancy(Long id, MultipartFile file) throws VacancyNotFoundException, IOException {
        Vacancy vacancy = vacancyRepository.findById(id).orElse(null);
        if(vacancy == null){
            throw new VacancyNotFoundException("Vacancy not found");
        }else{
            String path = storeService.rewriteImage(file.getBytes(), vacancy.getImage(), file.getOriginalFilename());
            vacancy.setImage(path);
            vacancyRepository.save(vacancy);
        }
    }

    public void updateImageBeer(Long id, MultipartFile file) throws BeerNotFoundException, IOException {
        Beer beer = beerRepository.findById(id).orElse(null);
        if(beer == null){
            throw new BeerNotFoundException("Vacancy not found");
        }else{
            String path = storeService.rewriteImage(file.getBytes(), beer.getImage(), file.getOriginalFilename());
            beer.setImage(path);
            beerRepository.save(beer);
        }
    }
}
