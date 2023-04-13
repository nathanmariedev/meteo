import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from '../../database/database.constants';
import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { User } from '../classes/user.class';
import { Knex } from 'knex';

@Injectable()
export class UserModel extends BasicCrudModel<User> {
  constructor(@Inject(PG_CONNECTION) protected readonly pg: Knex) {
    super(
      pg, // Knex provider instance
      'user', // Nom de la table
      [
        'userId',
        'email',
        'password',
        'isActive',
        'lastLoginAt',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ], // Liste des colonnes
      User, // Type de classe utilisé pour la transformation via 'plainToClass' dans basicCrudModel
    );
  }

  // 👋
  // async uneFonctionPlusSpecifique(userId: string): Promise<void> {
  //   // Il est possible d'appeller les fonctions de BasicCrudModel via "super"
  //   await super.findOne({ userId });

  //   return;
  // }
}
