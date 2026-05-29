# KoinX — Tax Loss Harvesting Tool

A responsive React + TypeScript app that simulates tax loss harvesting for crypto holdings.

## Setup

```bash
git clone <your-repo-url>
cd koinx-tlh
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build
```

## Tech Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3
- Mock APIs (Promise-based, no server needed)

## Features
- Pre Harvesting card (dark) vs After Harvesting card (blue)
- Real-time updates when selecting/deselecting holdings
- Checkbox per row + Select All header checkbox
- Amount to Sell column fills on row selection
- Savings banner when post-harvest gains < pre-harvest gains
- View All / Show Less toggle (5 rows by default)
- Loading spinner + error state
- Mobile responsive

## Business Logic
- Net STCG = stcg.profits - stcg.losses
- Net LTCG = ltcg.profits - ltcg.losses
- Realised = Net STCG + Net LTCG
- On selecting a holding: positive gains add to profits, negative gains (absolute) add to losses
- Savings shown only when preRealised > afterRealised

## Assumptions
1. Two USDC rows treated separately (different coinNames)
2. Holdings sorted by absolute STCG gain (highest impact first)
3. Currency in INR (₹)
4. Amount to Sell = totalHolding of selected asset

## Deploy
Push to GitHub → import on vercel.com → Deploy (Vite auto-detected, no config needed)
