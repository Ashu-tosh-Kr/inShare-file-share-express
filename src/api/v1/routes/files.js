import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid4 } from "uuid";
import fileModel from "../models/fileModel.js";
const filesRouter = Router();

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 * 100 },
}).single("file");

filesRouter.post("/", upload, async (req, res) => {
  //METHOD 1: using upload as function
  //store file
  upload(req, res, async (err) => {
    if (err) res.status(500).json({ error: err.message });
    //validate request
    if (!req.file) {
      res.json({ error: "All fields are required" });
    }
    //update db
    const file = await fileModel.create({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    //response -> link
    res
      .status(200)
      .json({ file: `${process.env.APP_BASE_URL}/files/${file.uuid}` });
  });
});

export default filesRouter;
