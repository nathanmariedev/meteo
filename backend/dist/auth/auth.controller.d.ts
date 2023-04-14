import { User } from '../user/classes/user.class';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { NewPasswordDto } from './dto/new-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TokenDto } from './dto/token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginAction(body: LoginDto): Promise<TokenDto>;
    registerAction(body: RegisterDto): Promise<void>;
    confirmRegisterAction(userId: string): Promise<void>;
    sendResetPasswordLinkAction(body: ResetPasswordDto): Promise<void>;
    setNewPasswordAction(payload: JwtPayload, body: NewPasswordDto): Promise<User>;
}
