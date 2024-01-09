import User from "../models/User.js"
import Task from '../models/Task.js'
import Call from '../models/Call.js'
import Case from '../models/Cases.js'

export const getstreamdata = async (req,res)=>{
    try {
        const user = await User.find({firstname,lastname});
        const task = await Task.find({user});
        const call = await Call.find({name});
        const cases = await Case.find({name});
        res.status(200).send(user,task,call,cases);
    }catch(e){
        return res.status(201).send(e);
    }
}