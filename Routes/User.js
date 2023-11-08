import { changePassword, fetchProfile, fetchallUsers, login, signup, updateUser } from '../Controllers/User.js';
import express from 'express';

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/profile/:userID',fetchProfile)

router.get('/allusers',fetchallUsers)

router.put('/updateuser/:userID', updateUser)

router.put('/change-password/:userID', changePassword)

export default router;