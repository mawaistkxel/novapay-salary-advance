# NovaPay Salary Advance — project handoff

Context for Claude Code, carried over from my planning chat in claude.ai. Read it fully at the start of every session, and keep **Status**, **Decisions made** and **Open decisions** up to date as we work.

Source of truth for product rules: @PRODUCT_REFERENCE.md
Design reference (tokens, components, patterns, copy): @DESIGN.md

## 1. What this project is

I'm a product designer doing a take-home case study for an **AI-First Product Designer** role. The company is fictionalised as **NovaPay**, a mobile wallet in an emerging market (amounts in PKR). I play a designer who has just joined its Lending pod.

- Six months ago NovaPay launched a **salary advance**: small, short loans (Rs 5,000 / 10,000 / 15,000) that bridge salaried users to payday. It "converts fine", but it was shipped fast and the hard moments feel off: showing the terms, the decline screen, and repayment reminders.
- Leadership wants to scale it hard. The Head of Lending doesn't want to scale something that feels **predatory**. He wants something he can click through (not a deck), plus what I changed and why.
- Trust is the heart of the exercise: in this market, predatory lending apps have harmed users and drawn regulatory action. No checklist is given; the calls are mine to make and defend.

**My job:** decide what's worth fixing, build it as a runnable coded prototype on top of NovaKit Lite (this repo), and explain my choices in writing.

## 2. Status (update at the end of every session)

Done in the planning chat:
- Brief and product reference reviewed; requirements captured in this file.
- Starter verified: `npm ci` and `npm run build` succeed (tested on Node 22). Installed versions: react 18.3.1, react-dom 18.3.1, vite 5.4.21, @vitejs/plugin-react 4.7.0, tailwindcss 3.4.19, postcss 8.5.16, autoprefixer 10.5.2.
- Design-system audit done, with measured contrast ratios (section 10).
- Overlay layout bug found and measured (section 11).
- Delivery plan decided: my own GitHub repo + Vercel production link (section 12).

Session 1 (Claude Code, 6 Nov 2026):
- Git initialised: commit 1 is the untouched starter; this file was added in commit 2. Work happens on branch `salary-advance`.
- Open decisions settled (section 7). Plan approved: overlay fix → system changes → screens → docs → deploy.
- Overlay bug fixed (toast now y=545–591 at 360×640). System changes and the full flow built on branch `salary-advance` (see `docs/SYSTEM_CHANGES.md`).
- Tested by script through all five scenarios at 360×640, plus 390×844, 1280×800 and 675×414; keyboard pass on the tier picker. Not yet tested with a real screen reader or on a real phone.
- Docs written: `docs/DECISIONS.md`, `docs/SYSTEM_CHANGES.md`, `docs/AI_LOG.md`, `docs/WRITEUP.md` (draft, ~1,450 words, needs trimming to ~2 pages and one "rejected output" picked).
- Not on GitHub / Vercel yet; deploy waits for my go-ahead and the reviewers' GitHub usernames.

Session 2 (7 Nov 2026), branch `hifi`:
- Added the high-fidelity view: NovaKit Hi-Fi in `src/hifi/` (15 components, `hf-*` tokens), six hi-fi screens, `ViewToggle` outside the frame. Decline copy moved to `src/data/declineCopy.js` (shared).
- Fixed in passing: screen headings showed a focus box after a screen change (global `:focus-visible` beat `outline-none`); affects the wireframe too.
- Tested in the browser at 360×640, 390×844 and 1280×800: all five scenarios, view switch mid-flow, keyboard on the tier picker, no horizontal scroll. Reduced motion checked in code only (not emulated). Not yet on a real phone or with a screen reader.
- Restyled the hi-fi view (v2) to my "Payno" reference: misty slate palette, one navy accent, light Geist, glass materials in `index.css` (`.hf-glass`, `.hf-glass-strong`, `.hf-liquid`, `.hf-haze`), round glass quick actions, glass tab bar with a haloed centre button.
- Docs: DECISIONS, SYSTEM_CHANGES (hi-fi tokens, materials, components, contrast), DESIGN.md §10. Not yet merged to `main` or deployed. Dark mode not done.

Next steps: I review the flow and the write-up → create the private repo, push, PR `salary-advance` → `main`, merge → Vercel import → test the production link incognito and on a phone → invite reviewers → export the write-up to a Google Doc/PDF.

