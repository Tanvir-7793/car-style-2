import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import { rateLimit, getClientIp, honeypotCheck } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot - silently accept but don't save (fool bots)
    if (honeypotCheck(body)) {
      return NextResponse.json({ success: true, booking: null }, { status: 201 });
    }

    // Rate limit: 5 bookings per 10 minutes per IP
    const ip = getClientIp(req);
    const rl = rateLimit(`booking:${ip}`, 5, 10 * 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, message: "Too many booking attempts. Please try again in a few minutes." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.retryAfterMs || 60000) / 1000)),
            "X-RateLimit-Remaining": String(rl.remaining),
          },
        }
      );
    }

    // Strict validation
    if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.trim().length > 80) {
      return NextResponse.json({ success: false, message: "Invalid name" }, { status: 400 });
    }
    if (!/^[0-9]{10}$/.test(String(body.phone).replace(/\s/g, ""))) {
      return NextResponse.json({ success: false, message: "Invalid mobile number - must be 10 digits" }, { status: 400 });
    }
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ success: false, message: "Invalid email address" }, { status: 400 });
    }

    await dbConnect();

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

