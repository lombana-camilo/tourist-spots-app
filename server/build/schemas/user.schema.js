"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({ required_error: "Username is required" }),
        email: (0, zod_1.string)({ required_error: "Email is required" }).email("Not a valid Email"),
        password: (0, zod_1.string)({ required_error: "Password is required" }).min(5, "Must contain 5 chars minimum"),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }).min(5, "Must contain 5 chars minimum"),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match!",
        path: ["passwordConfirmation"],
    }),
});
//# sourceMappingURL=user.schema.js.map