---
slug: resend-style
name: Resend Style
source: live-verified
verified-at: 2026-05-28
verified-by: codex
verified-urls:
  - https://resend.com/
  - https://resend.com/docs
  - https://resend.com/pricing
canonical-canvas: dark
selection:
  mood: [minimal, productivity]
  tone: [confident, polished]
  formality: medium
  density: medium
  canonical_canvas: dark
  best_for: |
    Use for balanced artifacts that need a confident, polished register with minimal, productivity visual cues. Strongest when the reference can preserve its dark canonical canvas instead of forcing the opposite polarity.
  avoid_for: |
    Avoid when the deliverable must print cleanly or live inside a mostly light product surface.

---

# Resend Style

## §1 Canonical Canvas

| Surface | URL | Canvas | Notes |
|---|---|---|---|
| Homepage | https://resend.com/ | Dark editorial developer landing | Current title: "Resend · Email for developers." Metadata: "The best way to reach humans instead of spam folders. Deliver transactional and marketing emails at scale." Live inventory emphasizes API, SMTP, domains, deliverability, React Email, transactional and marketing email. |
| Docs | https://resend.com/docs | Developer documentation | Current docs metadata: "Resend is the email API for developers." Live inventory includes API, Node, Python, SMTP, emails, domains, webhooks, and SDK. |
| Pricing | https://resend.com/pricing | Dark pricing commerce | Current pricing metadata: "Start for free and scale up to millions of emails with flexible plans." Live inventory includes Free, Pro, emails, contacts, domains, and dedicated IP. |

Resend is dark-canonical email infrastructure with editorial confidence. The interface should feel like a premium API product: black canvas, oversized serif display, precise docs/code surfaces, white primary CTA, subtle hairlines, and small glows/accent colours only where they clarify email infrastructure.

## §2 Palette

### Dark Core

- `--background`: pure black canvas.
- `--foreground`: near-white primary text.
- `--card`: deep elevated dark panel.
- `--primary`: near-white CTA/action fill.
- `--primary-foreground`: black text on white.
- `--border`: 6% white hairline for panels, code blocks, docs, and pricing cards.
- `--brand-surface-elevated` / `--brand-surface-deep`: nested panel and code surfaces.

### Accents And Product Signals

- `--brand-accent-yellow`, `--brand-accent-blue`, `--brand-accent-green`, `--brand-accent-red`: small product states, illustrations, metrics, and status indicators.
- `--brand-link`: blue link for docs and API reference.
- `--brand-surface-light`: rare light inset for email previews or contrast examples.
- Glow tokens should remain atmospheric and low-opacity, not become decorative blobs.

### Drift vs `tokens.css`

- The token package matches current Resend: dark-only canvas, Domaine Display headlines, ABC Favorit body, Geist Mono code, white CTA, translucent hairlines, and mirrored dark mode.
- Current source inventory should emphasize email for developers, transactional email, marketing email, deliverability, domains, SMTP, API, SDKs, docs, Node, Python, webhooks, React Email, Free/Pro, contacts, and dedicated IP.
- No token cascade is required.

## §3 Typography

| Role | Family | Weight | Size | Line-height | Tracking |
|---|---:|---:|---:|---:|---:|
| Display | Domaine Display | 400 | 72-104px | 0.95-1.05 | 0 |
| Heading | Domaine Display | 400 | 48-80px | 0.95-1.08 | 0 |
| Title | Inter | 500-600 | 20-28px | 1.25-1.45 | 0 |
| Body | ABC Favorit | 400 | 15-17px | 1.45-1.65 | 0 |
| Label | Inter | 400-600 | 12-14px | 1.25-1.45 | 0 |
| Code | Geist Mono | 400 | 12-14px | 1.45-1.65 | 0 |

Use the serif for high-confidence hero and section claims. Keep UI, docs, pricing, and code precise and sans/mono.

## §4 Component Vocabulary

### global-header

**Status:** current
**Live source:** `https://resend.com/`
**Description:** Dark header with Resend wordmark, product/docs/pricing/company routes, sign in, and primary get-started action.
**States:** desktop, mobile, active route, signed in, menu open.

### email-api-hero

**Status:** current
**Live source:** Homepage
**Description:** Hero for email developers and reaching humans instead of spam folders, paired with code/API or email delivery preview.
**States:** default, code visible, CTA hover, reduced-motion.

### white-primary-button

**Status:** current
**Live source:** Resend CTAs
**Description:** White rounded action for Get started, Start sending, View docs, or Upgrade.
**States:** default, hover, focus, loading, disabled.

### dark-secondary-button

**Status:** current
**Live source:** Secondary actions
**Description:** Dark bordered button for docs, pricing, examples, or contact actions.
**States:** default, hover, focus, disabled.

### api-code-panel

**Status:** current
**Live source:** Homepage/docs API surfaces
**Description:** Code panel showing sending email through API/SDK, with language tabs and copy action.
**States:** JavaScript, Node, Python, HTTP, copied, error.

