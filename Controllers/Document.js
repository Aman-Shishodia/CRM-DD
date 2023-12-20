import { Document } from "../models/Document.js";
import { Account } from "../models/Account.js";
import { Folder } from "../models/DocumentFolder.js";
import { Quote } from "../models/Quote.js";

export const getDocuments = async (req, res) => {
  try {
    const u_id = req.params.userID;

    const docs = await Document.find({ user: u_id });
    const folders = await Folder.find({ user: u_id });
    return res.status(201).json({ docs, folders });
  } catch (e) {
    return res.send(e);
  }
};
export const getFolderDocuments = async (req, res) => {
  try {
    const u_id = req.params.userID;
    const f_id = req.params.folderID;

    const folder = await Folder.findById(f_id);
    const folderDocs = await Document.find({ user: u_id, folder: folder.name });

    return res.status(201).json({ folderDocs });
  } catch (e) {
    return res.send(e);
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
    console.log("ebtered 1");
    const { description, status, name, folder } = req.body;
    console.log("ebtered 2");
    const u_id = req.params.userID;
    console.log("ebtered" + u_id);
    console.log(req.description);
    console.log(req.body);
    let doc = await Document.create({
      user: u_id,
      description: description,
      status: status,
      name: name,
      folder: folder,
    });
    console.log("entered hello");
    return res.status(201).json(doc);
  } catch (e) {
    return res.status(400).send("Failed to Create!!");
  }
};

export const createFolder = async (req, res) => {
  try {
    const u_id = req.params.userID;

    let doc = await Folder.create({
      user: u_id,
      name: req.body.name,
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
export const deleteFolder = async (req, res) => {
  try {

    const u_id = req.params.userID;
    const folder = await Folder.findById(req.params.folderID);
    console.log("Entered");
    const folderDocs = await Document.deleteMany({ user: u_id, folder: folder.name });
    const delFolder = await Document.findByIdAndDelete(req.params.folderID);

    return res.status(201).json({ folderDocs, delFolder });
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
    res.send(e);
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
