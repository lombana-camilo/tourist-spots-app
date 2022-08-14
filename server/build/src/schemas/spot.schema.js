"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpotSchema = exports.findSpotSchema = exports.updateSpotSchema = exports.createSpotSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({ required_error: "Title is required" }),
        description: (0, zod_1.string)({ required_error: "Description is required" }).min(20, "Description should be at least 20 chars long"),
        location: (0, zod_1.string)({ required_error: "Location is required" }),
        deleteImages: (0, zod_1.array)((0, zod_1.string)()).optional()
    }),
};
const params = {
    params: (0, zod_1.object)({
        spotId: (0, zod_1.string)({ required_error: "Spot Id is required" }),
    }),
};
exports.createSpotSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateSpotSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.findSpotSchema = (0, zod_1.object)(Object.assign({}, params));
exports.deleteSpotSchema = (0, zod_1.object)(Object.assign({}, params));
