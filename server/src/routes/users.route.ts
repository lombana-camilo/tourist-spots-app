import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createUserSchema } from "./../schemas/user.schema";
import { createUserHandler, getCurrentUser } from "./../controllers/user.controller";
import requireUser from "./../middleware/requireUser";

const users = Router()

users.get('/me',requireUser, getCurrentUser)

users.post('/',validateRequest(createUserSchema), createUserHandler)
export default users
