import app from "./app";
import config from "./config";
import { initialDB } from "./db";

const main = () => {
  initialDB();
  app.listen(config.port, () => {
    console.log(`This Server is running from the ${config.port} port`);
  });
};

main();
