import { json } from "express";
// import helmet from "helmet";
// import morgan from "morgan";
import cors from "cors";
// import cookieParser from "cookie-parser";

const middlewareConfig = (app) => {
  // app.use(helmet());
  app.use(json());
  // app.use(morgan("common"));
  // app.use(cookieParser());
  app.use(cors());
};
export default middlewareConfig;
