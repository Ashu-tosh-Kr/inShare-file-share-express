import { Router } from "express";
import fileModel from "../models/fileModel.js";

const showRouter = Router();

showRouter.get("/:uuid", async (req, res) => {
  try {
    const file = await fileModel.findOne({ uuid: req.params.uuid });
    // Link expired
    if (!file) {
      return res.render("download", { error: "Link has been expired." });
    }
    return res.render("download", {
      uuid: file.uuid,
      fileName: file.filename,
      fileSize: file.size,
      downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
    });
  } catch (err) {
    return res.render("download", { error: "Something went wrong." });
  }
});

export default showRouter;
