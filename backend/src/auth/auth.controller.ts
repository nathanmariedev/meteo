import { Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBadRequestResponse({ description: 'Bad request' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Successful login', type: TokenDto })
  @ApiUnauthorizedResponse({
    description: 'Wrong username/password combination',
  })
  async loginAction(@Body() body: LoginDto): Promise<TokenDto> {
    const user = await this.authService.login(body.userName, body.password);

    if (!user) {
      throw new UnauthorizedException('Wrong username/password combination');
    }

    const token = await this.authService.generateJWTToken(user);
    return {
      token,
    };
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'Successful register' })
  @ApiNotAcceptableResponse({ description: 'UserName already in use' })
  async registerAction(@Body() body: CreateUserDto): Promise<void> {
    console.log(body);
    await this.authService.register(body);

    return;
  }
}
