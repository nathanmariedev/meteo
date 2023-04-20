import { Body, Controller, Get, Post, UseInterceptors, UseGuards } from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from '../auth/decorators/request-user.decorator';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  //GET -- Récupérer un utilisateur grace à 'userName'
  @Get('/')
  @UseGuards(AuthGuard('access'))
  @ApiResponse({ status: 200, description: `User found` })
  @ApiResponse({ status: 404, description: `User not found` })
  async findByName(@RequestUser() user: JwtPayload): Promise<UserWithMainCity> {
    return await this.userService.findOneByName(user.sub);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User succesfully added' })
  async add(@Body() userToAdd: CreateUserDto): Promise<CreateUserDto> {
    return await this.userService.add(userToAdd);
  }
}
