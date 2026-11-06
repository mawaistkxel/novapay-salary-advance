# DESIGN.md: NovaKit Lite × NovaPay salary advance

The single design reference for this repo: product context, principles, tokens, components, patterns, copy rules and accessibility. Use it when designing or building any screen here, by hand or with AI.

- **Product rules** (fees, tiers, dates): [`PRODUCT_REFERENCE.md`](PRODUCT_REFERENCE.md). It wins on any conflict.
- **Why each decision was made:** [`docs/DECISIONS.md`](docs/DECISIONS.md) · **what changed in the system:** [`docs/SYSTEM_CHANGES.md`](docs/SYSTEM_CHANGES.md)
- **Source of truth for values:** `tailwind.config.js` (tokens) and `src/novakit/` (components). If this file and the code disagree, the code wins; fix this file.
- **Figma mirror:** [Nova Lite → Components](https://www.figma.com/design/8nnupfLUC7Futie5CQh22R/Nova-Lite?node-id=1-25) (variables, text styles, component sets) · [Research page](https://www.figma.com/design/8nnupfLUC7Futie5CQh22R/Nova-Lite?node-id=1-24) (assumptions and research board)

---

## 1. Context

**NovaPay** is a mobile wallet in an emerging market (amounts in PKR). Its **salary advance** lends salaried users a small amount to bridge to payday:

| Rule | Value |
|---|---|
| Tiers | Rs 5,000 · 10,000 · 15,000. The offered limit is the highest tier the user qualifies for; any tier up to it can be taken. Requesting above the limit isn't allowed. |
| Fee | **3% of the amount disbursed, charged once**: not interest, not monthly |
| Repayment | In full, taken automatically from the wallet on the **next payday** (2–4 weeks out; the date is known at offer time) |
| Examples | 5,000 → **5,150** · 10,000 → **10,300** · 15,000 → **15,450** |
| Haircut | The disbursed amount may be lower than requested after risk checks; the fee follows the disbursed amount |
| Decisions | Approved (offer) or declined. Internal reasons: `credit_score`, `income_unverified`, `other` |
| Repayment outcomes | `on_time` · `late` (days tracked) · `default` (30+ days past due) |

**Why design matters here:** in this market, predatory digital-lending apps have harmed borrowers and drawn regulatory action. Lending is the highest-trust moment in the wallet. The current flow "converts fine", and that is the warning: a flow can convert well *because* the cost is easy to miss.

**Prototype data:** demo limit Rs 10,000 · payday **28 Jul** (matches "Salary credited 28 Jun" on Home) · starting balance Rs 4,250. See `src/data/scenarios.js`.

**Not defined anywhere; never invent:** late fees or penalties, what happens if the wallet is short on payday, why a limit is what it is, cancellation or cooling-off rules, freelancer eligibility. If a screen needs one of these, stop and ask; record answers in `docs/DECISIONS.md`.

---

## 2. Principles

1. **Cost and consent live together.** The amount received, the fee, the total to repay and the repayment date sit on the same screen as Accept, before it, at body size.
2. **No is as easy as yes.** "Not now" is the same size, weight and contrast as the primary action. No pre-ticked consent, countdowns, fake urgency or guilt-tripping.
3. **Never fine print.** Money facts (fee, total, date) are never caption size or low-contrast gray.
4. **No hype for debt.** No celebration, confetti or excitement for borrowing. The amber accent never sells the loan.
5. **Bad news, plainly.** Name the real reason in everyday words, say what the person can do next, and offer a next step only where one exists. No shame, no threats, no "try again later" when nothing would change.
6. **Design the trap away.** Don't let the UI offer something the user can't have and then show an error (e.g. lock the over-limit tier with a reason instead of erroring).
7. **Don't anchor high.** Nothing preselected; no defaulting to the largest amount.
8. **Say only what's true.** Copy never implies a rule the product hasn't defined, in either direction (no "no other charges", no "free to cancel").
9. **Restraint in the system.** Extend NovaKit only when the flow needs it, map everything to tokens, and no new libraries.

---

## 3. Tokens

All tokens live in `tailwind.config.js` under `theme.extend` and are used as Tailwind classes (`bg-brand`, `text-neutral-700`, `rounded-md`, `shadow-card`, `text-title`). **No hard-coded hex in components.** In CSS, use `theme()` (see `src/index.css`). In Figma, each token is a variable in the **NovaKit** collection whose code syntax is its `theme()` path.

### 3.1 Colour

Contrast is against white unless noted. AA needs **4.5:1** for normal text, **3:1** for large text (≥ 24px, or ≥ 18.66px bold) and UI graphics.

| Token | Hex | On white | Use | Don't |
|---|---|---|---|---|
| `brand-50` | #EEF2FF | 1.12 | Selected surface (tier), info Notice background | Text |
| `brand-100` | #E0E7FF | 1.23 | Info Notice border | Text |
| `brand-200` | #C7D2FE | 1.49 | Spare tint | Text |
| `brand-400` | #818CF8 | 2.98 | Spare tint | Text (fails) |
| `brand` (DEFAULT) | #4F46E5 | **6.29** | Primary button, selected border, radio, focus ring, links | — |
| `brand-pressed` | #3730A3 | **9.93** | Primary button `:active` | — |
| `brand-800` | #312E81 | **11.42** | Info Notice title | — |
| `accent-50` | #FFF7E6 | 1.07 | Caution Notice background | Text; making borrowing look exciting |
| `accent-100` | #FDECC8 | 1.17 | Caution Notice border | Text |
| `accent` (DEFAULT) | #F59E0B | 2.15 | Decorative only | **Text (fails)**; selling the loan |
| `accent-600` | #B45309 | **5.02** | Caution Notice title (4.71:1 on `accent-50`) | — |
| `neutral-50` | #FAFAFA | 1.04 | Locked tier surface, page-level panels | Text |
| `neutral-100` | #F2F2F2 | 1.12 | Pressed secondary, icon circles, disabled fields, app bar border | Text |
| `neutral-200` | #ECECEC | 1.18 | Card border, dividers, page background | Text |
| `neutral-300` | #D9D9D9 | 1.41 | Field and button borders, list dividers, disabled primary | Text |
| `neutral-500` | #808080 | 3.95 | **Graphics only**: checkbox/radio borders, placeholders, disabled text | Readable text (fails AA) |
| `neutral-700` | #4D4D4D | **8.45** | Secondary text, labels, hints, secondary button text, captions | — |
| `neutral-900` | #1A1A1A | **17.40** | Primary text, money values, Toast background | — |
| `success` | #1E9E5A | 3.45 | Icon only (✓ on `neutral-900`, 5.05:1) | White text on it (fails) |
| `white` | #FFFFFF | — | Surfaces, text on brand/neutral-900 | — |

**Semantic roles (no separate tokens; use these mappings):**

| Role | Token |
|---|---|
| Text: primary / secondary | `neutral-900` / `neutral-700` |
| Text on primary / on dark | `white` |
| Surface / selected / locked | `white` / `brand-50` / `neutral-50` |
| Border: default / subtle / selected | `neutral-300` / `neutral-200` / `brand` |
| Info message | bg `brand-50`, border `brand-100`, title `brand-800`, body `neutral-900` |
| Caution message (read carefully; failed action) | bg `accent-50`, border `accent-100`, title `accent-600`, body `neutral-900` |
| Error / danger | **None exists.** Failures use caution, deliberately: a failed request isn't the user's error. If a true error tone is ever needed, add `danger` / `danger-50` with a contrast check. |

Known issues: the brand "ramp" mixes a state name (`pressed`) into numeric steps, and `brand-800` is Tailwind indigo-900 (`accent-600` is amber-700). They're kept as-is to avoid churn and flagged in the audit.

### 3.2 Typography

Font: system UI stack (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`). Figma uses **Inter** as a stand-in.

| Token | Size / line | Weight | Use |
|---|---|---|---|
| `text-display` | 28 / 34 | 700 | Wallet balance |
| `text-title` | 20 / 26 | 600 | Screen headings, app bar title, large buttons, the total to repay, tier amounts |
| `text-body` | 15 / 22 | 400 | All reading text, labels, hints, money facts, buttons (md) |
| `text-body` + `font-semibold` | 15 / 22 | 600 | Values in a breakdown, Notice titles, legends, emphasised amounts |
| `text-caption` | 13 / 18 | 400 | Metadata only (dates in a list, "Available balance" label). Always `neutral-700`. **Never money facts.** |

Figma text styles: `display`, `title`, `body`, `body-strong`, `caption`, `caption-strong`.

Note: `text-body` sets `font-weight: 400`; add `font-semibold` *after* it (Tailwind emits weight after size, so it wins).

### 3.3 Radius

| Token | Value | Use |
|---|---|---|
| `rounded` (Tailwind default) | 4px | Checkbox box |
| `rounded-sm` | 8px | Badges, small tags |
| `rounded-md` | 12px | Buttons, fields, tier options, Notices, Toast |
| `rounded-lg` | 20px | Cards, BottomSheet top corners |
| `rounded-full` | 9999px | Icon circles, radios, round buttons |
| `rounded-[28px]` | 28px | Prototype phone frame only (not a product token) |

### 3.4 Spacing

Tailwind's default 4px scale. Keep to these steps:

| Step | px | Typical use |
|---|---|---|
| `1` / `0.5` | 4 / 2 | Title → subtitle; tight label gaps |
| `2` | 8 | Icon ↔ label gap, button stack, chip padding |
| `3` | 12 | Field/Notice padding, row gaps, list row vertical padding |
| `4` | 16 | Screen padding, card padding, button padding (md) |
| `5` | 20 | Gap between blocks in a flow screen (`space-y-5`), button padding (lg) |
| `6` / `8` | 24 / 32 | Page gutter around the frame; bottom padding of scroll areas |

Figma variables: `spacing/1`–`spacing/6`.

### 3.5 Elevation

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.08)` | Cards, Toast |
| `doc/shadow-soft` (Figma only) | two soft drop shadows | Research and documentation boards. Not a product token. |

### 3.6 Motion

- Colour transitions only (`transition-colors`). No entrance animations, confetti or celebratory motion.
- The loading spinner is `animate-spin`.
- `prefers-reduced-motion: reduce` turns off animations and transitions globally (`src/index.css`).

### 3.7 Focus

One global style: `:focus-visible { outline: 2px solid brand; outline-offset: 2px }`. Composite controls (TierPicker options) show `ring-2 ring-brand ring-offset-2` on the container via `has-[:focus-visible]`. Never remove focus without a visible replacement.

---

## 4. Components

Import everything from the barrel: `import { Button, Notice } from "./novakit"`. Status: **Added** = new for the salary advance · **Changed** = modified from the starter · **Starter** = unchanged · **Deprecated**.

| Component | Status | Props | Variants / states | Rules |
|---|---|---|---|---|
| **Button** | Changed | `variant` primary\|secondary · `size` md\|lg · `disabled` · `loading` · `onClick` · `type` | default · pressed (`:active`) · disabled · loading | Full width. md = 44px, lg = 56px. Use **lg** for money decisions. Secondary text is `neutral-700` (8.45:1) so "Not now" never looks weaker. `loading` keeps the colour, shows a spinner, sets `aria-busy` and ignores clicks: use it on every money action. |
| **AmountText** | Changed | `amount` (integer PKR) · `size` display\|title\|body · `tone` default\|inherit · `className` | 3 sizes × 2 tones | Always use it for money ("Rs 10,300", Intl `en-PK`). `tone="inherit"` inside buttons or coloured titles; never override the colour with `!important`. |
| **TierPicker** | Added | `label` · `name` · `options[{amount, detail, locked, lockedReason}]` · `value` · `onChange(amount)` | option: default · selected · focused · locked | Native radios (arrow keys, one tab stop). Nothing preselected. Each option shows what you'd repay and when. Locked = visible, not selectable, plain reason, "Above your limit" badge; it isn't an error. |
| **CostBreakdown** | Added | `items[{label, value, hint?, emphasis?}]` | row · emphasised row (total) | A `<dl>`. Order: You receive → One-time fee → Taken from your wallet on → **Total you repay** (emphasis). Labels and hints at body size, `neutral-700`; values `neutral-900`. Usually inside a Card. |
| **Checkbox** | Added | `id` · `checked` · `onChange(bool)` · children (label) | unticked · ticked · focused | Always starts unticked. The label is the full commitment ("I agree that NovaPay will take Rs 10,300 from my wallet on 28 Jul."), never "I agree to the terms". |
| **Notice** | Added | `tone` info\|caution · `title?` · `alert?` · children | info · caution | Inline, must-read-before-deciding messages. `alert` adds `role="alert"` for messages that appear after a failed action. Amber means "read this", never "buy this". |
| **Toast** | Changed | `open` · `message` · `icon` (default ✓, `null` hides) | with / without icon | Always-mounted `role="status"` `aria-live="polite"` region; `neutral-900` background. Transient confirmations only, never the only place important information appears. Pins to the visible bottom of the frame. |
| **Card** | Changed | children · `className` | — | White, `rounded-lg`, `border-neutral-200`, `shadow-card`, `p-4`. |
| **ListRow** | Changed | `icon` · `title` · `subtitle` · `trailing` | optional icon / subtitle / trailing | A transaction row. Subtitle is caption `neutral-700`. Not for cost breakdowns. |
| **AppBar** | Changed | `title` · `onBack?` | with / without back | 56px; back target 44px with an `aria-label`. |
| **TextField** | Starter (flagged) | `placeholder` · `value` · `onChange` · `disabled` · `inputMode` · `type` | default · focused · disabled | No label, helper or error state and no accessible name. Don't use it for amounts (use TierPicker). Fix before reuse. |
| **BottomSheet** | Starter (flagged) | `open` · `onClose` · children | — | Closes on any backdrop tap; no `role="dialog"`/`aria-modal`/focus trap. **Never use for a loan decision.** |
| **Panel** | Deprecated | — | — | Duplicates Card. Use Card. |

Screen-level helpers (not part of NovaKit): `src/screens/ScreenLayout.jsx` (app bar + scrolling body; moves focus to the heading on mount) and `src/DemoSwitcher.jsx` (prototype-only, outside the phone frame).

---

## 5. Layout

- Mobile-first, designed at **360×640** and **390×844**. The prototype renders in a 390px phone frame whose height is capped at the viewport (`h-[min(844px,calc(100dvh-48px))]`), with an internal scrolling `<main>`, so overlays pin to the visible bottom.
- Screen anatomy: `AppBar` → scrolling body (`p-4 pb-8 space-y-5`) → heading (`text-title`, focus target) → content → actions at the end of the content, not sticky. On money screens the person scrolls past the costs to reach Accept, which is intended.
- Primary above secondary, both full width, `space-y-3`.
- No horizontal scroll at 360px.

---

## 6. Patterns

### Money disclosure (terms)
Heading → (haircut Notice, if any) → Card with CostBreakdown → consent Checkbox → (failure Notice, if any) → `Accept and get Rs X` (primary, lg, disabled until ticked, loading on submit) → `Not now` (secondary, lg).

### Choosing an amount
"You can borrow up to Rs X" + one line on the fee, the date and no interest → TierPicker with the repayment per tier → "See full cost" (disabled until a tier is chosen, with "Choose an amount to continue." beneath).

### Reduced amount (haircut)
A caution Notice above the breakdown: "We can offer Rs 5,000, not Rs 10,000", with why in one line, "The fee and total below are for Rs 5,000. You can still say no." Fee and total are recalculated.

### Decline
"We can't offer you an advance right now" → **Why** (plain reason per `denial_reason`) → info Notice: "What you can do" / "What this means" → "Nothing else in your NovaPay wallet changes because of this." → actions. A next step appears only when one exists:

| Reason | Why (copy) | Next step |
|---|---|---|
| `income_unverified` | We couldn't confirm your salary… | **Verify your income** (primary) + Back to home |
| `credit_score` | This is based on your credit score… | Back to home only; support for errors |
| `other` | Our checks didn't meet the conditions… | Back to home; support for questions |

After a decline, Home shows "Not available to you right now" with a link to the reason, not the original offer card.

### Loading, failure, empty
- **Loading:** the triggering button shows its loading state ("Checking…", "Sending…", "Uploading…"); no full-screen spinners.
- **Failure on a money action:** caution Notice with `alert`: "That didn't go through. No money was moved and nothing will be taken from your wallet. Please try again." Keep the person on the same screen with their choices intact.
- **Back out:** "Not now" returns Home with the toast "No advance taken. Nothing has changed in your wallet."

### Confirmation
Heading "Rs X is in your wallet", the same breakdown repeated, "We'll remind you before 28 Jul.", "Back to home". No celebration.

---

## 7. Voice and copy

- Plain, calm, specific, second person. Short sentences. Sentence case for everything, including buttons.
- **Say the number:** "Rs 10,300 on 28 Jul", not "your repayment amount on your due date".
- **Labels describe the outcome:** "Accept and get Rs 10,000", "See full cost", "Verify your income", "Not now".
- Use "advance", "fee", "repay", "taken from your wallet". Avoid "loan offer!", "instant cash", "unlock", "you deserve", or anything that sells.
- Never imply undefined rules: no "no hidden fees", "no other charges", "cancel anytime" or "approved in minutes" unless the product defines it.
- Bad news: no blame ("you failed to…"), no threats, no vague "something went wrong" when we know the reason.
- English only for now; Urdu is a known follow-up.

---

## 8. Accessibility baseline

- Text ≥ 4.5:1; large text and UI graphics ≥ 3:1. Measure; don't eyeball (ratios in §3.1).
- Every input has a visible label; group radios in a `fieldset` with a `legend`.
- Visible `:focus-visible` on everything interactive; on screen change, move focus to the new heading.
- Live regions: Toast `role="status"`; failure Notices `role="alert"`.
- Dialogs need `role="dialog"`, `aria-modal`, a close button and focus handling (BottomSheet doesn't have these yet).
- Touch targets ≥ 44px.
- Respect `prefers-reduced-motion`.
- Test at 360×640, 390×844 and desktop, by keyboard only, and with a screen reader before shipping (the screen-reader pass hasn't been done yet).

---

## 9. Working with AI on this repo

Reject output that adds:
- hype or celebratory copy for borrowing
- invented fees, penalties, dates or eligibility
- fees or dates in small gray text
- "Not now" styled weaker than Accept
- vague or blaming decline copy
- urgency tricks
- hard-coded hex
- new UI libraries or a TypeScript rewrite
- screens added for their own sake

Run `npm run build` before every commit.
