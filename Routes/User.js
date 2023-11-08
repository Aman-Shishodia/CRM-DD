import { fetchProfile, fetchallUsers, login, signup } from '../Controllers/User.js';
import express from 'express';

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/profile/:userID',fetchProfile);

router.get('/allusers',fetchallUsers)

export default router;