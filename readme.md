# Checkpoint

## Setup

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Community Server installed and running locally

### Installation

1. Install dependencies:

```bash
# in the base directory
npm install
```

2. Start the development servers:

```bash
npm run dev
```

The frontend will be available on the default port defined by Vite (typically http://localhost:5173/), and the backend will be running on port 3000, (e.g. http://127.0.0.1:3000)

## Stack

- Frontend
  - React + TS
  - React Router
  - Vite
- Backend
  - NodeJS + TS
  - Fastify
  - Mongodb

## TODOs

- [x] Set up project
- [x] Get server
- [x] get DB set up
- [x] Get frontend set up
- [x] Set up tests
- [x] Set up APIs
  - [x] login
  - [x] logout
  - [x] signup
  - [x] user apis
  - [x] standup apis
  - [x] team apis
- [ ] Frontend functionality
  - [x] Login/auth
  - [x] Sign up
  - [ ] Home page
  - [ ] User profile
  - [ ] team view
  - [ ] team stand up view
  - [ ] stand up submission
  - [ ] team settings
  - [ ] User profile editing
  - [ ] stand up history (home page, user profile, team view)
  - [ ] theming
- [ ] Set up hosting
- [ ] create various mock data
