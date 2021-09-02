import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuid4 } from "uuid";
import fs from "fs";

import { getFileStream, uploadFileToS3 } from "../helpers/s3.js";
import fileModel from "../models/fileModel.js";
const filesRouter = Router();

//multer config
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

//routes for image post and get
filesRouter.get("/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

filesRouter.post("/", upload, async (req, res) => {
  //METHOD 2: using upload as middleware
  //upload to s3
  const result = await uploadFileToS3(req.file);
  //delete local copy
  fs.unlinkSync(`./${req.file.path}`);
  //make db entry
  await fileModel.create({
    filename: req.file.filename,
    uuid: uuid4(),
    path: `${process.env.APP_BASE_URL}/api/v2/files/${result.Key}`,
    size: req.file.size,
  });
  //response
  res.status(200).json({ msg: "uploaded" });
});

export default filesRouter;
