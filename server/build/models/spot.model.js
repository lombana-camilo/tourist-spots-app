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
exports.Spot = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const review_model_1 = require("./review.model");
const users_models_1 = require("./users.models");
let Spot = class Spot {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => users_models_1.User }),
    __metadata("design:type", Object)
], Spot.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Spot.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Spot.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Spot.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Object)
], Spot.prototype, "geometry", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Spot.prototype, "images", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => review_model_1.Review }),
    __metadata("design:type", Array)
], Spot.prototype, "reviews", void 0);
Spot = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: false, versionKey: false } })
], Spot);
exports.Spot = Spot;
const SpotModel = (0, typegoose_1.getModelForClass)(Spot);
exports.default = SpotModel;
