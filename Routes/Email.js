import express from 'express';
import { Emailsend, Emailstatus, OpenedEmail } from '../Controllers/Email';

const router = express.Router();

router.post('/send',Emailsend);

router.get('/status/:emailID',Emailstatus);

router.post('/opened/:emailID',OpenedEmail);



export default router;