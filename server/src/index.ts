import server from "./server";
import dbConnection from "./db";
import config from "config";
import SpotModel, { Spot } from "./models/spot.model";

const port = config.get<number>("port");

async function startServer() {
  try {
    await dbConnection();
    server.listen(port, () => {
      console.log(`Listening to port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }

  //Seed

  const newSpot = new SpotModel({
    title: "Cool Spot",
    description: "Nice spot to drink tequila",
    location: "Pasto",
  } );
  await newSpot.save();

}

startServer();
