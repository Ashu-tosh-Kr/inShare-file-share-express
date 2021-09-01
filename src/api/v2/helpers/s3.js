import config from "dotenv";
config();
import S3 from "aws-sdk/clients/s3.js";
import fs from "fs";
const bucketName = "inshare";
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//uploads a file to s3
export function uploadFileToS3(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

//downloads a file from s3
export function getFileStream(fileKey) {
  const downloadParams = {
    Bucket: bucketName,
    Key: fileKey,
  };
  return s3.getObject(downloadParams).createReadStream();
}