Next steps, in order:
1. Git hygiene: the first commit should be the untouched starter; this CLAUDE.md goes in a later commit.
2. Fix the overlay bug in section 11 (first code task).
3. I decide the open decisions in section 8, starting with which bad-news path (c) to build.
4. Plan the screens and the minimum design-system changes; get my OK before coding.
5. Build: entry → offer → amount → (a) terms & total cost → (b) accept → confirmation; then (c).
6. Edge states, accessibility and contrast pass; test at 360×640 and 390×844.
7. Deploy, then test the production link in an incognito window and on a phone.
8. Assemble the deliverables from `docs/` (sections 13 and 14).

At the start of each session: read this file, run `git status` and `git log --oneline -10`, run `npm run build`, then confirm the next step with me.

## 3. Commands and stack

```bash
npm install        # or: npm ci
npm run dev        # Vite dev server; the app renders inside a ~390px phone frame
npm run build      # must pass before every commit
npm run preview    # serve the production build locally
```

- Stack: **React 18 + JavaScript (JSX) + Vite 5 + Tailwind CSS 3**. Node.js 18 or newer.
- No TypeScript, router, tests or linter are configured, and none are needed for this prototype.

## 4. Repo map

```
index.html
tailwind.config.js        # design tokens (colors, radius, shadow, type scale)
PRODUCT_REFERENCE.md      # product rules (source of truth)
README.md                 # starter README (task summary, how to submit)
src/main.jsx
src/App.jsx               # starter home screen in the phone frame; "See your offer" -> TODO toast
src/index.css             # Tailwind entry + base styles
src/novakit/              # the design system; import via the barrel: import { Button } from "./novakit"
  Button.jsx              # primary | secondary · md | lg · default / pressed (active) / disabled
  TextField.jsx           # default / focused / disabled
  Card.jsx, Panel.jsx     # surface containers (duplicates, see audit)
  ListRow.jsx             # icon · title/subtitle · trailing (a transaction row)
  AppBar.jsx              # title + optional back
  BottomSheet.jsx         # modal sheet
  Toast.jsx               # transient message (success only)
  AmountText.jsx          # "Rs 10,000" via Intl en-PK; sizes display | title | body
  index.js                # barrel export
```

Tokens in `tailwind.config.js`:
- Colors: `brand` 50 / 100 / 200 / 400 / DEFAULT #4F46E5 / pressed #3730A3 / 800 #312E81 · `accent` (amber) 50 / 100 / DEFAULT #F59E0B / 600 #B45309 · `neutral` 50 / 100 / 200 / 300 / 500 / 700 / 900 · `success` #1E9E5A
- Radius: sm 8px · md 12px · lg 20px. Shadow: `shadow-card`.
- Type: `text-display` 28/34 bold · `text-title` 20/26 semibold · `text-body` 15/22 · `text-caption` 13/18.

## 5. Product rules (summary; PRODUCT_REFERENCE.md wins on any conflict)

- Tiers: Rs 5,000 / 10,000 / 15,000. The offered limit is the highest tier the user qualifies for; they can take any tier up to it. **Requesting above the limit is not allowed.**
- Fee: **3% of the amount disbursed**, charged once (not monthly interest). Repayment: 5,000 → 5,150 · 10,000 → 10,300 · 15,000 → 15,450.
- Repaid in full, pulled automatically on the user's **next payday** (about 2–4 weeks out; the exact date is known at offer time).
- **Total cost of credit (amount + fee) and the repayment date must be clear at the moment of decision.**
- Haircut: the disbursed amount may be lower than requested if risk checks warrant it (the fee follows the disbursed amount).
- Decisions: approved (offer available) or declined (no offer). Internal reasons: `credit_score`, `income_unverified`, `other`. How honestly a decline is communicated is a design decision. Income may be verified at application (bank statement / payslip); unverified income is a common decline reason.
- Repayment outcomes: `on_time`, `late` (days late tracked), `default` (30+ days past due). An active late/overdue advance is a sensitive state (reminders, what the user sees, tone).
- Data fields: applied_amount · disbursed_amount · decision · denial_reason · repayment_status · days_late · income_verified · income_source (salaried / freelance).

## 6. Scope and grading

Build the **first-time** salary-advance experience: coded, runnable, mobile viewport. Depth over breadth; screens are not counted.

Must show:
- **(a)** the terms / total-cost disclosure
- **(b)** the accept decision
- **(c)** ONE path where the news isn't good or simple: declined/ineligible, a request over the limit, OR a late/missed repayment

Build only as much surrounding flow (entry point, offer) as needed to make (a)–(c) legible. Arguing that a moment shouldn't exist, or should be radically simplified, is a valid design decision.

