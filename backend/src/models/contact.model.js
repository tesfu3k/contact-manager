import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestaps: true }
);

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;
