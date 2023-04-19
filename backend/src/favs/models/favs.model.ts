import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import * as path from 'path';
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

  async findByName(userName: string): Promise<FindFavs[]> {
    const file = await fs.readFile(`${sqlDir}/findByName.sql`);
    const req = await this.pg.raw(file.toString(), [userName]);
    req.rows.map((res: { insee: string; userName: string }) => {
      new FindFavs(res);
    });
    return req.rows;
  }

  async deleteByName(userName: string, insee: string) {
    const file = await fs.readFile(`${sqlDir}/deleteByName.sql`);
    await this.pg.raw(file.toString(), [insee, userName]);
  }

  async addFav(userName: string, insee: string): Promise<Favs> {
    const file = await fs.readFile(`${sqlDir}/add.sql`);
    await this.pg.raw(file.toString(), [insee, userName]);
    return new Favs({ insee: insee, userName: userName });
  }
}
