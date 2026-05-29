# KoinX — Tax Loss Harvesting Tool

A responsive **React + TypeScript** web application that helps users simulate tax loss harvesting on their crypto holdings. Built as part of the KoinX Frontend Intern Assignment.

🔗 **Live Demo:** https://koinx-tlh-ashen.vercel.app/ 
📁 **GitHub:** [https://github.com/sahithya-lakku/koinx-tlh](https://github.com/sahithya-lakku/koinx-tlh)

---

## Screenshots

> Pre Harvesting vs After Harvesting cards update in real-time as you select holdings.

---

## Features

- 📊 **Pre Harvesting Card** — displays base capital gains (profits, losses, net) from mock API
- 💙 **After Harvesting Card** — recalculates gains in real-time based on selected holdings
- ☑️ **Holdings Table** — sortable list with checkboxes, coin logos, STCG, LTCG columns
- ✅ **Select All / Deselect All** — header checkbox to toggle all rows at once
- 💰 **Amount to Sell** — auto-fills with total holding when a row is selected
- 🎉 **Savings Banner** — shows "You're going to save ₹X" only when taxes are reduced
- 👁️ **View All / Show Less** — shows 5 rows by default, expandable to all
- ⏳ **Loading Spinner** — shown while mock APIs are fetching
- 📱 **Mobile Responsive** — works on all screen sizes

---

## Tech Stack

| Tech | Purpose |
|------|---------|
| React 18 + TypeScript | UI framework |
| Vite | Build tool |
| Tailwind CSS v3 | Styling |
| Mock APIs (Promises) | Simulated data fetching (no server needed) |

---

## Project Structure

```
src/
├── api/
│   ├── holdingsApi.ts        # Mock holdings data (25 crypto assets)
│   └── capitalGainsApi.ts    # Mock capital gains data
├── components/
│   ├── CapitalGainsCard.tsx  # Pre & After Harvesting cards
│   ├── HoldingsTable.tsx     # Table with checkboxes and gain columns
│   └── DisclaimerBanner.tsx  # Collapsible disclaimer accordion
├── hooks/
│   └── useHarvesting.ts      # All business logic and state management
├── utils/
│   └── format.ts             # INR currency formatters
└── App.tsx                   # Root component
```

---

## Setup Instructions

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/sahithya-lakku/koinx-tlh.git

# 2. Navigate into the project
cd koinx-tlh

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

```bash
# Build for production
npm run build
```

---

## Business Logic

### Capital Gains Calculation
```
Net STCG = stcg.profits - stcg.losses
Net LTCG = ltcg.profits - ltcg.losses
Realised Capital Gains = Net STCG + Net LTCG
```

### After Harvesting Update (on selecting a holding)
- If `holding.stcg.gain > 0` → added to **stcg.profits**
- If `holding.stcg.gain < 0` → absolute value added to **stcg.losses**
- Same logic applies for `ltcg.gain`

### Savings Banner
Shown **only when** post-harvest realised gains < pre-harvest realised gains.

---

## Assumptions

1. Two USDC entries in data are treated as **separate rows** (they have different coinNames)
2. Holdings are sorted by **absolute STCG gain descending** (highest impact shown first)
3. All currency values displayed in **INR (₹)**
4. **Amount to Sell** = full `totalHolding` of the selected asset

---

## Deployment

This app is deployed on **Vercel**.

To deploy your own:
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Add New Project
3. Import your GitHub repo
4. Click **Deploy** — Vite is auto-detected, no config needed

---

## Author

**Sahithya Lakku**  
Frontend Intern Assignment — KoinX
