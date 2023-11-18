const Communication =require("../schema/Communicationschema");

const getcommunication = async(req,res)=>{ 
    try {
        const data = await Communication.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }

}

const getcommunicationbyid=async(req,res)=>{
    try {
        const { id } = req.params;
        const data = await Communication.findById({ _id: id });
        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
}

const addcommunication = async(req,res)=>{
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

const editcommunication = async (req,res)=>{
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

const deletecommunication = async(req,res)=>{
    const { id } = req.params;
  
    try {
      const data = await Communication.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
}

module.exports={
    addcommunication,
    editcommunication,
    getcommunication,
    getcommunicationbyid,
    deletecommunication
}