"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
class EnumValidatorPipe {
    constructor(validator) {
        this.values = Object.values(validator);
    }
    transform(value, metadata) {
        if (value) {
            if (Array.isArray(value) && value.some((item) => !this.values.includes(item))) {
                throw new common_1.BadRequestException(`The ${metadata.data} query parameter must be an array of valid enum values`);
            }
            if (typeof value === 'string' && !this.values.includes(value)) {
                throw new common_1.BadRequestException(`The ${metadata.data} query parameter must be a valid enum value`);
            }
        }
        return value;
    }
}
exports.EnumValidatorPipe = EnumValidatorPipe;
//# sourceMappingURL=enum-validator.pipe.js.map