import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as joi from 'joi';

interface IValues {
  min?: number;
  max?: number;
}

export class IntValidatorPipe implements PipeTransform {
  private readonly values: IValues;

  constructor(validator: IValues) {
    this.values = validator;
  }

  transform(val: string, metadata: ArgumentMetadata): number {
    const parsedValue = parseInt(val, 10);

    let schema = joi.number().integer().required();
    if (this.values.min) schema = schema.min(this.values.min);
    if (this.values.max) schema = schema.max(this.values.max);

    const { error, value } = schema.validate(parsedValue);

    if (error) {
      throw new BadRequestException(`The ${metadata.data} query parameter is not valid`);
    }

    return value;
  }
}
