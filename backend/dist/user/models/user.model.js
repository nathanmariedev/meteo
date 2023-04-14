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
exports.UserModel = void 0;
const common_1 = require("@nestjs/common");
const database_constants_1 = require("../../database/database.constants");
const basic_crud_model_1 = require("../../common/models/basic-crud.model");
const user_class_1 = require("../classes/user.class");
const knex_1 = require("knex");
const fs_1 = require("fs");
const path = require("path");
const class_transformer_1 = require("class-transformer");
const sqlDir = path.join(__dirname, '/sql');
let UserModel = class UserModel extends basic_crud_model_1.BasicCrudModel {
    constructor(pg) {
        super(pg, 'user', [
            'userId',
            'username',
            'password',
            'mainCity'
        ], user_class_1.User);
        this.pg = pg;
    }
    async findAll() {
        const file = await fs_1.promises.readFile(`${sqlDir}/findAll.sql`);
        const req = await this.pg.raw(file.toString());
        return req.rows;
    }
    async findOneById(userId) {
        const file = await fs_1.promises.readFile(`${sqlDir}/findById.sql`);
        const req = await this.pg.raw(file.toString(), [userId]);
        return req.rows.length > 0 ? (0, class_transformer_1.plainToClass)(user_class_1.User, req.rows[0]) : null;
    }
};
UserModel = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_constants_1.PG_CONNECTION)),
    __metadata("design:paramtypes", [Function])
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.model.js.map