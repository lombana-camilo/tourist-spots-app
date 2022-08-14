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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.createUserHandler = void 0;
const user_services_1 = require("./../services/user.services");
const createUserHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield (0, user_services_1.createUser)(req.body);
        res.locals.newUser = newUser;
        return next();
    }
    catch (err) {
        return res.status(409).send("This email is already in use");
    }
});
exports.createUserHandler = createUserHandler;
const getCurrentUser = (req, res) => {
    return res.send(res.locals.user);
};
exports.getCurrentUser = getCurrentUser;
