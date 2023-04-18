import { Injectable } from '@nestjs/common';
import { City } from './classes/city.class';
import { CityModel } from './models/city.model';

@Injectable()
export class CityService {
  constructor(private readonly cityModel: CityModel) {}

  async findAll(): Promise<City[]> {
    return this.cityModel.findAll();
  }

  async findOneById(insee: string): Promise<City> {
    return this.cityModel.findOneById(insee);
  }

  async findByQuery(query: string): Promise<City[]> {
    return this.cityModel.findByQuery(query);
  }
}
