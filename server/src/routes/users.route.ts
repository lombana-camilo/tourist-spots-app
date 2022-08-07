import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createUserSchema } from "./../schemas/user.schema";
import { createUserHandler, getCurrentUser } from "./../controllers/user.controller";
import requireUser from "./../middleware/requireUser";
import { createSessionHandler } from "./../controllers/session.controller";

const users = Router()

users.get('/me',requireUser, getCurrentUser)

users.post('/',validateRequest(createUserSchema), createUserHandler,createSessionHandler)
export default users
