import { Router } from "express";
import spots from "./spots.route";
import users from "./users.route";

const routes = Router()

routes.use("/users", users)
routes.use("/spots", spots)
export default routes
