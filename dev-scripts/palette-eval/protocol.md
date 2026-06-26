# Mood-fit A/B protocol

Measures whether a seed-picker's output leads an agent to compose palettes
that *fit the brief's register* — the claim the greenfield pipeline lives
on. Impeccable's published bar for its own script was "wins mood-fit 3 of
5, ties the rest" against frozen 4-color palettes; the bar here is to beat
impeccable's script, not just our v1.

## Contestants

One command per contestant; the composer agent sees only the command's
stdout, never the script name or source.

| name | command |
|---|---|
| v2 | `node visualize/scripts/palette.mjs --from "<topic>"` |
| v1 | `node <extracted-from-git> --from "<topic>"` (`git show c6f3452:visualize/scripts/palette.mjs`) |
| impeccable | `node ~/Development/impeccable/skill/scripts/palette.mjs --from "<topic>"` |

## Procedure (per brief in `briefs.json`)

1. **Capture** each contestant's stdout for the brief topic into its own
   file. Deterministic (`--from`), so re-runs reproduce.
2. **Compose** — one *independent* agent per contestant (fresh context, no
   cross-talk). Prompt skeleton:

   > You are composing greenfield brand tokens for this brief: "<topic>"
   > (register: <register>). A seed-picker tool produced the output below —
   > it is your only color guidance; follow what it says as you judge best.
   > Compose a complete `tokens.css`: `:root`, `[data-theme="dark"]`, and
   > the OS-dark media block; tokens: background, foreground, card,
   > card-foreground, primary, primary-foreground, secondary, muted,
   > muted-foreground, accent, accent-foreground, destructive,
   > destructive-foreground, border, input, ring, chart-1..5. OKLCH only.
   > Write it to <out-path>. <attach: captured stdout>

   No `--check` pass here — the comparison isolates what each script's
   output alone produces; mechanical quality is measured separately by
   `diversity-audit.mjs --dir`, which counts `--check` errors per file.
3. **Render** identical strips: `render-strips.mjs <tokens.css> <strip.html>
   --shot <strip.png>` — same layout for every contestant, color system is
   the only variable.
4. **Blind + judge** — the orchestrator assigns shuffled labels A/B/C
   (recorded in the `map`, never shown to judges). Each judge gets the
   brief + register + the three PNGs and returns best→worst with a one-line
   rationale per label. Pilot rounds: 1 judge/brief. Real rounds: 3
   independent judges/brief.
5. **Aggregate**: append one line per judge to `rankings.jsonl`, then
   `node aggregate-moodfit.mjs rankings.jsonl` (Borda: 2/1/0).

## Outputs

Working files live under the repo's gitignored `temp/` (e.g.
`temp/moodfit-<date>/`). Only conclusions move into commits or docs.

## Pilot findings (2026-06-11 · legal-trust · 1 judge)

The harness runs end-to-end. Blind result B > A > C = impeccable > v1 > v2
— a single brief with a single judge, so not evidence of an ordering; the
full 5-brief × 3-judge round is the real test. Two actionable v2
observations it surfaced anyway:

1. **chartHues are register-blind.** The fixed offsets injected h7 (red)
   and h75 (amber) chart hues into a cool institutional brief, and the
   judge's losing rationale named exactly those warm supports. Candidate
   fix if the full round confirms: bias chart-hue suggestions toward the
   seed's temperature, or add a rule line that suggested chart hues
   fighting the register should be re-picked within it.
2. **Strategy-prose overrides leave the budget table.** The composer
   followed a strategy's named accent ("restrained clay", h45) to a hue
   hueBudgets doesn't cover and composed it out of gamut at L 0.92.
   `--check` catches this in the real flow (the pilot deliberately skips
   the check pass to isolate seed-output quality), but it shows the
   strategy-wins precedence has no numeric rail.
