import mongoose from "mongoose";
import config from "config";

const dbUri = config.get<string>("dbUri");

async function connect() {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default connect;
