// const Call =require("../schema/Call##");
// const Stream =require("../schema/Stream##");
// import Lead from "../schema/Lead##"
// import Task from "../schema/Ta##"

export const getCalls = async(req,res)=>{
    try {
        const data = await Call.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const getStream=async(req,res)=>{
    try {
        const data = await Stream.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const getStreamById=async(req,res)=>{
    try {
        const id = req.parama.id;
        const data = await Communication.findById({_id:id})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const getLeads=async(req,res)=>{
    try {
        const data = await Lead.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

}

export const getLeadById = async(req,res)=>{
    try {
      const { id } = req.params;
      const data = await Lead.findById({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

export const getTasks=async(req,res)=>{
    try {
        const data = await Task.find({ _id: id });
        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
}

export const getTaskById = async(req,res)=>{
    try {
      const { id } = req.params;
      const data = await Task.findById({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
}
