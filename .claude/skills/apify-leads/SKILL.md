---
name: apify-leads
description: Apify DTC Lead Scraping skill for Zatreides Creatives — scrapes 1,000+ qualified DTC brand leads using the Apify API. Use when the user wants to scrape leads, build a prospect list, find DTC brands, run lead gen, or chain Apify actors. Also triggers on mentions of Meta Ad Library scraping, Shopify scraper, DTC prospecting, or Apify API.
---

# Apify DTC Lead Scraping — Know Me Skill

## What This Skill Does
Scrapes 1,000+ qualified DTC brand leads using the Apify API. Built for Zatreides Creatives to prospect email and retention marketing clients doing $50,000–$200,000/month in revenue.

---

## Target Profile
- **Revenue Range:** $50K–$200K/month
- **Platform:** Shopify-based DTC brands
- **Verticals:** Supplements & Fitness · Skincare & Beauty · Food & Beverage · Fashion & Lifestyle
- **Decision Makers:** CMO · Founder · Head of Marketing · Director of Retention · VP Marketing

---

## Scraping Sources (Run in Order)

### 1. Meta Ad Library (Primary — Strongest Revenue Signal)
- **Actor:** `apify/meta-ad-library-scraper`
- **Filter:** Brands running 5+ active ads
- **Signal:** Active ad spend = real revenue, real budget
- **Target:** 400 leads
- **Keywords:** DTC supplements · clean skincare · functional beverage · activewear · protein snack · collagen · pre-workout · gut health · natural beauty · athleisure

### 2. Shopify Store Scraper (Secondary)
- **Actor:** `busines-of-up/shopify-scraper`
- **Filter:** 50–2,000 product reviews + active email popup
- **Signal:** Review volume + email program = email agency fit
- **Target:** 400 leads

### 3. Google Search Scraper (Tertiary)
- **Actor:** `apify/google-search-scraper`
- **Filter:** Deduplicated against Sources 1 & 2
- **Signal:** Brand visibility + hiring posts
- **Target:** 200 leads
- **Queries:** Best DTC supplement brands · fastest growing DTC food brands · DTC activewear Shopify · email marketing hiring DTC brand

---

## Data Points Collected Per Lead

| Field | Description |
|---|---|
| Brand Name | — |
| Website URL | Primary dedup key |
| Vertical | Supplements / Skincare / Food & Bev / Fashion |
| Revenue Signal | Ad count / review count / traffic estimate |
| Decision Maker Name | If available |
| Decision Maker Title | CMO, Founder, Head of Marketing, etc. |
| Contact Email | Footer, contact page, or LinkedIn |
| LinkedIn Company URL | — |
| Hiring Signal | Yes/No + role title |
| Klaviyo Installed | Yes/No (BuiltWith cross-ref) |
| Meta Ads Active | Yes/No + creative count |
| Notes | — |

---

## Output
- **Format:** CSV
- **File name:** `zatreides_dtc_leads_[date].csv`
- **Deduplication:** By website URL before export
- **Minimum:** 1,000 unique brands

---

## How to Run (Claude Code)
1. Open Claude Code in terminal
2. Paste the Apify Lead Scraper prompt
3. Insert Apify API key
4. Claude Code chains all three actors automatically
5. Exports clean CSV on completion

---

## Priority Signals (Hottest Leads First)

| Signal | What It Means |
|---|---|
| 10+ active Meta ads | Real ad budget, needs creative volume |
| Klaviyo installed | Already believes in email — warm conversation |
| Hiring for email/retention | Active gap — your services solve it right now |
| 100–2,000 reviews | Proven product, scaling phase |

---

## Maintenance
- Re-run weekly to catch new brands entering the revenue range
- Cross-reference hiring signals monthly for fresh outreach hooks
- Layer the `cold-email` skill on top of this list for a full outreach pipeline
