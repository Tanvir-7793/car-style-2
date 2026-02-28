import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";

export async function GET(_req: NextRequest) {
  try {
    await dbConnect();
    const services = await Service.find().lean();
    return NextResponse.json({ success: true, count: services.length, services });
  } catch (error) {
    console.error("Get services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

