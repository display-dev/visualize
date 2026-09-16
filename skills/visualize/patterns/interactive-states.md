---
name: Interactive states
description: Artifact-level controls, overlays, feedback, and changing content that need coherent semantics and behavior.
variants:
  - actions
  - tabs-and-disclosure
  - forms-and-validation
  - overlays
  - status-and-feedback
---

# Interactive states

## Use when

Use this recipe when a self-contained artifact has functional controls or changes content in place: filters, tabs, disclosures, forms, dialogs, popovers, toasts, loading, empty, success, or error states.

## Do not use when

Do not add controls to make a static document look like an application. Do not simulate a backend, authentication, persistence, or navigation the artifact cannot perform.

This recipe owns artifact-level semantic and state behavior. It is not an importable component library. [motion.md](../reference/motion.md) and [animate.md](../reference/animate.md) own timing and animation; this recipe defines what remains understandable when motion does not run.

## Shared contract

Prefer native HTML elements and their built-in behavior. Every control needs an accessible name, a visible `:focus-visible` indicator, and the same outcome from keyboard and pointer. Use DOM order as tab order; never add positive `tabindex`. State and meaning need a persistent text, icon, shape, or position cue rather than color or motion alone. On coarse pointers, keep targets comfortably tappable and do not hide essential behavior behind hover.

Keep the state model small and truthful. Author only states the artifact can reach, preserve entered data and focus across updates, and leave a stable region in the DOM when assistive technology needs to hear changing content.

## Buttons and action hierarchy

- Use `<button>` for local actions and `<a href>` for destinations. A clickable `<div>` is neither.
- Give one action per decision scope primary filled emphasis. Keep peers neutral; make destructive actions visually and verbally distinct.
- Start labels with the action verb. A destructive confirmation repeats the consequence, such as `Delete project`, rather than `OK` or `Yes`.
- Keep the label present while busy, set `aria-busy` on the updating region when useful, and disable the submit action only after work starts. A disabled-looking control must also behave as disabled.
- Icon-only actions need a specific accessible name; decorative icons inside a labeled action stay out of the accessibility tree.

## Tabs and disclosure

Use tabs only for peer views where one panel is visible at a time. Exactly one tab has `aria-selected="true"` and its linked panel visible; peers use `aria-selected="false"` and their panels stay hidden. A tab list is one Tab stop: one tab—the current roving focus stop—has `tabindex="0"`, all others use `tabindex="-1"`, and the focus stop begins on the selected tab. Arrow keys move DOM focus and `tabindex="0"` together, wrapping within the list; Home and End move to the first and last tabs. Tab leaves the tab list for the active panel or next focusable element. Connect each tab and panel with stable `id`, `aria-controls`, and `aria-labelledby` values.

Choose one activation model. Use automatic activation only when panels appear immediately: moving focus also updates `aria-selected` and the visible panel. When switching is expensive or disruptive, use manual activation: arrow keys move focus without changing the panel, and Enter or Space updates selection and reveals the focused tab's panel.

For simple expandable content, prefer `<details>` and `<summary>`. A custom disclosure uses a real `<button aria-expanded aria-controls>`; Enter and Space toggle it. Keep a visible disclosure cue and remove collapsed content from both display and focus order.

## Forms and validation

- Use a real `<form>`. Give every control a visible `<label>` associated by `for`/`id` or wrapping; placeholders are examples, never labels.
- Provide meaningful `name`, `type`, `inputmode`, and `autocomplete` values. Do not block paste or valid intermediate input.
- Allow submission so validation can explain the problem. Put an actionable error beside the field, set `aria-invalid="true"`, connect it with `aria-describedby`, and focus the first invalid field after submit.
- During submission, preserve the original action label beside any progress indicator. Announce success through a polite status region; use `role="alert"` only for urgent form-level failures not tied to a field.

## Dialogs, tooltips, and popovers

Prefer native `<dialog>` with `showModal()` for modal work. Give it an accessible title, move focus inside on open, keep background content inert, let Escape close it, and return focus to the trigger. In destructive confirmations, initial focus goes to the least destructive action.

A tooltip carries short supplementary text only—never an action, required instruction, or the only explanation for a disabled control. It must be reachable from keyboard focus as well as pointer hover and dismissible with Escape. Use a popover or dialog for interactive or longer content.

## Toasts and status updates

Render a stable live region before updating it. Use `role="status"` for routine confirmations, loading updates, and result counts; reserve `role="alert"` for urgent untied failures. Never move focus to a toast.

A low-stakes confirmation may time out. A toast containing an action, error, or information the reader may need stays until dismissed; never put the only undo or recovery path in an auto-dismissing surface. If a timed toast is necessary, give it at least five seconds and pause the timer on hover or focus.

## Loading, empty, success, and error transitions

Keep the updating region structurally stable across states. Mark it `aria-busy="true"` while loading, preserve controls that still work, then announce the result. Skeletons mirror the content shape without becoming unlabeled mystery chrome.

An empty state says what the region is, why it is empty when known, and offers one clear next action. A filtered empty state names the active filter or query and offers a way out. Errors say what failed and how to recover. Success confirms the completed action without displacing the reader's focus.

When transitioning between these states, retain the final semantic cue when motion is reduced or absent. Do not delay usable content so an entrance animation can finish.

## Mobile behavior

Stack actions without changing their priority or reading order. Keep dialogs within the viewport, let their body scroll without moving the page behind them, and avoid bottom-fixed feedback that collides with browser or device chrome. Hover may enhance a control but can never reveal its only label, content, or action.

## Failure modes

- Application chrome added to a static report with no real behavior.
- Primary, secondary, and destructive actions rendered with equal emphasis.
- Tabs that only respond to clicks or disclosures whose collapsed content remains focusable.
- Placeholder-only fields, color-only errors, or submit disabled before validation can run.
- Dialog closed without restoring focus, or background controls reachable while it is open.
- Tooltip carrying interactive content, or a toast stealing focus.
- Loading, empty, error, and success rendered as unrelated layouts that jump the reader around.
- Motion as the only indication that state changed.
