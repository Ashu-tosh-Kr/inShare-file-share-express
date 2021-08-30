import express from "express";
import routes from "./api/v1/index.js";
import config from "./config/index.js";

const startServer = async () => {
  const app = express();
  await config(app);
  app.use("api/v1", routes());
  app.listen(8080, () => console.log("Listening on port 8080"));
};
startServer();
