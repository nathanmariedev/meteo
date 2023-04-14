"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../../user/classes/user.class");
class ResetPasswordDto extends (0, swagger_1.PickType)(user_class_1.User, ['email']) {
}
exports.ResetPasswordDto = ResetPasswordDto;
//# sourceMappingURL=reset-password.dto.js.map