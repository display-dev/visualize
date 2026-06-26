# Brand · Bun

## What this is

A fast all-in-one JavaScript runtime, bundler, test runner, and package manager. Bun is positioned as a drop-in Node.js replacement that runs the same workloads several times faster. The product surface is the CLI (`bun install`, `bun run`, `bun test`, `bun build`) and the runtime library.

## Voice

**Axis: ops-precise** (direct, performance-first, benchmark-cited).

Sentences are short. Claims are quantitative ("3x faster install", "26x faster than `npm install`"). Marketing copy and docs share the same register — there is no separate "marketing voice" softer than the docs. When something is slower than competitors, the brand still names the number rather than hide it.

When `voice` choices arise: prefer the benchmark number over the qualitative claim. *"`bun install` resolves 1,200 packages in 0.8s"* beats *"`bun install` is much faster"*. Cite the comparison ("vs. `npm install`'s 21s on the same lockfile") when a number lands without it.

## Audience

- **Primary**: JavaScript / TypeScript developers frustrated with Node.js install times, test-suite slowness, or bundler complexity.
- **Secondary**: framework authors evaluating Bun as a runtime target; cloud platforms (Vercel, Cloudflare Workers) integrating Bun as an option.

Primary audience reads docs in the browser, reaches the runtime via the CLI, and tracks releases on the GitHub repo. The docs site is the canonical product surface.

## Format default

**code-shop** — most artifacts are technical operational. Changelogs on every release (Bun ships frequent versions), API references for the runtime library, Diff reviews of perf changes, Diagrams of the runtime architecture. Postmortems on bugs are publicly authored when consequential.

## Exceptions

- The brand tolerates strong, unhedged performance claims. Don't soften "3x faster" to "significantly faster" in `polish` — the number is the claim.
- Emoji usage is allowed in marketing chrome (release announcement headers); the docs strip them.
