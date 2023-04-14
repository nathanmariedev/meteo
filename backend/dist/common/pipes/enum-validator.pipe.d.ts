import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class EnumValidatorPipe implements PipeTransform {
    private readonly values;
    constructor(validator: string[]);
    transform(value: string | string[], metadata: ArgumentMetadata): string | string[];
}
