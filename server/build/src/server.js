"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const server = (0, express_1.default)();
server.set("trust proxy", 1);
server.use((0, express_mongo_sanitize_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use((0, cors_1.default)({
    origin: config_1.default.get('originUrl'),
    credentials: true
}));
console.log(__dirname);
server.use('/static', express_1.default.static(path_1.default.join(__dirname, './uploads')));
server.use((0, cookie_parser_1.default)());
server.use(deserializeUser_1.default);
server.use("/api", routes_1.default);
exports.default = server;
