# UltraBestBuy Shopify App — Setup Guide

## What This App Does
✅ Import products from CJ Dropshipping directly into Shopify
✅ Auto-fulfill orders (customer buys → CJ ships automatically)
✅ Inventory & price sync (stays in sync with CJ stock/prices)
✅ Analytics & profit tracking dashboard

---

## How to Deploy (No Coding Required)

### Option 1 — Render.com (FREE, Recommended)

1. Go to https://render.com and create a free account
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Upload this folder to a new GitHub repo (github.com → New repo → upload files)
5. In Render: select your repo, set:
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Click "Deploy" — Render gives you a free URL like: https://ultrabestbuy-app.onrender.com
7. That URL is your app dashboard!

### Option 2 — Railway.app (FREE tier)

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Upload this folder to GitHub first, then connect
4. Railway auto-detects Node.js and deploys automatically
5. Free URL provided instantly

### Option 3 — Run Locally (on your computer)

1. Install Node.js from https://nodejs.org (click "LTS" version)
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Navigate to this folder: `cd ultrabestbuy-app`
4. Run: `npm install`
5. Run: `node server.js`
6. Open browser: http://localhost:3000

---

## Connect to Real CJ Dropshipping

1. Install CJ Dropshipping app from Shopify App Store (free)
2. Create account at cjdropshipping.com
3. In CJ app → Authorization → connect ultrabestbuy.myshopify.com
4. Enable automation: Auto Sync Price, Auto Sync Stock, Auto Fulfill Orders

---

## App Pages

| Page | What it does |
|------|-------------|
| Dashboard | Revenue, profit, orders overview |
| Import Products | Search CJ catalog, filter by US warehouse & shipping speed |
| My Products | All imported products with sync status |
| Orders | Fulfill pending orders with one click |
| Analytics | Detailed profit & margin breakdown |
| Automation | Toggle auto-fulfillment, sync, alerts |
| Pricing Rules | Set markup multipliers by cost tier |

---

## Files in This App

```
ultrabestbuy-app/
├── server.js          ← The backend (handles all data & API calls)
├── package.json       ← App configuration
└── public/
    └── index.html     ← The full dashboard UI
```
