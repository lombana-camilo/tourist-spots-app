import config from "config";
import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reissueAccessToken } from "./../services/sessions.service";
import { verifyJwt } from "./../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken", "") ||
    get(req, "headers.authorization", "").split(" ")[1];

  const refreshToken =
    get(req, "cookies.refreshToken", "") || get(req, "headers.x-refresh", "");

  if (!accessToken) {
    return next();
  }
  //Verity the token, also returns error if is expired
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reissueAccessToken(refreshToken);
    console.log({ newAccessToken });
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, // 15min
        httpOnly: true, // not accessible by js, only http
        domain: config.get("domain"),
        path: "/",
        sameSite: "strict",
        secure: false, //true in production (cookie only use in https)
      });

      const { decoded } = verifyJwt(newAccessToken);
      res.locals.user = decoded;
    }
    return next();
  }
  return next();
};

export default deserializeUser;
