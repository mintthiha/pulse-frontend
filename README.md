# Pulse Frontend

The Next.js frontend for [Pulse](https://github.com/mintthiha/pulse-platform), a release intelligence platform that helps engineering teams assess regression risk before deploying.

---

## Overview

The frontend provides a single dashboard where engineers enter a Jira ticket ID and instantly see:

- **Ticket details** — summary, status, and description pulled live from Jira
- **Filtering logic** — the report and action tags used to scope the regression
- **Suggested scenarios** — test results filtered to the change, with pass/fail status and duration
- **Pull requests** — linked PRs from GitHub with one-click build triggering
- **AI enhancement** — optional tag expansion powered by OpenAI to catch gaps in test tagging

---

## Tech Stack

- Next.js 15 (App Router), TypeScript
- Tailwind CSS
- Hosted separately from the backend, communicates via JWT-authenticated REST calls

---

## Project Structure

```
pulse-frontend/
├── src/
│   ├── app/
│   │   ├── login/          # Login page
│   │   ├── dashboard/      # Main dashboard
│   │   └── layout.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── TicketView.tsx
│   │   ├── FilteringLogic.tsx
│   │   ├── ScenarioList.tsx
│   │   └── PRSection.tsx
│   ├── lib/
│   │   └── api.ts          # All API calls to pulse-platform
│   └── types/
│       └── index.ts        # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running instance of [pulse-platform](https://github.com/mintthiha/pulse-platform)

### Setup

**1. Clone the repository**

```bash
git clone https://github.com/mintthiha/pulse-frontend.git
cd pulse-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Configure environment**

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

**4. Run the dev server**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Authentication

The frontend uses JWT authentication. On login, the token is stored in `localStorage` and attached to every subsequent API request via the `Authorization: Bearer` header. Logging out clears the token and redirects to the login page.

---

## Backend

This frontend requires [pulse-platform](https://github.com/mintthiha/pulse-platform) to be running. See that repo for setup instructions.

---

## License

MIT
