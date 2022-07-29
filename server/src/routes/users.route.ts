import { Router } from "express";
import validateRequest from "./../middleware/validateRequest";
import { createUserSchema } from "./../schemas/user.schema";
import { createUserHandler } from "./../controllers/user.controller";

const users = Router()

users.get("/",(req,res)=>{
   res.send("users page")
})

users.post('/',validateRequest(createUserSchema), createUserHandler)
export default users
