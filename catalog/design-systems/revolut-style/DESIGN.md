---
slug: revolut-style
name: Revolut Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://www.revolut.com/en-US/about-revolut/
  - https://www.revolut.com/en-US/business/
  - https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/
canonical-canvas: light
selection:
  mood: [enterprise, data-rich]
  tone: [confident, polished]
  formality: high
  density: medium
  canonical_canvas: light
  best_for: |
    Use for balanced artifacts that need a confident, polished register with enterprise, data-rich visual cues. Strongest when the reference can preserve its light canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the source material asks for a sharply different emotional register, density profile, or canvas polarity.

---

# Revolut Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| About | https://www.revolut.com/en-US/about-revolut/ | Black/white consumer fintech | Current official copy: "We change the way you do money." It frames Revolut around spend, send, save, and doing all things money in one app. |
| Business | https://www.revolut.com/en-US/business/ | Business account product page | Current official copy: "Go beyond business as usual" and "The all-in-one business account." It emphasizes global payments, multi-currency accounts, smarter spending, transfers, expenses, and currency exchange. |
| AIR assistant news | https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/ | Product/feature announcement | 2026 launch copy frames AIR as an in-app AI assistant for money intelligence, spend breakdowns, travel essentials, and card controls. |

Revolut is a premium consumer-and-business money app. It alternates black cinematic chapters with clean white product surfaces, uses cobalt-violet as the brand stamp, and relies on polished app/card/phone mockups rather than abstract finance imagery.

## §2 Palette

### Core Surfaces

- `--background`: white catalogue and product detail canvas.
- `--foreground`: dark cool ink.
- `--primary`: Revolut cobalt-violet for primary product actions and brand highlights.
- `--primary-foreground`: white on cobalt.
- `--brand-canvas-dark`: black storytelling canvas.
- `--brand-surface-elevated`: dark elevated product panel inside black bands.
- `--secondary`: pale gray utility surface for cards, rows, and app chrome.

### Product Accent Palette

- `--brand-accent-light-blue`: payments, transfer, and informational product moments.
- `--brand-accent-light-green` / `--brand-accent-green-text`: savings, growth, success, and positive account movement.
- `--brand-accent-yellow` / `--brand-accent-warning`: caution, allowances, and account warnings.
- `--brand-accent-pink`, `--brand-accent-danger`, `--brand-accent-deep-red`: card, crypto, alert, or high-impact product moments.
- `--brand-accent-brown`: premium card/material accents.

### Drift vs `tokens.css`

- The token package is aligned: Aeonik Pro display, Inter body, black/white polarity, cobalt primary, saturated product accents, large radii, and hand-tuned dark mode.
- Current source inventory should emphasize spend, send, save, all things money, cards, savings, investing, crypto, travel, security, AIR assistant, business, global payments, multi-currency accounts, transfers, expenses, invoices, and exchange.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Aeonik Pro | 500-650 | 64-136px | 0.95-1.08 | 0 |
| Heading | Aeonik Pro | 500-650 | 40-80px | 1.0-1.12 | 0 |
| Title | Aeonik Pro | 500-600 | 20-28px | 1.2-1.4 | 0 |
| Body | Inter | 400 | 15-17px | 1.45-1.65 | 0 |
| Label | Inter | 500-700 | 12-14px | 1.25-1.45 | 0 |
| Mono | system mono only for transaction IDs / API snippets | 400 | 12-14px | 1.45-1.6 | 0 |

Use large, confident display type with direct money verbs. Keep product detail text compact and practical.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** Official Revolut public pages
**Description:** Header with personal/business routes, money products, pricing/plans, help/company routes, region selector, sign-in, and app/get-started action.
**States:** desktop, mobile, personal, business, region open, signed in.

### all-things-money-hero

**Status:** current
**Live source:** About page positioning
**Description:** Hero for doing all things money: spend, send, save, invest, borrow/manage, and simplify money in one app.
**States:** default, app mockup loaded, dark band, CTA hover.

### phone-app-mockup

**Status:** current
**Live source:** Revolut product marketing conventions
**Description:** Large phone/app render showing balances, cards, transfers, pockets, insights, or assistant context.
**States:** light, dark, carousel, product selected.

### cobalt-primary-pill

**Status:** current
**Live source:** Revolut CTA system
**Description:** Cobalt-violet rounded action for Get started, Open account, Try Revolut, or Download.
**States:** default, hover, focus, loading, disabled.

### dark-secondary-pill

**Status:** current
**Live source:** Dark storytelling surfaces
**Description:** Black or outlined secondary action for Learn more, Compare plans, or Contact sales.
**States:** default, hover, focus, disabled.

### card-product-tile

**Status:** current
**Live source:** Consumer card/product pages
**Description:** Tile for physical, virtual, disposable, premium, or business cards with product image and usage context.
**States:** default, selected, ordered, frozen, premium.

### balance-card

**Status:** current
**Live source:** Money app surfaces
**Description:** Account balance card with currency, available balance, account details, recent movement, and primary actions.
**States:** personal, joint/shared, business, hidden balance, loading.

