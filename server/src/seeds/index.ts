import mongoose from "mongoose";
import SpotModel from "./../models/spot.model";
import config from "config";
import filterArray from "./api";
import UserModel from "./../models/users.models";

const dbUri = config.get<string>("dbUri");
const seedDb = async () => {
  try {
    const db = await mongoose.connect(dbUri);
    console.log("Connected to DB");
    await SpotModel.deleteMany({});
    console.log("Cleaned previous Spots");
    await UserModel.deleteMany({});
    console.log("Cleaned previous Users");

    const admin = await UserModel.create({
      username: "admin",
      password: "admin123",
      email: "admin@mail.com",
    });
    console.log("Created admin user, admin@mail.com, pw:admin123");

    //Seed
    const seedData = await filterArray(admin._id);
    await SpotModel.insertMany(seedData);

    console.log("Seeds created!");
  } catch (e) {
    console.log(e);
  }
  return process.exit(0);
};

seedDb().then(() => {
  mongoose.connection.close();
});
