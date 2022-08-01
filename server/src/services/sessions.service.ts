import { Session } from "inspector";
import { FilterQuery, UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from "./../utils/jwt.utils";
import SessionModel from "./../models/session.model";
import { get } from "lodash";
import UserModel from "./../models/users.models";
import config from "config";

export const createSession = async (userId: string, userAgent: string) => {
  try {
    const newSession = await SessionModel.create({ user: userId, userAgent });
    return newSession;
  } catch (e) {
    throw new Error(e);
  }
};

export const getSessions = async (query: FilterQuery<Session>) => {
  //lean returns a POJO instead of Mongoose Document class (~toJSON)
  return SessionModel.find(query).lean();
};

export const reissueAccessToken = async (refreshToken: string) => {
  // Verify if valid
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded) {
    return false;
  }

  // Get Session
  const session = await SessionModel.findById(get(decoded, "sessionId"));
   console.log({session})
  if (!session || !session.valid) {
    return false;
  }

  // Find user. Lean doesn't bring unnecesary methods
  const user = await UserModel.findOne({_id:session.user}).lean();
   console.log({user})
  if (!user) {
    return false;
  }

  // If there is a user-> create a new accesstoken
  const newAccessToken = await signJwt(
    { ...user, sessionId: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  return newAccessToken;
};

export const updateSession = async(
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) => {
   console.log(query,update)
  return SessionModel.updateOne(query, update);
};
