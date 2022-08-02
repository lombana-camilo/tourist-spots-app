import express from "express"
import routes from "./routes"
import cors from "cors"
import config from "config"
import deserializeUser from "./middleware/deserializeUser"
import cookieParser from "cookie-parser"
import morgan from "morgan"
const server = express()

//middleware
server.use(express.json())
server.use(morgan('tiny'))
server.use(cors({
   origin:config.get<string>('originUrl'),
   credentials:true
}))

server.use(cookieParser())
server.use(deserializeUser)
server.use("/api",routes)

export default server
