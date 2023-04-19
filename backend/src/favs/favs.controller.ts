import { Controller, Delete, Get, Post, Param, UseInterceptors, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { Favs } from './classes/favs.class';
import { FavsService } from './favs.service';
import { FindFavs } from './dto/find-favs.dto';
import { CreateFavsDto } from './dto/create-fav.dto';

@Controller('favs')
@ApiTags('Favs')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get('/:userId')
  @ApiResponse({ status: 200, description: `User's favourites found` })
  async findByName(@Param('userId') userName: string): Promise<FindFavs[]> {
    const favs = await this.favsService.findByName(userName);
    return favs;
  }

  @Delete('/:userId/:insee')
  @ApiResponse({ status: 200, description: `User's favourite city successfully deleted` })
  async deleteByName(@Param('userId') userName: string, @Param('insee') insee: string) {
    const favs = await this.favsService.deleteByName(userName, insee);
    favs;
  }

  @Post()
  @ApiResponse({ status: 201, description: `User's favourite city successfully added` })
  async addFav(@Body() userName: string, newFav: CreateFavsDto): Promise<Favs> {
    const favs = await this.favsService.addFav(userName, newFav);
    return favs;
  }
}
