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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserListResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const metadata_class_1 = require("../../common/classes/metadata.class");
const user_class_1 = require("../classes/user.class");
class UserListResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_class_1.User, isArray: true }),
    __metadata("design:type", Array)
], UserListResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: metadata_class_1.Metadata }),
    __metadata("design:type", metadata_class_1.Metadata)
], UserListResponse.prototype, "metadata", void 0);
exports.UserListResponse = UserListResponse;
//# sourceMappingURL=user-list-response.dto.js.map