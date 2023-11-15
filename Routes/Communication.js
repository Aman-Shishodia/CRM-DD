const express = require("express");
const Communication =require("../schema/Communicationschema");

// const Lead = mongoose.model("Lead", leadSchema);

const router = express.Router();


router.get("/all-communication",async(req,res)=>{
    try {
        const data = await Communication.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/add-communication",async(req,res)=>{
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
})

router.patch("/edit-communication/:id",async(req,res)=>{
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
})

router.delete("/delete-communication/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const data = await Communication.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  });

module.exports= router