import { Body, Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ResponseInterceptor } from '../response.interceptor';
import { UserWithMainCity } from './dto/user-with-main-city.dto';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  //GET -- Récupérer un utilisateur grace à 'userId'
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserWithMainCity> {
    return await this.userService.findOneById(id);
  }

  @Post()
  async add(@Body() userToAdd: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.add(userToAdd);
  }
}
