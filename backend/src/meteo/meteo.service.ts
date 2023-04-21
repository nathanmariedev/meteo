import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { MeteoHour } from './classes/meteoHour.class';
import { MeteoDay } from './classes/meteoDay.class';

@Injectable()
export class MeteoService {
  async getHours(insee: string): Promise<MeteoHour[]> {
    const response = await axios.get(`${process.env.API_URL}forecast/nextHours`, {
      params: {
        token: process.env.API_KEY,
        insee: insee,
        hourly: true,
      },
    });
    return plainToClass(MeteoHour, response.data.forecast) as unknown as MeteoHour[];
  }

  async getDays(insee: string): Promise<MeteoDay[]> {
    const response = await axios.get(`${process.env.API_URL}forecast/daily`, {
      params: {
        token: process.env.API_KEY,
        insee: insee,
      },
    });
    return plainToClass(MeteoDay, response.data.forecast) as unknown as MeteoDay[];
  }
}
