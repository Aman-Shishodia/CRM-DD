
import { Communication } from "../models/Communication.js"

export const getallCommunication = async(req,res)=>{
    try {
        const data = await Communication.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}


export const getCommunication = async(req,res)=>{
    try {
      const { id } = req.params;
      const data = await Communication.findById({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }


  export const createCommunication = async(req,res)=>{
    try {
        const {
            type,
              details,
              date,
              outcome,
              participants
        }=req.body;
        const data = await Communication({ type,
            details,
            date,
            outcome,
            participants}).save()
            res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const editCommunication = async(req,res)=>{
    try {
        const {id}=req.body;
        const {
            type,
            details,
            date,
            outcome,
            participants
          } = req.body;
          const predata = await Communication.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).send(predata);
    } catch (error) {
        res.status(400).send(error)
    }
}


export const deleteCommunication = async (req, res) => {
    const { id } = req.params;

    try {
      const data = await Communication.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
