"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModel = void 0;
const common_1 = require("@nestjs/common");
const database_constants_1 = require("../../database/database.constants");
const basic_crud_model_1 = require("../../common/models/basic-crud.model");
const knex_1 = require("knex");
const fs_1 = require("fs");
const path = require("path");
const city_class_1 = require("../classes/city.class");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const sqlDir = path.join(__dirname, '/sql');
const API_URL = 'https://api.meteo-concept.com/api/';
const API_KEY = '1e3804f9ba78545c499d5dd4af53caf47fce3f32dd8d4096e003542c12f37144';
let CityModel = class CityModel extends basic_crud_model_1.BasicCrudModel {
    constructor(pg) {
        super(pg, 'city', [
            'insee',
            'cp',
            'name'
        ], city_class_1.City);
        this.pg = pg;
    }
    async findAll() {
        const file = await fs_1.promises.readFile(`${sqlDir}/findAll.sql`);
        const req = await this.pg.raw(file.toString());
        return req.rows;
    }
    async findOneById(insee) {
        const file = await fs_1.promises.readFile(`${sqlDir}/findById.sql`);
        const req = await this.pg.raw(file.toString(), [insee]);
        return req.rows;
    }
    async findByQuery(query) {
        console.log(API_URL);
        let result;
        const response = await axios_1.default.get(`${API_URL}location/cities`, {
            params: {
                token: API_KEY,
                search: query,
            },
        });
        const data = response.data.cities;
        console.log(data.length);
        result = data.map(city => new city_class_1.City({ insee: city.insee, cp: city.cp, name: city.name }));
        console.log(result);
        return result;
    }
};
CityModel = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Function])
], CityModel);
exports.CityModel = CityModel;
//# sourceMappingURL=city.model.js.map