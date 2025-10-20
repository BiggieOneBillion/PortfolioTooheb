// lib/email/templates.ts
export type AdminCreatedTemplateData = {
  name: string;
  email: string;
  temporaryPassword?: string;
  loginUrl?: string;
  supportEmail?: string;
  companyName?: string;
};

export type AdminLoginOtpTemplate = {
  name: string;
  email: string;
  otp: string;
};

export function adminLoginOtpTemplate(data: AdminLoginOtpTemplate) {
  const { name, email, otp } = data;

  const subject = `Admin Login OTP`;

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title>${subject}</title>
      <style>
        /* Basic inline-friendly styles */
        body { font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial; margin:0; padding:0; background:#f6f8fa; color:#333; }
        .container { max-width:600px; margin:24px auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(16,24,40,0.05); }
        .header { padding:20px; background: linear-gradient(90deg,#0ea5a4,#6366f1); color:white; text-align:left; }
        .content { padding:24px; }
        h1 { margin:0 0 8px 0; font-size:20px; }
        p { margin:0 0 12px 0; line-height:1.5; }
        .btn { display:inline-block; padding:10px 16px; border-radius:6px; text-decoration:none; color:white; background:#111827; margin-top:12px; }
        .footer { padding:16px; font-size:13px; color:#6b7280; text-align:center; background:#fbfdff; }
        .muted { color:#6b7280; font-size:13px; }
        .code { background:#f3f4f6; padding:8px 10px; border-radius:6px; display:inline-block; font-family:monospace; }
      </style>
    </head>
    <body>
      <div class="container" role="article" aria-label="${subject}">
        <div class="header">
          <strong>OTP LOGIN CODE</strong>
        </div>

        <div class="content">
          <h1>Welcome, ${escapeHtml(name)}!</h1>
          <p>Your admin account has been created with the email <strong>${escapeHtml(
            email
          )}</strong>.</p>

          ${
            otp
              ? `<p>Your Login OTP code is: <span class="code">${escapeHtml(
                  otp
                )}</span>. Expires in 10 minutes</p>`
              : ""
          }

        

        <div class="footer">
          &copy; ${new Date().getFullYear()} ${escapeHtml(
    "Raymond.co.ng"
  )}. All rights reserved.
        </div>
      </div>
    </body>
  </html>`;

  return { subject, html };
}

/** small helpers to avoid unescaped content in the template */
function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
function escapeAttr(unsafe: string) {
  return escapeHtml(unsafe).replace(/"/g, "&quot;");
}
