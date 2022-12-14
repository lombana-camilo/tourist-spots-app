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
exports.Session = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const users_models_1 = require("./users.models");
let Session = class Session {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => users_models_1.User }),
    __metadata("design:type", Object)
], Session.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Session.prototype, "valid", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Session.prototype, "userAgent", void 0);
Session = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            versionKey: false,
        },
    })
], Session);
exports.Session = Session;
const SessionModel = (0, typegoose_1.getModelForClass)(Session);
exports.default = SessionModel;
