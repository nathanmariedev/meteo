import { Injectable } from '@nestjs/common';
import { Meteo } from './classes/meteo.class';
import axios from 'axios';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MeteoService {
  async getHours(insee: string): Promise<Meteo[]> {
    const response = await axios.get(`${process.env.API_URL}forecast/nextHours`, {
      params: {
        token: process.env.API_KEY,
        insee: insee,
        hourly: true,
      },
    });
    return plainToClass(Meteo, response.data.forecast) as unknown as Meteo[];
  }

  async getDays(insee: string): Promise<Meteo[]> {
    const response = await axios.get(`${process.env.API_URL}forecast/daily`, {
      params: {
        token: process.env.API_KEY,
        insee: insee,
      },
    });
    return plainToClass(Meteo, response.data.forecast) as unknown as Meteo[];
  }
}
