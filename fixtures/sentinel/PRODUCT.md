# Brand · Sentinel

## What this is

SRE / observability platform — incident detection, runbook automation, on-call rotation, and post-incident reporting for engineering teams that operate production services. Audience is SREs, platform engineers, and on-call rotations at companies large enough to feel reliability pain (Series C and up).

## Voice

**Axis: technical** (precise / operational register).

Direct, accurate, terminology-correct. The audience uses words like *SLO*, *error budget*, *blast radius*, *MTTR* in conversation; the brand does too, without explanation. No alarm-prose — the product is the calm during incidents; the prose carries the same restraint. Postmortems specifically are *calm* even when describing severe events; the surrounding chrome is dispassionate, the prose carries the gravity.

When `voice` choices arise: prefer the technically-precise word over the readable-by-anyone word. *"P99 latency degraded 14× during the window"* over *"the site got slow"*.

## Audience

- **Primary**: SREs and platform engineers running production.
- **Secondary**: VPs of Engineering subscribing to monthly reliability reports; customer-facing transparency-page readers (Sentinel's own customers' end-users).

Primary audience lives in Slack + Grafana + Sentinel's incident-room UI. They read Postmortems while sipping coffee the day after; Plan reviews on Monday mornings; FAQs when adopting Sentinel themselves.

## Format default

**ops** — most artifacts are operational. Status pages, Postmortems, Runbooks, Plan reviews on infra migrations, Dashboards.

## Exceptions

`slop/dark-glow` is *not* whitelisted — even though the product is dark-mode-first and the ops register is dark-mode-native, the brand resists the dark-mode-with-glow trope. Status colour is solid traffic-light hue at calm chroma; no neon, no `text-shadow: 0 0 20px`.
