import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const ResetJwtStrategy_base: new (...args: any[]) => any;
export declare class ResetJwtStrategy extends ResetJwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
