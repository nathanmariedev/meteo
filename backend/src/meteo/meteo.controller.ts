import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { MeteoService } from './meteo.service';
import { MeteoHour } from './classes/meteoHour.class';
import { MeteoDay } from './classes/meteoDay.class';

@Controller('meteo')
@ApiTags('Météo')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class MeteoController {
  constructor(private readonly meteoService: MeteoService) {}

  @Get('/hour/:insee')
  @ApiResponse({ status: 200, description: `Meteo for hours found` })
  async getHours(@Param('insee') insee: number): Promise<MeteoHour[]> {
    return await this.meteoService.getHours(insee);
  }

  @Get('/day/:insee')
  @ApiResponse({ status: 200, description: `Meteo for days found` })
  async getDays(@Param('insee') insee: number): Promise<MeteoDay[]> {
    return await this.meteoService.getDays(insee);
  }
}
