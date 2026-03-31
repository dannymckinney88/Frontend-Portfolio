# Danny McKinney — Frontend Portfolio

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://dannymckinney.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/dannymckinney88)

A frontend portfolio built with React and TypeScript, focused on accessible, data-heavy UI for real-world enterprise workflows.

---

## 🌐 Live Site

👉 [dannymckinney.dev](https://dannymckinney.dev)

---

## ⭐ Featured Project — AccessOps

**Accessibility operations platform for managing audit-driven remediation — tracking issues across audits, triaging work, and verifying real fixes.**

| Dashboard                                           | Issues Table                                        |
| --------------------------------------------------- | --------------------------------------------------- |
| ![AccessOps Dashboard](./screenshots/dashboard.png) | ![AccessOps Issues](./screenshots/issues-table.png) |

| Issues Drawer                                     | Scans View                        |
| ------------------------------------------------- | --------------------------------- |
| ![Issues Drawer](./screenshots/issues-drawer.png) | ![Scans](./screenshots/scans.png) |

| Dark Mode                                | Mobile                                             |
| ---------------------------------------- | -------------------------------------------------- |
| ![Dark Mode](./screenshots/darkmode.png) | ![Mobile Dashboard](./screenshots/mobile-dash.png) |

AccessOps is designed around how accessibility work actually gets done in enterprise environments: issues surfaced by audits, triaged by severity and ownership, and tracked until a human verifies the fix — not auto-closed by a scanner rescan.

### Features

- Dashboard surfaces highest-risk properties and unresolved critical issues to drive immediate triage decisions
- Triage workspace built for real remediation workflows — severity, ownership, and status in one view
- Scans view tracks audit history and regressions, showing progress across properties over time
- Issues persist until verified — not auto-closed by a scanner rescan
- Designed for teams where accessibility is ongoing work, not a one-time audit deliverable

### Tech

- React · TypeScript · Next.js · Tailwind CSS · TanStack Table

---

## 🚀 Projects

| Project                        | Description                                                                                                                                                                                     | Tech                                                 |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **AccessOps**                  | Accessibility operations platform for audit-driven remediation tracking, triage, and verification                                                                                               | React, TypeScript, Next.js, Tailwind, TanStack Table |
| **Accessibility Audit Tool**   | Full-stack accessibility scanner using Playwright and axe-core — scans live URLs, surfaces WCAG violations by severity, and delivers actionable remediation insights. Railway-deployed backend. | React, TypeScript, Playwright, axe-core, Express     |
| **Accessible Form Handling**   | React + TypeScript app focused on accessible form patterns — validation, modal focus management, and screen reader support. Lighthouse score of 100 with zero axe violations                    | React, TypeScript, WCAG 2.1                          |
| **GitHub Repository Explorer** | Search GitHub users and explore repositories with pagination, caching, and resilient UI states                                                                                                  | React, TypeScript, REST API                          |
| **Todo App**                   | Task management interface with filtering, drag-and-drop, and local persistence — focused on clean state handling and UI interaction patterns                                                    | React, TypeScript, Shadcn UI                         |

---

## ♿ Accessibility

Accessibility isn't a checklist item here — it's built into how each project is structured. That means semantic HTML, keyboard-navigable interactions, screen reader support, proper focus management, and WCAG-compliant patterns across the board.

Real-world context: 5+ years leading accessibility work in enterprise fintech, including driving remediation across the Truist portal from non-compliance to contract-ready — resolving 900+ issues and serving as company-wide WCAG SME at InvestCloud.

---

## 🧱 Tech Stack

- React · TypeScript · Next.js · Vite
- Tailwind CSS · Shadcn UI · CSS Modules
- TanStack Table · React Router
- Playwright · axe-core · Express

---

## 🛠 Running Locally

```bash
git clone https://github.com/dannymckinney88/Frontend-Portfolio.git
cd Frontend-Portfolio
npm install
npm run dev
```
