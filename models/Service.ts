import { Schema, models, model } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    type: { type: String, enum: ["washing", "premium"], required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: String },
    pricing: [
      {
        size: { type: String, required: true },
        price: { type: String, required: true },
      },
    ],
    features: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Service = models.Service || model("Service", ServiceSchema);

export default Service;

