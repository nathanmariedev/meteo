"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nunjucksProvider = void 0;
const nunjucks = require("nunjucks");
const path = require("path");
const nunjucks_constants_1 = require("./nunjucks.constants");
exports.nunjucksProvider = {
    provide: nunjucks_constants_1.NUNJUCKS,
    useFactory: async () => {
        return new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(__dirname, './../common/views')));
    },
};
//# sourceMappingURL=nunjucks.provider.js.map