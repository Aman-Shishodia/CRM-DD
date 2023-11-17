import mailjet from 'node-mailjet';
import { User } from '../models/User.js';
import { Email } from '../models/Email.js';


export const Emailsend = async (req, res) => {
    const {userID, senderEmail, receiverEmail, subject, textPart } = req.body;
    try {

        const userauth = await User.findOne({ _id : userID});
        if(!userauth){
            return res.status(401).json({msg: "Unauthorized"});
        }
        const Sender = await User.findOne({email:senderEmail});
        const Reciver = await User.findOne({email:receiverEmail});

        if(Sender && Reciver){
            const newMailrecived = await Email.create({
                subject : subject,
                body: textPart,
                sender: senderEmail,
                receiver : receiverEmail
            })
            console.log('new email created', newMailrecived);
            return res.status(201).json({
                message:'email sent successfully'
            })
        }
        else{
            return res.status(400).json({
                message:'User not found'
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }
};

export const getemails = async(req,res)=>{
    const {senderEmail} = req.body;

    try {
        const email = await Email.find({sender: senderEmail});
        // console.log(email);
        if(email){
            return res.status(200).json({
                emails: email
            })
        }
        else{
            return res.status(400).json({
                message: "No mails"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const Emailstatus = async (req, res) => {
    const emailID = req.params.emailID;
    try {
        const email = await Email.findOne({_id : emailID});
        if(!email){
            return res.status(400).json({
                message:"Email Not Found!"
            })
        }

        return res.status(200).json({
            // email : email,
            status : email.status
        })
    } catch (error) {
        console.log(error);
    }
}

export const OpenedEmail = async (req, res) => {
    const emailID = req.params.emailID;
    try {
        const email = await Email.findOne({_id : emailID});
        if(!email){
            return res.status(400).json({
                message:"Email Not Found!"
            })
        }

    } catch (error) {
        
    }
}




//status kab kab change hogaa
//mail delete(to trash)
//specific email detail
//Email send me attachment
//send mail to multiple users