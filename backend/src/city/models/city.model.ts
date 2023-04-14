import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { classToPlain, plainToClass } from 'class-transformer';
import { City } from '../classes/city.class';
import { validate } from 'class-validator';
import { array } from 'joi';
import axios from 'axios';
import * as dotenv from 'dotenv'

dotenv.config()
const sqlDir = path.join(__dirname, '/sql');
const API_URL='https://api.meteo-concept.com/api/'
const API_KEY='1e3804f9ba78545c499d5dd4af53caf47fce3f32dd8d4096e003542c12f37144'

@Injectable()
export class CityModel extends BasicCrudModel<City> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'city', // Nom de la table
      [
        'insee',
        'cp',
        'name'
      ], // Liste des colonnes
      City, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  //Récupérer tous les utilisateurs de la BDD
  async findAll():Promise<City[]>{
    const file = await fs.readFile(`${sqlDir}/findAll.sql`);
    const req = await this.pg.raw(file.toString());
    return req.rows
  }

  async findOneById(insee:string):Promise<City>{
    const file = await fs.readFile(`${sqlDir}/findById.sql`);
    const req = await this.pg.raw(file.toString(), [insee]);
    return req.rows
  }

  async findByQuery(query:string):Promise<City[]>{
    console.log(API_URL)
    let result:Array<City>
    const response = await axios.get(`${API_URL}location/cities`, {
      params: {
        token: API_KEY,
        search: query,
      },
    });
    const data = response.data.cities;
    console.log(data.length)
    result=data.map(city => new City({insee:city.insee,cp:city.cp,name:city.name}) )
    console.log(result)
    return result
  }

}
