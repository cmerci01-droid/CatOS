# CatOS — Deployment Guide

## Quick Deploy to Vercel (Recommended — Free)

### Step 1: Create accounts (one-time)
1. Go to **github.com** → Sign up (or log in)
2. Go to **vercel.com** → Sign up with your GitHub account

### Step 2: Upload to GitHub
1. Go to **github.com/new** → Create a new repository
2. Name it `catos` (private is fine)
3. Upload the entire contents of this folder to that repo
   - You can drag and drop all files in the GitHub web interface
   - Or use the "Upload files" button

### Step 3: Deploy on Vercel
1. Go to **vercel.com/new**
2. Click "Import" next to your `catos` repository
3. Click "Deploy" — that's it!
4. Vercel will give you a URL like `catos-abc123.vercel.app`
5. You can add a custom domain later in Project Settings → Domains

### Step 4: Add to your iPhone home screen
1. Open your CatOS URL in Safari on your phone
2. Tap the **Share** button (box with arrow)
3. Scroll down → tap **"Add to Home Screen"**
4. Name it "CatOS" → tap Add
5. It will appear on your home screen with the pink C icon and launch full-screen like a real app

### Step 5: Desktop
Just bookmark the URL in Chrome/Edge/Safari. It works at any screen size.

---

## What's included

```
catos-app/
├── public/
│   ├── index.html          ← HTML shell with PWA meta tags
│   ├── manifest.json       ← PWA manifest (makes it installable)
│   ├── icon-192.png        ← App icon (home screen)
│   └── icon-512.png        ← App icon (splash screen)
├── src/
│   ├── index.js            ← React entry point
│   └── CatOS.js            ← The entire app
├── package.json            ← Dependencies
├── vercel.json             ← Vercel config
└── DEPLOY.md               ← This file
```

## Data Persistence

Your data saves automatically to your browser's localStorage:
- **Daily items** (checks, water, meals) reset each new day
- **Persistent items** (goals, brain dumps, backlog, vision board, 
  affirmations, schedule, workout phase, meditation log) carry over forever
- Data is per-device (phone and desktop are separate)

## Alternative: Netlify
1. Go to **app.netlify.com**
2. Drag the `build` folder (after running `npm run build`) onto the page
3. Done — instant deploy

## Updating CatOS
To update, just push changes to your GitHub repo. Vercel auto-deploys on every push.
