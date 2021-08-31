import { Router } from "express";
import downloadRouter from "./routes/download.js";
import filesRouter from "./routes/files.js";
import mailRouter from "./routes/mail.js";
import showRouter from "./routes/show.js";

const routes = () => {
  const router = Router();
  router.use("/files", filesRouter);
  router.use("/show", showRouter);
  router.use("/download", downloadRouter);
  router.use("/mail", mailRouter);
  return router;
};
export default routes;
