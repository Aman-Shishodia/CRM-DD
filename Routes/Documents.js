import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  filteredDocuments,
  fullDocuments,
  getQuotes,
  getFolderDocuments,
  createFolder,
  deleteFolder
} from "../Controllers/Document.js";
import express from "express";

const router = express.Router();

router.get("/getDocuments/:userID", getDocuments);
router.get("/getDocuments/:userID/:folderID", getFolderDocuments);
router.post("/create/:userID", createDocument);
router.post("/createFolder/:userID", createFolder);
router.post("/update/:docID", updateDocument);
router.delete("/delete/:docID", deleteDocument);
router.delete("/deleteFolder/:userID/:folderID", deleteFolder);
router.get("/:filter/:userID", filteredDocuments);
router.get("/views/:userID", fullDocuments);
router.get("/quotes/:userID", getQuotes);

export default router;
