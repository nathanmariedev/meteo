import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { User } from '../classes/user.class';
import { Knex } from 'knex';
import { promises as fs } from 'fs';
import * as path from 'path';
import { UserWithMainCity } from '../dto/user-with-main-city.dto';
import { City } from './../../city/classes/city.class';
import { CreateUserDto } from '../dto/create-user.dto';

const sqlDir = path.join(__dirname, '/sql');

@Injectable()
export class UserModel extends BasicCrudModel<User> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'user', // Nom de la table
      ['userName', 'password', 'mainCity'], // Liste des colonnes
      User, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  //Récupérer un utilisateur grâce à 'userId'
  async findOneByName(userName: string): Promise<UserWithMainCity> {
    const file = await fs.readFile(`${sqlDir}/findByName.sql`);
    const req = await this.pg.raw(file.toString(), [userName]);
    if (req.rowCount === 0) {
      throw new NotFoundException(`User ${userName} doesn't exists`);
    }
    const data = req.rows[0];
    const mainCity = new City({
      insee: data.insee,
      cp: data.cp,
      name: data.name,
    });
    const user = new UserWithMainCity({
      userName: data.userName,
      password: data.password,
      mainCity: mainCity,
    });
    return user as UserWithMainCity;
  }

  async addOne(user: CreateUserDto): Promise<CreateUserDto> {
    await this.pg.raw(
      'INSERT INTO "user" ("userName", "password", "mainCity") VALUES (?, ?, ?);',
      user.userName,
      user.password,
      user.mainCity,
    );
    return user as CreateUserDto;
  }
}
