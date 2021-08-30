import { Router } from "express";
import filesRouter from "./routes/files.js";
import showRouter from "./routes/show.js";

const routes = () => {
  const router = Router();
  router.use("/files", filesRouter);
  router.use("/show", showRouter);
  return router;
};
export default routes;
