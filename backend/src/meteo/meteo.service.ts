import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { MeteoHour } from './classes/meteoHour.class';
import { MeteoDay } from './classes/meteoDay.class';

@Injectable()
export class MeteoService {
  async getHours(insee: number): Promise<MeteoHour[]> {
    if (insee < 9999 || insee > 100000) {
      throw new BadRequestException('Wrong insee code format');
    }
    try {
      const response = await axios.get(`${process.env.API_URL}forecast/nextHours`, {
        params: {
          token: process.env.API_KEY,
          insee: insee,
          hourly: true,
        },
      });
      return plainToClass(MeteoHour, response.data.forecast) as unknown as MeteoHour[];
    } catch {
      throw new NotFoundException('Insee code not found');
    }
  }

  async getDays(insee: number): Promise<MeteoDay[]> {
    if (insee < 9999 || insee > 100000) {
      throw new BadRequestException('Wrong insee code format');
    }
    try {
      const response = await axios.get(`${process.env.API_URL}forecast/daily`, {
        params: {
          token: process.env.API_KEY,
          insee: insee,
        },
      });
      return plainToClass(MeteoDay, response.data.forecast) as unknown as MeteoDay[];
    } catch {
      throw new NotFoundException('Insee code not found');
    }
  }
}
