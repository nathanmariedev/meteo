import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Favs } from '../classes/favs.class';
import { promises as fs } from 'fs';
import { FindFavs } from '../dto/find-favs.dto';
import { plainToClass } from 'class-transformer';

dotenv.config();
const sqlDir = path.join(__dirname, '/sql');

@Injectable()
export class FavsModel extends BasicCrudModel<Favs> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'favs', // Nom de la table
      ['insee', 'userName'], // Liste des colonnes
      Favs, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  async findByName(userName: string): Promise<FindFavs[]> {
    const file = await fs.readFile(`${sqlDir}/findByName.sql`);
    const req = await this.pg.raw(file.toString(), [userName]);
    return plainToClass(FindFavs, req.rows) as unknown as FindFavs[];
  }

  async deleteByName(userName: string, insee: string) {
    const file = await fs.readFile(`${sqlDir}/deleteByName.sql`);
    await this.pg.raw(file.toString(), [insee, userName]);
  }

  async addFav(userName: string, insee: string): Promise<Favs> {
    try {
      const file = await fs.readFile(`${sqlDir}/add.sql`);
      const req = await this.pg.raw(file.toString(), [insee, userName]);
      return plainToClass(Favs, req.rows[0]) as Favs;
    } catch {
      throw new BadRequestException('Already in favorites!');
    }
  }
}
