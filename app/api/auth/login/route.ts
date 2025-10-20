import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import AdminModel from "@/lib/models/admin.model";
import bcrypt from "bcryptjs";
import { signAccessToken } from "@/lib/jwts";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    connectDB();

    // get admin details
    const admin = await AdminModel.find();

    if (admin.length === 0) {
      return NextResponse.json(
        { message: "No admin found. Please create an admin first." },
        { status: 404 }
      );
    }

    // assuming single admin for now
    const adminDetails = admin[0];

    // verify password
    const isValid = await bcrypt.compare(password, adminDetails.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

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
