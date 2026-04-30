import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(_req: NextRequest) {
  try {
    // Fetch resources from Cloudinary
    // You can customize this to fetch from a specific folder or with specific tags
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: '', 
      max_results: 100,
      sort_by: 'created_at',
      direction: 'desc',
      context: true
    });

    const images = result.resources.map((resource: any) => ({
      _id: resource.public_id,
      url: resource.secure_url,
      description: resource.context?.custom?.alt || "", // Try to get alt text from context
      category: resource.folder || "General", // Use folder name as category if available
      createdAt: resource.created_at,
    }));

    return NextResponse.json({ 
      success: true, 
      count: images.length, 
      images 
    });
  } catch (error) {
    console.error("Gallery fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch gallery images from Cloudinary" },
      { status: 500 }
    );
  }
}
