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
import { AdminSchema } from "@/lib/validations/admin";
import bcrypt from "bcryptjs";

interface RequestBody {
  email: string;
  password: string;
  confirm_password: string;
}

const SALT_ROUNDS = 12;

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const isValid = AdminSchema.parse(body);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    await connectDB();

    // Check if admin already exists
    const existingAdmin = await AdminModel.find();

    if (existingAdmin.length > 0) {
      return NextResponse.json(
        { message: "Admin Already Exist" },
        { status: 400 }
      );
    }

    // hash password
    const hashed = await bcrypt.hash(isValid.password, SALT_ROUNDS);

    // Create new admin
    const newAdmin = new AdminModel({
      email: isValid.email,
      passwordHash: hashed,
    });

    await newAdmin.save();

    return NextResponse.json({
      message: "Admin created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
