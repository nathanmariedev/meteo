import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { MeteoService } from './meteo.service';
import { Meteo } from './classes/meteo.class';

@Controller('meteo')
@ApiTags('Météo')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class MeteoController {
  constructor(private readonly meteoService: MeteoService) {}

  @Get('/hour/:insee')
  @ApiResponse({ status: 200, description: `Meteo found` })
  @ApiResponse({ status: 200, description: `Meteo for these hourts can't be found` })
  async getHours(@Param() insee: string): Promise<Meteo[]> {
    return await this.meteoService.getHours(insee);
  }

  @Get('/day/:insee')
  @ApiResponse({ status: 200, description: `Meteo found` })
  @ApiResponse({ status: 200, description: `Meteo for this date can't be found` })
  async getDays(@Param() insee: string): Promise<Meteo[]> {
    return await this.meteoService.getDays(insee);
  }
}
