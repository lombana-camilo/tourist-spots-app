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
exports.validatePassword = exports.createUser = void 0;
const lodash_1 = require("lodash");
const users_models_1 = __importDefault(require("./../models/users.models"));
const createUser = (createUserInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield users_models_1.default.create(createUserInput);
        const omitPassword = (0, lodash_1.omit)(newUser.toJSON(), "password");
        return Object.assign(Object.assign({}, omitPassword), { _id: newUser._id });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createUser = createUser;
const validatePassword = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_models_1.default.findOne({ email });
    if (!user) {
        return false;
    }
    const isValid = yield user.comparePassword(password);
    if (!isValid) {
        return false;
    }
    const omitPassword = (0, lodash_1.omit)(user.toJSON(), "password");
    return Object.assign(Object.assign({}, omitPassword), { _id: user._id });
});
exports.validatePassword = validatePassword;
