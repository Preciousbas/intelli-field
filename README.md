# Field Ops Hub

Field Ops Hub is a Vite + React application for exploring Nigeria health facility data.

It provides two main user-facing capabilities:

- **Find Facilities** — local geospatial search over indexed facilities using GPS coordinates
- **Ask Agent** — question-answering over the Inflectiv-connected dataset using an external agent

The app is designed so that the Inflectiv API key stays server-side and is never exposed in the browser.

---

## Features

### 1. Find Facilities
Search for nearby health facilities using:
- current browser location
- preset city locations

Results are ranked by distance and can be filtered by:
- state
- facility category
- distance radius

This feature runs locally using facility coordinates and does not depend on the Inflectiv API.

### 2. Ask Agent
Send natural-language questions about healthcare facilities in Nigeria.

This feature uses:
- an Inflectiv dataset
- a dataset-scoped external agent
- server-side API routes

Example questions:
- `Show health facilities in Maiduguri`
- `What tertiary hospitals are in Borno State?`
- `Which facilities are federal-owned in Lagos?`

### 3. Overview
The dashboard provides:
- facility count
- states covered
- live dataset connection status

### 4. API Reference
The app includes an internal API reference view for the routes used by the frontend.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Backend layer:** Vercel serverless API routes
- **External data / AI:** Inflectiv External Dataset API and External Agent API

---

## Architecture

The application has two layers:

### Frontend
The browser UI handles:
- navigation
- local geospatial filtering
- chat interface
- dataset status display

### Server-side API layer
The `/api/inflectiv/*` routes:
- hold the Inflectiv API key server-side
- call the Inflectiv platform API
- resolve the reusable agent ID
- proxy dataset and agent requests to the frontend

## Project Structure

```bash
.
├── api/                                 # Vercel serverless API routes
│   ├── _lib/
│   │   └── inflectiv.ts                 # Shared Inflectiv fetch helper and agent resolution logic
│   └── inflectiv/
│       ├── datasets.ts                  # GET /api/inflectiv/datasets
│       ├── datasets/
│       │   └── query.ts                 # POST /api/inflectiv/datasets/query
│       └── agent/
│           ├── index.ts                 # GET /api/inflectiv/agent
│           └── chat.ts                  # POST /api/inflectiv/agent/chat
│
├── src/
│   ├── components/                      # UI views and layout components
│   │   ├── AgentChat.tsx                # Ask Agent interface
│   │   ├── Dashboard.tsx                # Overview page
│   │   ├── DatasetView.tsx              # Dataset metadata view
│   │   ├── DocsView.tsx                 # API reference view
│   │   ├── FacilityFinder.tsx           # Facility search interface
│   │   └── Sidebar.tsx                  # Sidebar navigation
│   │
│   ├── data/
│   │   └── facilities.ts                # Local facility data and preset locations
│   │
│   ├── hooks/                           # Custom React hooks
│   │   ├── use-agent.ts                 # Agent chat state and messaging logic
│   │   ├── use-dataset.ts               # Dataset metadata loading
│   │   └── use-facilities.ts            # Local facility search/filter state
│   │
│   ├── lib/                             # Shared frontend utilities
│   │   ├── geo.ts                       # Haversine distance and geospatial helpers
│   │   └── inflectiv.ts                 # Frontend API client for /api/inflectiv/*
│   │
│   ├── types/
│   │   └── index.ts                     # Shared TypeScript types
│   │
│   ├── App.tsx                          # Main application shell and view routing
│   ├── main.tsx                         # React app entry point
│   └── index.css                        # Global styles
│
├── .env.local                           # Local environment variables (not committed)
├── vite.config.ts                       # Vite configuration
├── package.json                         # Project metadata and scripts
├── tsconfig.json                        # TypeScript configuration
└── README.md                            # Project documentation
```

---

## Environment Variables

Create a `.env.local` file for local development:

```env
INFLECTIV_API_KEY=your_inflectiv_api_key
INFLECTIV_BASE_URL=https://app.inflectiv.ai/api/platform
FIELDOPS_AGENT_ID=your-agent-id
```