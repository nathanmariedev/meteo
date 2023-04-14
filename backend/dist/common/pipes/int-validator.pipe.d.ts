import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
interface IValues {
    min?: number;
    max?: number;
}
export declare class IntValidatorPipe implements PipeTransform {
    private readonly values;
    constructor(validator: IValues);
    transform(val: string, metadata: ArgumentMetadata): number;
}
export {};
