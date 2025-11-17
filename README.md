# VCR React Express Monorepo Template

A full-stack monorepo template with ReactJS frontend and ExpressJS backend, designed for deployment on Vonage Cloud Runtime (VCR).

## Overview

This monorepo contains two separate applications:

- **Frontend** (`/frontend`): ReactJS application created with Create React App
- **Backend** (`/backend`): ExpressJS API server

Each application has its own `vcr.yml` configuration file and must be run and deployed independently.

## Prerequisites

- [VCR (Vonage Cloud Runtime) CLI](https://developer.vonage.com/en/vcr)
- Node.js and npm
- Two VCR Application IDs (one for frontend, one for backend)

## Setup

1. **Install dependencies** in both directories:

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **Initialize VCR applications** in both directories:

   ```javascript
   # In frontend directory
   cd frontend
   vcr init
   # skip Starter templates selection, then copy yml configurations from yml samples for both yml files.

   # In backend directory
   cd backend
   vcr init
   # skip Starter templates selection, then copy yml configurations from yml samples for both yml files.
   ```

3. **Configure VCR files** using the provided samples as reference:

   - `vcr-frontend-sample.yml`
   - `vcr-backend-sample.yml`

4. **Configure frontend environment variables**
   - Copy `.env.sample` to `.env` in the `/frontend` directory
   - Set `REACT_APP_BACKEND_URL` to your backend URL
   - Example:
     ```bash
     cp frontend/.env.sample frontend/.env
     # Edit frontend/.env and set REACT_APP_BACKEND_URL
     ```

## Local Development

Run both applications in separate terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
vcr debug -y
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

## Deployment

### 1. Deploy Backend

```bash
cd backend
vcr deploy
```

Note the deployed backend URL.

### 2. Deploy Frontend

1. Update `BACKEND_URL` in `/frontend/src/App.js` with your deployed backend URL
2. Update `FRONTEND_URL` in `/backend/vcr.yml` with your frontend URL (you may need to deploy twice to get the URL)
3. Deploy:

   ```bash
   cd frontend
   vcr deploy
   ```

## Project Structure

```text
.
├── backend/
│   ├── index.js              # Express server entry point
│   ├── vcr.yml               # Backend VCR configuration
│   └── package.json
├── frontend/
│   ├── .env                  # Frontend environment BACKEND_URL variable
│   ├── src/
│   │   └── App.js            # React application
│   ├── vcr.yml               # Frontend VCR configuration
│   └── package.json
└── README.md
```
