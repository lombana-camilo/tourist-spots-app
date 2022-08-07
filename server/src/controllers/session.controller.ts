import { Request, Response } from "express";
import { createSession, getSessions, updateSession } from "./../services/sessions.service";
import { CreateSessionSchemaType } from "./../schemas/sesion.schema";
import { validatePassword } from "./../services/user.services";
import { signJwt } from "./../utils/jwt.utils";
import config from "config";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionSchemaType["body"]>,
  res: Response
) => {

   //Check if there is a new user
   // Validate user and password
   const user = res.locals.newUser || await validatePassword(req.body);
  if (!user) {
    return res.status(401).send("Incorrect Email or Password");
  }

   console.log({user})
  // Create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // Create access and refresh Tokens
  const accessToken = await signJwt(
    { ...user, sessionId: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = await signJwt(
    { ...user, sessionId: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  // Create cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, //15min
    httpOnly: true,
    domain: config.get("domain"),
    path: "/",
    sameSite: "strict",
    secure: false, //true in production (cookie only used over https)
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3600000, // 1h
    httpOnly: true,
    domain: config.get("domain"),
    path: "/",
    sameSite: "strict",
    secure: false, //true in production (cookie only used over https)
  });

  // Return tokens
  return res.send({ accessToken, refreshToken });
};

export const getSessionsHandler = async (
  req: Request,
  res: Response
) => {
  //ideally the user is in the req object
  // need to deserialize user from the token
   const userId = res.locals.user._id
   const sessions = await getSessions({user:userId,valid:true})
   return res.send(sessions)
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.sessionId;
  await updateSession({ _id: sessionId }, { valid: false });
   res.clearCookie('accessToken')
   res.clearCookie('refreshToken')
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