### email-preview-card

**Status:** current
**Live source:** Email product conventions
**Description:** Email preview surface showing subject, recipient, template/content, status, and metadata.
**States:** draft, sent, delivered, bounced, preview.

### deliverability-card

**Status:** current
**Live source:** Homepage deliverability copy
**Description:** Card explaining inbox placement, spam avoidance, sender reputation, and delivery health.
**States:** healthy, warning, blocked, improved.

### domain-setup-card

**Status:** current
**Live source:** Homepage/docs domain references
**Description:** Domain verification card for SPF, DKIM, DMARC, DNS records, and verification status.
**States:** unverified, pending, verified, failed.

### smtp-panel

**Status:** current
**Live source:** Homepage/docs SMTP references
**Description:** Panel for SMTP credentials, host/port, security mode, and usage example.
**States:** hidden secret, copied, rotated, disabled.

### transactional-email-card

**Status:** current
**Live source:** Homepage product copy
**Description:** Product card for transactional email use cases: password reset, receipts, notifications, onboarding.
**States:** default, example selected, sent, failed.

### marketing-email-card

**Status:** current
**Live source:** Homepage/pricing marketing references
**Description:** Product card for campaigns, audiences, contacts, unsubscribes, and performance.
**States:** draft, scheduled, sending, sent, paused.

### react-email-card

**Status:** current
**Live source:** Homepage React Email references
**Description:** Card for React Email template workflow, preview, components, and code ownership.
**States:** default, preview, code, exported.

### docs-shell

**Status:** current
**Live source:** `https://resend.com/docs`
**Description:** Documentation layout with sidebar for emails, domains, webhooks, API, SDKs, and examples.
**States:** desktop, mobile, active nav, search open, copied code.

### sdk-language-tabs

**Status:** current
**Live source:** Docs SDK examples
**Description:** Tabset for Node, Python, SMTP, HTTP/API, and other SDK examples.
**States:** selected, copied, install step, error.

### api-reference-row

**Status:** current
**Live source:** Docs API reference
**Description:** Reference row for endpoint, method, parameters, response schema, and status codes.
**States:** collapsed, expanded, required field, deprecated.

### webhook-event-card

**Status:** current
**Live source:** Docs webhooks
**Description:** Card for webhook events such as delivered, bounced, complained, opened, clicked, and delivery failures.
**States:** configured, test sent, delivered, failed, retrying.

### email-log-table

**Status:** current
**Live source:** Email dashboard conventions
**Description:** Table for message ID, recipient, subject, status, provider event, timestamp, and details.
**States:** delivered, queued, bounced, complained, filtered.

### contact-list-card

**Status:** current
**Live source:** Pricing/marketing inventory
**Description:** Card or table for contacts, audience lists, subscription status, and import count.
**States:** empty, importing, active, unsubscribed, suppressed.

### pricing-plan-card

**Status:** current
**Live source:** `https://resend.com/pricing`
**Description:** Plan card for Free, Pro, and higher-scale business needs with email volume, contacts, domains, and features.
**States:** free, pro, current plan, selected, annual/monthly.

### dedicated-ip-card

**Status:** current
**Live source:** Pricing page
**Description:** Pricing/feature card for dedicated IP or high-volume deliverability add-on.
**States:** unavailable, eligible, enabled, contact sales.

### usage-meter

**Status:** current
**Live source:** Pricing/account conventions
**Description:** Meter for emails sent, contacts, domains, and monthly allowance.
**States:** under limit, near limit, exceeded, reset soon.

### status-badge

**Status:** current
**Live source:** Email/log/domain conventions
**Description:** Small badge for sent, delivered, bounced, verified, pending, failed, or suppressed.
**States:** neutral, success, warning, error, processing.

### footer-dark-columns

**Status:** current
**Live source:** Resend footer conventions
**Description:** Dark footer with product, docs, examples, resources, company, legal, and social routes.
**States:** desktop, mobile accordion, external links.

## §5 Composition Rules

1. Stay dark-canonical. Resend should not become a light SaaS dashboard.
2. Put code and email delivery evidence close to the claim.
3. Use the serif for confidence, not for dense UI.
4. Keep glows subtle and local to product/demo panels.
5. Make deliverability, domains, webhooks, and pricing mechanics explicit.
6. White CTA is the primary action; blue is for docs links and API references.

## §6 Accessibility And States

- Hairline borders need sufficient contrast on black panels.
- White primary buttons need black text and visible focus ring.
- Email statuses must include text labels and not rely on accent colour.
- API code blocks need copy feedback and line wrapping rules.
- Domain/DNS setup needs clear pending/failure states.

## §7 Anti-Patterns

- Do not introduce generic purple AI/email gradients.
- Do not make the product feel like a newsletter builder first; it is developer email infrastructure.
- Do not use the serif for code or dense tables.
- Do not overuse glow accents as decorative backgrounds.
- Do not hide deliverability, domain, or billing details behind vague plan cards.
