import { Injectable } from '@nestjs/common';
import { Favs } from './classes/favs.class';
import { FavsModel } from './models/favs.model';
import { FindFavs } from './dto/find-favs.dto';

@Injectable()
export class FavsService {
  constructor(private readonly favsModel: FavsModel) {}

  async findById(userId: number): Promise<FindFavs[]> {
    return this.favsModel.findById(userId);
  }

  async deleteById(userId: number, insee: string) {
    this.favsModel.deleteById(userId, insee);
  }

  async addFav(userId: number, insee: string): Promise<Favs> {
    return this.favsModel.addFav(userId, insee);
  }
}
