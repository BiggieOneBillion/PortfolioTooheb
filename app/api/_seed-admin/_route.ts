import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import Admin from "@/lib/models/admin.model";
import connectDB from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    const secret = req.headers.get("x-seed-secret");
    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const existingAdmin = await Admin.find();
    
    if (existingAdmin && existingAdmin.length > 0) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

    const hashedPassword = await bcrypt.hash(adminPassword!, 10);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

    const admin = await Admin.create({
      email: adminEmail,
      passwordHash: hashedPassword,
    });

    return NextResponse.json({ message: "Admin created successfully", admin });
    
  } catch (error) {
    console.error("Error seeding admin:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
