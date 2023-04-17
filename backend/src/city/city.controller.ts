import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { City } from './classes/city.class';
import { CityService } from './city.service';

@Controller('city')
@ApiTags('City')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class CityController {
  constructor(private readonly cityService: CityService) {}

  //GET -- Récupérer un tuilisateur grace à 'userId'
  @Get('/:insee')
  @ApiNotFoundResponse({ description: 'Not Found' })
  async findById(@Param('insee') insee: string): Promise<City> {
    console.log('City?');
    const city = await this.cityService.findOneById(insee);
    console.log(city);
    return city;
  }

  @Get('/find/:query')
  async findByQuery(@Param('query') query: string): Promise<City[]> {
    console.log('City?');
    const city = await this.cityService.findByQuery(query);
    console.log(city);
    return city;
  }
  //Récupérer tous les utilisateurs
  /*async returnAllUsers(): Promise<User[]> {
    const users= await this.userService.findAll()
    return users;
  }*/
}
