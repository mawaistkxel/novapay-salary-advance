# NovaPay salary advance: what I changed and why

*Draft for the ~2-page write-up. Prototype: `<vercel link>` · Repo: `<github link>`. Use the "Demo scenario" panel next to the phone to reach every path.*

## 1. What's going on

There's no current flow in the starter, so this read is based on the brief's description: it "converts fine", but it feels off at the moments where we tell someone what a loan costs, that they've been declined, or that a repayment is due. In this market, that's the line between a helpful product and a predatory one.

- **What's working:** the product itself is simple and fair-shaped. It's a flat 3% fee, three fixed tiers and a single repayment on payday. That's easy to explain honestly, which makes it worth protecting.
- **What isn't:** "converts fine" is the warning sign. A flow can convert well *because* the cost is easy to miss. The system makes that easy: the caption style that would hold a fee or date is 3.95:1 gray, and the secondary button that would hold "Not now" is the same gray, so saying no looks disabled.
- **What's ambiguous:** what happens when payday comes and the wallet is short, whether late fees exist, and why a limit is what it is. The product doesn't define these, so I didn't make them up (see questions).

## 2. What I built, and why

**One honest decision screen.** The amount you'll receive, the one-time fee, the date it's taken and the total sit together, above Accept, at body size. Nothing about cost lives in small print or on another screen. I'm assuming this matters more than any conversion it costs.

**Consent you actually give.** Accept is enabled only once you tick "I agree that NovaPay will take Rs 10,300 from my wallet on 28 Jul." The label is the full commitment, not "I agree to the terms." **"Not now" is the same size as Accept** and now readable (8.45:1). Saying no shows "No advance taken. Nothing has changed in your wallet."

**Cost before commitment.** Each tier shows what you'll repay while you're still choosing, and nothing is preselected (defaulting to the maximum anchors people on borrowing the most). If risk checks cut the amount (a haircut), you're told before Accept, with the fee and total recalculated and "You can still say no."

**I designed the over-limit moment away.** Rs 15,000 is visible but locked: "Your current limit is Rs 10,000." Letting someone pick an amount they can't have and then showing an error is a trap the UI sets. Hiding the tier would hide the limit. Showing it locked is the honest middle.

**The not-good path: decline.** I chose decline because it's the hard moment inside a *first-time* experience, and where vagueness feels most like being judged. The screen says no plainly, names the real reason in everyday words, and only offers a next step when one exists:
- *Income not verified:* "We couldn't confirm your salary", then a single screen explaining what to send, why, and how it's used. No promised review time and no fake instant approval.
- *Credit score:* the reason, and the honest truth that there's nothing to do in the app today, with a pointer to support if something in their history looks wrong. No "try again later" when nothing would change.
- Home stops inviting a declined user to "See your offer", and links back to the reason instead.

