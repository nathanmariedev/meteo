import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as joi from 'joi';
export declare class JoiValidatorPipe implements PipeTransform {
    private readonly validator;
    constructor(validator: joi.Schema);
    transform(val: string, metadata: ArgumentMetadata): Promise<unknown>;
}
