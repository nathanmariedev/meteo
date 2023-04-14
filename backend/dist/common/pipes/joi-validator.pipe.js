"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
class JoiValidatorPipe {
    constructor(validator) {
        this.validator = validator;
    }
    transform(val, metadata) {
        const { error, value } = this.validator.validate(val);
        if (error) {
            throw new common_1.BadRequestException(`The ${metadata.data} query parameter is not valid`);
        }
        return value;
    }
}
exports.JoiValidatorPipe = JoiValidatorPipe;
//# sourceMappingURL=joi-validator.pipe.js.map