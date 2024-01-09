
import { Invoice } from "../models/Invoice"

export const getallinvoices = async(req,res)=>{
    try {
        const data = await Invoice.find({})
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}


export const getInvoice = async(req,res)=>{
    try {
      const { id } = req.params;
      const data = await Invoice.findById({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }

export const createInvoice = async (req, res) => {
    try {
      const {
        name,
          order,
          status,
          amount,
          account,
          quote,
            date,
            opportunity,
            address,
          contact,
          tax
      } = req.body;
      const data = await Invoice({
        name,
        order,
        status,
        amount,
        account,
        quote,
          date,
          opportunity,
          address,
        contact,
        tax
      }).save();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  };

export const editInvoice = async(req,res)=>{
    try {
        const {id}=req.body;
        const {
            name,
            order,
            status,
            amount,
            account,
            quote,
              date,
              opportunity,
              address,
            contact,
            tax
          } = req.body;
          const predata = await Invoice.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          res.status(200).send(predata);
    } catch (error) {
        res.status(400).send(error)
    }
}


export const deleteInvoice =  async (req, res) => {
    const { id } = req.params;
  
    try {
      const data = await Invoice.findByIdAndDelete({ _id: id });
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send(error);
    }
  }
