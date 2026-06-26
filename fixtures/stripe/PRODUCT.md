# Brand · Stripe

## What this is

Payments infrastructure for the internet. APIs and a hosted dashboard for accepting payments, issuing cards, running marketplaces, automating revenue. Audience splits between developers integrating the API and finance / treasury teams operating Stripe at scale.

## Voice

**Axis: technical** (precise / formal-friendly register).

Sentences are short and unhedged when the API behaviour is deterministic; longer and qualified when the behaviour involves regulators, networks, or counterparty risk. Documentation is famously tight — every example is runnable, every error code is documented, no marketing prose in reference docs. Stripe Press long-form is a separate register (serif, essayistic) but the product surface stays technical.

When `voice` choices arise (Postmortem reflection, FAQ phrasings, Plan-review prose): prefer the precise word over the colloquial one (*"the webhook delivery retries failed at the third attempt"* over *"webhooks broke"*). Never apologise unless something genuinely went wrong.

## Audience

- **Primary**: developers integrating the Stripe API, ranging from solo founders to platform-engineering teams at large marketplaces.
- **Secondary**: finance, treasury, compliance, fraud teams operating Stripe day-to-day; engineering leaders making vendor decisions.

Primary audience reads in the Stripe docs site, in their IDE, and in `stripe-cli` output. The docs are the primary product surface for the API audience.

## Format default

**dev-product** — most artifacts are technical / operational. Postmortems on outages (rare but public), Plan reviews on infra migrations (e.g., the move to multi-region active-active), FAQs on integration patterns. Stripe Press publishes long-form (Editorial register) but that's a sibling brand, not the default.

## Exceptions

None at the lint level. Stripe's marketing surfaces use subtle gradients (the famous Stripe gradient is a brand signature) but those are *marketing pages*, not the artifact surface the skill produces. For artifact output, the detector's gradient warnings apply normally.
