import { NextResponse } from "next/server";
import { parse } from "cookie";
import { verifyToken } from "./jwts";
import { COOKIE_NAME } from "./constants";
import { cookies } from "next/headers";

export async function protectedRouteMiddleware(req: Request) {
  const cookieStore = await cookies();
  const cookie = parse(req.headers.get("cookie") || "");
  const sessionToken = cookieStore.get(COOKIE_NAME)?.value;
  const token = cookie[COOKIE_NAME];
  if (!sessionToken || !token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = verifyToken(sessionToken || token);

    return { ok: true, payload };
  } catch (err) {
    return { ok: false, error: "Invalid token" };
  }
}
