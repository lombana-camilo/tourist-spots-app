import mongoose from "mongoose";
import config from "config";

const dbUri = config.get<string>("dbUri");
const db_url = config.get<string>("DB_URL")

async function connect() {
  try {
    const db = await mongoose.connect(db_url || dbUri);
      // console.log(db.connections)
    console.log("Connected to DB");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default connect;
