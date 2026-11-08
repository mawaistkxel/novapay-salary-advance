# AI process log

How AI was driven, what was kept, and what was rejected or reworked. Feeds the AI-process deliverable.

## 1. Planning chat (claude.ai), before coding

Keep or share this chat itself as part of the AI log.

- The AI summarised the brief and product reference in plain language, and listed the deliverables, grading criteria and gaps in the documents.
- It audited the starter zip: verified install and build, identified the stack, and found what's missing (no git history, no current flow, no dataset).
- It audited the design system, with measured contrast ratios and token/palette mismatches.
- It planned delivery (own GitHub repo + Vercel; share the production domain because preview URLs can require a login).
- A headless-browser test at 360×640 found the overlay-below-the-fold bug.
- **Correction I made:** the AI's early advice assumed a pull request against NovaPay's repo; I clarified that only a zip was provided, so we switched to my own repo + Vercel.
- The output of this chat became `CLAUDE.md`, a handoff file so the coding agent starts with my decisions and guardrails instead of re-deriving them.

## 2. Claude Code session 1 (6 Nov 2026): plan, build, test

**How I drove it**
- Handed over `CLAUDE.md`, the brief and the product reference, in plan mode, so nothing was coded before I approved a plan.
- `CLAUDE.md` lists the decisions the AI must *not* make on its own. It asked me 8 of them as multiple-choice questions with trade-offs and a recommendation. I took its recommendation on six, and overrode two:
  - **Consent at Accept:** it recommended a plain sentence above the button. I chose a **required unticked checkbox** instead, to make the payday deduction an explicit agreement.
  - **Repo visibility:** it recommended public; I chose **private with reviewers invited**.
- I approved the plan; it then built in small commits, running the build before each.

**What it produced and I kept**
- Overlay fix, measured before and after (toast at y=733–779 → 545–591 on a 640px screen).
- Four new components and the fixes listed in `SYSTEM_CHANGES.md`, each with a contrast check.
- The flow, tested by script through all five scenarios at 360×640, plus 390×844, 1280×800 and a short 675×414 window, and a keyboard pass on the tier picker.

**Caught and reworked during the session (candidates for "one output I rejected")**
1. **Invented reminder timing.** The first confirmation copy said "We'll remind you *a few days* before 28 Jul". Reminder timing isn't defined anywhere, so this was a small invented product rule. Reworked to "We'll remind you before 28 Jul" and logged as an assumption.
2. **`!important` overrides instead of fixing the system.** To put an amount inside the Accept button and a coloured notice title, the first version used `!text-inherit` / `!text-accent-600` overrides on `AmountText`. That hides a real system gap (the component hard-codes its colour). Replaced with a `tone` prop on `AmountText`, documented as a system change.
3. **The starter commit wasn't untouched.** `CLAUDE.md` appeared inside the repo folder after the first listing and was swept into "Initial commit: starter as provided". Caught in the staged-file list and amended before anything was pushed, so commit 1 is the real starter again.
4. **A test that was wrong, not the UI.** The first keyboard test pressed Tab twice, left the radio group (which is one tab stop) and changed the demo scenario with the arrow keys. Re-ran the test correctly instead of "fixing" working UI.

> **In the write-up (8 Nov):** AI slop and how I kept it out, the decline promise, #1 (invented reminder timing), and the generic-to-modern restyle. It shows the trust guardrails at work and is easy to explain in the live session. #2 is the backup if they ask about design↔code judgement.

## 3. Figma component sheet (same session)

**What I asked:** "Give me the components library and design that in the Figma file, in the Components page."

**What the AI did:** checked the file. It was empty, with 8 community kits attached (Material 3, Apple OS kits, Simple Design System). It rebuilt NovaKit from the code rather than reusing a kit, because none matched NovaKit's tokens or props.
- Created the variables (mirroring `tailwind.config.js`, with `theme()` code syntax), text styles and the shadow style.
- Built the components with variants and auto-layout, then two example screens from instances.

**Caught and fixed along the way** (all from its own screenshots and audit):
- Inner auto-layout frames got Figma's default white fill, which hid the selected tier's tint.
- Resizing after setting "hug" locked row heights, so CostBreakdown rows overlapped.
- The focus ring didn't render, because shadow spread needs clipping on.
- The page header collapsed, because "fill" isn't allowed inside a wrapping layout.
- AmountText and Checkbox variants had unbound white backgrounds.

## 4. Claude Code session 2 (7 Nov 2026): high-fidelity view

**What I asked:** a finished-looking version alongside the wireframe, first in blue and glass, then restyled to my "Payno" reference (misty slate, one navy accent, liquid glass).

**What the AI did:** built NovaKit Hi-Fi in `src/hifi/` with `hf-*` tokens, mirroring the Lite components' props so both views share one state machine and the same copy; added a view toggle; measured contrast for every new pair; asked before adding the three packages (motion, icons, typeface).

**Kept / reworked:**
- Kept the reference's look but **rejected its copy** ("Get Loans in Minutes!", "we've got your back", a giant "12x"): that's the predatory tone the brief asks us to remove.
- A first green for "money in" measured 3.52:1 on glass over the haze; darkened until it passed on every surface.
- Found in passing: a global focus rule drew a box around every screen heading after a screen change; fixed for both views.
- Moved eligibility onto Home so there's no "Check eligibility" tap that can only end in a no (my call, logged as an assumption).

## 5. Claude Code session 3 (8 Nov 2026): reminder, polish, deploy, phone mode

**What I asked:** whether the payment reminder was covered; then a reminder preview, copy and layout changes on the hi-fi screens, deployment, and a phone-only layout.

**What the AI did, and what I decided:**
- **Reminder:** it first said plainly the reminder flow wasn't built (decline was the chosen hard path) and pointed to where the docs say so. I asked for a notification only, sent from a button outside the frame and only after an advance. It wrote the banner to name the amount and date but **not "advance" or "loan"**, because lock screens are public and borrowers here have been shamed; no reminder timing, because none is defined.
- **Copy I rewrote:** for the reduced amount it proposed "Sorry, we can only offer Rs 5,000" with a two-sentence body. I had it cut the body to one line ("Our checks didn't allow the Rs 10,000 you asked for. You're free to say no.") and wrote the heading myself: "Oops, Rs 5,000 is all we can offer right now."
- **Misread, then reverted:** asked to restore "the previous version" of the Home card, it guessed I meant the timeline styling and reverted that. I said no; it undid the change and waited for my explanation instead of guessing again.
- **Scope kept honest:** when I asked to revert everything on the wireframe, it checked git and found only the reminder had touched the wireframe, rather than reverting by memory.
- **Test results it didn't "fix":** in an unfocused Chrome window, animations never finished, so the notification looked stuck and the quick actions looked 14px off. It confirmed both were test artifacts (screenshots forced the frames) instead of changing working UI.
- **Deploy:** the Vercel connector could only reach a team account, so it asked where the project should live; I deployed from my own account and it tested the production link through every scenario.
- **A promise in the decline, removed:** checking the write-up against the app, the income decline still read "Verify your income to see the offer… share your salary slip to unlock the offers". A verified salary can still be declined for other reasons, so that promised an offer we can't guarantee. Rewritten (both views): "Verify your income to see if you can get an advance" / "we'll check whether an advance is available to you".
- **Phone mode:** it proposed three ways to reach the demo scenarios on a phone; I chose the "Demo" tab. It narrowed the tab after measuring that a 44px target would cover the Scan button.

## Template for later entries ("log this")

**What I asked:**
**What the AI produced:**
**What I kept / rejected:**
**Exactly why:**
