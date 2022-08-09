import express from "express"
import routes from "./routes"
import cors from "cors"
import config from "config"
import deserializeUser from "./middleware/deserializeUser"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
const server = express()

//middleware
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(morgan('tiny'))
server.use(cors({
   origin:config.get<string>('originUrl'),
   credentials:true
}))
//Static folder for images
console.log(__dirname)
server.use('/static', express.static(path.join(__dirname, './uploads')))

server.use(cookieParser())
server.use(deserializeUser)
server.use("/api",routes)

export default server
