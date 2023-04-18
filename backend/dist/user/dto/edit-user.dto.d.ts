import { User } from '../classes/user.class';
declare const EditUserDto_base: import("@nestjs/common").Type<Pick<User, "password" | "userName">>;
export declare class EditUserDto extends EditUserDto_base {
}
export {};
