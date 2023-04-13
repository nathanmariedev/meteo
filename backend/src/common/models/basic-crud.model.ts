import { Knex } from 'knex';
import { Search } from '../../common/classes/search.class';
import { plainToClass } from 'class-transformer';

export class BasicCrudModel<T> {
  constructor(
    protected readonly pg: Knex,
    protected readonly tableName: string,
    protected readonly fields: string[],
    protected readonly returnClassType: any,
  ) {}

  async find(
    where: Partial<T>,
    orderBy?: string,
    limit?: number,
    offset?: number,
    search?: Search,
  ): Promise<T[]> {
    let whatevers = this.pg
      .select(...this.fields)
      .from(`starterkit.${this.tableName}`)
      .where(where)
      .whereNull('deletedAt');

    // utilisable pour recherche multi-columns
    if (search) {
      whatevers = whatevers.andWhere(
        this.pg.raw(`CONCAT_WS(' ', ${search.columns.join()}) ILIKE :search`, {
          search: `%${search.value}%`,
        }),
      );
    }
    if (orderBy) whatevers = whatevers.orderBy(orderBy);
    if (limit) whatevers = whatevers.limit(limit);
    if (offset) whatevers = whatevers.offset(offset);

    return plainToClass(this.returnClassType, await whatevers);
  }

  async findOne(where: Partial<T>): Promise<T> {
    const whatever = await this.pg
      .select(...this.fields)
      .from(`starterkit.${this.tableName}`)
      .where(where)
      .limit(1)
      .whereNull('deletedAt');

    return plainToClass(this.returnClassType, whatever[0]) as unknown as T;
  }

  async create(data: Partial<T>): Promise<T> {
    const whatever = await this.pg
      .table(`starterkit.${this.tableName}`)
      .insert(data)
      .returning(this.fields);

    return plainToClass(this.returnClassType, whatever[0] as unknown) as T;
  }

  async update(data: Partial<T>, where: Partial<T>): Promise<T[]> {
    const whatevers = await this.pg
      .table(`starterkit.${this.tableName}`)
      .update(data)
      .where(where)
      .whereNull('deletedAt')
      .returning(this.fields);

    return plainToClass(this.returnClassType, whatevers);
  }

  async delete(where: Partial<T>): Promise<T[]> {
    const whatevers = await this.pg
      .table(`starterkit.${this.tableName}`)
      .update({ deletedAt: new Date() })
      .where(where)
      .returning(this.fields);

    return plainToClass(this.returnClassType, whatevers) as T[];
  }

  async count(where: Partial<T>, search?: Search): Promise<number> {
    let count = this.pg
      .table(`starterkit.${this.tableName}`)
      .where(where)
      .whereNull('deletedAt')
      .count();

    if (search) {
      count = count.andWhere(
        this.pg.raw(`CONCAT_WS(' ', ${search.columns.join()}) ILIKE :search`, {
          search: `%${search.value}%`,
        }),
      );
    }

    return +(await count)[0].count;
  }
}
