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
exports.deleteSessionHandler = exports.getSessionsHandler = exports.createSessionHandler = void 0;
const sessions_service_1 = require("./../services/sessions.service");
const user_services_1 = require("./../services/user.services");
const jwt_utils_1 = require("./../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
const createSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.newUser || (yield (0, user_services_1.validatePassword)(req.body));
    if (!user) {
        return res.status(401).send("Incorrect Email or Password");
    }
    const session = yield (0, sessions_service_1.createSession)(user._id, req.get("user-agent") || "");
    const accessToken = yield (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { sessionId: session._id }), { expiresIn: config_1.default.get("accessTokenTtl") });
    const refreshToken = yield (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { sessionId: session._id }), { expiresIn: config_1.default.get("refreshTokenTtl") });
    res.cookie("accessToken", accessToken, {
        maxAge: 900000,
        httpOnly: true,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
        maxAge: 3600000,
        httpOnly: true,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
    });
    return res.send({ accessToken, refreshToken });
});
exports.createSessionHandler = createSessionHandler;
const getSessionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const sessions = yield (0, sessions_service_1.getSessions)({ user: userId, valid: true });
    return res.send(sessions);
});
exports.getSessionsHandler = getSessionsHandler;
const deleteSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = res.locals.user.sessionId;
    yield (0, sessions_service_1.updateSession)({ _id: sessionId }, { valid: false });
    res.cookie("accessToken", null, {
        maxAge: -1,
        httpOnly: true,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", null, {
        maxAge: -1,
        httpOnly: true,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
    });
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
});
exports.deleteSessionHandler = deleteSessionHandler;
