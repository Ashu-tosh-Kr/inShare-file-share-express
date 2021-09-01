import Router from "express";
import sendMail from "../helpers/ses.js";
import emailTemplate from "../helpers/emailTemplate.js";
import fileModel from "../models/fileModel.js";
const mailRouter = Router();

mailRouter.post("/", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;
  //validate request
  if (!uuid || !emailFrom || !emailTo) {
    res.status(422).json({ error: "All fields are required" });
  }

  try {
    //get data from database
    const file = await fileModel.findOne({ uuid: uuid });

    if (file === null) {
      const err = new Error("Link has expired");
      err.statusCode = 404;
      throw err;
    }
    if (file.sender) {
      const err = new Error("Email already sent");
      err.statusCode = 422;
      throw err;
    }

    //send mail
    await sendMail({
      to: emailTo,
      from: emailFrom,
      subject: "inShare file sharing",
      text: `${emailFrom} shared a file with you`,
      html: emailTemplate({
        emailFrom,
        downloadLink: `${process.env.APP_BASE_URL}/api/v1/download/${file.uuid}`,
        size: parseInt(file.size / 1000) + "KB",
        expires: "24 hours",
      }),
    });

    file.sender = emailFrom;
    file.reciever = emailTo;
    await file.save();

    res.status(200).json({ msg: "mail sent" });
  } catch (err) {
    if (err) res.status(err.statusCode || 500).json({ error: err.message });
  }
});
export default mailRouter;
