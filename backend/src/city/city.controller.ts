import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
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
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'The record has been successfully created.' })
  async findById(@Param('insee') insee: string): Promise<City> {
    console.log(process.env.API_URL);
    console.log(process.env.API_KEY);
    const city = await this.cityService.findOneById(insee);
    return city;
  }

  @Get('/find/:query')
  async findByQuery(@Param('query') query: string): Promise<City[]> {
    const city = await this.cityService.findByQuery(query);
    return city;
  }
}
