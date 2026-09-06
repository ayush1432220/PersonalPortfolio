import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Rocket, Check, Copy, ArrowUpRight, Sparkles, Send, Loader2, AlertCircle } from "lucide-react";
import { SectionWrapper, SectionHeader, GlassCard, IconBox, PrimaryButton, containerVariants, cardVariants, focusRing, contentMaxWidth } from "./DesignSystem";

// Same-origin relative path in BOTH environments:
//   production → Vercel serverless function (api/contact.js)
//   local dev  → Vite proxies /api to the Express server (see vite.config.js)
//
// Deliberately NOT configurable via an env var. VITE_* values are inlined at
// build time, so an absolute fallback (e.g. http://localhost:5000) ships inside
// the production bundle and makes every visitor's browser POST to their own
// machine — which is exactly how this broke in production.
const CONTACT_ENDPOINT = "/api/contact";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("chaurasiyavinod96@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim() || !EMAIL_RE.test(form.email)) {
      setStatus("error");
      setErrorMsg("Please fill in your name, a valid email, and a message.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong sending your message.");
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err.message === "Failed to fetch"
          ? "Couldn't reach the mail server. Please email me directly instead."
          : err.message
      );
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Direct Email",
      value: "chaurasiyavinod96@gmail.com",
      link: "mailto:chaurasiyavinod96@gmail.com",
      color: "purple",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone / WhatsApp",
      value: "+91 9616250906",
      link: "tel:+919616250906",
      color: "emerald",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn Profile",
      value: "in/ayush-chaurasiya96",
      link: "https://www.linkedin.com/in/ayush-chaurasiya96",
      color: "cyan",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub Repositories",
      value: "github.com/ayush1432220",
      link: "https://github.com/ayush1432220",
      color: "blue",
    },
  ];

  return (
    <SectionWrapper id="contact">
      <SectionHeader
        badge="GET IN TOUCH"
        title="Let's Build Something Great Together"
        subtitle="Whether you have an exciting software role, a client project, or an ambitious technical idea, I'm ready to connect."
      />

      <div className={`${contentMaxWidth} mx-auto grid lg:grid-cols-12 gap-8 items-stretch`}>
        {/* Contact Info Cards (5 cols) */}
        <motion.div
          className="lg:col-span-5 space-y-4 flex flex-col justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {contactInfo.map((contact) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ x: 4 }}
              className={`p-4 sm:p-5 bg-bg-surface backdrop-blur-md rounded-2xl border border-border-default hover:border-purple-500/40 transition-all duration-300 flex items-center justify-between group shadow-lg ${focusRing}`}
            >
              <div className="flex items-center gap-4">
                <IconBox icon={contact.icon} color={contact.color} />
                <div>
                  <div className="text-xs font-mono text-text-secondary">{contact.label}</div>
                  <div className="text-sm font-semibold text-text-primary group-hover:text-purple-300 transition-colors">
                    {contact.value}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </motion.a>
          ))}

          {/* Quick Copy Email Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-bg-surface-elevated border border-purple-500/30 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-text-secondary font-mono block">QUICK EMAIL:</span>
              <span className="font-mono text-purple-300 font-medium">chaurasiyavinod96@gmail.com</span>
            </div>
            <button
              onClick={handleCopyEmail}
              className={`p-2.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 transition-colors cursor-pointer flex items-center gap-1 text-xs font-mono ${focusRing}`}
            >
              <span aria-live="polite" className="flex items-center gap-1">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy
                  </>
                )}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Why Work With Me & Direct CTA (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <GlassCard accentColor="purple" className="h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <IconBox icon={<Rocket className="w-6 h-6" />} color="purple" />
                <div>
                  <span className="text-xs font-mono font-medium text-purple-400 uppercase tracking-wider">SEND A MESSAGE</span>
                  <h3 className="text-2xl font-bold text-text-primary font-heading">Tell Me About Your Project</h3>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mb-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="text-xs font-mono text-text-secondary block mb-1.5">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-default text-sm text-text-primary placeholder:text-text-muted ${focusRing}`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="text-xs font-mono text-text-secondary block mb-1.5">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-default text-sm text-text-primary placeholder:text-text-muted ${focusRing}`}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-xs font-mono text-text-secondary block mb-1.5">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl bg-bg-surface border border-border-default text-sm text-text-primary placeholder:text-text-muted resize-none ${focusRing}`}
                    placeholder="What are you looking to build?"
                  />
                </div>

                <div role="status" aria-live="polite">
                  {status === "success" && (
                    <p className="flex items-center gap-2 text-sm text-emerald-400">
                      <Check className="w-4 h-4" /> Message sent — I'll get back to you soon.
                    </p>
                  )}
                  {status === "error" && (
                    <p className="flex items-center gap-2 text-sm text-rose-400">
                      <AlertCircle className="w-4 h-4" /> {errorMsg}
                    </p>
                  )}
                </div>

                <PrimaryButton type="submit" disabled={status === "sending"} className="w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </PrimaryButton>
              </form>
            </div>

            <div className="pt-4 border-t border-border-default">
              <a
                href="https://www.linkedin.com/in/ayush-chaurasiya96"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-xs font-mono font-medium text-text-secondary hover:text-purple-300 transition-colors ${focusRing}`}
              >
                Prefer LinkedIn? Send a DM instead →
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionWrapper>
  );
}