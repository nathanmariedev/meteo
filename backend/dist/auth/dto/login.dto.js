"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../../user/classes/user.class");
class LoginDto extends (0, swagger_1.PickType)(user_class_1.User, ['email', 'password']) {
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.dto.js.map