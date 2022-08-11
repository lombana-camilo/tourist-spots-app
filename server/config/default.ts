import "dotenv/config";

const { DB_NAME, DB_HOST, API_KEY, API_HOST, PRIVATE_KEY } = process.env;
//Cloudinary
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY } =
  process.env;
//MapBox
const mapBoxToken = process.env.MAPBOX_TOKEN;
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;

export default {
  dbUri,
  domain: "localhost",
  port: 4000,
  API_KEY,
  API_HOST,
  // cors
  originUrl: "http://localhost:5173",
  // hash password
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

  //Cloudinary
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,

  //MapBox
  mapBoxToken,
};
