import { Case } from "../models/Cases.js";

export const getCases = async (req,res)=>{
    try {
        const u_id = req.params.uid;
        const cases = await Case.find({user : u_id});
        return res.status(201).json(cases);

    }catch(e){
        return res.status(201).send("User not Found!!");
    }
}

export const createCase = async (req,res)=>{
    try {
        const {name,companyName,description,status,priority,contact,account} = req.body;
        const u_id = req.params.uid;
        console.log(u_id+"  HEloo");
        console.log(Case);
        let newCase = await Case.create({
            user:u_id,
            name: name,
            description: description,
            status : status,
            contact : contact,
            priority : priority,
            account:account,
            companyName:companyName
        });
        console.log("Created");
        return res.status(201).json(newCase);

    } catch(e){
       return  res.status(400).send("Failed to Create!!")
    }
}

export const deleteCase = async (req,res)=>{
    try {
        let deletedCase = await Case.findByIdAndDelete(req.params.cid);
        return res.status(201).json(deletedCase);
    } catch(e){
        return res.status(400).send("Failed to Delete!!")
    }
}

export const updateCase = async(req,res)=>{
    try {
        const c_id = req.params.cid;
        const {name,companyName,description,status,priority,contact,account} = req.body;
        let updatedCase = await Case.findByIdAndUpdate(c_id,{$set : {
            // user: u_id,
            name: name,
            description: description,
            status : status,
            contact : contact,
            priority : priority,
            account:account,
            companyName:companyName
        }
        });
        return res.status(201).json(updatedCase);
    }catch (e){
        res.status(404).send("Failed to Update!!");
    }
}

export const filterCases = async (req,res)=>{
    try {
        const u_id = req.params.uid;
        const f_id = req.params.fid;
        console.log("Filter : "+f_id)
        const cases = await Case.find({status : f_id});
        return res.status(201).json(cases);

    }catch(e){
        return res.status(201).send("User not Found!!");
    }
}