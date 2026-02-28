import mongoose, { Schema, models, model } from "mongoose";

const BookingSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    city: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleNumber: { type: String, required: false },
    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    basePrice: { type: Number, required: true },
    carSizeId: { type: String, required: true },
    carSizeName: { type: String, required: true },
    carSizeMultiplier: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;

