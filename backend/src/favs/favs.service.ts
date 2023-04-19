import { Injectable } from '@nestjs/common';
import { Favs } from './classes/favs.class';
import { FavsModel } from './models/favs.model';
import { FindFavs } from './dto/find-favs.dto';

@Injectable()
export class FavsService {
  constructor(private readonly favsModel: FavsModel) {}

  async findByName(userName: string): Promise<FindFavs[]> {
    return this.favsModel.findByName(userName);
  }

  async deleteByName(userName: string, insee: string) {
    this.favsModel.deleteByName(userName, insee);
  }

  async addFav(userName: string, insee: string): Promise<Favs> {
    return this.favsModel.addFav(userName, insee);
  }
}
