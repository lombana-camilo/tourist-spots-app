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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const options = {
    method: "GET",
    url: "https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary",
    params: {
        tr_longitude: "-69.543834",
        tr_latitude: "12.862497",
        bl_longitude: "-81.87557",
        bl_latitude: "-0.740952",
        currency: "USD",
        lunit: "km",
        lang: "en_US",
    },
    headers: {
        "X-RapidAPI-Key": config_1.default.get("API_KEY"),
        "X-RapidAPI-Host": config_1.default.get("API_HOST"),
    },
};
const filterData = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.request(options);
        const dataArray = data.data;
        const completeOnes = dataArray.filter((spot) => {
            var _a, _b, _c;
            return (((_a = spot.description) === null || _a === void 0 ? void 0 : _a.length) > 0 &&
                ((_b = spot.location_string) === null || _b === void 0 ? void 0 : _b.length) > 0 &&
                ((_c = spot.photo.images.original.url) === null || _c === void 0 ? void 0 : _c.length) > 0);
        });
        const filterArray = completeOnes.map((spot) => {
            return {
                title: spot.name,
                description: spot.description,
                location: spot.location_string,
                images: [{ url: spot.photo.images.original.url, filename: spot.name }],
                geometry: {
                    type: "Point",
                    coordinates: [Number(spot.longitude), Number(spot.latitude)],
                },
                reviews: [],
                user: admin,
            };
        });
        return filterArray;
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = filterData;
