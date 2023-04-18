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

  @Get('/:insee')
  @ApiResponse({ status: 200, description: 'City succesfully found' })
  @ApiResponse({ status: 404, description: 'City not found' })
  async findById(@Param('insee') insee: number): Promise<City> {
    const city = await this.cityService.findOneById(insee);
    return city;
  }

  @Get('/find/:query')
  @ApiResponse({ status: 200, description: 'request succesfully sent' })
  async findByQuery(@Param('query') query: string): Promise<City[]> {
    const city = await this.cityService.findByQuery(query);
    return city;
  }
}
