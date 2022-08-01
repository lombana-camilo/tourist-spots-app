import mongoose from "mongoose";
import config from "config";

const dbUri = config.get<string>("dbUri");

async function connect() {
  try {
    const db = await mongoose.connect(dbUri);
      // console.log(db.connections)
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default connect;
