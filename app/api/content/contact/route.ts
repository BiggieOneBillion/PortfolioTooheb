import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { ContactPageContent } from "@/lib/models/page-content.model";

export async function GET() {
  try {
    await connectDB();

    const contactInfo = await ContactPageContent.find();

    if (contactInfo && contactInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for contact info" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contactInfo[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch contact content" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();


    await connectDB();

    const contactInfo = await ContactPageContent.find();

    if (contactInfo && contactInfo.length < 0) {
      return NextResponse.json(
        { success: true, message: "No data exist for contact info" },
        { status: 404 }
      );
    }

    const { updatedAt, ...others } = body;

    await ContactPageContent.updateOne(
      { _id: contactInfo[0]._id },
      { $set: { ...others } }
    );

    const updated = await ContactPageContent.findById(contactInfo[0]._id).lean();

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update contact content" },
      { status: 500 }
    );
  }
}
