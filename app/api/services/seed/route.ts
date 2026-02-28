import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Service from "@/models/Service";
import { washingServices, premiumServices } from "@/data/services";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function seedHandler(_req: NextRequest) {
  try {
    await dbConnect();

    const washingPayload = washingServices.map((svc) => ({
      slug: `washing-${svc.id}`,
      type: "washing" as const,
      title: svc.title,
      subtitle: svc.subtitle,
      description: svc.description,
      image: svc.image,
      pricing: svc.pricing,
      features: svc.features,
    }));

    const premiumPayload = premiumServices.map((svc) => ({
      slug: `premium-${slugify(svc.title)}`,
      type: "premium" as const,
      title: svc.title,
      subtitle: undefined,
      description: svc.description,
      image: svc.image,
      tag: svc.tag,
      pricing: [],
      features: svc.features,
    }));

    const all = [...washingPayload, ...premiumPayload];

    let upserted = 0;
    for (const svc of all) {
      await Service.findOneAndUpdate(
        { slug: svc.slug },
        { $set: svc },
        { upsert: true, new: true }
      );
      upserted += 1;
    }

    return NextResponse.json(
      { success: true, count: upserted },
      { status: 200 }
    );
  } catch (error) {
    console.error("Service seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed services" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return seedHandler(req);
}

export async function GET(req: NextRequest) {
  return seedHandler(req);
}


