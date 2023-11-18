const express = require("express");
const router = express.Router();

const { getleads, deletelead, searchlead, editlead, addlead, getleadbyid} =require("../controller/Lead")

router.get("/lead",getleads);

router.get("/lead/:id",getleadbyid)

router.post("/add-lead", addlead);

router.patch("/edit-lead/:id",editlead)

router.get("/search-lead/:key", searchlead);

router.delete("/delete-lead/:id", deletelead);

module.exports= router