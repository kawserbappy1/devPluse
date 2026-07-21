import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  dbConnection: process.env.DB_CONNECTION_STRING,
  accessToken: process.env.ACCESS_TOKEN,
  refrehToken: process.env.REFRESH_TOKEN,
};

export default config;
