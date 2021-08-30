import { config as dotEnvConfig } from "dotenv";
import dbConfig from "./dbConfig.js";
import middlewareConfig from "./middlewareConfig.js";

const config = async (app) => {
  dotEnvConfig();
  middlewareConfig(app);
  await dbConfig();
};
export default config;
