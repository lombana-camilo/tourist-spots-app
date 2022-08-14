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
exports.updateSession = exports.reissueAccessToken = exports.getSessions = exports.createSession = void 0;
const jwt_utils_1 = require("./../utils/jwt.utils");
const session_model_1 = __importDefault(require("./../models/session.model"));
const lodash_1 = require("lodash");
const users_models_1 = __importDefault(require("./../models/users.models"));
const config_1 = __importDefault(require("config"));
const createSession = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSession = yield session_model_1.default.create({ user: userId, userAgent });
        return newSession;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.createSession = createSession;
const getSessions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return session_model_1.default.find(query).lean();
});
exports.getSessions = getSessions;
const reissueAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded } = (0, jwt_utils_1.verifyJwt)(refreshToken);
    if (!decoded) {
        return false;
    }
    const session = yield session_model_1.default.findById((0, lodash_1.get)(decoded, "sessionId"));
    if (!session || !session.valid) {
        return false;
    }
    const user = yield users_models_1.default.findOne({ _id: session.user }).lean();
    if (!user) {
        return false;
    }
    const newAccessToken = yield (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { sessionId: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") });
    return newAccessToken;
});
exports.reissueAccessToken = reissueAccessToken;
const updateSession = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return session_model_1.default.updateOne(query, update);
});
exports.updateSession = updateSession;
