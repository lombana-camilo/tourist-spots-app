"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_route_1 = __importDefault(require("./session.route"));
const spots_route_1 = __importDefault(require("./spots.route"));
const users_route_1 = __importDefault(require("./users.route"));
const routes = (0, express_1.Router)();
routes.use("/users", users_route_1.default);
routes.use("/sessions", session_route_1.default);
routes.use("/spots", spots_route_1.default);
routes.all("*", (req, res) => {
    res.status(404).send("Not Found");
});
exports.default = routes;
//# sourceMappingURL=index.js.map