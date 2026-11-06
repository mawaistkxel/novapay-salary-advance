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

> Pick one for the write-up, or use something from the planning chat. #2 shows design↔code judgement best; #1 shows the trust guardrails at work.

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

## Template for later entries ("log this")

**What I asked:**
**What the AI produced:**
**What I kept / rejected:**
**Exactly why:**
