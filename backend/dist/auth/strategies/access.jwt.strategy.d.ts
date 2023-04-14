import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const AccessJwtStrategy_base: new (...args: any[]) => any;
export declare class AccessJwtStrategy extends AccessJwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
