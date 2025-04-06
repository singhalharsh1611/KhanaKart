import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date,
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otpSchema);
export default otpModel;
