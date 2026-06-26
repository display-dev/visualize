# Copy

Voice, tone, and prose discipline for visualize artifacts. Brand profile overrides every rule below — if `PRODUCT.md` declares voice, tone, or audience, use it. The rules below are the fallback when the brand profile is silent. Artifact prose is not app UI microcopy: some patterns transfer (active voice, present tense, specific claims), others don't (form-instruction shape, error-dialog phrasing, translation-expansion budgets) — copy.md sticks to the artifact register.

## Voice baseline

Subject-verb-object, active voice, present tense. Artifact prose is doing work — making a claim, explaining a system, presenting a finding. Passive-voice hedging dilutes the work.

- *"The migration moves 50M rows in batches of 10K."* — direct, claims a fact.
- *"50M rows are migrated by the process in batches that have been set to 10K."* — passive, distances the prose from the work.

Sentences land. Don't open with "It is worth noting that…" or "It should be considered that…" — drop the wrapper and state the thing.

**Default register when `PRODUCT.md` is silent**: Google developer-documentation style. Present tense, short declarative, second person for actions ("you can"), no marketing voice, no hype words. Suits most technical artifacts as a starting point.

## Tone register

| Brand `voice` | Register on prose |
|---|---|
| `technical` (Stripe, Bun) | precise, unhedged when the API is deterministic |
| `analytical` (Stratechery) | structural, framework-first, long sentences when building, short on conclusions |
| `opinionated` (a16z, 37signals) | thesis-first, future-tense, founder-positive |
| `craft` (Hoefler & Co) | meticulous, historically-grounded, vocabulary-rich |
| `institutional` (Aurelius) | measured, cited, footnoted |
| `pragmatic` (BIG) | explanatory-then-poetic; constraint-then-resolution |

Pick from the brand's declared `voice`, not from a generic "professional" default.

**Voice is stable across the brand; tone shifts by moment.** An analytical brand writing a postmortem reads more formal than the same brand writing a release announcement — same voice, different tone. Match the moment without losing the voice.

## Technical writing

- **Cite the number, not the qualitative claim.** "3x faster install (1.2s vs 3.6s)" beats "much faster install."
- **Use the precise term once, then re-use it.** Don't alternate "session token" / "auth token" / "credential" / "cookie" in one paragraph as a stylistic variation.
- **Code identifiers in mono.** `<code>{snake_case}</code>` for identifiers, parameter names, file paths. Inline mono carries the typographic signal "this is a literal."
- **Inline links over footnote chrome** for short artifacts; footnotes only when the artifact carries an editorial register (Whitepaper and Editorial design systems).
- **Define the term once, near first use.** Introduce the precise term inline the first time it appears in body prose, then re-use unchanged. A late-defined glossary at the end of the artifact asks the reader to round-trip.
- **One hedge per claim, maximum.** "It might be possible that we could perhaps consider…" stacks four hedges on one verb. Pick the strongest hedge that's still honest, drop the rest.

## Headings and titles

Heading hierarchy mirrors information hierarchy. Don't skip levels (H2 → H4 with no H3 confuses scan order); don't decorate (no leading icons, no trailing colons, no parenthetical descriptors).

- **Sentence case for body headings; preserve proper nouns and product names.** "OAuth 2.0 flow", "Stripe webhook payload" — capitalize the proper noun, leave the rest lowercase.
- **Each heading carries the gist of its section.** "Migration moved 50M rows in 4h12m" beats "Migration results"; "OAuth flow drops a session cookie at `/auth/callback`" beats "OAuth flow."
- **No question-form headings** unless the brand's voice is genuinely conversational ("How does the migration handle replicas?" reads as a Q&A doc; "Migration replica behaviour" reads as a reference doc).

## Scannable structure

Readers scan before they read. Prose shape determines whether the scan finds the claim.

- **Short paragraphs** (3-5 sentences max). Beyond five, the eye loses the through-line.
- **Front-loaded claims.** Lead the paragraph with the noun + verb that carry the point; supporting detail follows.
- **Bullets vs numbered lists.** Bullets when order doesn't matter; numbered when steps depend on each other. Keep parallel structure across items — every item starts with the same part of speech.
- **Don't bullet what should be prose.** Three connected sentences are clearer than three disconnected fragments. Bullets that read as fragments of one paragraph belong as a paragraph.

See [cognitive-load.md](cognitive-load.md) for the F-pattern / Z-pattern scan-path mechanics; this section owns the prose-shape side of scannability.

## Numbers, dates, units, locale

One format per artifact. Switching mid-document forces the reader to re-parse.

- **Dates**: ISO 8601 (`2026-05-24`) for technical artifacts. Long-form (`24 May 2026` or `May 24, 2026`) only when the artifact's register is editorial and the locale is fixed.
- **Units adjacent to number** with non-breaking space (`12&nbsp;ms`, `4.2&nbsp;GB`). Don't wrap the unit onto the next line.
- **Spell the unit on first use in prose, abbreviate in tables.** "12 milliseconds" then "12ms"; tables go straight to abbreviated.
- **Don't manufacture precision.** "87.3% of users prefer X" from a sample of 20 reads as overclaim. Round to the precision the sample supports ("about 9 in 10 of the 20-person panel").
- **Tabular numerals on data displays.** See [typography.md](typography.md) for `font-variant-numeric: tabular-nums`; copy.md just notes that misaligned digits in a table read as broken.

