"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../classes/user.class");
class CreateUserDto extends (0, swagger_1.PickType)(user_class_1.User, ['userName', 'password', 'mainCity']) {
}
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map