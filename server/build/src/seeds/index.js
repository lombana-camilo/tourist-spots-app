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
const mongoose_1 = __importDefault(require("mongoose"));
const spot_model_1 = __importDefault(require("./../models/spot.model"));
const config_1 = __importDefault(require("config"));
const api_1 = __importDefault(require("./api"));
const users_models_1 = __importDefault(require("./../models/users.models"));
const dbUri = config_1.default.get("dbUri");
const db_url = config_1.default.get("DB_URL");
const seedDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield mongoose_1.default.connect(db_url || dbUri);
        console.log("Connected to DB");
        yield spot_model_1.default.deleteMany({});
        console.log("Cleaned previous Spots");
        yield users_models_1.default.deleteMany({});
        console.log("Cleaned previous Users");
        const admin = yield users_models_1.default.create({
            username: "admin",
            password: "admin123",
            email: "admin@mail.com",
        });
        console.log("Created admin user, admin@mail.com, pw:admin123");
        const seedData = yield (0, api_1.default)(admin._id);
        yield spot_model_1.default.insertMany(seedData);
        console.log("Seeds created!");
    }
    catch (e) {
        console.log(e);
    }
    return process.exit(0);
});
seedDb().then(() => {
    mongoose_1.default.connection.close();
});
