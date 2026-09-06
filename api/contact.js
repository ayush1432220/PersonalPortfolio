import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  // CORS Headers for API calls
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body || {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    name.length > 200 ||
    message.length > 5000 ||
    !EMAIL_RE.test(email)
  ) {
    return res.status(400).json({ ok: false, error: "Please provide a valid name, email, and message." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "[api/contact] Missing SMTP environment variables in Vercel Project Settings.",
      { SMTP_HOST: !!SMTP_HOST, SMTP_USER: !!SMTP_USER, SMTP_PASS: !!SMTP_PASS, CONTACT_TO_EMAIL: !!CONTACT_TO_EMAIL }
    );
    return res.status(503).json({
      ok: false,
      error: "Mail service is not configured yet. Please configure SMTP variables in Vercel settings or email directly.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: Number(SMTP_PORT) === 465 || Number(SMTP_PORT) === 0 || !SMTP_PORT,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    // 1. Send query to site owner
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${SMTP_USER}>`,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    // 2. Send confirmation to visitor (best effort)
    try {
      await transporter.sendMail({
        from: `"Ayush Chaurasiya" <${SMTP_USER}>`,
        to: email,
        replyTo: CONTACT_TO_EMAIL,
        subject: "Thanks for reaching out!",
        text: `Hi ${name},\n\nThanks for your message — I've received it and will get back to you soon.\n\nYour message:\n${message}\n\n— Ayush`,
        html: `<p>Hi ${name},</p><p>Thanks for your message — I've received it and will get back to you soon.</p><p style="color:#666"><strong>Your message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p><p>— Ayush</p>`,
      });
    } catch (confirmErr) {
      console.warn("[api/contact] Failed to send visitor confirmation email:", confirmErr.message);
    }

    return res.status(200).json({ ok: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("[api/contact] Failed to send email via Nodemailer:", err);
    return res.status(502).json({
      ok: false,
      error: "Failed to send the message. Please check SMTP credentials or try again later.",
    });
  }
}
