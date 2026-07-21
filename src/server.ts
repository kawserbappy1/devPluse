import app from "./app";
import config from "./config";
import { initialDB } from "./db";

const main = async () => {
  try {
    await initialDB();
    app.listen(config.port, () => {
      console.log(`This Server is running from the ${config.port} port`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
