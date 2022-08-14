"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("./../middleware/validateRequest"));
const user_schema_1 = require("./../schemas/user.schema");
const user_controller_1 = require("./../controllers/user.controller");
const requireUser_1 = __importDefault(require("./../middleware/requireUser"));
const session_controller_1 = require("./../controllers/session.controller");
const users = (0, express_1.Router)();
users.get('/me', requireUser_1.default, user_controller_1.getCurrentUser);
users.post('/', (0, validateRequest_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler, session_controller_1.createSessionHandler);
exports.default = users;
//# sourceMappingURL=users.route.js.map