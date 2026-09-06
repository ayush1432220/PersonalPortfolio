import nodemailer from "nodemailer";

/**
 * Framework-agnostic contact-form logic.
 *
 * Shared by BOTH runtimes so validation/mail behaviour can't drift apart:
 *   - api/contact.js   → Vercel serverless function (production)
 *   - server/index.js  → local Express dev server
 *
 * Reads config from process.env, so it works with Vercel's dashboard env vars
 * and with a local server/.env identically.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"];

export function getMissingEnv() {
  return REQUIRED_ENV.filter((key) => !process.env[key]);
}

/**
 * Built lazily (not at module load) because serverless functions are re-used
 * across invocations but env vars are only guaranteed present at call time.
 */
function createTransporter() {
  const port = Number(process.env.SMTP_PORT);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

/**
 * Validates input and sends both emails.
 *
 * @returns {{ status: number, body: object }} — the caller adapts this to its own
 *   response API, so neither runtime needs to know the other's conventions.
 */
export async function handleContactSubmission(payload) {
  const { name, email, message } = payload || {};

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
    return {
      status: 400,
      body: { ok: false, error: "Please provide a valid name, email, and message." },
    };
  }

  const missing = getMissingEnv();
  if (missing.length > 0) {
    console.error(`[contact] Missing SMTP env vars: ${missing.join(", ")}`);
    return {
      status: 503,
      body: { ok: false, error: "The mail server isn't configured yet. Please email directly instead." },
    };
  }

  const transporter = createTransporter();

  try {
    // 1. Notify the site owner with the visitor's query.
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
  } catch (err) {
    console.error("[contact] Failed to send owner notification:", err.message);
    return {
      status: 502,
      body: { ok: false, error: "Failed to send the message. Please try again later." },
    };
  }

  // 2. Auto-confirmation to the visitor. Best-effort: the owner already has the
  //    query, so a failure here shouldn't surface as a failed submission.
  try {
    await transporter.sendMail({
      from: `"Ayush Chaurasiya" <${process.env.SMTP_USER}>`,
      to: email,
      replyTo: process.env.CONTACT_TO_EMAIL,
      subject: "Thanks for reaching out!",
      text: `Hi ${name},\n\nThanks for your message — I've received it and will get back to you soon.\n\nYour message:\n${message}\n\n— Ayush`,
      html: `<p>Hi ${name},</p><p>Thanks for your message — I've received it and will get back to you soon.</p><p style="color:#666"><strong>Your message:</strong><br/>${message.replace(
        /\n/g,
        "<br/>"
      )}</p><p>— Ayush</p>`,
    });
  } catch (confirmErr) {
    console.error("[contact] Failed to send visitor confirmation:", confirmErr.message);
  }

  return { status: 200, body: { ok: true } };
}
