# 🏫NexEd — Modern School Management Platform

<p align="center"><em>Modern school admin panel & website starter — Next.js 15 · TypeScript · Tailwind CSS · Supabase · React Hook Form · Zod</em></p>

<p align="center">
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next.js-15-000?logo=next.js&logoColor=white" alt="Next.js 15" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  </a>
  <a href="https://supabase.com/">
    <img src="https://img.shields.io/badge/Supabase-Platform-3ECF8E?logo=supabase&logoColor=white" alt="Supabase" />
  </a>
  <a href="https://react-hook-form.com/">
    <img src="https://img.shields.io/badge/React_Hook_Form-^7-EC5990?logo=reacthookform&logoColor=white" alt="React Hook Form" />
  </a>
  <a href="https://zod.dev/">
    <img src="https://img.shields.io/badge/Zod-Validation-2A2A2A?logo=zod&logoColor=white" alt="Zod" />
  </a>
  <a href="https://redux.js.org/">
  <img src="https://img.shields.io/badge/Redux-State_Management-764ABC?logo=redux&logoColor=white" alt="Redux" />
</a>

</p>

---

## Overview

**NexEd** is a production-ready starter for building a **School Admin Panel** and a **Public School Website** with a unified stack:

⚛️ React (TypeScript) – Component-based UI development

💨 Tailwind CSS – Utility-first styling framework

🧩 React Hook Form + Zod – Form state management and schema validation

🎯 Redux Toolkit – Global state with local persistence

🧼 Prettier – Code formatting and consistency

🐘 Supabase – Postgres DB, Auth, (optional Storage)

🧱 Headless UI & Lucide – Accessible components & icons

---

### What you get

- ✨ Two apps: `apps/admin` (internal dashboard) & `apps/site` (public website).
- 🔐 Auth with roles: `admin`, `teacher`, `student`.
- 🧾 Student registration & class enrollment flows out of the box.
- 🔄 Realtime updates (Supabase Channels) for live tables.
- 🗂️ File uploads to Supabase Storage (ID scans, transcripts, etc.).
- 🌓 Dark mode, responsive layouts, and sensible accessibility defaults.

---

## 📂 Project Structure

```
nexed/
├─ apps/
│  ├─ admin/    # Admin panel (dashboard)
│  └─ site/     # Public school site
├─ packages/
│  ├─ ui/       # Shared UI components
│  ├─ db/       # DB types & queries
│  └─ config/   # ESLint, Prettier, TS configs
├─ supabase/    # SQL migrations, policies
└─ turbo.json
```

---

## 📌 Roadmap

✅ Authentication & role-based access

✅ Student enrollment

📅 Attendance tracking

📊 Grades & reports

📂 Document uploads

---

🤝 Contributing
Contributions are warmly welcomed!

Feel free to fork this repo, create a feature branch, and submit a pull request.

---

🌻Developed by
Azadeh Sharifi Soltani
