"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUser = void 0;
const common_1 = require("@nestjs/common");
exports.RequestUser = (0, common_1.createParamDecorator)((key, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    if (!user) {
        throw new common_1.InternalServerErrorException();
    }
    return key ? user[key] : user;
});
//# sourceMappingURL=request-user.decorator.js.map