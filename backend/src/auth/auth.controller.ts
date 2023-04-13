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
    const user = await this.authService.login(body.email, body.password);
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
  @ApiNotAcceptableResponse({ description: 'Email already in use' })
  async registerAction(@Body() body: RegisterDto): Promise<void> {
    await this.authService.register(body);

    return;
  }

  @Post('register/activate')
  @UseGuards(AuthGuard('activation'))
  @ApiQuery({
    name: 'token',
    description: 'Activation token',
  })
  @ApiOkResponse({ description: 'Account activation successful' })
  @ApiUnauthorizedResponse({ description: 'Link is not valid' })
  async confirmRegisterAction(@RequestUser('sub') userId: string): Promise<void> {
    const user = await this.authService.activate(userId);
    if (!user) {
      throw new BadRequestException('Account already active');
    }

    return;
  }

  @Post('reset-password')
  @HttpCode(202)
  @ApiAcceptedResponse({ description: 'You might receive an email' })
  async sendResetPasswordLinkAction(@Body() body: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(body.email);

    return;
  }

  @Post('reset-password/new')
  @UseGuards(AuthGuard('reset'))
  @HttpCode(200)
  @ApiQuery({
    name: 'token',
    description: 'Reset password token',
  })
  @ApiOkResponse({ description: 'Password successfully changed', type: User })
  @ApiUnauthorizedResponse({ description: 'Link is not valid' })
  async setNewPasswordAction(
    @RequestUser() payload: JwtPayload,
    @Body() body: NewPasswordDto,
  ): Promise<User> {
    const user = await this.authService.setNewPassword(payload, body.password);

    return user;
  }
}
