const express = require("express");
const { getcommunication, getcommunicationbyid, addcommunication, editcommunication, deletecommunication } = require("../controller/Communication");
const router = express.Router();


router.get("/all-communication",getcommunication)

router.get("/communication/:id",getcommunicationbyid)

router.post("/add-communication",addcommunication)

router.patch("/edit-communication/:id",editcommunication)

router.delete("/delete-communication/:id", deletecommunication);

module.exports= router