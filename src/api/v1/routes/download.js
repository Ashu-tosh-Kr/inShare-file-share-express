import { Router } from "express";
import fileModel from "../models/fileModel.js";
const downloadRouter = Router();

downloadRouter.get("/:uuid", async (req, res) => {
  const file = await fileModel.findOne({ uuid: req.params.uuid });
  if (!file) {
    res.render("download", { error: "Link has expired" });
  }
  // const filePath = new URL(`../../../../${file.path}`, import.meta.url)
  //   .pathname;
  const filePath = `${file.path}`;
  res.download(filePath);
});
export default downloadRouter;
