const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MongoDB connection string
mongoose
  .connect("mongodb://127.0.0.1:27017/CRMDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CRM Database Connected"))
  .catch((error) => console.log("Connection error", error));

// User Schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    }, // Assuming a user belongs to an account
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Make sure to hash passwords
    role: String,
    mobileNumber: String,
    profileImage: String, // You could store the image URL or binary data
    dob: Date,
    gender: String,
    address: String,
    linkedIn: String,
  },
  { timestamps: true }
);

// Sales/Leads Schema
const leadSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "in_progress", "won", "lost"],
      default: "new",
    },
    value: Number,
    probability: Number,
    closeDate: {
      type: Date,
      required: true,
    },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    contacts: [{ type: Schema.Types.ObjectId, ref: "Contact" }], // Assuming a Contact schema exists
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }], // Assuming an Activity schema exists
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: "creatingDate" } }
);

// Customer Accounts Schema
const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: String,
    dob: {
      type: Date,
      required: true,
    },
    profileImage: String, // As with User, could be a URL or binary data
  },
  { timestamps: true }
);

// Email Schema
const emailSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: {
    type: String,
    required: true,
  }, // Assuming a simple string. For multiple receivers, use [String]
  status: {
    type: String,
    enum: ["sent", "delivered", "opened", "clicked", "bounced"],
    default: "sent",
  }, // Again, consider an enum
  sendingDate: { type: Date, default: Date.now },
});

// Communication Schema
const communicationSchema = new Schema({
  type: {
    type: String,
    enum: ["call", "meeting", "email", "social_media"],
    required: true,
  }, // Enum could be used here too
  details: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  outcome: String,
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Task Schema
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    assignedDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "completed", "deferred"],
      default: "open",
    }, // Enum is advisable
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Create models from schemas
const User = mongoose.model("User", userSchema, "User");
const Lead = mongoose.model("Lead", leadSchema, "Lead");
const Account = mongoose.model("Account", accountSchema, "Account");
const Email = mongoose.model("Email", emailSchema, "Email");
const Communication = mongoose.model(
  "Communication",
  communicationSchema,
  "Communication"
);
const Task = mongoose.model("Task", taskSchema, "Task");

// Export the models
module.exports = {
  User,
  Lead,
  Account,
  Email,
  Communication,
  Task,
};
