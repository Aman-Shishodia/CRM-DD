import express from 'express';
import { Emailsend, Emailstatus, OpenedEmail, getemails } from '../Controllers/Email.js';

const router = express.Router();

router.post('/send',Emailsend);

router.get('/allemails',getemails);

router.get('/status/:emailID',Emailstatus);

router.post('/opened/:emailID',OpenedEmail);



export default router;