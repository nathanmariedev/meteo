import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
  ApiNotAcceptableResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/classes/user.class';
import { AuthService } from './auth.service';
import { RequestUser } from './decorators/request-user.decorator';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TokenDto } from './dto/token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

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
  async registerAction(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body);

    return;
  }
}
