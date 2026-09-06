# ✨ Ayush Chaurasiya — Portfolio

> Full-Stack Developer • AI/ML Craftsman • 4x National Robotics Champion

A modern, high-performance, dark-aesthetic portfolio built with React 19, Tailwind CSS v4, Framer Motion, and Node.js. Designed with fluid micro-interactions, responsive glassmorphic cards, custom spring cursor, canvas particle physics, and seamless email dispatch.

---

## 🚀 Tech Stack

- **Frontend:** React 19, Vite 7, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend Server:** Node.js, Express, Nodemailer, CORS, Dotenv
- **Analytics:** Google Analytics 4 (via `react-ga4`)
- **Styling & Effects:** Glassmorphism, CSS Tokens, JetBrains Mono & Plus Jakarta Sans typography, Interactive Canvas Constellation, Magnetic buttons

---

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

```bash
# Frontend environment
cp .env.example .env

# Server environment (for Contact Form mailer)
cp server/.env.example server/.env
```

Edit `.env` and `server/.env` with your preferred settings and SMTP credentials (e.g. Gmail App Password).

### 3. Run Development Servers

```bash
# Start Vite Frontend (http://localhost:5173)
npm run dev

# Start Backend Mailer Server (http://localhost:5000)
npm run server
```

### 4. Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
PersonalPortfolio/
├── index.html                 # SEO optimized HTML with meta tags & preconnects
├── package.json               # Scripts & dependencies
├── .env.example               # Frontend environment template
├── .gitignore                 # Production-grade gitignore
├── server/
│   ├── index.js               # Express + Nodemailer contact endpoint
│   ├── .env.example           # Backend environment template
│   └── .env                   # Secret credentials (gitignored)
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # Core application layout & analytics
    ├── index.css              # Design tokens, custom utilities & themes
    ├── hooks/
    │   ├── useMagnetic.js     # Physics-based magnetic hover effect
    │   ├── usePointerTilt.js  # 3D parallax tilt on mousemove
    │   └── useRevealOnScroll.js # Viewport scroll trigger observer
    ├── lib/
    │   └── animations.js      # Shared Framer Motion transitions & spring configs
    └── components/
        ├── Navbar.jsx         # Floating glass navbar with active section indicator
        ├── HeroSection.jsx    # Hero with animated text & CTA magnetic buttons
        ├── NeuralConstellation.jsx # Interactive HTML5 canvas particle network
        ├── CustomCursor.jsx   # Smooth spring physics cursor & ring
        ├── StatsSection.jsx   # Key metrics counter cards
        ├── AboutMe.jsx        # Journey story, traits & core philosophy
        ├── ExperienceSection.jsx # Chronological career timeline
        ├── SkillSection.jsx   # Categorized interactive tech matrix
        ├── ProjectSection.jsx # Filterable showcase with modals & live preview
        ├── AchievementSection.jsx # National titles & competitive awards
        ├── CertificationsSection.jsx # Verified credentials & badges
        ├── ContactSection.jsx # Full-stack contact form with instant validation
        ├── ThemeProvider.jsx  # Dark/Light system state management
        ├── Reveal.jsx         # Staggered reveal wrapper
        ├── AnimatedText.jsx   # Word-by-word staggered typography
        ├── DesignSystem.jsx   # Shared UI components & design tokens
        └── Footer.jsx         # Social links, status & copyright
```

---

## 🔒 Security & Best Practices

- All `.env` files with secret keys and SMTP credentials are strictly excluded in `.gitignore`.
- Rate limiting and input validation safeguards implemented on the Express `/api/contact` route.
- Zero dead files, strictly linted and optimized production bundle.