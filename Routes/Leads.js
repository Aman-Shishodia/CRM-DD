import express from 'express';
import { createLead, deleteLead, editLead, getLead, getallLeads, searchLead } from "../Controllers/Leads.js";

const router = express.Router();

router.get('/allleads',getallLeads);

router.get('/lead/:id',getLead);

router.post('/create-lead',createLead);

router.patch('edit-lead/:id',editLead);

router.get('/search-lead/:key',searchLead);

router.delete('/delete-lead/:id',deleteLead);

export default router;