### transfer-flow-card

**Status:** current
**Live source:** Consumer/business transfer positioning
**Description:** Transfer module for sending money, currency, recipient, fees, delivery estimate, and confirmation.
**States:** empty, quote, verifying, sent, failed.

### exchange-rate-card

**Status:** current
**Live source:** Business multi-currency copy
**Description:** Currency exchange card with pair, rate, allowance, market-hours note, and exchange action.
**States:** default, market open, market closed, allowance exceeded, confirmed.

### savings-vault-card

**Status:** current
**Live source:** Consumer money/savings positioning
**Description:** Savings card for vaults/pockets, goals, interest/APY where applicable, and contribution progress.
**States:** empty, active, goal reached, paused, unavailable.

### investing-card

**Status:** current
**Live source:** Consumer investing positioning
**Description:** Investing surface for stocks, ETFs, robo-advisor or portfolio performance with risk/legal context.
**States:** default, gain, loss, pending order, restricted.

### crypto-card

**Status:** current
**Live source:** Crypto product references
**Description:** Crypto product card for holdings, price movement, buy/sell, crypto card/payment, and risk warnings.
**States:** default, up, down, trading, restricted, warning.

### travel-money-card

**Status:** current
**Live source:** Travel/stays/foreign exchange positioning
**Description:** Travel module for cards abroad, exchange, travel benefits, stays, and trip preparation.
**States:** default, trip active, currency selected, benefit locked.

### money-intelligence-assistant

**Status:** current
**Live source:** 2026 AIR assistant announcement
**Description:** AI assistant panel for spend breakdowns, money questions, travel essentials, and card controls.
**States:** idle, asking, answered, action suggested, needs confirmation.

### security-defense-card

**Status:** current
**Live source:** Consumer security positioning
**Description:** Security card for fraud defenses, card controls, freezes, alerts, and account protection.
**States:** protected, alert, card frozen, action required.

### business-account-hero

**Status:** current
**Live source:** `https://www.revolut.com/en-US/business/`
**Description:** Business hero for global payments, multi-currency accounts, smarter spending, and business efficiency.
**States:** default, open account, speak to sales, region note.

### business-payment-card

**Status:** current
**Live source:** Business account page
**Description:** Card for global payments, local/SWIFT details, receiving money, and sending transfers.
**States:** default, transfer quote, sent, failed.

### expense-management-card

**Status:** current
**Live source:** Business account page
**Description:** Business expense card for receipts, categorization, reconciliation, team member, and AI automation.
**States:** submitted, approved, rejected, reimbursed, needs info.

### invoice-card

**Status:** current
**Live source:** Business finance workflow
**Description:** Invoice tile with client, due date, amount, status, and payment route.
**States:** draft, sent, paid, overdue, canceled.

### team-card-control

**Status:** current
**Live source:** Business card/team spending features
**Description:** Team card control surface for limits, merchant rules, approvals, and card status.
**States:** active, frozen, limit reached, approval required.

### plan-comparison-card

**Status:** current
**Live source:** Revolut plans/pricing conventions
**Description:** Plan card for Standard, Plus/Premium/Metal/Ultra or business tiers depending on region.
**States:** current, selected, popular, unavailable, annual/monthly.

### money-stat-strip

**Status:** current
**Live source:** About page company metrics
**Description:** Stat strip for customers, countries/regions, currencies, business customers, or other company proof.
**States:** default, animated, footnoted.

### transaction-list

**Status:** current
**Live source:** Revolut app UI conventions
**Description:** List of transactions with merchant, amount, currency, category, icon, and status.
**States:** pending, completed, declined, refunded, disputed.

### product-accent-card

**Status:** current
**Live source:** Revolut product brochure patterns
**Description:** Large rounded card using one saturated accent with product mockup and short benefit.
**States:** blue, green, yellow, pink, black, selected.

### footer-mega-columns

**Status:** current
**Live source:** Revolut footer conventions
**Description:** Footer for personal, business, company, legal, help, app download, region, and social routes.
**States:** desktop, mobile accordion, region, legal.

## §5 Composition Rules

1. Use product/app/card mockups as hero objects.
2. Alternate black storytelling chapters with clean white product sections.
3. Keep cobalt as the main brand action; use other colours only for product categories.
4. Use direct money verbs: spend, send, save, invest, exchange, manage, protect.
5. Financial claims need regional/legal footnotes where relevant.
6. Business surfaces should foreground payments, accounts, expenses, transfers, and team controls.

## §6 Accessibility And States

- Cobalt buttons need white text and visible focus rings.
- Bright accent cards need contrast checks before placing body text on them.
- Money movement states must include text labels, not just colour.
- Legal/risk copy for investing and crypto needs readable hierarchy.
- App mockups need fallback content when imagery is unavailable.

## §7 Anti-Patterns

- Do not make Revolut look like a conservative retail bank.
- Do not overuse every product accent on one screen.
- Do not use generic fintech navy/gold.
- Do not hide fees, limits, exchange context, or risk copy.
- Do not make AI assistant surfaces feel detached from money tasks.
