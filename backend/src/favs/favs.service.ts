import { Injectable } from '@nestjs/common';
import { Favs } from './classes/favs.class';
import { FavsModel } from './models/favs.model';
import { FindFavs } from './dto/find-favs.dto';
import { CreateFavsDto } from './dto/create-fav.dto';
import { User } from '../user/classes/user.class';

@Injectable()
export class FavsService {
  constructor(private readonly favsModel: FavsModel) {}

  async findByName(userName: string): Promise<FindFavs[]> {
    return this.favsModel.findByName(userName);
  }

  async deleteByName(userName: string, insee: string) {
    this.favsModel.deleteByName(userName, insee);
  }

  async addFav(userName: string, newFav: CreateFavsDto): Promise<Favs> {
    return this.favsModel.addFav(userName, newFav.insee);
  }

  async changeFav(userName: string, newFav: CreateFavsDto): Promise<User> {
    return this.favsModel.changeFav(userName, newFav.insee);
  }
}
