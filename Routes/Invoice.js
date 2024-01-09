import { createInvoice, deleteInvoice, editInvoice, getInvoice, getallinvoices } from "../Controllers/Invoice";

const express = require("express");

const router = express.Router();

router.get('/allinvoices',getallinvoices);
router.get('/invoice/:id',getInvoice);
router.post('/create-invoice',createInvoice);
router.patch('edit-invoice/:id',editInvoice);
router.delete('/delete-invoice/:id',deleteInvoice);

export default router;