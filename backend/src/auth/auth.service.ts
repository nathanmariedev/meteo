import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/classes/user.class';
import { UserModel } from 'src/user/models/user.model';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { RegisterDto } from './dto/register.dto';
import { BCryptService } from './../core/crypto/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userModel: UserModel,
    private readonly jwtService: JwtService,
    private readonly cryptoService: BCryptService,
  ) {}

  //Vérifie les infos de connexion
  async login(userName: string, password: string): Promise<false | User> {
    const user = this.userModel.login(userName);
    if (!user) return false;

    const match = await this.cryptoService.compare(password, (await user).password);
    if (!match) return false;

    return user;
  }

  //Si les infos de connexions correctes, génère un token
  async generateJWTToken(user: User, options?: Record<string, unknown>): Promise<string> {
    const payload: JwtPayload = {
      iss: 'api.starterkit',
      sub: user.userName,
      type: 'access',
      ...options,
    };

    const signedToken = await this.jwtService.sign(payload);
    return signedToken;
  }

  async register(data: RegisterDto): Promise<User> {
    try {
      const user = await this.userModel.create({
        userName: data.userName,
        password: await this.cryptoService.hash(data.password),
        mainCity: data.mainCity,
      });

      user.password = null;

      return user;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new NotAcceptableException('Email already in use');
      } else {
        throw error;
      }
    }
  }
}
