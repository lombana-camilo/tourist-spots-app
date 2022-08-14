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
exports.deleteSpotHandler = exports.updateSpotHandler = exports.createSpotHandler = exports.findSpotHandler = exports.getSpotsHandler = void 0;
const lodash_1 = require("lodash");
const cloudinary_1 = __importDefault(require("./../utils/cloudinary"));
const review_model_1 = __importDefault(require("./../models/review.model"));
const spot_service_1 = require("./../services/spot.service");
const mapbox_1 = require("./../utils/mapbox");
const getSpotsHandler = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spots = yield (0, spot_service_1.getSpots)();
        return res.send(spots.reverse());
    }
    catch (e) {
        return res.sendStatus(404);
    }
});
exports.getSpotsHandler = getSpotsHandler;
const findSpotHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spot = yield (0, spot_service_1.findSpot)({ _id: req.params.spotId });
        return res.send(spot);
    }
    catch (e) {
        return res.sendStatus(404);
    }
});
exports.findSpotHandler = findSpotHandler;
const createSpotHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const geoData = yield mapbox_1.geoCoder
        .forwardGeocode({
        query: req.body.location,
        limit: 1,
    })
        .send();
    if (!geoData.body.features.length) {
        return res.status(400).send("Please enter a valid location");
    }
    const userId = res.locals.user._id;
    const multerFiles = req.files;
    const images = multerFiles.map((file) => {
        return { url: file.path, filename: file.filename };
    });
    const newSpot = yield (0, spot_service_1.createSpot)(Object.assign(Object.assign({}, req.body), { images, geometry: geoData.body.features[0].geometry, user: userId, reviews: [] }));
    return res.send(newSpot);
});
exports.createSpotHandler = createSpotHandler;
const updateSpotHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const multerFiles = req.files;
    const userId = res.locals.user._id;
    const spotId = req.params.spotId;
    const spot = yield (0, spot_service_1.findSpot)({ _id: spotId });
    if (!spot) {
        return res.sendStatus(404);
    }
    if ((0, lodash_1.get)(spot.user, "_id").toString() !== userId) {
        return res
            .status(403)
            .send("You do not have permission to update this spot!");
    }
    const newImages = multerFiles === null || multerFiles === void 0 ? void 0 : multerFiles.map((file) => {
        return { url: file.path, filename: file.filename };
    });
    const updated = yield (0, spot_service_1.updateSpot)({ _id: spotId }, req.body, { new: true });
    updated === null || updated === void 0 ? void 0 : updated.images.push(...newImages);
    updated === null || updated === void 0 ? void 0 : updated.save();
    if (req.body.deleteImages && req.body.deleteImages.length) {
        yield (updated === null || updated === void 0 ? void 0 : updated.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } },
        }));
        for (let filename of req.body.deleteImages) {
            yield cloudinary_1.default.uploader.destroy(filename);
        }
    }
    return res.send(updated);
});
exports.updateSpotHandler = updateSpotHandler;
const deleteSpotHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const spotId = req.params.spotId;
    const spot = yield (0, spot_service_1.findSpot)({ _id: spotId });
    if (!spot) {
        return res.sendStatus(404);
    }
    if ((0, lodash_1.get)(spot.user, "_id").toString() !== userId) {
        return res
            .status(403)
            .send("You do not have permission to delete this spot!");
    }
    const deleted = yield (0, spot_service_1.deleteSpot)({ _id: spotId });
    yield review_model_1.default.deleteMany({ spotId });
    spot.images.forEach((img) => __awaiter(void 0, void 0, void 0, function* () {
        yield cloudinary_1.default.uploader.destroy(img.filename);
    }));
    return res.send(deleted);
});
exports.deleteSpotHandler = deleteSpotHandler;
