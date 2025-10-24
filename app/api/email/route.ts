import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, dateLocation, message } = await req.json();

 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // e.g. Gmail SMTP
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // app password or SMTP password
      },
    });

    // 2️⃣ Compose message
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER, // your inbox
      subject: "New Contact Form Message",
      text: `
        Name: ${name}
        Email: ${email}
        Date & Location: ${dateLocation}
        Message:
        ${message}
      `,
      html: `
        <h3>New message from your portfolio site</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date & Location:</strong> ${dateLocation}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error: any) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message", error },
      { status: 500 }
    );
  }
}