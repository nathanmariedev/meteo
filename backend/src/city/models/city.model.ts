import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { City } from '../classes/city.class';
import axios from 'axios';

const sqlDir = path.join(__dirname, '/sql');

@Injectable()
export class CityModel extends BasicCrudModel<City> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'city', // Nom de la table
      ['insee', 'cp', 'name'], // Liste des colonnes
      City, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  async findOneById(insee: string): Promise<City> {
    const file = await fs.readFile(`${sqlDir}/findById.sql`);
    const req = await this.pg.raw(file.toString(), [insee]);
    if (req.rows.length === 1) {
      return req.rows[0] as City;
    }
    try {
      const response = await axios.get(`${process.env.API_URL}location/city`, {
        params: {
          token: process.env.API_KEY,
          insee: insee,
        },
      });
      const data = response.data.city;
      console.log('data found', data);
      if (data !== null) {
        const result = new City({ insee: data.insee, cp: data.cp, name: data.name });
        await this.pg.raw('INSERT INTO "city" ("insee", "cp", "name") VALUES (?, ?, ?);', [
          result.insee,
          result.cp,
          result.name,
        ]);
        return result as City;
      }
      return null;
    } catch {
      throw new NotFoundException(`The city you're looking for can't be found`);
    }
  }

  async findByQuery(query: string): Promise<City[]> {
    const response = await axios.get(`${process.env.API_URL}location/cities`, {
      params: {
        token: process.env.API_KEY,
        search: query,
      },
    });
    const result = response.data.cities.map(
      (city: { insee: any; cp: any; name: any }) =>
        new City({ insee: city.insee, cp: city.cp, name: city.name }),
    );
    return result as City[];
  }
}
