
import { Quote } from "../models/Quote"

export const getallquotes = async(req,res)=>{
    try {
        const data = await Quote.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}


export const getQuote = async(req,res)=>{
    try {
      const { id } = req.params;
      const data = await Quote.findById({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

export const createQuote = async (req, res) => {
    try {
      const {
        name,
          status,
          opportunity,
          amount,
          account,
          date,
          address,
          contact,
          tax
      } = req.body;
      const data = await Quote({
        name,
        status,
        opportunity,
        amount,
        account,
        date,
        address,
        contact,
        tax
      }).save();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  };

export const editQuote = async(req,res)=>{
    try {
        const {id}=req.body;
        const {
            name,
            status,
            opportunity,
            amount,
            account,
            date,
            address,
            contact,
            tax
          } = req.body;
          const predata = await Quote.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).send(predata);
    } catch (error) {
        res.status(400).send(error)
    }
}


export const deleteQuote =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const data = await Quote.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
