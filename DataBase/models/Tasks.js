const mongoose = require('mongoose');
const {Schema} = mongoose;
const TaskSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    title:{
        type: String,
        required : true
    },
    description:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: false
    },
    priority:{
        type: String,
        default: "Normal"
    },
    dueDate:{
        type: Date
    },
    assignedDate:{
        type: String,
        default:Date.now
    }
    // assignedTo:{
    //     type: Schema.Types.ObjectId,
    //     ref : "User"

    // }
})
module.exports = mongoose.model('Task',TaskSchema);

