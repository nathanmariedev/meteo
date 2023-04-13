import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

export class EnumValidatorPipe implements PipeTransform {
  private readonly values: string[];

  constructor(validator: string[]) {
    this.values = Object.values(validator);
  }

  transform(value: string | string[], metadata: ArgumentMetadata): string | string[] {
    if (value) {
      if (Array.isArray(value) && value.some((item: string) => !this.values.includes(item))) {
        throw new BadRequestException(
          `The ${metadata.data} query parameter must be an array of valid enum values`,
        );
      }
      if (typeof value === 'string' && !this.values.includes(value)) {
        throw new BadRequestException(
          `The ${metadata.data} query parameter must be a valid enum value`,
        );
      }
    }
    return value;
  }
}
