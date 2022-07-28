import express from "express"
import routes from "./routes"
import cors from "cors"
import config from "config"
const server = express()

//middleware
server.use(express.json())
server.use(cors({
   origin:config.get<string>('originUrl'),
   credentials:true
}))

server.use("/api",routes)

export default server
