import { config as dotEnvConfig } from "dotenv";
import dbConfig from "./dbConfig.js";
import middlewareConfig from "./middlewareConfig.js";

dotEnvConfig();

const config = async (app) => {
  middlewareConfig(app);
  await dbConfig();
};
export default config;
