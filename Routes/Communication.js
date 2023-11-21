const express = require("express");
const { getallCommunication, getCommunication, createCommunication, editCommunication, deleteCommunication } = require("../Controllers/Communication");

const router = express.Router();

router.get("/all-communication",getallCommunication)

router.get("/communication/:id",getCommunication)

router.post("/add-communication",createCommunication)

router.patch("/edit-communication/:id",editCommunication)

router.delete("/delete-communication/:id",deleteCommunication)

export default router;