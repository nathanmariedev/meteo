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
import { User } from './classes/user.class';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { ResponseInterceptor } from '../response.interceptor';
import { Metadata } from '../common/classes/metadata.class';
import { UserListResponse } from './dto/user-list-response.dto';
import { UserResponse } from './dto/user-response.dto';
import { IntValidatorPipe } from '../common/pipes/int-validator.pipe';

@Controller('users')
@ApiTags('User')
@UseInterceptors(ResponseInterceptor)
@ApiBadRequestResponse({ description: 'Bad request' })
@ApiUnauthorizedResponse({ description: 'Not authorized' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiOkResponse({ description: 'User list', type: UserListResponse })
  @ApiQuery({ name: 'order', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'offset', required: false })
  @ApiQuery({ name: 'search', required: false })
  async listAction(
    @Req() req: Request,
    @Query(
      'order',
      new DefaultValuePipe('updatedAt'),
      new EnumValidatorPipe(['updatedAt', 'createdAt']),
    )
    order: keyof User,
    @Query('limit', new DefaultValuePipe(20), new IntValidatorPipe({ min: 1, max: 100 }))
    limit: Metadata['limit'],
    @Query('offset', new DefaultValuePipe(0), new IntValidatorPipe({ min: 0, max: 100 }))
    offset: Metadata['offset'],
    @Query('search')
    search?: string,
  ): Promise<User[]> {
    const [count, users] = await Promise.all([
      this.userService.count({}, search),
      this.userService.find({}, order, limit, offset, search),
    ]);

    req['metadata'] = new Metadata(order, limit, offset, count, search);

    return users;
  }

  @Get('/:userId')
  @ApiOkResponse({ description: 'Fetch one user informations', type: UserResponse })
  @ApiNotFoundResponse({ description: 'User not found' })
  async readAction(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ): Promise<User> {
    const user = await this.userService.findOneById(userId);
    if (!user) throw new NotFoundException(`User not found — ${userId} does not exist`);

    return user;
  }

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access'))
  @ApiCreatedResponse({ description: 'User creation successful', type: UserResponse })
  async createAction(@Body() body: CreateUserDto): Promise<User> {
    const check = await this.userService.findOneByEmail(body.email);
    if (check) throw new NotAcceptableException('Email already in use');

    const user = await this.userService.create(body);

    return user;
  }

  @Put('/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access'))
  @ApiOkResponse({ description: 'User edition successful', type: UserResponse })
  async editAction(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Body() body: EditUserDto,
  ): Promise<User> {
    const user = await this.userService.updateOneById(body, userId);

    return user;
  }

  @Delete('/:userId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('access'))
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User deletion successful' })
  async deleteAction(
    @Param('userId', new ParseUUIDPipe({ version: '4' })) userId: string,
  ): Promise<void> {
    await this.userService.deleteOneById(userId);

    return;
  }
}
