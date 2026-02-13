# 🚀 MailGuard SaaS Deployment Guide

Your **MailGuard Email Security Platform** is now ready for deployment as a SaaS product demo.

## branding & Credits
The footer has been updated to include:
> **Made by Shrikant Kole**

## How to Deploy Online (Free)

You can deploy this immediately using **Vercel** or **Netlify**.

### Option 1: Vercel (Recommended)
1. **Push your code to GitHub**.
2. Go to [Vercel.com](https://vercel.com) and sign up/login.
3. Click **"Add New Project"** and import your GitHub repository.
4. **Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` (Important! Select the `frontend` folder)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

*Note: A `vercel.json` file has been added to handle routing automatically.*

### Option 2: Netlify
1. Go to [Netlify.com](https://netlify.com).
2. Drag and drop the `dist` folder (after running `npm run build` locally) OR connect to GitHub.
3. If connecting to GitHub:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

## Live Demo Functionality
The application includes a built-in **Simulation Mode**. 
- Even if the Python backend is not running (which is typical for a static frontend deployment), the app will **automatically fallback to simulation**.
- Users can submit emails, see analysis steps, and view risk scores just like the real app.
- This creates a **perfect SaaS demo** experience with zero backend maintenance.

## Next Steps for Production
To turn this into a real paid SaaS:
1. Deploy the Python backend (`backend/app.py`) to a service like **Render**, **Railway**, or **AWS**.
2. Update the frontend URL in `App.tsx` to point to your live backend instead of `localhost`.
3. Add authentication (e.g., Clerk, Auth0) to restrict access.

---
**Build Status**: Ready 
**Version**: 1.0.0 (SaaS Demo)
