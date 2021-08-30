import { Router } from "express";
import filesRouter from "./routes/files.js";

const routes = () => {
  const router = Router();
  router.use("/files", filesRouter);
  return router;
};
export default routes;
