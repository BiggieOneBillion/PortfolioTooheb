import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import OtpModel from "@/lib/models/otp.model";
import AdminModel from "@/lib/models/admin.model";
import { signAccessToken } from "@/lib/jwts";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();

    if (!otp) {
      return NextResponse.json({ message: "OTP is required" }, { status: 400 });
    }

    await connectDB();

    const getAdminDetails = await AdminModel.find();

    if (!getAdminDetails || getAdminDetails.length === 0) {
      return NextResponse.json(
        { message: "No admin found. Please create an admin first." },
        { status: 404 }
      );
    }

    const adminDetails = getAdminDetails[0];

    const existingOtp = await OtpModel.findOne({
      email: adminDetails.email,
      otp: otp,
    });

    if (!existingOtp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 401 });
    }

    // if otp has expired
    const now = new Date();
    if (existingOtp.expiresAt < now) {
      await OtpModel.deleteOne({ _id: existingOtp._id });

      return NextResponse.json({ message: "OTP has expired" }, { status: 401 });
    }

    // Delete OTP after verification to prevent reuse
    await OtpModel.deleteOne({ _id: existingOtp._id });

    // // Generate session token
    // const sessionToken = generateSessionToken();

    // // Store session
    // storeDummySession(sessionToken, adminDetails.email);

    const payload = {
      sub: adminDetails.id.toString(),
      email: adminDetails.email,
    };

    const access = signAccessToken(payload);

    // Set cookie
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json({
      message: "Login successful",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
