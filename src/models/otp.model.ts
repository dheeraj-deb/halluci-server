// otp.model.js

import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  otp: { type: String, required: true },
  phone: { type: String, required: true },
  used: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now, expires: '1m' }
}, { timestamps: true });

const OTP = mongoose.model('Otp', otpSchema);

export default OTP
