# Seed-curation pipeline

Grows the `palette.mjs` seed library with instruments instead of vibes.
Four stages; stage 2 is the human in the loop.

```
1. generate-candidates.mjs   maximin gap-fill in OKLab, seeded with the
                             shipped library → data/candidates.jsonl
                             (deterministic; commit the set that was judged)

2. swipe-server.mjs          node dev-scripts/palette-curate/swipe-server.mjs
                             → http://127.0.0.1:4747 — keyboard tinder-pass
                             (← kill · → keep · z undo). Candidates render in
                             context: committed primary on light + dark
                             scaffolds with their derived tinted neutrals,
                             plus the zone's existing seeds for comparison.
                             Verdicts append to data/verdicts.jsonl (the
                             taste record — committed). Resumable; sessions
                             can stop anytime.

   build-standalone.mjs      Remote variant for phone/away curation: emits
                             temp/seed-swipe.html (all candidates inlined,
                             verdicts in localStorage, touch swipe + buttons,
                             "Copy results" exports a positional verdict
                             string guarded by an FNV-1a hash of the
                             candidate set). Publish with
                             `dsp publish temp/seed-swipe.html --name "Seed swipe" --company`
                             (live: https://display.dsp.so/3x4E0qly-seed-swipe —
                             update via --id 3x4E0qly --base-version <n> when
                             candidates change). Paste the copied string into
                             an agent session and run:
                             `node dev-scripts/palette-curate/ingest-paste.mjs '<string>'`
                             which appends to data/verdicts.jsonl (refuses on
                             set-hash mismatch).

3. coverage.mjs              zone × lightness-band matrix of shipped /
                             kept / pending — where taste still has headroom.

4. (agent session)           keeps → mood + strategy authoring in the
                             material-exemplar register, polarity calls,
                             gamut re-verification, library PR with the
                             updated coverage matrix in palette.mjs's header.
```

Calibration: impeccable kept ~32% of ~400 pre-screened candidates. The
generator's mechanical filters (sRGB headroom, cream-band exclusion,
min-distance to shipped seeds and other candidates) replace impeccable's
LLM pre-screen — every candidate is already plausible; the swipe is pure
taste. Under-filled cells in the generator's matrix are usually gamut
truth, not bugs (dark saturated teal barely exists in sRGB, and what does
exist is already occupied by shipped seeds).

`oklch-lib.mjs` duplicates the color math from `visualize/scripts/palette.mjs`
(which exports nothing by design); if the runtime rules change, update both.
