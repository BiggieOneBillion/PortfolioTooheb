import { NextResponse } from "next/server";
import {
  DUMMY_ADMIN,
  verifyPassword,
  generateOTP,
  sendOTPEmail,
  storeDummyOTP,
} from "@/lib/auth-utils";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/lib/models/admin.model";

export async function GET(request: Request) {
  try {
    await connectDB();

    const admin = await AdminModel.find();

    if (admin.length > 0) {
      return NextResponse.json({ exists: true }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
