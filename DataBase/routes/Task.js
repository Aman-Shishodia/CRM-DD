const express = require('express');
// const router = express.Router();
const Task = require('../models/Tasks.js');
const User = require('../models/User.js');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const u_id = req.params.uid;
        const tasks = await Task.find({user : u_id});
        return res.status(201).json(tasks);

    }catch(e){
        return res.status(201).send("User not Found!!");
    }
})
router.post('/create', async (req, res) => {
    try {
        const { title, description, status , priority,dueDate } = req.body;
        const u_id = req.params.uid;
        let tas = await Task.create({
            user: u_id,
            title: title,
            description: description,
            status : status,
            dueDate : dueDate,
            priority : priority

        });
        return res.status(201).json(tas)

    } catch(e){
       return  res.status(400).send("Failed to Create!!")
    }
})
router.delete('/delete/:tid', async(req, res) => {
    try {
        let dtask = await Task.findByIdAndDelete(req.params.tid);
        return res.status(201).json(dtask);
    } catch(e){
        return res.status(400).send("Failed to Delete!!")
    }
})
router.put('/update/:tid', async (req, res) => {
    try {
        const t_id = req.params.tid;
        const { title, description, status , priority,dueDate } = req.body;
        let tas = await Task.findByIdAndUpdate(t_id,{$set : {
            title: title,
            description: description,
            status : status,
            dueDate : dueDate,
            priority : priority
        }
        });
        return res.status(201).json(tas);
    }catch (e){
        res.status(404).send("Failed to Delete!!");
    }
})

module.exports = router;