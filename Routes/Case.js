import express from 'express';
import { createCase, deleteCase, getCases, updateCase, filterCases } from '../Controllers/Case.js';

const router = express.Router();

router.get('/getCases/:uid',getCases);

router.post('/create/:uid',createCase);

router.delete('/delete/:cid',deleteCase);

router.put('/update/:cid',updateCase);

router.get('/filter/:uid/:fid',filterCases);

export default router;