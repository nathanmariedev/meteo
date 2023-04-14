import { Knex } from 'knex';
import { Search } from '../../common/classes/search.class';
export declare class BasicCrudModel<T> {
    protected readonly pg: Knex;
    protected readonly tableName: string;
    protected readonly fields: string[];
    protected readonly returnClassType: any;
    findMany(arg0: {}): void;
    constructor(pg: Knex, tableName: string, fields: string[], returnClassType: any);
    find(where: Partial<T>, orderBy?: string, limit?: number, offset?: number, search?: Search): Promise<T[]>;
    findOne(where: Partial<T>): Promise<T>;
    create(data: Partial<T>): Promise<T>;
    update(data: Partial<T>, where: Partial<T>): Promise<T[]>;
    delete(where: Partial<T>): Promise<T[]>;
    count(where: Partial<T>, search?: Search): Promise<number>;
}
