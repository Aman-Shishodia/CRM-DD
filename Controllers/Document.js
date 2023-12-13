import { Document } from "../models/Document.js";
import { Account } from "../models/Account.js";
import { Quote } from "../models/Quote.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:\Users\devad\OneDrive\Desktop\Amuktha Malyada\attachments');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const upload = multer({ storage: storage });

export const getDocuments = async (req, res) => {
  try {
    const u_id = req.params.userID;
    const docs = await Document.find({ user: u_id });
    return res.status(201).json(docs);
  } catch (e) {
    return res.status(201).send("User not Found!!");
  }
};

export const getQuotes = async (req, res) => {
  try {
    console.log("Entered");
    const u_id = req.params.userID;
    const quotes = await Quote.find({ user: u_id });
    return res.status(201).json(quotes);
  } catch (e) {
    return res.status(201).send("User not Found!!");
  }
};


export const createDocument = async (req, res) => {
  try {
    const { description, status, name, folder } = req.body;
    const u_id = req.params.userID;
    let doc = await Document.create({
      user: u_id,
      description: description,
      status: status,
      name: name,
      folder: folder,
    });
    return res.status(201).json(doc);
  } catch (e) {
    return res.status(400).send("Failed to Create!!");
  }
};

export const deleteDocument = async (req, res) => {
  try {
    let deletedDocument = await Document.findByIdAndDelete(req.params.docID);
    return res.status(201).json(deletedDocument);
  } catch (e) {
    return res.status(400).send("Failed to Delete!!");
  }
};

export const updateDocument = async (req, res) => {
  try {
    const doc_id = req.params.docID;
    const { title, description, status, name, folder } = req.body;
    let updatedDocument = await Document.findByIdAndUpdate(doc_id, {
      $set: {
        description: description,
        status: status,
        name: name,
        folder: folder,
      },
    });
    return res.status(201).json(updatedDocument);
  } catch (e) {
    res.status(404).send("Failed to Delete!!");
  }
};
export const filteredDocuments = async (req, res) => {
  try {
    const doc_id = req.params.docID;
    const filter = req.params.filter;
    const { description, status, name, folder } = req.body;
    let filteredDocx = await Document.find({ status: filter });
    return res.status(201).json(filteredDocx);
  } catch (e) {
    res.status(404).send("Failed to Delete!!");
  }
};

export const fullDocuments = async (req, res) => {
  try {
    console.log("Hello");
    const u_id = req.params.userID;
    const docs = await Document.find({ user: u_id });
    const accounts = await Account.find({ user: u_id });

    if (docs.length > 0 || accounts.length > 0) {
      return res.status(200).json({ documents: docs, accounts: accounts });
    } else {
      return res.status(404).send("User not Found!!");
    }
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).send("Internal Server Error");
  }
};
