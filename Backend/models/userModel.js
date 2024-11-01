import mongoose from "mongoose";

// Define the schema for the Users
// Unique true means onece we have created the acconut from email Id second time we not able to do it
// In cartData we gave default becasue 
// Like we give default object in cartData it will automatically neglected by mongooe. So minimize: false tells the schema to keep empty objects in the document when saving to the database instead of removing them.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,
    default: {},    
  },
},
{
    minimize: false, 
});

const userModel = mongoose.models.users || mongoose.model("user", userSchema);

export default userModel;