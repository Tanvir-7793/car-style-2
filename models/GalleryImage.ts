import mongoose, { Schema, models, model } from "mongoose";

const GalleryImageSchema = new Schema(
  {
    url: { type: String, required: true },          // Cloudinary secure URL
    publicId: { type: String, required: false },    // Cloudinary public_id (optional, for admin delete)
    description: { type: String, required: false }, // Optional caption
    category: { type: String, required: false, default: "General" }, // e.g. Wash, Detailing, Ceramic
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const GalleryImage = models.GalleryImage || model("GalleryImage", GalleryImageSchema);

export default GalleryImage;
