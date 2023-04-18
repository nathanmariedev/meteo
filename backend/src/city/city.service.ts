import { Injectable } from '@nestjs/common';
import { City } from './classes/city.class';
import { CityModel } from './models/city.model';

@Injectable()
export class CityService {
  constructor(private readonly cityModel: CityModel) {}

  async findOneById(insee: number): Promise<City> {
    return this.cityModel.findOneById(insee);
  }

  async findByQuery(query: string): Promise<City[]> {
    return this.cityModel.findByQuery(query);
  }
}
