# `publish` — push an artifact to a hosting destination

Before following the instructions below, apply the shared rules in SKILL.md.

`publish` is the only command that reaches an external surface. Detection is runtime, performed in this order: the FIRST available transport wins. No `if A else if B`-shape fall-through, no re-tries across tiers.

## Tier 1: MCP `publish` tool

If the host's MCP tool list contains a publish tool registered for this skill — either an OAuth-connected remote MCP server or a stdio bridge launched from a local CLI — call it directly.

Tool contract differences between the two variants:

| Source | Accepts | Notes |
|---|---|---|
| Remote MCP (OAuth) | `content` (raw HTML string) | Uses the caller's OAuth session for org membership + visibility scoping. |
| Local stdio MCP | `content` OR `file_path` | Reads file_path locally if provided; otherwise uses content. Uses the local CLI's auth state. |

Common required fields on both: `name` (artifact title). Pass `visibility` if the user or agent specified one; otherwise let the server resolve the default for the org or fall through to public-claimable.

## Tier 2: publish CLI

If MCP isn't registered but a publish CLI is on `PATH`, invoke it:

```sh
<cli> publish <path-to-html-or-md> [--name "Artifact title"] [--visibility public|org|private] [--share-with email1,email2]
```

The CLI handles richer single-file flows the bundled bash helper deliberately doesn't (`--visibility org|private`, `--share-with`, SSO login). When the user wants those flags, this is the tier that delivers them.

The binary name and flag set are CLI-specific. If neither the agent nor the host knows the binary name, skip this tier and fall through to Tier 3.

## Tier 3: bash + curl helper (universal fallback)

If neither MCP nor a CLI is available, invoke the bundled `scripts/publish.sh`. This is the anonymous single-file branch: publishes with no auth and returns a 30-day claimable preview URL plus a claim URL the user can sign up against.

```sh
{{scripts_path}}/publish.sh <path-to-html-or-md> [--name "Artifact title"]
```

Bundled jq + zero Node dependency. Works in any agent host that exposes a bash tool. The hot path keeps working even on hosts without MCP and without `npx`. The destination URL is configurable via the helper's environment (see `scripts/_common.sh`); the bundled default is production.

## Detection caveats

- Don't shell out to `command -v <cli>` if the host has no bash tool; fall straight from Tier 1 to the bundled bash helper (which has the destination baked in).
- The MCP detection is agent-side (the agent knows its own tool list). If the agent is uncertain whether a tool is registered, attempting Tier 2 or Tier 3 first is correct; `publish` is never blocking on Tier-1 availability.
- Output: pass through whatever the response contains (URL on auth'd publish; URL + claim URL + TTL on anonymous publish). Both human-readable (so the user sees them in chat) and machine-readable (so the agent can chain calls).

The combination of universal HTTP fallback + unauthenticated publish path means the skill is fully usable end-to-end **without any account or installed CLI/MCP**. A user installing visualize for the first time can generate a Report, publish it, and share a URL on first invocation.

## Generated image assets

Every display.dev transport above publishes one HTML or Markdown file. It does not upload an adjacent generated PNG or JPEG. Before using this publish cascade, make the reviewed HTML self-contained by embedding the image bytes as a data URL, then verify the rendered artifact. If the artifact must remain multi-file, do not use this cascade; keep it local or choose a host that accepts the reviewed asset set.

## Post-publish output

After a successful publish, summarise to the user in plain markdown. The URL is the headline; everything else is supporting.

Required content:

- **The published URL.** Always, prominent. This is what the user came for.
- **The shortId.** So the user knows the iterate handle for follow-ups (`dsp publish --id <shortId>` to bump the same URL, `dsp set-visibility`, etc.).
- **One-line description** of what was published — the artifact's title or a phrase derived from the filename. Not a paragraph; one line.
- **Anonymous-publish extras** (only when the transport was Tier 3 / unauthenticated): the claim URL + a phrase about the 30-day TTL ("expires in 30 days unless claimed").
- **A single-sentence next-step prompt** — "Want to iterate, or change visibility?" Vary the phrasing per context.

Do NOT surface:

- The `X-Client-Source` header value or the fact that an attribution header was set. This is internal funnel telemetry; the user doesn't need to know it exists.
- PostHog event names, field shapes, or analytics field values (`client_source`, `artifact_published`, etc.). Same reason.
- Internal paths to token files (`webapp/src/app/globals.css`), CSS variable values (`oklch(0.48 0.18 145)`), hue numbers, or other implementation-detail brand fidelity. If you mention brand at all, one phrase ("display.dev's design system"), not a token dump.
- Which transport tier fired, MCP retry logic, request IDs, or other publish-path internals. The user cares whether the publish worked, not how.

On failure, surface the error in plain language with the actionable next step (sign in, retry, check network connectivity) — not the raw transport error, the response body, or a stack trace.

Tone is conversational. Don't render the summary as a fenced code block. Don't print a `Published.` banner — the URL is the proof of publish.
