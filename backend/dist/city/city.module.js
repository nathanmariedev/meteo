"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const city_model_1 = require("./models/city.model");
const city_controller_1 = require("./city.controller");
const city_service_1 = require("./city.service");
const core_module_1 = require("../core/core.module");
let CityModule = class CityModule {
};
CityModule = __decorate([
    (0, common_1.Module)({
        controllers: [city_controller_1.CityController],
        imports: [database_module_1.DatabaseModule, core_module_1.CoreModule],
        providers: [city_model_1.CityModel, city_service_1.CityService],
        exports: [city_model_1.CityModel, city_service_1.CityService],
    })
], CityModule);
exports.CityModule = CityModule;
//# sourceMappingURL=city.module.js.map