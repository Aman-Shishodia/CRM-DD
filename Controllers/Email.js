import { User } from "../models/User.js";
import { Email } from "../models/Email.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'E:/internship/CRM-DD/attachments');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export const Emailsend = async (req, res) => {

  try {
    upload.array('attachments', 5)(req, res, async (err) => {

      const { userID, senderEmail, subject, textPart } = req.body;
      const receiverEmails = req.body.receiverEmails.split(','); // receiverEmails is now an array

      const userauth = await User.findOne({ _id: userID });
      if (!userauth) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const Sender = await User.findOne({ email: senderEmail });

      // Validate all receiver emails
      const validReceivers = [];
      for (const email of receiverEmails) {
        const Receiver = await User.findOne({ email: email.trim() });
        if (Receiver) {
          validReceivers.push(email);
        }
      }
      if (err) {
        return res.status(400).json({ message: 'File upload error', error: err.message });
      }

      const attachments = req.files.map(file => ({
        filename: file.filename,
        path: file.path
      }))
      if (Sender && validReceivers.length > 0) {
        // Create an email for each valid receiver
        const emailPromises = validReceivers.map((receiverEmail) => {
          return Email.create({
            subject: subject,
            body: textPart,
            sender: senderEmail,
            receiver: receiverEmail,
            attachments: attachments
          });
        });
        await Promise.all(emailPromises);

        console.log("new emails created");
        return res.status(201).json({
          message: "Emails sent successfully",
        });
      } else {
        return res.status(400).json({
          message: "One or more users not found",
        });
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: error,
    });
  }
};

export const getemails = async (req, res) => {
  const { senderEmail } = req.body;

  try {
    const email = await Email.find({ sender: senderEmail });
    if (email) {
      return res.status(200).json({
        emails: email,
      });
    } else {
      return res.status(400).json({
        message: "No mails",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const Emailstatus = async (req, res) => {
  const emailID = req.params.emailID;
  try {
    const email = await Email.findOne({ _id: emailID });
    if (!email) {
      return res.status(400).json({
        message: "Email Not Found!",
      });
    }

    return res.status(200).json({
      // email : email,
      status: email.status,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const OpenedEmail = async (req, res) => {
  const emailID = req.params.emailID;
  try {
    const email = await Email.findOne({ _id: emailID });
    if (!email) {
      return res.status(400).json({
        message: "Email Not Found!",
      });
    }
    email.status = "opened";
    await email.save();
    return res.status(200).json({
      email: email,
      status: email.status,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const Emaildetail = async (req, res) => {
  const emailID = req.params.emailID;
  try {
    const email = await Email.findOne({ _id: emailID });
    if (!email) {
      return res.status(400).json({
        message: "Email Not Found!",
      });
    }

    return res.status(200).json({
      email: email,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const tagEmail = async (req, res) => {
  const emailID = req.params.emailID;
  try {
    const email = await Email.findById(emailID);
    if (!email) {
      return res.status(404).json({
        message: "Email Not Found!",
      });
    }
    email.tag = req.body.tag;
    await email.save();

    return res.status(200).json({
      status: "200",
    });
  } catch (err) {
    return res.status(404).json({
      message: "Email Not Found!",
    });
  }
};

//status kab kab change hogaa
//mail delete(to trash)
//specific email detail
//Email send me attachment
//send mail to multiple users
