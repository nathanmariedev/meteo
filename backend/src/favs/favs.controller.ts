import {
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../response.interceptor';
import { Favs } from './classes/favs.class';
import { FavsService } from './favs.service';
import { CreateFavsDto } from './dto/create-fav.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from '../auth/decorators/request-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('favs')
@ApiTags('Favs')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @UseGuards(AuthGuard('access'))
  @ApiResponse({ status: 200, description: `User's favourites found` })
  async findByName(@RequestUser() user: JwtPayload) {
    return await this.favsService.findByName(user.sub);
  }

  @Delete('/:insee')
  @UseGuards(AuthGuard('access'))
  @ApiResponse({ status: 200, description: `User's favourite city successfully deleted` })
  async deleteByName(
    @RequestUser() user: JwtPayload,
    @Param('insee') insee: string,
  ): Promise<void> {
    return await this.favsService.deleteByName(user.sub, insee);
  }

  @Post()
  @UseGuards(AuthGuard('access'))
  @ApiResponse({ status: 201, description: `User's favourite city successfully added` })
  async addFav(@RequestUser() user: JwtPayload, @Body() newFav: CreateFavsDto): Promise<Favs> {
    return await this.favsService.addFav(user.sub, newFav);
  }
}
