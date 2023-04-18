import { User } from '../classes/user.class';
declare const CreateUserDto_base: import("@nestjs/common").Type<Pick<User, "password" | "userName" | "mainCity">>;
export declare class CreateUserDto extends CreateUserDto_base {
}
export {};
