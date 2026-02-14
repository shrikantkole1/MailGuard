# Deployment Recommendation for MailGuard

Given your current project structure (React Frontend + Python FastAPI Backend), here are the best platforms to deploy your application.

## 🏆 Top Recommendation: Hybrid Deployment (Free Tier Friendly)

The best approach for modern web apps is to host the frontend and backend on platforms specialized for each.

- **Frontend**: **Vercel**
- **Backend**: **Render**

### Why this combination?
- **Vercel** is the creators of Next.js and has first-class support for **Vite**. It provides the fastest global CDN for your frontend.
- **Render** offers a generous free tier for web services (Python/FastAPI) and manages SSL/TLS automatically.

---

## 🚀 Deployment Guide

### Part 1: Deploy Backend to Render

1. **Push your code to GitHub** (You've already done this!).
2. **Sign up/Login to [Render.com](https://render.com/)**.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository `shrikantkole1/MailGuard`.
5. Configure the service:
   - **Name**: `mailguard-api`
   - **Root Directory**: `.` (or leave empty)
   - **Runtime**: **Python 3**
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
6. Click **Create Web Service**.
7. **Copy the URL** provided by Render (e.g., `https://mailguard-api.onrender.com`).

### Part 2: Deploy Frontend to Vercel

1. **Sign up/Login to [Vercel.com](https://vercel.com/)**.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository `MailGuard`.
4. Configure the project:
   - **Framework Preset**: **Vite** (Should be auto-detected).
   - **Root Directory**: `frontend` (Important: Click 'Edit' and select the `frontend` folder).
5. **Environment Variables**:
   - You need to tell the frontend where the backend is.
   - Add a variable if your code supports it (currently hardcoded to localhost).
   
   **IMPORTANT**: Your frontend code currently points to `http://localhost:8000`. You need to update `frontend/src/App.tsx` to use the production URL when deployed.
   
   **Recommended Fix**: Update `App.tsx` to use an environment variable:
   ```typescript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
   fetch(`${API_BASE_URL}/api/fetch-emails`);
   ```
   Then in Vercel, set `VITE_API_URL` to your Render Backend URL.

6. Click **Deploy**.

---

## 🥈 Alternative: Railway (Unified Platform)

If you prefer to see both frontend and backend in one dashboard:

1. **Sign up to [Railway.app](https://railway.app/)**.
2. Create a **New Project** -> **Deploy from GitHub repo**.
3. Railway will detect the multiple languages. You can configure two services from the same repo.
   - **Service 1 (Backend)**: Root `/`, Start command `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`.
   - **Service 2 (Frontend)**: Root `/frontend`, Build command `npm run build`, Start command `npm run preview` (or serve static).

## 🥉 Enterprise: Kubernetes (Archestra Native)

Your project contains an `archestra.yaml` and `docker-compose.yml`, suggesting a future microservices architecture. use **Amazon EKS**, **Google GKE**, or **DigitalOcean Kubernetes** when you are ready to deploy the full mesh of agents and MCP servers described in those files.

---

### ✅ Next Steps
1. Update `App.tsx` to look for `import.meta.env.VITE_API_BASE_URL`.
2. Push that change.
3. Follow the **Render + Vercel** steps above.
