import { Router } from "express";
import sessions from "./session.route";
import spots from "./spots.route";
import users from "./users.route";

const routes = Router()

routes.use("/users", users)
routes.use("/sessions", sessions)
routes.use("/spots", spots)

//Cast error
routes.all("*",(req,res)=>{
   res.status(404).send("Not Found")
})
export default routes
