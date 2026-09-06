import { handleContactSubmission } from "../server/contactCore.js";

/**
 * Vercel Serverless Function — POST /api/contact
 *
 * This is what actually runs in production. Vercel auto-detects files in /api and
 * deploys each as a function alongside the static Vite build, so the endpoint is
 * same-origin with the site. That means:
 *   - no separate backend host to deploy or pay for
 *   - no CORS config (same origin)
 *   - no VITE_API_URL baked into the bundle
 *
 * Required env vars (set in Vercel → Settings → Environment Variables):
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  // Vercel parses JSON bodies automatically, but be tolerant of a raw string body
  // (some clients/content-types skip the built-in parser).
  let payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ ok: false, error: "Invalid request body." });
    }
  }

  const { status, body } = await handleContactSubmission(payload);
  return res.status(status).json(body);
}
