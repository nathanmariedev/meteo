import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const ActivationJwtStrategy_base: new (...args: any[]) => any;
export declare class ActivationJwtStrategy extends ActivationJwtStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
export {};
