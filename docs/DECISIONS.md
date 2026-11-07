# Decisions, assumptions and open questions

Feeds write-up section 2 and the three extra sections. Product rules come from `PRODUCT_REFERENCE.md`; nothing here adds a fee, penalty, date or eligibility rule that isn't there.

## Decisions

| Decision | Why | Trade-off I accept |
|---|---|---|
| The hard path (c) is **decline**, not late repayment or over-limit | It's the hard moment inside a *first-time* experience, and the one most likely to feel predatory when it's vague | No late-repayment screens; covered in "more time" |
| Name the **real reason** in plain words, per `denial_reason` | A vague "we can't help you" leaves people guessing and erodes trust; a specific reason lets them act | Legal/compliance may limit what can be said, especially for `credit_score` |
| Offer a next step **only where one exists** (verify income for `income_unverified`; none for `credit_score`) | A fake "try again later" button for a credit-score decline is a false promise | The credit-score screen has a single action |
| **Verify income** is one explainer screen and a mock upload; no promised timeframe, no instant re-approval | Review time and the outcome aren't defined | It doesn't show a full recovery loop |
| **Over-limit is designed away**: Rs 15,000 is visible but locked, with "Your current limit is Rs 10,000." | If the UI lets you pick something you can't have and then shows an error, it set the trap. Showing the tier keeps the limit honest instead of hiding it | Less "drama" for the brief's over-limit example |
| **No tier preselected** | Preselecting the maximum anchors people on borrowing the most | One extra tap |
| Cost shown **per tier while choosing** ("You repay Rs 10,300 on 28 Jul") | The cost isn't a surprise on the next screen | A busier picker |
| **Haircut shown on the terms screen, before Accept**, in a caution notice; reduced amount is always a tier; fee and total recalculated | The user decides on the amount they'll actually get | If the haircut is only known after Accept in reality, this flow needs a back end change |
| Amount received, fee, date and **total on the same screen as Accept**; all at body size, never caption gray | Total cost of credit and the date must be clear at the moment of decision | Longer screen; the user scrolls past the costs to reach Accept, which is intended |
| Consent = **required unticked checkbox** naming the total and the date | Makes the automatic deduction an explicit agreement rather than fine print | One more tap; checkboxes can be ticked without reading, so the label is the full sentence, not "I agree to the terms" |
| **"Not now" has equal weight** to Accept (same size; secondary text fixed to 8.45:1) | Saying no must be as easy as saying yes | — |
| **No celebration** on the confirmation screen; it repeats the total and the date | Taking on debt isn't a win to cheer | Less "delight" |
| Accept failure says **"No money was moved and nothing will be taken"** | The scariest thing after a failed money action is not knowing what happened | Assumes the back end can guarantee this |
| Home stops inviting a declined user to "See your offer" and links to the reason | Re-showing the offer card after a decline is a small cruelty | — |
| Demo scenario switcher **outside** the phone frame | Every path is one click away in the live session; can't be mistaken for product UI | — |
| **No new colour tokens** | All new UI maps to existing tokens; every pair contrast-checked (lowest 4.71:1) | No `danger` red; failures use the caution tone, which is deliberate (it isn't the user's error) |
| **A second, high-fidelity view** behind a "Wireframe / High fidelity" toggle outside the frame (7 Nov) | Shows the same decisions with a finished look (see the v2 row below for the current style), without touching the wireframe that the write-up argues from | Two visual layers to maintain; mitigated by sharing everything except presentation |
| Hi-fi screens take **the same props** as the wireframe screens; one state machine in `App.jsx`; decline copy moved to `src/data/declineCopy.js` | The two views can't drift: same flow, same rules, same words | Hi-fi layouts can't add steps or behaviour of their own |
| Switching view **keeps the current screen and choices**; the view is in the URL (`?view=hifi`) | The same moment can be compared side by side in the live session; a link can open either view | — |
| Hi-fi borrows the moodboard's **look, not its copy** ("Get Loans in Minutes!", "we've got your back", the giant "12x") | That copy is the predatory tone the brief asks us to remove | The hi-fi is less "exciting" than its references |
| The **total to repay is the loudest number** on the hi-fi terms screen (navy band) | It's the number the person is agreeing to | Draws the eye away from "You receive", which is intended |
| A borrowed advance is shown in **ink, not "money in" green**, in recent activity | Borrowed money isn't income; green would frame debt as good news | — |
| New packages, approved by me: **framer-motion, @phosphor-icons/react, @fontsource-variable/geist** (self-hosted, no CDN) | Spring motion and shared-element transitions, one consistent icon set, and a typeface close to the moodboard | The JS bundle is now 445 KB (135 KB gzipped); only the hi-fi view uses them |
| Hi-fi motion: screen reveal, sheet rise, sliding tier highlight, tick draw, timeline draw, island toast. **No celebration**, and off under reduced motion (`MotionConfig reducedMotion="user"` + the CSS rule) | Motion explains change; it never sells | — |
| Wallet controls outside the advance (Send, Top up, Pay bills, tabs, bell) **say they're not in the prototype** instead of doing nothing | Dead buttons in a click-through look like bugs | A toast reviewers may see often |
| **Hi-fi restyled (v2)** to my "Payno" reference: misty slate, one navy accent, light type, liquid-glass buttons and cards; replaces the cobalt hero of v1 | v1 read as heavy and generic; the reference is calmer, which suits a lending decision better too | Glass costs some contrast headroom; managed with strong glass over the haze and measured pairs |
| The salary advance card sits **below** quick actions on Home, as in the reference, not pinned above them | A wallet that pushes credit above its own payments feels like a sales screen | At 360×640 the card starts just under the fold (its edge shows above the tab bar) |
| The Home **offer** is the one **navy** surface (option A of three: navy card, light card with a timeline, strip under the balance); with a calm title, the "checking won't take any money" line and a soft white glass "See your offer". A strip of cost facts (3% fee, 0% interest, repaid on payday) was tried and removed at my call; the costs appear on the next screen, before any decision | It's the core feature, so it needs focus; contrast earns attention without hype copy | Louder than the balance card. Active, declined and documents-sent states go back to light glass: no loud card for a debt or bad news |
| Hi-fi **Choose amount** states the terms as a **fact strip** (3% one-time fee · 0% interest · 28 Jul repaid on payday) instead of the wireframe's sentence | Scannable before choosing; same facts as the sentence | The only place the two views word something differently: the strip drops "in one go from your wallet", which the terms screen and the consent line still state before Accept |
| Hi-fi Home header shows a **NovaPay logo** (segmented-"N" mark + wordmark, as the page's h1), not a user avatar and greeting; payees keep initials | Cleaner, closer to the reference brand bar, and no real person's photo standing in for an invented user | The prototype mark isn't a real NovaPay asset; it would be replaced by the brand's logo |

## Assumptions

- **Today's flow**: no current flow exists in the repo, so I assume what the brief implies: terms shown late or in small print, a decline screen with no reason or next step, and reminders with a harsh tone. My read in the write-up is about those moments, not a screen I've seen.
- Total cost of credit is shown on the same screen as Accept, even if this lowers conversion.
- The exact next payday (**28 Jul**) is known at offer time, consistent with the starter's "Salary credited 28 Jun".
- The haircut is known **before** Accept (after the amount is chosen), and the reduced amount is always one of the three tiers.
- The advance arrives in the NovaPay wallet straight after Accept, and is taken from the wallet on payday.
- NovaPay sends a repayment reminder before payday ("We'll remind you before 28 Jul"). The brief mentions repayment reminders exist; their timing is not assumed.
- Checking eligibility takes no money ("Checking won't take any money"). I do **not** claim it has no effect on a credit record.
- Uploaded income documents are used **only** to confirm income for salary advances. Needs confirming with compliance and data protection.
- NovaPay has a support channel that can explain where credit-history information came from.
- A declined user can check again once income is verified. No waiting period is assumed.
- Freelancers: not handled. This is a *salary* advance tied to a payday; I assume freelance income is out of scope until a rule exists.

## Open questions (what I'd want to know)

1. **What happens if the wallet doesn't have enough on payday?** Partial pull, retry, late status? This is the most important gap: the terms screen can't honestly say what happens if the money isn't there, so it says nothing about it.
2. **Are there late fees or penalties?** Not specified, so the UI says nothing about them. The UI must not imply there are none ("no other charges") either.
3. Why is a user's limit what it is? The locked tier says only "Your current limit is Rs 10,000" because the basis isn't defined.
4. Can a user cancel after accepting, or repay early? Is there a cooling-off period required by the regulator?
5. What may we legally say about a `credit_score` decline? Which bureau, and can we point the user to it?
6. What exactly is behind `other`?
7. Is the haircut really known before Accept, or only at disbursement?
8. The dataset the glossary mirrors: decline rates by reason, haircut rate, share of `income_source = freelance`, late and default rates by tier.
9. Regulatory disclosure requirements in this market (format, wording, language). Urdu copy?
10. CS: the most common complaints and contacts about the current flow.

## Naming notes

- The rules say "Declined"; the glossary's `decision` field says `denied`. The prototype data uses `denied` to match the dataset; the UI never shows either word.
- `PRODUCT_REFERENCE.md` refers to a "Trust rules" section that doesn't exist; the section is "Trust matters most here".
