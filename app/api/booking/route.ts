import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      name,
      phone,
      email,
      city,
      vehicleModel,
      vehicleNumber,
      selectedService,
      selectedSize,
      pricing,
      date,
      timeSlot,
      paymentMethod,
    } = body;

    if (!name || !phone || !vehicleModel || !date || !timeSlot || !selectedService || !selectedSize || !pricing) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      name,
      phone,
      email,
      city,
      vehicleModel,
      vehicleNumber,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      serviceCategory: selectedService.category,
      basePrice: pricing.basePrice,
      carSizeId: selectedSize.id,
      carSizeName: selectedSize.name,
      carSizeMultiplier: selectedSize.multiplier,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      finalAmount: pricing.finalAmount,
      date,
      timeSlot,
      paymentMethod,
    });

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