## Captions, labels, chart copy

The text that travels with a visual carries half the visual's information.

- **Chart titles are claims, not topics.** "Latency p99 doubled after the migration" beats "Latency over time."
- **Axis labels carry units** ("Response time (ms)" beats "Response time").
- **Table column headers parallel in structure.** Either all noun phrases or all verb phrases, not a mix.
- **Captions earn their place by saying what the visual can't** — source, methodology, sample size, caveats. "Source: prod replica `db-east-1`, 2026-05-22; p99 only, errors excluded" earns its line; "A chart showing latency over time" doesn't. Narrative-on-data ("drop at 14:32 coincides with the deploy") goes on the chart annotation, not in the caption (see [data-viz.md](data-viz.md)).

See [data-viz.md](data-viz.md) for chart-annotation *placement*; this section owns the *words*.

## Inclusive language

- **Gender-neutral default.** Singular *they* for unknown persons; pluralize when it reads more naturally ("users open the dashboard" beats "the user opens their dashboard").
- **Ability-neutral phrasing.** "Open the dashboard" beats "see the dashboard"; "find the setting" beats "look at the setting."
- **Drop idioms with baggage.** "Primary/replica" (not master/slave); "allowlist/blocklist" (not whitelist/blacklist); "main branch" (not master branch).
- **Don't manufacture politeness.** "Sign in" beats "Please sign in if you'd like to"; "Save" beats "Click save when you're ready." Politeness padding reads as condescension in technical prose.

## Error, empty, success state copy

Apply only when the artifact carries interactive surfaces — most static reports / decks / dashboards skip this section entirely.

- **Errors: what + how.** "Couldn't reach the server (check your connection and retry)." Don't apologize, don't blame the user.
- **Empty states: what + why + next.** "No artifacts yet. Run `dsp publish` to ship your first."
- **Loading states: specific verb + object.** "Fetching deploys…" beats "Loading…"; "Rendering chart…" beats a bare spinner.
- **Success states: result + durable state.** "Saved. Version 3 is live." beats "Successfully saved." State what changed and what's now true; skip the "Successfully…" prefix that adds no information.
- **No humour in error copy.** A 500-error joke is funny once and abrasive on the second retry. Errors are not the moment to perform brand personality.

## CTA and link copy

- **Verb-first link text for action links.** "Download report" beats "Click here"; "Read the spec" beats "See more."
- **One primary CTA per section / viewport.** Multiple primary-styled buttons compete; the visual hierarchy collapses. See [cognitive-load.md](cognitive-load.md) for the decision-architecture side of CTA discipline.
- **Link text reads as a self-contained action or resource out of context.** A reader skimming or a screen reader pulling out all the links should see "Download report", "Read the spec", "Open the dashboard", or — for resource links — "Migration plan v3", "Stripe webhook docs". Never "here", "this", "more info."

## Failure modes the agent reaches for

- **"Consider…" / "You might want…"** — hedged suggestion when the artifact has a position. Take the position; let the reader disagree.
- **"It's worth noting that…"** — wrapper around a claim. Drop the wrapper.
- **"In today's fast-paced world…"** — AI-slop opener. Cut and start with the specific.
- **"This adds visual interest."** — vague justification (in commentary, not in the artifact). Name what specifically.
- **Em-dash overuse.** Two em-dashes per paragraph is a tell. Use commas, parentheses, or sentence breaks for variety.
- **Corporate hedging.** "It is recommended that consideration be given to…" — pull the verb to the front and drop the recommend-shaped passive.
- **"In conclusion" / "To summarize"** — the final paragraph announces itself. Just write the final paragraph.
- **"Things to consider:" scaffolding.** "Some considerations:" / "Things to keep in mind:" framings before a list — drop the framing wrapper, just list the things.
- **Title Case On Every Heading.** H2/H3/H4 in Title Case throughout reads as 1990s corporate. Sentence case for body headings; preserve proper nouns and product names.
- **Hedged superlatives.** "Arguably the best", "perhaps the most important", "one of the leading" — either commit to the claim or remove it. Hedging strips the force without buying safety.
- **Buzz-phrase chains.** "Leverage cutting-edge solutions to deliver scalable, mission-critical outcomes." Generic enterprise vocabulary stacked without a specific claim. Replace with the specific.
- **Click-here links.** Link text that requires surrounding context to mean anything ("click here", "this", "see more"). Use verb-first action text or self-contained resource labels that read on their own.
- **Fragment-chain rhythm.** "Faster. Cheaper. Better." Sequential period-fragments in the same paragraph or hero. Reads as AI-generated even when the words are right. Use fragments in isolation, not chained.
