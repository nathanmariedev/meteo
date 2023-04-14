"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPasswordDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../../user/classes/user.class");
class NewPasswordDto extends (0, swagger_1.PickType)(user_class_1.User, ['password']) {
}
exports.NewPasswordDto = NewPasswordDto;
//# sourceMappingURL=new-password.dto.js.map