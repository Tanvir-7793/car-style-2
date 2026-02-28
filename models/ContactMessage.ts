import { Schema, models, model } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);

export default ContactMessage;

