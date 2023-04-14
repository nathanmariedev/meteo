"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_class_1 = require("../classes/user.class");
class EditUserDto extends (0, swagger_1.PickType)(user_class_1.User, ['email', 'isActive']) {
}
exports.EditUserDto = EditUserDto;
//# sourceMappingURL=edit-user.dto.js.map