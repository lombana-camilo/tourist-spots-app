import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const signJwt = async (payload: Object, options?: jwt.SignOptions) => {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (err) {
    console.log(err);
    return {
      valid: false,
      expired: err.message === "jwt expired",
      decoded: null,
    };
  }
};
