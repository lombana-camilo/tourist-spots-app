import express from "express"
import routes from "./routes"
const server = express()

//middleware
server.use(express.json())

server.use("/api",routes)

export default server
