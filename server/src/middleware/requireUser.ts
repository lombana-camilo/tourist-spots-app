import { NextFunction, Request, Response } from "express";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).send("User not logged in");
  }
  return next();
};

export default requireUser;
