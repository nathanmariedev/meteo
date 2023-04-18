import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { City } from '../classes/city.class';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();
const sqlDir = path.join(__dirname, '/sql');
const API_URL = 'https://api.meteo-concept.com/api/';
const API_KEY = '1e3804f9ba78545c499d5dd4af53caf47fce3f32dd8d4096e003542c12f37144';

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

  //Récupérer tous les utilisateurs de la BDD
  async findAll(): Promise<City[]> {
    const file = await fs.readFile(`${sqlDir}/findAll.sql`);
    const req = await this.pg.raw(file.toString());
    return req.rows;
  }

  async findOneById(insee: string): Promise<City> {
    const file = await fs.readFile(`${sqlDir}/findById.sql`);
    const req = await this.pg.raw(file.toString(), [insee]);
    if (req.rows.length == 1) {
      return req.rows[0];
    }
    const response = await axios.get(`${API_URL}location/city`, {
      params: {
        token: API_KEY,
        insee: insee,
      },
    });
    const data = response.data.city;
    const result = new City({ insee: data.insee, cp: data.cp, name: data.name });
    const addCity = await this.pg.raw(
      'INSERT INTO "city" ("insee", "cp", "name") VALUES (?, ?, ?);',
      [result.insee, result.cp, result.name],
    );
    return result;
  }

  async findByQuery(query: string): Promise<City[]> {
    let result: Array<City>;
    const response = await axios.get(`${API_URL}location/cities`, {
      params: {
        token: API_KEY,
        search: query,
      },
    });
    const data = response.data.cities;
    // eslint-disable-next-line prefer-const
    result = data.map(
      (city: { insee: any; cp: any; name: any }) =>
        new City({ insee: city.insee, cp: city.cp, name: city.name }),
    );
    return result;
  }
}
