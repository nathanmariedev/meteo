import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UseGuards,
  Param,
  ParseUUIDPipe,
  NotFoundException,
  UseInterceptors,
  Query,
  Req,
  Delete,
  DefaultValuePipe,
  NotAcceptableException,
  HttpException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EnumValidatorPipe } from '../common/pipes/enum-validator.pipe';
import { User } from './classes/user.class';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { ResponseInterceptor } from '../response.interceptor';
import { Metadata } from '../common/classes/metadata.class';
import { UserListResponse } from './dto/user-list-response.dto';
import { UserResponse } from './dto/user-response.dto';
import { IntValidatorPipe } from '../common/pipes/int-validator.pipe';
import { UserModel } from './models/user.model';
import { UserWithMainCity } from './dto/user-with-main-city.dto';

@Controller('user')
@ApiTags('User')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class UserController {

  constructor(private readonly userService: UserService) {}

  //GET -- Récupérer un tuilisateur grace à 'userId'
  @Get('/:id')
  
  async findById(@Param('id') id:string):Promise<UserWithMainCity>{
    const user=await this.userService.findOneById(id)
    console.log("user")
    console.log(user)
    return user
  }

  @Post('/:id')
  @Post('brands/:brandId/template-photo')
  @UseGuards(AuthGuard('access')) // Regarder et demander fonctionnement
  async add(@Body() userToAdd: User):Promise<User>{
    const user= await this.userService.add(userToAdd)
    return user
  }

}
