import { Controller, Delete, Get, Post, Param, UseInterceptors, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { Favs } from './classes/favs.class';
import { FavsService } from './favs.service';
import { FindFavs } from './dto/find-favs.dto';

@Controller('favs')
@ApiTags('Favs')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class FavsController {
  constructor(private readonly cityService: FavsService) {}

  @Get('/:userId')
  async findById(@Param('userId') userId: number): Promise<FindFavs[]> {
    const favs = await this.cityService.findById(userId);
    console.log(favs);
    return favs;
  }

  @Delete('/:userId/:insee')
  async deleteById(@Param('userId') userId: number, @Param('insee') insee: string) {
    const favs = await this.cityService.deleteById(userId, insee);
    console.log(favs);
    favs;
  }

  @Post()
  async addFav(@Body() newFav: { insee: string; userId: number }): Promise<Favs> {
    const insee = newFav.insee;
    const userId = newFav.userId;
    const favs = await this.cityService.addFav(userId, insee);
    return favs;
  }
}
