import { createQuote, deleteQuote, editQuote, getQuote, getallquotes } from "../Controllers/quotes";

const express = require("express");

const router = express.Router();

router.get('/allquotes',getallquotes);

router.get('/quote/:id',getQuote);

router.post('/create-quote',createQuote);

router.patch('edit-quote/:id',editQuote);

router.delete('/delete-quote/:id',deleteQuote);

export default router;