import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BCryptService } from '../core/crypto/bcrypt.service';
import { EmailService } from '../email/email.service';
import { User } from '../user/classes/user.class';
import { UserModel } from '../user/models/user.model';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly emailService;
    private readonly cryptoService;
    private readonly configService;
    constructor(userModel: UserModel, jwtService: JwtService, emailService: EmailService, cryptoService: BCryptService, configService: ConfigService);
    login(email: string, password: string): Promise<false | User>;
    generateJWTToken(user: User, options?: Record<string, unknown>): Promise<string>;
    generateActivationLink(user: User): Promise<string>;
    generateResetPasswordLink(user: User): Promise<string>;
    register(data: RegisterDto): Promise<User>;
    activate(userId: string): Promise<User>;
    resetPassword(email: string): Promise<boolean>;
    setNewPassword(decodedPayload: JwtPayload, newPassword: string): Promise<User>;
}
