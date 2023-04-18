import { Body, Controller, Get, Post, Param, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
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
  @ApiResponse({ status: 200, description: `User found` })
  @ApiResponse({ status: 404, description: `User not found` })
  async findById(@Param('id') id: number): Promise<UserWithMainCity> {
    return await this.userService.findOneById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User succesfully added' })
  async add(@Body() userToAdd: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.add(userToAdd);
  }
}
