import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import * as path from 'path';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Favs } from '../classes/favs.class';
import { promises as fs } from 'fs';
import { FindFavs } from '../dto/find-favs.dto';

dotenv.config();
const sqlDir = path.join(__dirname, '/sql');
const API_URL = 'https://api.meteo-concept.com/api/';
const API_KEY = '1e3804f9ba78545c499d5dd4af53caf47fce3f32dd8d4096e003542c12f37144';

@Injectable()
export class FavsModel extends BasicCrudModel<Favs> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'favs', // Nom de la table
      ['insee', 'userId'], // Liste des colonnes
      Favs, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  async findById(userId: number): Promise<FindFavs[]> {
    const file = await fs.readFile(`${sqlDir}/findById.sql`);
    const req = await this.pg.raw(file.toString(), [userId]);
    req.rows.map((res: { insee: string; userId: string }) => {
      new FindFavs(res);
    });
    return req.rows;
  }

  async deleteById(userId: number, insee: string) {
    const file = await fs.readFile(`${sqlDir}/deleteById.sql`);
    const req = await this.pg.raw(file.toString(), [insee, userId]);
  }

  async addFav(userId: number, insee: string): Promise<Favs> {
    const file = await fs.readFile(`${sqlDir}/add.sql`);
    const req = await this.pg.raw(file.toString(), [insee, userId]);
    return new Favs({ insee: insee, userId: userId });
  }
}
