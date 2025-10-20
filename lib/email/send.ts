// lib/email/send.ts
import { nodemailer } from "nodemailer";
import { adminLoginOtpTemplate } from "./templates";

type SendEmailArgs = {
  to: string;
  subject?: string;
  html?: string;
  template?: "adminLoginOtp";
  templateData?: Record<string, any>;
};

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = (process.env.SMTP_SECURE || "false").toLowerCase() === "true";

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP configuration in environment variables");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendEmail(args: SendEmailArgs) {
  const transporter = getTransporter();

  // Build message from template if requested
  let subject = args.subject || "";
  let html = args.html || "";

  if (args.template === "adminLoginOtp") {
    const { subject: s, html: h } = adminLoginOtpTemplate({
      name: args.templateData?.name ?? "User",
      email: args.templateData?.email ?? args.to,
      otp: args.templateData?.otp,
    });
    subject = subject || s;
    html = html || h;
  }

  if (!subject) subject = `Message from ${process.env.EMAIL_FROM ?? "App"}`;
  if (!html) html = `<p>No content</p>`;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: args.to,
    subject,
    html,
  });

  return info;
}
