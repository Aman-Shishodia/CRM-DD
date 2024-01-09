import express from 'express';
import { Emaildetail, Emailsend, Emailstatus, OpenedEmail, getemails, tagEmail } from '../Controllers/Email.js';

const router = express.Router();

router.post('/send',Emailsend);
router.get('/allemails',getemails);
router.get('/status/:emailID',Emailstatus);
router.post('/opened/:emailID',OpenedEmail);
router.get('/detail/:emailID',Emaildetail);
router.put('/update-tag/:emailID',tagEmail);

export default router;