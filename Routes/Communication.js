import express from 'express';
import {getallCommunication, getCommunication, createCommunication, editCommunication, deleteCommunication} from '../Controllers/Communication.js'

const router = express.Router();

router.get("/all-communication",getallCommunication)

router.get("/communication/:id",getCommunication)

router.post("/add-communication",createCommunication)

router.patch("/edit-communication/:id",editCommunication)

router.delete("/delete-communication/:id",deleteCommunication)

export default router;