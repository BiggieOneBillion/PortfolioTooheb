import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/constants";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(COOKIE_NAME)?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { message: "No active session" },
        { status: 400 }
      );
    }

    cookieStore.delete(COOKIE_NAME);

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
