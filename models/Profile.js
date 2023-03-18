import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    supplier_name: String,
    phone_number: String,
    email: String,
    address: String,
  },
  { strict: false }
);

module.exports =
  mongoose.models.profile ||
  mongoose.model("profile", profileSchema);