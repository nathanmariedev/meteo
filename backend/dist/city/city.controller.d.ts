import { City } from './classes/city.class';
import { CityService } from './city.service';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    findById(insee: string): Promise<City>;
    findByQuery(query: string): Promise<City[]>;
}