Not graded: pixel polish, custom illustration, brand-perfect visuals (use the system's defaults), number of screens, whether AI was used, finding one "correct" design.

Graded: judgment about what to build and what not to; handling the hard moments honestly and humanely; extending the system coherently and with restraint, catching what's wrong in it, and design↔code thinking; delivery; craft on the edges (error and empty states, micro-interactions, the overall feel of trust); how AI was driven and the quality of what was kept; clarity and honesty of the written reasoning.

Timeline: 72 hours from when the brief was sent, sized for about 6 hours of focused work (taking far longer is itself a signal). Then a 30-minute live session with the hiring manager and another designer: they click through, ask about decisions and push back. I must be able to explain everything in this repo.

## 7. Decisions made

| Decision | Why |
|---|---|
| Keep React + JavaScript (JSX) + Vite + Tailwind; no TypeScript | We're graded on extending *their* system; keeps the diff focused |
| No UI libraries (MUI, shadcn, etc.) and no new dependencies without asking me | They would bypass NovaKit; restraint is graded |
| Navigate between screens with React state in `App.jsx` (a simple screen state machine), no router | It's a click-through prototype; avoids SPA-routing setup on Vercel |
| New or changed components live in `src/novakit/` and are exported from `index.js`; new tokens go in `tailwind.config.js` | Clean design↔code mapping for write-up section 3 |
| UI copy in English | The brief doesn't ask for Urdu; Urdu terms go under "with more time" |
| Delivery: my own GitHub repo + Vercel (Hobby) production link; no PR against NovaPay's repo | They only provided a zip of the starter |
| First commit = the untouched starter | Reviewers can see exactly what I changed |
| Next payday / due date in prototype data: 28 Jul | The starter shows "Salary credited 28 Jun"; keeps the data consistent |
| (c) path = **Decline**, reason named in plain words | Highest-trust moment in a first-time flow; vague declines leave people stuck |
| Demo decline reasons: `income_unverified` (→ Verify your income) and `credit_score` (plain reason, no false next step); `other` in write-up only | Shows honesty per reason without inventing a fix where none exists |
| Verify step = one explainer screen + mock upload → "Submitted, we'll let you know"; no timeframe, no fake re-approval | Verification time and outcome aren't specified |
| Demo limit **Rs 10,000**; Rs 15,000 shown but locked with one plain line; over-limit **designed away** (no error state) | Don't let the UI set a trap and then scold the user |
| Haircut shown on the terms screen **before** Accept; reduced amount is always a tier (10,000 → 5,000); fee and total recalculated | The user must decide on the amount they'll actually get |
| Accept consent = **required unticked checkbox** naming amount and date; Accept enabled only once ticked; "Not now" equal weight; no back-out rule promised | Explicit consent to the auto-deduction; no invented cooling-off rule |
| Demo access = "Demo scenario" switcher **outside the phone frame**; changing it resets to Home | Every path one click away in the live session, clearly not product UI |
| Repo = **private** GitHub `novapay-salary-advance`, reviewers invited | Unsure the case materials should be public |
| No new colour tokens; extensions: TierPicker, CostBreakdown, Checkbox, Notice; fixes to Button, Toast, Card, ListRow, index.css | Restraint; every change maps to existing tokens |
| **High-fidelity view** behind a "Wireframe / High fidelity" toggle outside the frame; direction = **misty slate + navy liquid glass** after my "Payno" reference (v2, replaced the first blue + glass pass) | I want a finished look alongside the wireframe; the wireframe stays the reasoning baseline |
| Hi-fi screens share the wireframe's props and state machine; switching view keeps the current screen and choices; `?view=hifi` in the URL | Same flow, rules and words in both views; side-by-side comparison in the live session |
| Packages approved for hi-fi: framer-motion, @phosphor-icons/react, @fontsource-variable/geist | Motion, icons, typeface; nothing else without asking |

## 8. Open decisions: ask me, don't decide silently

Items 1–4 and 6–9 were decided on 6 Nov 2026 (see section 7).

5. Late path: not being built (decline chosen). If it comes up: reminder timing and tone, and what happens if the payday pull fails. **Late fees are not specified; never invent one.**
- Still open: why the limit is Rs 10,000 (the copy must not invent a basis; the "How limits work" note says only that it comes from our checks and may not rise), whether there is any way to cancel after accepting, and what happens if the wallet is short on payday. Track in `docs/DECISIONS.md`.

## 9. Gaps in the documents (state as assumptions or questions)

- No current ("today's") flow exists in the repo (`App.jsx` says the flow doesn't exist yet), so write-up section 1 has to rely on the brief's description. State what I assume today's flow does.
- The glossary "mirrors the dataset", but no dataset was provided → propose metrics, and ask for the data.
- Late fees or penalties: not specified.
- A failed or partial payday pull (insufficient balance): not specified.
- Haircut timing and amounts: not specified.
- Freelancers: `income_source` includes freelance, but this is a *salary* advance tied to a payday; eligibility is unspecified.
- Naming: "Declined" in the rules vs `decision` (approved/denied) in the glossary. PRODUCT_REFERENCE.md points to a "Trust rules" section that doesn't exist (the section is "Trust matters most here").
- The brief's own example of an assumption: showing the total cost of credit on the same screen as the Accept button, even if it lowers conversion.

## 10. Design-system audit (feeds write-up section 3)

The README warns that the system is messier than its docs: some things are missing, some inconsistent, some shouldn't be reused as-is.

**Missing**
- No semantic colors for error/danger, warning or info; `success` is a single value with no light tint.
- `Toast` is success-only (hard-coded green + ✓) and has no `role="status"` / `aria-live`. The starter even uses it for "TODO: build the salary-advance flow".
- No control for choosing between the three tiers. The only input is a free-text `TextField`, which allows amounts that don't exist (such as 12,000).
- No component for a cost breakdown (amount, fee, total to repay, due date). `ListRow` is a transaction row.
- `Button` has no loading state (double-submit risk on Accept).
- `TextField` has no label, helper text or error state, and no way to pass an accessible label.

**Inconsistent**
- `Card` and `Panel` are the same "surface container" with different borders (`border-[#E6E6E6]` vs `border-neutral-300`).
- Hard-coded hex values bypass the tokens: `Card.jsx` #E6E6E6, `ListRow.jsx` #DADADA, `index.css` #1a1a1a (the same value as neutral-900) and #e9eaee.
- The README calls the brand ramp "full", but it only has 50 / 100 / 200 / 400 / DEFAULT / pressed / 800. A state name (`pressed`) sits inside a numeric ramp, and the numbers don't match the Tailwind palette the values come from: `brand-800` #312E81 is Tailwind indigo-900 (`pressed` #3730A3 is indigo-800), and `accent-600` #B45309 is Tailwind amber-700.

**Shouldn't be reused as-is**
- Secondary `Button` text is `neutral-500` #808080 on white = **3.95:1**, below the WCAG AA minimum of 4.5:1 for normal text, and it reads as nearly disabled. Used for "Not now" next to "Accept", it makes saying no look weaker than saying yes (a pressure pattern).
- The caption pattern (13px `text-caption` + `neutral-500`) is also **3.95:1**. Putting the fee or due date in it creates hidden fine print.
- White on `success` #1E9E5A = **3.45:1**, which fails for the Toast's 15px text.
- The `accent` amber is labelled "for highlights and expressive moments". As text on white it is **2.15:1** (`accent-600` is 5.02:1). Using it to make borrowing feel exciting works against trust; the README says to use the palette "with restraint".
- `BottomSheet` closes on a backdrop tap, has no close button, and has no `role="dialog"` / `aria-modal` / focus handling. That's risky for a loan decision.
- For reference: white on `brand` #4F46E5 = 6.29:1 (passes).

## 11. Verified behaviour and known bugs

- **Bug (fix first):** `Toast` and `BottomSheet` are positioned `absolute` to the bottom of the phone frame (which is `relative` with `min-h-[780px]`), not to the visible screen. Measured in a headless browser: at 360×640, the starter toast renders at y = 733–779px in a 640px-tall viewport, i.e. **below the fold**. It's visible at 390×844 and 1280×800, and is likely clipped on short laptop viewports. Suggested direction (propose a plan first): keep the frame no taller than the viewport, with an internal scrolling content area, so overlays pin to the visible bottom.
- **Verified OK, don't "fix":** the 390px frame shrinks to fit a 360px-wide screen; there is no horizontal scroll.
- `AmountText` uses Intl `en-PK` grouping: 10300 → "10,300", 150000 → "150,000".

## 12. Delivery (deployment)

- GitHub: my own repo. Public is easiest for reviewers; private with reviewers invited if I'm unsure the case materials should be public. First commit = the untouched starter.
- Vercel: sign in with GitHub → new project → import the repo. Vite is detected automatically (build `npm run build`, output `dist`); don't change the settings. The project name becomes `<name>.vercel.app`.
- Share only the **production domain** (`<name>.vercel.app`). On the Hobby plan, preview and per-deployment URLs can require a Vercel login.
- Every push to `main` redeploys the same link.
- Optional "clean PR": work on a branch, open a PR into my own `main` with a clear description, then merge it.
- Before sending: open the production link in an incognito window and on a phone, and click every path.

## 13. Deliverables checklist

- [ ] Production link (Vercel) + GitHub repo link
- [ ] Write-up, about 2 pages max, as a Google Doc or PDF (per the README):
  1. What's going on: where today's experience fails at the hard moments (what works, what doesn't, what's ambiguous)
  2. What I built, and why: specific, defensible decisions (flow, disclosure, not-good path), not a screen tour
  3. Where I extended the system, and why: every token/component added or modified, each with a one-line rationale and how it maps to code; plus what's wrong, inconsistent or missing in NovaKit Lite
  4. How I'd know it's good: signals at 60–90 days, and what it must never do to a borrower regardless of conversion
  - Plus three short sections that matter as much as the build: **Assumptions I'm making** · **What I'd want to know that I don't** · **What I'd do differently with more time**
- [x] A Figma component sheet for the added/changed components (variants + auto-layout) **or** a Code Connect–style design↔code mapping — both done: Figma "Nova Lite" → Components page (https://www.figma.com/design/OM0mESsfRjnVjeNucMPgW0/Nova-Lite?node-id=1-133) and docs/SYSTEM_CHANGES.md
- [ ] AI process: prompts/chat logs or a 5–10 minute screen recording, plus **one AI output I rejected or heavily reworked, saying exactly what was wrong with it**

## 14. How to work with me

- I'm a designer: explain changes in plain language. For anything bigger than a small fix, **propose a plan and wait for my OK** before coding.
- Don't make the decisions listed in section 8. Offer 2–3 options with trade-offs and let me choose; when I decide, move the item to section 7.
- Never invent product rules (fees, penalties, dates, eligibility). If something is needed, ask me, then record it as an assumption in `docs/DECISIONS.md`.
- Build from tokens and existing components, and extend only when the flow needs it. No hard-coded hex values in components.
- Small, focused commits with clear messages. Run `npm run build` before every commit.
- Accessibility baseline: text contrast ≥ 4.5:1 (≥ 3:1 for large text and UI graphics); labels on inputs; visible focus; `aria-live` for toasts; dialogs with `role="dialog"` + `aria-modal`; motion respects `prefers-reduced-motion`.
- Test inside the frame at 360×640 and 390×844, and on desktop.

Living docs (create each on first use; they feed the deliverables):
- `docs/DECISIONS.md`: decisions, assumptions and open questions → write-up section 2 and the three extra sections.
- `docs/SYSTEM_CHANGES.md`: one row per token/component added or modified (change · type · rationale · code mapping: file, props/variants, tokens) → write-up section 3 and the design↔code mapping.
- `docs/AI_LOG.md`: when I say "log this", record what I asked, what the AI produced, what I kept or rejected, and exactly why → the AI process deliverable. Start it with the seed in section 17.

## 15. Trust guardrails (draft; I'll confirm or edit)

- The amount received, fee, total to repay and repayment date appear together, on the same screen as Accept.
- Declining is as easy and as visible as accepting. No pre-ticked consent, fake urgency, countdowns or guilt-tripping copy.
- No celebration or hype for taking on debt (don't use the amber accent to sell the loan).
- Money facts (fee, total, date) are never in small or low-contrast text.
- Bad news is plain, specific and respectful, and says what the user can do next. No shame, no threats.

## 16. Watch for these in AI output (likely "rejected output" examples)

Hype or celebratory copy for borrowing · invented fees or penalties · fee or date in small gray text · "Not now" styled weaker than "Accept" · vague or blaming decline copy · urgency tricks · hard-coded hex colors · new libraries or a TypeScript rewrite · screens added for their own sake.

## 17. AI log seed (copy into docs/AI_LOG.md)

**Planning chat (claude.ai), before coding.** Keep or share this chat itself as part of the AI log.
- The AI summarised the brief and product reference in plain language, and listed the deliverables, grading criteria and gaps in the documents.
- It audited the starter zip: verified install and build, identified the stack, and found what's missing (no git history, no current flow, no dataset).
- It audited the design system, with measured contrast ratios and token/palette mismatches.
- It planned delivery (own GitHub repo + Vercel; share the production domain because preview URLs can require a login).
- A headless-browser test at 360×640 found the overlay-below-the-fold bug.
- Correction I made: the AI's early advice assumed a pull request against NovaPay's repo; I clarified that only a zip was provided, so we switched to my own repo + Vercel.
