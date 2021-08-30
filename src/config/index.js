import express from "express";
import { config as dotEnvConfig } from "dotenv";
import dbConfig from "./dbConfig.js";
import middlewareConfig from "./middlewareConfig.js";

const config = async (app) => {
  app.set("view engine", "ejs");
  app.use(express.static("public"));
  dotEnvConfig();
  middlewareConfig(app);
  await dbConfig();
};
export default config;
