# NovaPay salary advance: what I changed and why

**Prototype:** https://novapay-salary-advance-six.vercel.app/ (on a laptop: a "Demo scenario" panel beside the phone reaches every path, and a toggle switches Wireframe / High fidelity; on a phone the high-fidelity app fills the screen and the scenarios sit behind a small "Demo" tab). **Repo:** https://github.com/mawaistkxel/novapay-salary-advance **Figma:** https://www.figma.com/design/OM0mESsfRjnVjeNucMPgW0/Nova-Lite?node-id=0-1&t=inwH0iG5n8NYZKwG-1

## 1. What's going on

The starter has no current flow, so this rests on the brief: the advance "converts fine" but feels off where we say what it costs, that someone is declined, or that a repayment is due.

- **Working:** a fair-shaped product (flat 3% fee, three tiers, one repayment on payday) that's easy to explain honestly.
- **Not working:** "converts fine" is the warning; a flow can convert *because* the cost is easy to miss. The system invites it: captions that would hold a fee or date are 3.95:1 gray, and the secondary button that would hold "Not now" is the same gray, so no looks disabled.
- **Ambiguous:** what happens if the wallet is short on payday, whether late fees exist, and why a limit is what it is. None is defined, so I didn't invent them.

## 2. What I built, and why

**One honest decision screen.** Amount received, one-time fee, date taken and total sit together above Accept, at body size, even if that costs conversion.

**Consent you actually give.** Accept unlocks only after ticking "I agree that NovaPay will take Rs 10,300 from my wallet on 28 Jul." **"Not now" is the same size and weight as Accept**, and saying no confirms "No advance taken. Nothing has changed in your wallet."

**Cost before commitment.** Each tier shows what you'll repay while you choose, and nothing is preselected (the maximum would anchor people on borrowing more). If risk checks cut the amount, you learn it before Accept, with the fee and total recalculated and a plain note that no is fine.

**Over-limit, designed away.** Rs 15,000 is visible but locked ("Above your limit"). Letting someone pick what they can't have and then erroring is a trap the UI sets; hiding the tier hides the limit.

**The not-good path: decline.** It's the hard moment inside a *first-time* experience, and where vagueness feels most like judgement. The screen names the real reason in everyday words and offers a next step only when one exists: *income not verified* leads to "Verify your income" and one screen on what to send and how it's used, with no promised review time and no promise of an offer; *credit score* gets the plain reason and a pointer to support, with no "try again later" when nothing would change. Eligibility shows on Home upfront, so there's no "Check eligibility" tap that can only end in a no, and the reason is one tap away rather than on Home, where others may see the phone.

