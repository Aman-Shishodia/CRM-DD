const Lead =require("../schema/Leadschema");


const getleads = async (req,res)=>{
    try {
        const data = await Lead.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getleadbyid = async (req,res)=>{
    try {
        const { id } = req.params;
        const data = await Lead.findById({ _id: id });
        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
}

const addlead = async (req,res)=>{
    try {
        const {
          title,
          description,
          status,
          value,
          probability,
          closeDate,
          account,
          contacts,
          activities,
          createdBy,
        } = req.body;
        const data = await Lead({
          title,
          description,
          status,
          value,
          probability,
          closeDate,
          account,
          contacts,
          activities,
          createdBy,
        }).save();
        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
}

const editlead = async(req,res)=>{
    try {
        const {id}=req.body;
        const {
            title,
            description,
            status,
            value,
            probability,
            closeDate,
            account,
            contacts,
            activities,
            createdBy,
          } = req.body;
          const predata = await Lead.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).send(predata);
    } catch (error) {
        res.status(400).send(error)
    }
}

const searchlead = async (req,res)=>{
    try {
        const data = await Lead.find({
          $or: [
            { title: { $regex: req.params.key } },
           
          ],
        });
        res.status(200).send(data);
      } catch (error) {
        res.status(400).send(error);
      }
}

const deletelead = async (req,res)=>{
    const { id } = req.params;
  
    try {
      const data = await Lead.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
}

module.exports={
    getleads,
    addlead,
    searchlead,
    deletelead,
    editlead,
    getleadbyid
};