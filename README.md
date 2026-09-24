# Cogniva — AI-Powered Cognitive Care & Reminiscence Platform

Cogniva is a next-generation, culturally grounded cognitive care and reminiscence therapy platform designed for individuals living with memory loss, mild cognitive impairment (MCI), or dementia, as well as their caregivers and healthcare clinicians.

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **TypeScript**, and **Google Gemini API**, Cogniva is fully optimized for **Vercel Serverless** deployment.

---

## Quick Start (Local Development)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/adrishkb-sketch/Cogniva.git
cd Cogniva
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file based on [.env.example](.env.example):

```bash
cp .env.example .env.local
```

Populate the required keys:
```env
# Google Gemini API Key (Required for AI Copilot, Vision, & Reminiscence chat)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Auth & Storage (Optional for cloud sync; fallback active)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploy to Vercel (Serverless)

Cogniva is configured for 1-click zero-config serverless deployment on Vercel.

### Method 1: Deploy with Vercel Dashboard

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `Cogniva`.
3. In the **Environment Variables** section, add:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL` *(optional)*
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` *(optional)*
   - `SUPABASE_SERVICE_ROLE_KEY` *(optional)*
4. Click **Deploy**. Vercel will automatically build the Next.js app and deploy all API routes as Serverless Functions.

### Method 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## Project Architecture & Structure

```
Cogniva/
├── app/                         # Next.js App Router
│   ├── (public)/                # Landing, Onboarding, Demo, Privacy
│   ├── admin/                   # Admin portal (Cultural packs, system telemetry)
│   ├── api/                     # Serverless API routes
│   │   ├── ai/                  # Gemini AI endpoints (chat, copilot, activities, vision)
│   │   ├── diary/               # Audio/text diary endpoints
│   │   └── translate/           # Multilingual translation service
│   ├── caregiver/               # Caregiver portal (Change radar, cognitive profile, routines)
│   ├── health/                  # Clinician / Healthcare dashboard (Clinical reports, alert triage)
│   ├── patient/                 # Patient-facing reminiscence experience
│   │   ├── day/                 # Daily orientation & schedule
│   │   ├── diary/               # Voice / Text diary
│   │   ├── games/               # Cognitive micro-games (Pattern matching, etc.)
│   │   ├── garden/              # Calming sensory visual garden
│   │   ├── life-sim/            # Virtual interactive reminiscence simulation
│   │   ├── memories/            # Photo album with grounded AI voiceover
│   │   ├── memory-journey/      # Milestone chronology
│   │   ├── memory-map/          # Interactive regional heritage map
│   │   ├── routine/             # Step-by-step assisted daily routines
│   │   ├── sounds/              # Sensory & regional soundscape player
│   │   ├── storybook/           # Generated illustrated reminiscence storybook
│   │   ├── talk/                # Grounded AI conversational companion
│   │   └── theatre/             # Reminiscence video/audio player
│   ├── globals.css              # Design system tokens & liquid themes
│   └── layout.tsx               # Root layout with theme provider
├── components/                  # Reusable UI components & navigation bars
├── data/                        # Cultural memory packs, regional soundscapes, mock profiles
├── lib/                         # Core business logic & services
│   ├── ai/                      # Safety guardrails, memory grounding engine, Gemini client
│   └── utils.ts                 # Utility functions
└── types/                       # TypeScript schemas and data interfaces
```

---

## Built-in AI Safety & Grounding

- **Memory Grounding**: Strict fact checking against family-verified memories before responding.
- **Safety Engine**: Real-time moderation filtering out diagnostic advice, distress triggers, and medical prescriptions.
- **Offline / Fallback Reliability**: Graceful fallback to verified local memory cache when API keys or network are unreachable.

---

## License

MIT License. Designed with care for cognitive wellness.
