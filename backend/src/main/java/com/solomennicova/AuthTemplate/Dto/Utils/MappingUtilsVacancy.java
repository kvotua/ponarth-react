package com.solomennicova.AuthTemplate.Dto.Utils;

import com.solomennicova.AuthTemplate.Dto.Site.VacancyDto;
import com.solomennicova.AuthTemplate.Dto.Site.VacancyInfoDto;
import com.solomennicova.AuthTemplate.Entity.Vacancy;
import org.springframework.stereotype.Service;

@Service
public class MappingUtilsVacancy {

    public VacancyInfoDto VacancyToVacancyInfoDto(Vacancy vacancy){
        VacancyInfoDto vacancyInfoDto = new VacancyInfoDto();

        vacancyInfoDto.setId(vacancy.getId());
        vacancyInfoDto.setName(vacancy.getName());
        vacancyInfoDto.setDescription(vacancy.getDescription());
        vacancyInfoDto.setFileName(vacancy.getImage());

        return vacancyInfoDto;
    }

    public Vacancy VacancyDtoToVacancy(VacancyDto vacancyDto){
        Vacancy vacancy = new Vacancy();
        vacancy.setName(vacancyDto.getName());
        vacancy.setDescription(vacancyDto.getDescription());
        return vacancy;
    }

}
