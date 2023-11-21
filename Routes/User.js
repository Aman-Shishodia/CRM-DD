import { changePassword, deleteuser, fetchProfile, fetchallUsers, login, resetpassword, signup, updateUser } from '../Controllers/User.js';
import express from 'express';

const router = express.Router();

router.post('/signup', signup)

router.post('/login', login)

router.get('/profile/:userID', fetchProfile)

router.get('/allusers', fetchallUsers)

router.put('/updateuser/:userID', updateUser)

router.put('/change-password/:userID', changePassword)

router.put('/reset-password/:userID', resetpassword)

router.delete('/delete-user/:userID', deleteuser)

export default router;