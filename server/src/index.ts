import server from "./server";
import dbConnection from "./db";
import config from "config";

const port = config.get<number>("port");

async function startServer() {
  try {
    await dbConnection();
    server.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (e) {}
}

startServer()
