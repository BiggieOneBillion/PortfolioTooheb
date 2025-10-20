// lib/cookies.ts
import { serialize, parse } from "cookie";
import { COOKIE_NAME } from "./constants";


export function clearAuthCookies() {
  return [
    serialize(COOKIE_NAME, "", { maxAge: -1, path: "/" }),
  ];
}

export function parseCookies(cookieHeader?: string | null) {
  if (!cookieHeader) return {};
  return parse(cookieHeader);
}