import { City } from './classes/city.class';
import { CityModel } from './models/city.model';
export declare class CityService {
    private readonly cityModel;
    constructor(cityModel: CityModel);
    findAll(): Promise<City[]>;
    findOneById(insee: string): Promise<City>;
}
