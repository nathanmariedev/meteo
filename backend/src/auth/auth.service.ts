import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/classes/user.class';
import { UserModel } from './../user/models/user.model';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { BCryptService } from './../core/crypto/bcrypt.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { FavsService } from './../favs/favs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userModel: UserModel,
    private readonly favsService: FavsService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: BCryptService,
  ) {}

  //Vérifie les infos de connexion
  async login(userName: string, password: string): Promise<false | User> {
    const user = await this.userModel.login(userName);
    if (!user) return false;

    const match = await this.cryptoService.compare(password, user.password);
    if (!match) return false;

    console.log(`${user.userName} just connected!`);
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

  async register(data: CreateUserDto): Promise<User> {
    try {
      data.password = await this.cryptoService.hash(data.password);
      const user = await this.userModel.addOne(data);

      user.password = null;

      await this.favsService.addFav(data.userName, { insee: data.mainCity });

      return user;
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        throw new NotAcceptableException(`Username ${data.userName} already in use`);
      } else {
        throw error;
      }
    }
  }
}
