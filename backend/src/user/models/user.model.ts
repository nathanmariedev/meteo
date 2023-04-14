import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { User } from '../classes/user.class';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { plainToClass } from 'class-transformer';

const sqlDir = path.join(__dirname, '/sql');

@Injectable()
export class UserModel extends BasicCrudModel<User> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'user', // Nom de la table
      [
        'userId',
        'username',
        'password',
        'mainCity'
      ], // Liste des colonnes
      User, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  //Récupérer tous les utilisateurs de la BDD
  async findAll():Promise<User[]>{
    const file = await fs.readFile(`${sqlDir}/findAll.sql`);
    const req = await this.pg.raw(file.toString());
    return req.rows
  }

  //Récupérer un utilisateur grâce à 'userId'
  async findOneById(userId:string):Promise<User>{
    const file = await fs.readFile(`${sqlDir}/findById.sql`);
    const req = await this.pg.raw(file.toString(), [userId]);
    return req.rows.length > 0 ? plainToClass(User, req.rows[0]) : null;
  } 
  //DEMANDER SI IL EST POSSIBLE D'UTILISER findOne() du BasciCrudModel

}