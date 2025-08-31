import mongoose from "mongoose";

/**
 * userId:
 */
const contactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User", //this name came from user model to maker relation between them 1 -> 2
      required: true,
    },
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
