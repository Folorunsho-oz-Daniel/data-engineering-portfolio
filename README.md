# 📊 Professional Data Engineering Portfolio

## 📁 Project 1: NHS Staff Wellbeing Dashboard

**🔴 Live site:** https://folorunsho-oz-daniel.github.io/data-engineering-portfolio/

### 🏥 Project Overview
A front-end wellbeing tool built for NHS staff working demanding shifts — a lightweight, no-login web app focused on three things staff on long shifts tend to neglect: tracking actual hours worked, taking real breaks, and staying hydrated.

### ⚙️ Features
* **Shift Tracker:** Start/end shift logging to keep an accurate record of hours worked.
* **15-Minute Break Timer:** A simple countdown timer encouraging staff to actually step away and rest during a shift.
* **Hydration Tracker:** A running count of water glasses logged through the shift.
* **Staff Support Hub:** Signposting to the trust's psychological support helpline, alongside simple wellbeing reminders.

### 🚀 Key Skills Demonstrated
* **Front-end fundamentals:** HTML/CSS/JS interactivity (timers, counters, state tracking) built and shipped without a framework.
* **Static site deployment:** Hosted live via GitHub Pages, directly from the repo.
* **User-centered design for a specific, real audience:** built around the actual, unglamorous pain points of shift-based healthcare work (fatigue, dehydration, inconsistent breaks) rather than a generic dashboard demo.

---

## 📁 Project 2: Postpartum Care Insights — Live Data Pipeline & Dashboard (Supabase & Streamlit)

**🔴 Live dashboard:** https://postpartum-care-insights.streamlit.app/
**💻 Source code:** https://github.com/Folorunsho-oz-Daniel/postpartum-care-insights

### 📊 Project Overview
Inspired by [datanerd.tech](https://datanerd.tech) (Luke Barousse) — a live job-market data platform — this project applies the same pattern to postpartum care: aggregating commonly asked questions, tagging them by topic, tracking trends over time, and linking each category to a real, verified support resource. The goal was to build a genuinely working end-to-end pipeline, not a static demo — real data, a live cloud database, and a publicly deployed dashboard.

### ⚙️ Pipeline Architecture

**Data layer — two sources feeding one schema:**
* **Real data:** 156 real health questions sourced from [MedQuAD](https://github.com/abachaa/MedQuAD) (Ben Abacha & Demner-Fushman, 2019) — a public, CC BY 4.0 licensed dataset of ~47,000 question-answer pairs compiled from 12 NIH health websites. A keyword-based classifier filters and categorizes the postpartum/pregnancy-relevant subset.
* **Synthetic data:** ~4,400 generated questions across 8 categories, weighted by postpartum stage (0–2 weeks through 6–12 months) to simulate realistic topic trends over a 16-week window, used to fill out volume the real dataset alone doesn't provide.
* Both sources land in the same `questions` table with a `source_type` column, so real and synthetic data are queryable side by side — and the schema supports adding more live sources later without a redesign.

**Database — Supabase (managed cloud Postgres):**
* Schema includes a staging table for incremental ingestion (`raw_reddit_posts`), a watermark table (`pipeline_state`) to track incremental sync progress, the clean `questions` table, a curated `resources` table, and an aggregation view (`category_trends`) so the dashboard queries pre-aggregated data instead of scanning raw rows.
* Row Level Security enabled, with a public read-only policy — the dashboard connects with a public key that can read but never write or delete.

**Resources — curated, not scraped:**
* Each category links to one real, verified resource (NHS, Postpartum Support International, La Leche League GB, The Lullaby Trust, NHS Inform), each with a `last_verified` date — deliberately manual rather than automated, since accuracy matters more than automation for anything health-related.

**Dashboard — Streamlit, deployed on Streamlit Community Cloud:**
* Live, publicly hosted (not just runnable locally) — trend chart by category over time, category breakdown, free-text search, source filter (real vs. synthetic), and a resource panel.

### ⚠️ Known limitations (documented honestly, not hidden)
* A fully live, continuously-incrementing source (Reddit API, via an idempotent watermark-based ingestion job) was designed and built — schema, dedup logic, and ingestion script are all in the repo — but blocked by Reddit's account-verification flow during a live build session. The `raw_reddit_posts` and `pipeline_state` tables are ready for it.
* MedQuAD questions don't include original ask-dates, so they're stamped with ingestion date rather than a real timestamp — visible as a single-week spike in the trend chart rather than smoothed real-world distribution.

### 🚀 Key Engineering Skills Demonstrated
* **Data sourcing & licensing awareness:** chose a real, appropriately licensed public dataset (CC BY 4.0) over scraping, with proper attribution.
* **Schema design for incremental/idempotent pipelines:** watermark tracking and natural-key deduplication, designed before the live source was blocked — the pattern is provable even though the live feed isn't running yet.
* **Cloud database management:** Supabase/Postgres, Row Level Security policy design, aggregation views.
* **End-to-end deployment:** GitHub → Streamlit Community Cloud, with secrets managed outside of source control.
