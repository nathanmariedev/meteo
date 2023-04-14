import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';
import { City } from '../classes/city.class';

const sqlDir = path.join(__dirname, '/sql');

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

}
