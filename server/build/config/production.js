"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const { DB_NAME, DB_HOST, API_KEY, API_HOST, PRIVATE_KEY } = process.env;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } = process.env;
const mapBoxToken = process.env.MAPBOX_TOKEN;
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;
exports.default = {
    dbUri,
    domain: ".vercel.app",
    port: ((_a = process.env) === null || _a === void 0 ? void 0 : _a.PORT) || 4000,
    API_KEY,
    API_HOST,
    originUrl: `https://tourist-spots-app.vercel.app`,
    saltFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "2h",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCmSLd6IUv+AX8lU0xIBMym9H7b
CxOcWw9sZFaQocxpoeBe0BrwRBE4yIzi2L/JnN3GN+4oa+JQ/YGUNWuODTSEse16
fC/jluWWNH03N+NPJ3Xo87WmfUmh/vZJRWe+kGKLcNiU0Mu94egSH7DAl5TiRfp7
XhIrqMWGtkuXzEc/CQIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: PRIVATE_KEY,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
    mapBoxToken,
    DB_URL: process.env.DB_URL,
};
