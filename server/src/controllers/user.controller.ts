import { Request, Response } from "express";
import { CreateUserSchemaType } from "./../schemas/user.schema";
import { createUser } from "./../services/user.services";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserSchemaType["body"]>,
  res: Response
) => {
  try {
    const newUser = await createUser(req.body);
    return res.send(newUser);
  } catch (err) {
    console.log(err);
    //This response is sent when a request conflicts with the current state of the server.
    //it violates unique field on user model
    return res.status(409).send(err.message);
  }
};
