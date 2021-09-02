import express from "express";
import routes from "./api/v1/index.js";
// import routesv2 from "./api/v2/index.js";
import config from "./config/index.js";

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  const app = express();
  await config(app);
  app.use("/api/v1", routes());
  // app.use("/api/v2", routesv2());
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};
startServer();
