"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("./../middleware/validateRequest"));
const sesion_schema_1 = require("./../schemas/sesion.schema");
const session_controller_1 = require("./../controllers/session.controller");
const requireUser_1 = __importDefault(require("./../middleware/requireUser"));
const sessions = (0, express_1.default)();
sessions
    .route("/")
    .get(requireUser_1.default, session_controller_1.getSessionsHandler)
    .post((0, validateRequest_1.default)(sesion_schema_1.createSessionSchema), session_controller_1.createSessionHandler)
    .delete(requireUser_1.default, session_controller_1.deleteSessionHandler);
exports.default = sessions;
