import { Router } from "express";

const users = Router()

users.get("/",(req,res)=>{
   res.send("users page")
})

export default users
