"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        next();
    }
    catch (err) {
        res.status(400).send(err.errors);
    }
};
exports.default = validateRequest;
