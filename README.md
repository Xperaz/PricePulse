# Overview

> 🌍 Dynamic discounts powered by Purchasing Power Parity (PPP)

PricePulse is a **parity-deals-clone**, helping website owners offer dynamic discounts to their customers based on their geographic location and Purchasing Power Parity (PPP). It provides a dashboard for users to manage products, set up country-specific discounts, customize the appearance of the discount banner, and view analytics on banner views. The core functionality is delivered through a small JavaScript snippet embedded on the user's website, which fetches and displays the relevant discount information to visitors based on their detected country.

🔗 **Live Demo** → [price-pulse-seven.vercel.app](https://price-pulse-seven.vercel.app/)

## ✨ Features

- 🛒 **Dynamic Discounts** — Apply country-specific discounts automatically.
- 🎛️ **Dashboard** — Manage products, configure discounts, and track performance.
- 🎨 **Customizable Banner** — Match the discount banner to any brand style.
- 📊 **Analytics** — Insights into banner impressions and discount usage.
- 🌐 **Simple Integration** — A lightweight JS snippet embeds on any site.


## 🛠️ Tech Stack

**Frontend**
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [TailwindCSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)

**Backend**
- Next.js API Routes
- PostgreSQL (hosted on [Neon](https://neon.tech/))
- [Drizzle ORM](https://orm.drizzle.team/)

**Auth & Payments**
- [Clerk](https://clerk.com/) — authentication & user management  
- [Stripe](https://stripe.com/) — payments & subscription handling  


## ⚡ How It Works

1. **Visitor Detection** → User’s country is identified.  
2. **Discount Logic** → PPP-based discount is calculated.  
3. **Banner Display** → A styled banner shows the localized discount.  
4. **Conversion Tracking** → Banner views and discount usage are logged.  


## 🚀 Getting Started

### Clone & Install
```bash
git clone https://github.com/Xperaz/PricePulse.git
cd PricePulse
npm install
npm run dev
```

