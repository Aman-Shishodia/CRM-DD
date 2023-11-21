import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../Controllers/Task';

const router = express.Router();

router.get('/gettask/:uid',getTasks);

router.post('/create/:uid',createTask);

router.delete('/delete/:tid',deleteTask);

router.put('/update/:tid',updateTask);

