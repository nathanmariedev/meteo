"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicCrudModel = void 0;
const class_transformer_1 = require("class-transformer");
class BasicCrudModel {
    findMany(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(pg, tableName, fields, returnClassType) {
        this.pg = pg;
        this.tableName = tableName;
        this.fields = fields;
        this.returnClassType = returnClassType;
    }
    async find(where, orderBy, limit, offset, search) {
        let whatevers = this.pg
            .select(...this.fields)
            .from(`meteo.${this.tableName}`)
            .where(where)
            .whereNull('deletedAt');
        if (search) {
            whatevers = whatevers.andWhere(this.pg.raw(`CONCAT_WS(' ', ${search.columns.join()}) ILIKE :search`, {
                search: `%${search.value}%`,
            }));
        }
        if (orderBy)
            whatevers = whatevers.orderBy(orderBy);
        if (limit)
            whatevers = whatevers.limit(limit);
        if (offset)
            whatevers = whatevers.offset(offset);
        return (0, class_transformer_1.plainToClass)(this.returnClassType, await whatevers);
    }
    async findOne(where) {
        const whatever = await this.pg
            .select(...this.fields)
            .from(`meteo.${this.tableName}`)
            .where(where)
            .limit(1)
            .whereNull('deletedAt');
        return (0, class_transformer_1.plainToClass)(this.returnClassType, whatever[0]);
    }
    async create(data) {
        const whatever = await this.pg
            .table(`meteo.${this.tableName}`)
            .insert(data)
            .returning(this.fields);
        return (0, class_transformer_1.plainToClass)(this.returnClassType, whatever[0]);
    }
    async update(data, where) {
        const whatevers = await this.pg
            .table(`meteo.${this.tableName}`)
            .update(data)
            .where(where)
            .whereNull('deletedAt')
            .returning(this.fields);
        return (0, class_transformer_1.plainToClass)(this.returnClassType, whatevers);
    }
    async delete(where) {
        const whatevers = await this.pg
            .table(`meteo.${this.tableName}`)
            .update({ deletedAt: new Date() })
            .where(where)
            .returning(this.fields);
        return (0, class_transformer_1.plainToClass)(this.returnClassType, whatevers);
    }
    async count(where, search) {
        let count = this.pg
            .table(`meteo.${this.tableName}`)
            .where(where)
            .whereNull('deletedAt')
            .count();
        if (search) {
            count = count.andWhere(this.pg.raw(`CONCAT_WS(' ', ${search.columns.join()}) ILIKE :search`, {
                search: `%${search.value}%`,
            }));
        }
        return +(await count)[0].count;
    }
}
exports.BasicCrudModel = BasicCrudModel;
//# sourceMappingURL=basic-crud.model.js.map