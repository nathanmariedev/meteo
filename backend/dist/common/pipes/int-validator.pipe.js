"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
const joi = require("joi");
class IntValidatorPipe {
    constructor(validator) {
        this.values = validator;
    }
    transform(val, metadata) {
        const parsedValue = parseInt(val, 10);
        let schema = joi.number().integer().required();
        if (this.values.min)
            schema = schema.min(this.values.min);
        if (this.values.max)
            schema = schema.max(this.values.max);
        const { error, value } = schema.validate(parsedValue);
        if (error) {
            throw new common_1.BadRequestException(`The ${metadata.data} query parameter is not valid`);
        }
        return value;
    }
}
exports.IntValidatorPipe = IntValidatorPipe;
//# sourceMappingURL=int-validator.pipe.js.map