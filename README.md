# Hatch Bot

Hatch Bot is a modern AI SaaS platform built with **Next.js 15**, **TypeScript**, **TailwindCSS**, **Framer Motion**, **Prisma**, **MongoDB** and **NextAuth**.  It provides a polished chat experience backed by a secure authentication system and persistent database storage.  The frontend streams responses from an external AI backend (configured via `HATCH_API_BASE`) and renders rich Markdown with syntax highlighting.  This repository contains everything you need to run Hatch Bot locally or deploy it to **Render.com**.

## ✨ Features

- **Discord Authentication** — Seamless sign‑in via Discord using NextAuth with secure JWT sessions.
- **Modern UI** — Dark, glassmorphic aesthetic inspired by ChatGPT and Linear. Responsive across desktop and mobile.
- **Streaming Chat Interface** — Messages stream in real‑time from the external Hatch AI backend.  Markdown is rendered with syntax highlighting for code blocks.
- **Conversation Management** — Create, rename and delete conversations.  Conversation history is persisted in MongoDB via Prisma.
- **Optimistic Updates** — User messages appear instantly while assistant responses stream in.
- **Rate Limiting** — Basic per‑user rate limit prevents abuse.
- **Token Counter** — Displays an approximate token count for the current conversation.
- **Copy & Retry** — Copy responses to your clipboard or retry the last user message.
- **Settings & Pricing Pages** — Placeholder pages for future expansion.
- **Render Ready** — Includes `render.yaml` with build and start commands for one‑click deployment to [Render.com](https://render.com).

## 🗂️ Project Structure

```
hatch-bot/
├── app/               # Next.js App Router pages and layouts
│   ├── api/           # API routes (NextAuth, chat and conversation endpoints)
│   ├── dashboard/     # Protected dashboard area
│   ├── pricing/       # Pricing page
│   ├── login/         # Login page
│   ├── globals.css    # Global Tailwind styles
│   └── layout.tsx     # Root layout with navigation and session provider
├── components/        # Reusable React components
│   ├── chat/          # Chat UI components
│   ├── dashboard/     # Sidebar navigation
│   ├── landing/       # Hero and feature cards for the landing page
│   └── providers/     # Session provider wrapper for NextAuth
├── lib/               # Server‑side utilities (Prisma, auth config, rate limiter, API wrapper)
├── prisma/
│   └── schema.prisma  # Data models for users, conversations, messages and usage
├── render.yaml        # Deployment configuration for Render
├── .env.example       # Sample environment variables
├── next.config.js     # Next.js configuration
├── tailwind.config.ts # Tailwind configuration with dark palette
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## 🧑‍💻 Getting Started

1. **Install dependencies**

   ```bash
   cd hatch-bot
   npm install
   # Generate Prisma client
   npx prisma generate
   ```

2. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:

   ```bash
   cp .env.example .env
   # Edit .env with your editor and set
   # NEXTAUTH_SECRET, MONGODB_URI, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, HATCH_API_BASE
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.  You should see the Hatch Bot landing page.  Click **Get Started** to authenticate with Discord and begin chatting.

4. **Database migrations**

   The MongoDB schema is managed by Prisma.  Run `npx prisma db push` to sync the models defined in `prisma/schema.prisma` with your database.

## 🚀 Deploying to Render

This project includes a `render.yaml` configuration for deploying both the web server and environment variables to [Render.com](https://render.com).  To deploy:

1. Create a new **Web Service** on Render and connect your GitHub repository (or upload the code manually).
2. During setup, enable **Build Command** and **Start Command** detection (Render reads them from `render.yaml`).
3. Add the environment variables defined in `.env.example` to your Render service settings.  For example:

   - `NEXTAUTH_URL` → `https://<your-service-name>.onrender.com`
   - `NEXTAUTH_SECRET` → A long random string
   - `MONGODB_URI` → Your MongoDB Atlas connection string
   - `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` → From the Discord Developer Portal
   - `HATCH_API_BASE` → `https://api.thehatch.store/api/chat`

4. Save and deploy.  Render will install dependencies, generate the Prisma client, build the Next.js app and start the server.

## 🛡️ Security & Environment

- **Never** commit real secrets to version control.  Use environment variables for sensitive values.
- This starter uses an **in‑memory rate limiter**.  For production deployments at scale you should replace it with a distributed cache (e.g. Redis or Upstash) to enforce global limits across multiple instances.
- Use a secure and unique `NEXTAUTH_SECRET` in production.

## 🤝 Contributing

Contributions are welcome!  Feel free to open issues or pull requests to improve the project, fix bugs or add new features.

## 📄 License

This project is provided as‑is for demonstration purposes.  You are free to modify and use it for your own applications.