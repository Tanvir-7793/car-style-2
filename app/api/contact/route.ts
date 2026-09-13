import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { rateLimit, getClientIp, honeypotCheck } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (honeypotCheck(body)) {
      return NextResponse.json({ success: true, contact: null }, { status: 201 });
    }

    const ip = getClientIp(req);
    const rl = rateLimit(`contact:${ip}`, 5, 10 * 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { success: false, message: "Too many messages. Please try again in a few minutes." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.retryAfterMs || 60000) / 1000)),
            "X-RateLimit-Remaining": String(rl.remaining),
          },
        }
      );
    }

    if (typeof body.name !== "string" || body.name.trim().length < 2 || body.name.trim().length > 80) {
      return NextResponse.json({ success: false, message: "Invalid name" }, { status: 400 });
    }
    if (!/^[0-9]{10}$/.test(String(body.phone).replace(/\s/g, ""))) {
      return NextResponse.json({ success: false, message: "Invalid mobile number" }, { status: 400 });
    }
    if (typeof body.message !== "string" || body.message.trim().length < 10 || body.message.trim().length > 1000) {
      return NextResponse.json({ success: false, message: "Message must be 10-1000 characters" }, { status: 400 });
    }

    await dbConnect();
    const { name, phone, subject, message } = body;

    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = await ContactMessage.create({
      name,
      phone,
      subject,
      message,
    });

    return NextResponse.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