**Not built:** the late-repayment path (failed pulls and fees aren't defined), a full verification loop, and any celebration on confirmation, which repeats the total and date instead. The payday reminder appears only as a phone notification (hi-fi), naming the amount and date but not the debt, since lock screens are public.

**Edges:** loading states on money actions; an Accept failure that says "No money was moved and nothing will be taken"; screen-reader announcements; and a fix for overlays rendering below the fold at 360×640.

**High fidelity, same decisions.** The wireframe is the reasoning baseline. A second view shows the same flow and state machine in a finished look, to prove the guardrails survive polish: the total is the loudest number, borrowed money is never green, nothing celebrates. On phones it's the only view.

## 3. Where I extended the system, and why

**NovaKit Lite (wireframe): no new tokens.** Every new state maps to existing tokens, each pair contrast-checked (lowest 4.71:1). Full mapping: `docs/SYSTEM_CHANGES.md` and the Figma component sheet.

- **TierPicker** (new): native radios with a *locked* state, replacing a free-text field that accepts amounts that don't exist.
- **CostBreakdown** (new): a `<dl>` of money facts with an emphasised total.
- **Checkbox** (new): unticked consent; the label is the full commitment.
- **Notice** (new): `info` / `caution`, `alert` for failures. Amber means "read this", never "buy this".
- **Modified:** Button (secondary text 3.95 → 8.45:1, `loading`), Toast (live region; 3.45 → 17.4:1), AmountText (`tone`), Card/ListRow/index.css (hex → tokens); Panel deprecated.

**NovaKit Hi-Fi:** a separate set in `src/hifi/` (`hf-*` tokens, glass materials in CSS, 18 components) that mirrors Lite's props, so the views can't drift. It adds three packages I approved (motion, icons, a typeface), only used by that view. That's the least restrained part of this work, and I'd only ship it if NovaPay wanted that direction.

**Wrong or missing in NovaKit Lite:** no error/warning/info colours; a success-only Toast with no live region; no tier control, cost component or loading state; `TextField` has no label or error state; `BottomSheet` has no dialog semantics (never for a loan decision); Card and Panel duplicate each other; the "full" brand ramp mixes in a state name; the amber accent fails contrast as text.

## 4. How I'd know it's good

**At 60–90 days:** on-time repayment holds or improves; users can state the total and date in a post-accept check; fewer "why was this taken?" contacts; "Not now", smaller tiers and haircut refusals get real use; verify-income completion rises; hidden-fee complaints fall; repeat borrowing is watched for dependency, not optimised.

**It must never,** whatever it does to conversion: hide or shrink the cost or date; preselect or nudge toward more; make no harder than yes; use urgency, countdowns or celebration to sell debt; invent or hide charges; decline vaguely or with blame; contact a borrower's contacts, or shame or threaten anyone who is late.

## Assumptions I'm making
- Total cost belongs on the Accept screen, even if it lowers conversion.
- Payday (28 Jul) is known at offer time; money lands right after Accept and is taken from the wallet on payday.
- The haircut is known before Accept and always lands on a tier.
- Eligibility can be pre-assessed, so Home can show it upfront.
- Income documents are used only to confirm income; freelancers are out of scope until a rule exists.

## What I'd want to know that I don't
- **What happens if the wallet is short on payday?** The biggest gap: the terms can't honestly say, so they say nothing.
- Late fees, cancellation, early repayment, any cooling-off rule; what we may legally say about a credit-score decline, and what `other` covers.
- The dataset: decline rates by reason, haircut rate, freelance share, late/default by tier.

## What I'd do differently with more time
- Design the **late-repayment** path: reminder timing and tone, a failed pull, Home while overdue. It's where this most easily turns predatory.
- **Urdu** copy, and a plain-language test of the consent sentence with real borrowers.
- Add a **cooling-off window** to cancel after Accept, once compliance confirms its length and rules (none is defined today, so the prototype promises none).
- Run a **full accessibility pass**: screen-reader order, focus states and contrast in the high-fidelity view, plus a real-device check; then fix `TextField`, `BottomSheet` and the missing semantic colours.

## How I used AI
A planning chat turned the brief into a handoff file of guardrails and open decisions; the coding agent asked me those decisions rather than making them, then built in small commits I reviewed (log: `docs/AI_LOG.md`).

**Outputs I rejected or reworked:**
- **AI slop, kept out by design.** Left alone, AI drifts toward the patterns predatory apps use: hype copy for debt, invented fees or dates, costs in small gray text, a weaker "Not now", vague declines, urgency, hard-coded colours, extra libraries and screens for their own sake. I wrote these down as a reject list before any code (`CLAUDE.md`, `DESIGN.md` §9), made the agent ask me every open product decision instead of filling the gap, measured every colour pair, and reviewed each change in the browser.
- **A promise in the decline.** The income decline read "Verify your income to see the offer… share your salary slip to unlock the offers." That promises something we can't: a verified salary can still be declined for credit score or other reasons. It now says "Verify your income to see if you can get an advance" and "we'll check whether an advance is available to you."
- **Invented reminder timing.** The first confirmation said "We'll remind you *a few days* before 28 Jul": kind-sounding, but a product rule nobody defined. Cut to "We'll remind you before 28 Jul" and logged as an assumption.
- **Generic AI design, made modern.** The first high-fidelity pass was generic: a heavy cobalt hero, stock frosted tiles, and its moodboard's sales copy ("Get Loans in Minutes!"). I steered it with my own reference to a calmer direction (misty slate, one navy accent, liquid glass, light type), keeping the look and rejecting the copy.
