import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const requiredEnvVars = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.warn(
    `\n[contact-server] Missing SMTP env vars: ${missingEnvVars.join(", ")}.\n` +
      "Copy server/.env.example to server/.env and fill in real values — " +
      "the /api/contact route will respond with an error until then.\n"
  );
}

const transporter =
  missingEnvVars.length === 0
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

app.post("/api/contact", async (req, res) => {
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

  if (!transporter) {
    return res.status(503).json({
      ok: false,
      error: "The mail server isn't configured yet. Please email directly instead.",
    });
  }

  try {
    // Notify the site owner with the visitor's query.
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });

    // Auto-confirmation to the visitor. Best-effort — don't fail the request if this part fails,
    // since the important part (the owner receiving the query) already succeeded.
    try {
      await transporter.sendMail({
        from: `"Ayush Chaurasiya" <${process.env.SMTP_USER}>`,
        to: email,
        replyTo: process.env.CONTACT_TO_EMAIL,
        subject: "Thanks for reaching out!",
        text: `Hi ${name},\n\nThanks for your message — I've received it and will get back to you soon.\n\nYour message:\n${message}\n\n— Ayush`,
        html: `<p>Hi ${name},</p><p>Thanks for your message — I've received it and will get back to you soon.</p><p style="color:#666"><strong>Your message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p><p>— Ayush</p>`,
      });
    } catch (confirmErr) {
      console.error("[contact-server] Failed to send visitor confirmation email:", confirmErr.message);
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("[contact-server] Failed to send email:", err.message);
    res.status(502).json({ ok: false, error: "Failed to send the message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`[contact-server] Listening on http://localhost:${PORT}`);
});
