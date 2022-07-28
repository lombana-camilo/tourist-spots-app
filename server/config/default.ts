import "dotenv/config";

const { DB_NAME, DB_HOST, API_KEY, API_HOST } = process.env;
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;

export default {
  dbUri,
  port: 4000,
  API_KEY,
  API_HOST,
   originUrl:"http://localhost:5173"
};
