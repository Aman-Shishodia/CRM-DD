import express from "express";
import { getCalls
    , getStream, getStreamById, getLeadById, getLeads, getTasks, getTaskById 
} from "../Controllers/Sales.js"
const router=express.Router();

router.get("/calls",getCalls);
router.get("/allstreams",getStream);
router.get("/stream/:id",getStreamById);
router.get("/leads",getLeads);
router.get("/lead/:id",getLeadById);
router.get("/alltasks",getTasks);
router.get("/task/:id",getTaskById);

export default router;