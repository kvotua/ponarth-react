package com.solomennicova.AuthTemplate.Dto.Utils;

import com.solomennicova.AuthTemplate.Dto.Site.BeerDto;
import com.solomennicova.AuthTemplate.Dto.Site.BeerInfoDto;
import com.solomennicova.AuthTemplate.Entity.Beer;
import com.solomennicova.AuthTemplate.Repository.BeerRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class MappingUtilsBeer {

    public BeerInfoDto BeerToBeerInfoDto(Beer beer){
        BeerInfoDto beerInfoDto =new BeerInfoDto();

        beerInfoDto.setId(beer.getId());
        beerInfoDto.setName(beer.getName());
        beerInfoDto.setDescription(beer.getDescription());
        beerInfoDto.setColor(beer.getColor());
        beerInfoDto.setFileName(beer.getImage());

        return beerInfoDto;
    }

    public Beer BeerDtoToBeer(BeerDto beerDto){
        Beer beer = new Beer();

        beer.setName(beerDto.getName());
        beer.setColor(beerDto.getColor());
        beer.setDescription(beerDto.getDescription());

        return beer;
    }
}
