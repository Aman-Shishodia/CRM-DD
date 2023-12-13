import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
  filteredDocuments,
  fullDocuments,
  getQuotes
} from "../Controllers/Document.js";
import express from "express";

const router = express.Router();

router.get("/getDocuments/:userID", getDocuments);

router.post("/create/:userID", createDocument);

router.post("/update/:docID", updateDocument);

router.delete("/delete/:docID", deleteDocument);

router.get("/:filter/:userID", filteredDocuments);

router.get("/views/:userID", fullDocuments);

router.get("/quotes/:userID", getQuotes);

export default router;
