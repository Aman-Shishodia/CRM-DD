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
import multer from "multer";



const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:\\Users\\devad\\OneDrive\\Desktop\\Amuktha Malyada\\attachments');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/getDocuments/:userID", getDocuments);

router.get("/getDocuments/:userID/:folderID", getFolderDocuments);

router.post("/create/:userID", upload.single('attachments'), createDocument);

router.post("/createFolder/:userID", createFolder);

router.post("/update/:docID", updateDocument);

router.delete("/delete/:docID", deleteDocument);
router.delete("/deleteFolder/:userID/:folderID", deleteFolder);

router.get("/:filter/:userID", filteredDocuments);

router.get("/views/:userID", fullDocuments);

router.get("/quotes/:userID", getQuotes);

export default router;
