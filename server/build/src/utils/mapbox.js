"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoCoder = void 0;
const geocoding_1 = __importDefault(require("@mapbox/mapbox-sdk/services/geocoding"));
const config_1 = __importDefault(require("config"));
const mapBoxToken = config_1.default.get("mapBoxToken");
exports.geoCoder = (0, geocoding_1.default)({ accessToken: mapBoxToken });
