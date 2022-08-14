"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpot = exports.updateSpot = exports.createSpot = exports.findSpot = exports.getSpots = void 0;
const spot_model_1 = __importDefault(require("./../models/spot.model"));
const getSpots = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield spot_model_1.default.find({});
});
exports.getSpots = getSpots;
const findSpot = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield spot_model_1.default.findOne(query)
            .populate({ path: "reviews", populate: { path: "user" } })
            .populate("user");
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.findSpot = findSpot;
const createSpot = (spot) => __awaiter(void 0, void 0, void 0, function* () {
    return yield spot_model_1.default.create(spot);
});
exports.createSpot = createSpot;
const updateSpot = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return yield spot_model_1.default.findOneAndUpdate(query, update, options);
});
exports.updateSpot = updateSpot;
const deleteSpot = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield spot_model_1.default.deleteOne(query);
});
exports.deleteSpot = deleteSpot;
