import fs from "fs";
import { config } from "dotenv";
config();
import dbConfig from "./src/config/dbConfig.js";
import fileModel from "./src/api/v1/models/fileModel.js";

const fetchData = async () => {
  await dbConfig();
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await fileModel.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`Successfully delete ${file.filename}`);
      } catch (err) {
        console.log(`error deleting file ${err}`);
      }
    }
    console.log("Job done");
  }
};
fetchData()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
