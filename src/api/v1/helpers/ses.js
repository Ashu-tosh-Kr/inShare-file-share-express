import { config } from "dotenv";
config();
import SES from "aws-sdk/clients/ses.js";

const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const ses = new SES({
  region,
  accessKeyId,
  secretAccessKey,
});

const sendMail = async ({ from, to, subject, text, html }) => {
  const params = {
    Source: "kr.ashu465@gmail.com",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Charset: "utf-8",
        Data: subject,
      },
      Body: {
        Html: {
          Charset: "utf-8",
          Data: html,
        },
      },
    },
  };
  return ses.sendEmail(params).promise();
};
export default sendMail;
