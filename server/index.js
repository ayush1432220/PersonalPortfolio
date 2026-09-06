import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express";
import { handleContactSubmission, getMissingEnv } from "./contactCore.js";

/**
 * LOCAL DEVELOPMENT ONLY.
 *
 * Production uses the Vercel serverless function at api/contact.js — this server
 * just gives `npm run dev` the same /api/contact endpoint locally. Vite proxies
 * /api here (see vite.config.js), so the frontend calls the same relative URL in
 * both environments and no CORS handling is needed.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 5000;

const missing = getMissingEnv();
if (missing.length > 0) {
  console.warn(
    `\n[contact-server] Missing SMTP env vars: ${missing.join(", ")}.\n` +
      "Copy server/.env.example to server/.env and fill in real values — " +
      "the /api/contact route will respond with an error until then.\n"
  );
}

const app = express();
app.use(express.json({ limit: "10kb" }));

app.post("/api/contact", async (req, res) => {
  const { status, body } = await handleContactSubmission(req.body);
  res.status(status).json(body);
});

app.listen(PORT, () => {
  console.log(`[contact-server] Listening on http://localhost:${PORT}`);
});
