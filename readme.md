# Checkpoint

Running on https://checkpoint-mp.netlify.app/

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
  - Vitest
- Backend
  - NodeJS + TS
  - Fastify
  - Mongodb
  - Vitest

## Technical rationale

Monorepo with shared types to make it easier to share across the frontend/backend and simplify deployment, though this didn't really work out well and required a lot of fussing with tsconfigs (which I am not familar with). I certainly wouldn't try to share the tsconfigs if I was doing this over just to save time (though in production you'd want that level of consitency).

### Backend

MongoDB was selected as it's simple to throw data into which is good for prototyping and quick development, and it matches Renti's stack. Though my rustiness with it certainly showed and it that did slow things down a bit ironically.

I built a reusable wrapper for dealing with Mongo collections to try simplify some of the query writing and keep reuse code but that ended up breaking down when I realised how many aggregations I was going to need when fetching some of this data.

Fastify was used for the API due to it's TS support, it's also just a bit more modern and faster than Express.

I skipped proper user authentication just for the sake of speed, I didn't want to get into dealing with passwords or generating/validating proper JWTs.

Vitest was using for testing (though I didn't get around to test writing for the frontend).
Test coverage is pretty minimal, there are a few token tests on the sign up and login routes, and they don't cover as many cases as I would like.
I'd also have liked to create some proper mocks for the mongo connector, or at least some utility functions for creating mocked versions.

For some reason I conceived of having "stand ups" as solid thing in my data model, with each team having a "stand up" per day, rather than just a pool of "check ins" that could be filtered down to a specific day if you wanted a view of a certain day. I'm not sure why I came to this decision, certainly a flaw in the design!

### Frontend

React router with framework mode, selecting this was probably a mistake as though it is probably the most technically sound option (best TS support, new DX features, SSR support) as well as being what was in their recommended starter, it was totally new to me and caused a several issues including some cached data in node_modules that wasted a lot of time. Using one of the older modes (data mode or declartive mode) would have been easier to deal with and not made a negative impact on the quality of the application.
Just using `npm create vite` with React and TS would probably have helped set me up better.

I went with vanilla CSS as I wasn't planning to do anything particularly fancy, just a simple bold design and it's just a bit of personal preference.
I tried building a design that would handle well on desktop or mobile (or at least that was the plan).

I used React Context for state management as there doesn't seem to be a need for something like Redux in a simple app like this.

I created simple objects for interacting with the APIs to try keep some of that logic out of my components and also as a of documenting the APIs that exist, however it would have been good to go a step further and create service functions like `signUpUser(signUpData)` or `getUser(userId)` which could contain logic like setting auth tokens, transforming any data for consumption by the component, allowing us to keep more logic out of the components (dumb components are good), and make it easier to unit test this code. Alternatively skipping the API object layer I created and just building a service layer directly would also be ok.

### Things I didn't get around to doing but wanted to:

- Auth guards for the routes (I'd keep users off anything except /login and /signup if they were unauthenticated)
- Storing the User data semi-permenently, right now we if you refresh you're logged out, I'd usually store this in localstorage.
- The actual core functionality of logging stand ups
- Ability to add/remove users from teams
- User settings: colour theme, change name/email, leaving teams
- Team settings: change name, add/remove members
- Reusable component to display a User's recent stand up check ins (Homepage, User profile)
- Markdown in logging
- loading skeletons
- Ensuring the whole site can be used with just the keyboard
- Darkmode/light mode and alternative colour themes

### Things I'd do differently

- Probably double check if I need a deployed version or not before starting!
- Spend less time fussing around trying to share TS configs and just use individual ones
- Use simple project bases that I am more familar with (i.e. vite create)
- First I'd set up deployment at the beginning so I know I have a working something at the very least
- Build out a small feature at a time, tackling the API route and frontend use of the route at the same time, creating tests for the feature if needed
  - e.g. user registration on the front and backend, then login, storing and validating the auth token, then homepage functions, etc
- Build a service layer for the APIs
- Use data mode with React router
- Not try to build out functionality for multiple teams, this made the whole thing way more complex than it needed to be
- Abandon the idea of stand ups in the data model, just treat check in as a pool of data that can be filtered to specific dates if needed
- A number of routes on the frontend could be done away with
  - No need for a homepage if there is only one team, just open to team view
  - No need for a 'stand up view', just use a team view filtered to a specific date

# Design plans

I sketched out some designs before I started:

![login and home](./designs/login%20and%20home.PNG)
![sign up and user profile](./designs/regsiteration%20and%20user%20profile.PNG)
![user profile edit](./designs/user%20profile%20edit.png)
![team overview and stand up view](./designs/team%20overview%20and%20stand%20up%20view.PNG)
![team settings and stand up submission](./designs/team%20settings%20and%20stand%20up%20submission.PNG)
