import { Controller, Delete, Get, Post, Param, UseInterceptors, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';
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
  constructor(private readonly favsService: FavsService) {}

  @Get('/:userId')
  async findByName(@Param('userId') userName: string): Promise<FindFavs[]> {
    const favs = await this.favsService.findByName(userName);
    console.log(favs);
    return favs;
  }

  @Delete('/:userId/:insee')
  async deleteByName(@Param('userId') userName: string, @Param('insee') insee: string) {
    const favs = await this.favsService.deleteByName(userName, insee);
    console.log(favs);
    favs;
  }

  @Post()
  async addFav(@Body() newFav: { insee: string; userName: string }): Promise<Favs> {
    const insee = newFav.insee;
    const userName = newFav.userName;
    const favs = await this.favsService.addFav(userName, insee);
    return favs;
  }
}
