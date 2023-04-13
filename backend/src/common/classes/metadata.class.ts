import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Metadata {
  @ApiProperty()
  order: string;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  count: number;

  @ApiPropertyOptional()
  search?: string;

  constructor(order: string, limit: number, offset: number, count: number, search?: string) {
    this.order = order;
    this.limit = limit;
    this.offset = offset;
    this.count = count;
    this.search = search;
  }
}
