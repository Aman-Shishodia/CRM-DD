import express from 'express';
import { getstreamdata } from '../Controllers/Stream';

const router = express.Router()

router.get("/streams",getstreamdata)

export default router;