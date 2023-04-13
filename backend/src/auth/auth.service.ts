import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as pbkdf2 from 'crypto';
import { BCryptService } from '../core/crypto/bcrypt.service';
import { EmailService } from '../email/email.service';
import { MailType } from '../email/enums/mail-type.enum';
import { User } from '../user/classes/user.class';
import { UserModel } from '../user/models/user.model';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly cryptoService: BCryptService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<false | User> {
    const user = await this.userModel.findOne({
      email,
      isActive: true,
    });
    if (!user) return false;

    const match = await this.cryptoService.compare(password, user.password);
    if (!match) return false;

    await this.userModel.update({ lastLoginAt: new Date() }, { userId: user.userId });
    return user;
  }

  async generateJWTToken(user: User, options?: Record<string, unknown>): Promise<string> {
    const payload: JwtPayload = {
      iss: 'api.starterkit',
      email: user.email,
      sub: user.userId,
      type: 'access',
      ...options,
    };

    const signedToken = await this.jwtService.sign(payload);
    return signedToken;
  }

  async generateActivationLink(user: User): Promise<string> {
    const payload: JwtPayload = {
      iss: 'api.starterkit',
      email: user.email,
      sub: user.userId,
      type: 'activation',
    };

    const options = {
      expiresIn: '6h',
    };

    const signedToken = await this.jwtService.sign(payload, options);

    // This URL must be a frontend URL (i.e. Your front end application, vue, react...)
    const clientBaseUrl = this.configService.get<string>('CLIENT_BASE_URL');
    const url = `${clientBaseUrl}/activate-account?token=${signedToken}`;
    return url;
  }

  async generateResetPasswordLink(user: User): Promise<string> {
    const jwtLoginSecret = this.configService.get<string>('JWT_LOGIN_SECRET');
    const payload: JwtPayload = {
      iss: 'api.starterkit',
      email: user.email,
      sub: user.userId,
      type: 'reset',
      nonce: pbkdf2.pbkdf2Sync(user.password, jwtLoginSecret, 1, 32, 'sha512').toString('hex'),
    };

    const options = {
      expiresIn: '3h',
    };

    const signedToken = await this.jwtService.sign(payload, options);

    // This URL must be a frontend URL (i.e. Your front end application, vue, react...)
    const clientBaseUrl = this.configService.get<string>('CLIENT_BASE_URL');
    const url = `${clientBaseUrl}/auth/password/new?token=${signedToken}`;
    return url;
  }

  async register(data: RegisterDto): Promise<User> {
    try {
      const user = await this.userModel.create({
        email: data.email,
        isActive: false,
        password: await this.cryptoService.hash(data.password),
      });

      user.password = null;

      await this.emailService.sendEmail(MailType.REGISTER, {
        to: user.email,
        context: {
          activationLink: await this.generateActivationLink(user),
        },
      });

      return user;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new NotAcceptableException('Email already in use');
      } else {
        throw error;
      }
    }
  }

  async activate(userId: string): Promise<User> {
    const user = await this.userModel.update({ isActive: true }, { userId, isActive: false });

    return user[0];
  }

  async resetPassword(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) return false;

    await this.emailService.sendEmail(MailType.RESET, {
      to: user.email,
      context: {
        resetPasswordLink: await this.generateResetPasswordLink(user),
      },
    });

    return true;
  }

  async setNewPassword(decodedPayload: JwtPayload, newPassword: string): Promise<User> {
    const user = await this.userModel.findOne({
      email: decodedPayload.email,
      userId: decodedPayload.sub,
      isActive: true,
    });

    const jwtLoginSecret = this.configService.get<string>('JWT_LOGIN_SECRET');
    const currentNonce = pbkdf2
      .pbkdf2Sync(user.password, jwtLoginSecret, 1, 32, 'sha512')
      .toString('hex');

    if (currentNonce !== decodedPayload.nonce) {
      throw new ForbiddenException('Invalid token (nonce)');
    }

    const updatedUser = await this.userModel.update(
      { password: await this.cryptoService.hash(newPassword) },
      {
        userId: user.userId,
      },
    );
    updatedUser[0].password = null;

    return updatedUser[0];
  }
}
