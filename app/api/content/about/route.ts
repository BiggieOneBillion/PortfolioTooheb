import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { AboutPageContent } from "@/lib/models/page-content.model";

export async function GET() {
  try {
    await connectDB();

    const aboutInfo = await AboutPageContent.find();

    if (aboutInfo && aboutInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for about info" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: aboutInfo[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch about content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    await connectDB();

    const aboutInfo = await AboutPageContent.find();

    if (aboutInfo && aboutInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for about info" },
        { status: 404 }
      );
    }

    const { updatedAt, ...others } = body;

    await AboutPageContent.updateOne(
      { _id: aboutInfo[0]._id },
      { $set: { ...others } }
    );

    const updated = await AboutPageContent.findById(aboutInfo[0]._id).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update about content" },
      { status: 500 }
    );
  }
}