**What I chose not to build:** late-repayment reminders (outside the first-time flow, and the rules don't define failed pulls or fees), a full verification loop, and a celebratory confirmation. The confirmation repeats the total and the date, because taking on debt isn't a win to cheer.

**Edges:** loading states on every money action (no double submit); an Accept failure that says "No money was moved and nothing will be taken"; toasts announced to screen readers; focus moves to each new screen's heading; and it works at 360×640 (fixing an existing bug where overlays rendered below the fold).

## 3. Where I extended the system, and why

**No new tokens.** Every new state uses existing colour, type and radius tokens, and every pair is contrast-checked (lowest: 4.71:1). Full mapping in `docs/SYSTEM_CHANGES.md`.

- **TierPicker** (new): native radio group with a *locked* state; replaces a free-text field that accepts amounts that don't exist. `options[{amount, detail, locked, lockedReason}]`.
- **CostBreakdown** (new): `<dl>` of money facts with an emphasised total; enforces "never fine print". `items[{label, value, hint, emphasis}]`.
- **Checkbox** (new): unticked consent with the full statement as its label.
- **Notice** (new): inline `info` / `caution` message, `alert` for failures. Amber means "read this", never "buy this".
- **Button** (modified): secondary text 3.95 → 8.45:1; new `loading` state.
- **Toast** (modified): screen-reader live region; white-on-green 3.45:1 → white on neutral-900 17.4:1.
- **AmountText** (modified): `tone` prop, so amounts can sit in a button or a coloured title.
- **Card, ListRow, index.css** (modified): hard-coded hex replaced with tokens; ListRow dates readable. **AppBar:** bigger back target. **Panel:** deprecated, as a duplicate of Card.

**Wrong, inconsistent or missing in NovaKit Lite:** no error/warning/info colours; a success-only Toast with no live region; no tier control, cost component or loading state; `TextField` has no label or error state; `BottomSheet` closes on backdrop tap with no dialog semantics (I'd never put a loan decision in it); Card/Panel duplicate each other; a "full" brand ramp with a `pressed` state name and mislabelled steps; and an amber accent pitched for "expressive moments" that fails contrast as text.

## 4. How I'd know it's good

**Signals at 60–90 days**
- Repayment: on-time rate holds or improves; fewer `late`/`default` per cohort, especially in the first advance.
- Understanding: in a short post-accept check, most users can state the total and date correctly. Fewer CS contacts that are about "why was this taken?".
- Honest choice: "Not now" and smaller tiers are used, and the haircut acceptance rate looks like a real decision rather than near 100%.
- Decline: verify-income completion, and the share who later qualify; fewer repeat attempts after a credit-score decline.
- Trust: complaint volume and app-store mentions of "hidden fee" or "harassment"; repeat-borrowing patterns that suggest dependency (watch, don't optimise).

**What it must never do, whatever it does to conversion:** hide or shrink the cost or date; preselect or nudge toward the larger amount; make saying no harder than yes; use urgency, countdowns or celebration to sell debt; invent or hide charges; give a vague or blaming decline; contact a borrower's contacts, or shame or threaten them when they're late.

## Assumptions I'm making
- Total cost of credit belongs on the same screen as Accept, even if it lowers conversion.
- The payday (28 Jul) is known at offer time; the advance lands in the wallet right after Accept and is taken from the wallet on payday.
- The haircut is known before Accept and always lands on a tier.
- Reminders exist before payday (timing not assumed). Checking eligibility takes no money (I don't claim anything about credit records).
- Income documents are used only to confirm income; support can explain credit-history data.
- Freelancers are out of scope for a *salary* advance until a rule exists.

## What I'd want to know that I don't
- **What happens if the wallet is short on payday?** The most important gap. The terms screen can't honestly say what happens if the money isn't there, so it says nothing about it.
- Are there late fees? Can people cancel or repay early? Any regulator cooling-off rule?
- What can we legally say about a credit-score decline, and what's behind `other`?
- Is the haircut really known before Accept?
- The dataset: decline rates by reason, haircut rate, freelance share, late/default by tier.
- People: compliance (disclosure wording, Urdu), engineering (payday pull and failure handling), CS (top complaints today).

## What I'd do differently with more time
- Design the **late-repayment** path: reminder timing and tone, a failed pull, what Home shows while overdue. It's the moment most likely to turn predatory.
- **Urdu** copy and a plain-language test with real borrowers, especially the consent sentence.
- A cancel or early-repay path, once the rule exists.
- A Figma component sheet with variants and auto-layout for the four new components (the code mapping is in `docs/SYSTEM_CHANGES.md`).
- Fix the remaining system debt: `TextField` labels and errors, `BottomSheet` dialog semantics, and a proper semantic colour set.

## How I used AI
See `docs/AI_LOG.md`. In short: a planning chat produced a handoff file with my decisions and guardrails; the coding agent asked me the open decisions instead of making them (I overrode two of its recommendations), then built in small commits. **One output I reworked:** `<pick from AI_LOG.md>`.
