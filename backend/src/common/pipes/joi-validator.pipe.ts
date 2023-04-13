import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import * as joi from 'joi';

export class JoiValidatorPipe implements PipeTransform {
  private readonly validator: joi.Schema;

  constructor(validator: joi.Schema) {
    this.validator = validator;
  }

  transform(val: string, metadata: ArgumentMetadata): Promise<unknown> {
    const { error, value } = this.validator.validate(val);
    if (error) {
      throw new BadRequestException(`The ${metadata.data} query parameter is not valid`);
    }

    return value;
  }
}
