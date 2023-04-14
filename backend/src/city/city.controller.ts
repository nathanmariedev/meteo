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
import { ResponseInterceptor } from '../response.interceptor';
import { Metadata } from '../common/classes/metadata.class';
import { IntValidatorPipe } from '../common/pipes/int-validator.pipe';
import { City } from './classes/city.class';
import { CityService } from './city.service';

@Controller('city')
@ApiTags('City')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class CityController {

  constructor(private readonly cityService: CityService) {}

  //GET -- Récupérer un tuilisateur grace à 'userId'
  @Get('/:insee')
  @ApiNotFoundResponse({description : "Not Found"})
  async findById(@Param('insee') insee:string):Promise<City>{
    console.log("City?")
    const city=await this.cityService.findOneById(insee)
    console.log(city)
    return city
  }

  @Get('/find/:query')
  async findByQuery(@Param('query') query:string):Promise<City[]>{
    console.log("City?")
    const city=await this.cityService.findByQuery(query)
    console.log(city)
    return city
  }
  //Récupérer tous les utilisateurs
  /*async returnAllUsers(): Promise<User[]> {
    const users= await this.userService.findAll()
    return users;
  }*/

}
