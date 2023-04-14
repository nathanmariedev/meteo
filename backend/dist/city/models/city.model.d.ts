import { BasicCrudModel } from '../../common/models/basic-crud.model';
import { Knex } from 'knex';
import { City } from '../classes/city.class';
export declare class CityModel extends BasicCrudModel<City> {
    protected readonly pg: Knex;
    constructor(pg: Knex);
    findAll(): Promise<City[]>;
    findOneById(insee: string): Promise<City>;
    findByQuery(query: string): Promise<City[]>;
}
