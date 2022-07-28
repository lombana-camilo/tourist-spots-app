import mongoose from "mongoose";
import SpotModel from "./../models/spot.model";
import config from "config";
import filterArray from "./api";

const dbUri = config.get<string>("dbUri");
const seedDb = async () => {
  try {
    const db = await mongoose.connect(dbUri);
    console.log("Connected to DB");
    await SpotModel.deleteMany({});
    console.log("Cleaning previous Spots");

    //Seed
    const newSpot = new SpotModel({
      title: "Cool Spot",
      description: "Nice spot to drink tequila",
      location: "Pasto",
    });

      const seedData = await filterArray()
      await SpotModel.insertMany(seedData)

    // await newSpot.save();
    console.log("Seeds created!");
  } catch (e) {
    console.log(e);
  }
   return process.exit(0);
};

seedDb().then(()=>{
   mongoose.connection.close()
})
