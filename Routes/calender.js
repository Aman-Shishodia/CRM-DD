import express from 'express';
import { createReminder, deleteReminder, getAllReminders, updateReminder } from '../Controllers/calender.js';

const router = express.Router();

router.post('/createReminder', createReminder)

router.get('/getAllReminders/:userID', getAllReminders)

router.put('/updateReminder/:reminderID', updateReminder)

router.delete('/deleteReminder/:reminderID', deleteReminder)

export default router;