import mongoose from "mongoose";
import bcrypt from "bcrypt";

const AddressSchema = new mongoose.Schema({
  place: {
    type: String,
    // required: true,
  },
  pincode: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: false,
  },
  shopname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: AddressSchema,

  verified: {
    type: Boolean,
    default: false,
  },
});



export default mongoose.model("User", UserSchema);
