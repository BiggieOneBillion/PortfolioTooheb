import { useAuthStore } from "@/store/auth-store";
import { use } from "react";

// Dummy data for authentication simulation
export const DUMMY_ADMIN = {
  email: "admin@portfolio.com",
  password: "admin123",
};

// Simulate password verification
export function verifyPassword(inputPassword: string): boolean {
  return inputPassword === DUMMY_ADMIN.password;
}

// Generate a random 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simulate sending OTP via email (in production, use a real email service)
export async function sendOTPEmail(
  email: string,
  otp: string
): Promise<boolean> {
  console.log(`[v0] Simulating OTP email to ${email}: ${otp}`);
  // In production, integrate with services like SendGrid, Resend, or Nodemailer
  return true;
}

// Generate a random session token
export function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Store for dummy OTPs (in-memory for simulation)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export function storeDummyOTP(email: string, otp: string): void {
  useAuthStore.getState().setEmail(email); // Store email in Zustand store for client-side access
  // otpStore.set(email, {
  //   otp,
  //   expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  // });
  useAuthStore.getState().setOtpToken(otp); // Store OTP in Zustand store for client-side access
}

export function verifyDummyOTP(email: string, inputOTP: string): boolean {
  // const stored = otpStore.get(email);
  // if (!stored) return false;

  if (useAuthStore.getState().email === null) return false;

  if (Date.now() > useAuthStore.getState().otpToken?.expiresAt!) {
    useAuthStore.getState().clearMail();
    return false;
  }

  const isValid = useAuthStore.getState().otpToken?.otp === inputOTP;
  if (isValid) {
    useAuthStore.getState().clearMail();
  }
  return isValid;
}

// Store for dummy sessions (in-memory for simulation)
const sessionStore = new Map<string, { email: string; expiresAt: number }>();

export function storeDummySession(token: string, email: string): void {
  sessionStore.set(token, {
    email,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function verifyDummySession(token: string): string | null {
  const session = sessionStore.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    sessionStore.delete(token);
    return null;
  }

  return session.email;
}

export function deleteDummySession(token: string): void {
  sessionStore.delete(token);
}
