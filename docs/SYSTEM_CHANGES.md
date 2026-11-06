# NovaKit Lite: system changes and design↔code mapping

One row per token or component added or modified. This doubles as the **Code Connect–style mapping** the brief asks for: each design property maps to a code prop and to tokens in `tailwind.config.js`. Import everything from the barrel: `import { TierPicker } from "./novakit"`.

**Figma component sheet:** [Nova Lite → Components page](https://www.figma.com/design/8nnupfLUC7Futie5CQh22R/Nova-Lite?node-id=1-25). It mirrors `src/novakit/`:
- **Variables:** a "NovaKit" collection of 31 variables (colour, radius, spacing). Each has code syntax set to its Tailwind `theme()` path.
- **Styles:** 6 text styles (display, title, body, body-strong, caption, caption-strong) and the `shadow/card` effect style. Inter stands in for the system UI font.
- **Components:** 12, as 15 component and component-set nodes, each tagged Added / Changed / Starter. Every fill, stroke, radius and gap is bound to a variable. Each description names its source file and the property-to-prop mapping. Variant sets: Button 16, TierPicker / Option 4, AmountText 3, Checkbox 3, TextField 3, Notice 2, CostBreakdown / Row 2.
- **Examples:** two example screens (Terms and accept, Decline) built only from instances.
- **Known gaps:** the TextField focus ring and the TierPicker focus ring's white offset use raw colours, because effect colours with alpha can't take a token. Panel is not included (deprecated).

**Tokens added: none.** Every new state maps to existing colour, radius and type tokens. Contrast was checked for every new text/background pair (see the table at the end).

## Added components

| Component | Rationale | Design property → code | Tokens |
|---|---|---|---|
| **TierPicker** (`src/novakit/TierPicker.jsx`) | The only amount input was a free-text `TextField`, which allows amounts that don't exist. Tiers are a fixed choice. | `label` → `label` (legend) · Option → `options[]: { amount, detail, locked, lockedReason }` · State **Default / Selected / Focused / Locked** → `value === amount`, `:focus-visible`, `locked: true` · Selection → `onChange(amount)` | Selected `bg-brand-50 border-brand`; default `border-neutral-300`; locked `bg-neutral-50 border-neutral-200` + badge `bg-neutral-200 text-neutral-700`; radio ring `neutral-500`; `rounded-md` |
| **CostBreakdown** (`src/novakit/CostBreakdown.jsx`) | No component for money facts; `ListRow` is a transaction row (icon, truncating text). Enforces "money facts are never fine print". | Row → `items[]: { label, value, hint }` · **Emphasis** (the total) → `emphasis: true` | Labels and hints `text-body text-neutral-700`; values `text-neutral-900`; emphasised value `text-title`; dividers `neutral-200` |
| **Checkbox** (`src/novakit/Checkbox.jsx`) | Explicit consent to the payday deduction. Always starts unticked. | **Unticked / Ticked / Focused** → `checked`, `:focus-visible` · Label → `children` · `onChange(boolean)` | Box `border-neutral-500` (3.95:1 graphic); ticked `bg-brand`; label `text-body text-neutral-900`; `rounded` |
| **Notice** (`src/novakit/Notice.jsx`) | No inline message for "read this before deciding" (haircut, decline next step, failed Accept). Toast is transient; BottomSheet is modal. | Tone **Info / Caution** → `tone="info" \| "caution"` · Title → `title` · **Announce** → `alert` (role="alert") | Info `bg-brand-50 border-brand-100`, title `brand-800`; Caution `bg-accent-50 border-accent-100`, title `accent-600`; body `neutral-900` |

## Modified components and styles

| Change | Rationale | Code |
|---|---|---|
| **Button** secondary text `neutral-500` → `neutral-700` | 3.95:1 failed AA and looked nearly disabled, so "Not now" looked weaker than "Accept" | `variants.secondary` in `Button.jsx` |
| **Button** `loading` state | Prevents a double submit on Accept; keeps the button's colour and shows a spinner | `loading` prop → `aria-busy`, `aria-disabled`, click ignored |
| **Toast** live region | Had no `role="status"`/`aria-live`; screen readers never heard it | Region always mounted; content toggles with `open` |
| **Toast** background `success` → `neutral-900` | White on `success` was 3.45:1 (fails); now 17.4:1. The ✓ keeps `success` (5.05:1 graphic) | `Toast.jsx`; new `icon` prop (`null` = no icon) |
| **AmountText** `tone` | Colour was fixed to `neutral-900`, so amounts couldn't sit in a button label or a coloured title without `!important` | `tone="default" \| "inherit"` |
| **Card** border `#E6E6E6` → `neutral-200` | Hard-coded hex bypassed tokens | `Card.jsx` |
| **ListRow** divider `#DADADA` → `neutral-300`; subtitle `neutral-500` → `neutral-700` | Hex bypassed tokens; 13px dates at 3.95:1 failed AA | `ListRow.jsx` |
| **AppBar** back button 36 → 44px, glyph at title size | The 15px "‹" was hard to see and to hit | `AppBar.jsx` |
| **Panel** marked deprecated | Duplicates Card with a different border | Comment only; export kept so nothing breaks |
| **index.css** hex → `theme()`; global `:focus-visible` ring; `prefers-reduced-motion` | One focus style everywhere; motion respects the user's setting | `src/index.css` |
| **App frame** fixed height capped at the viewport, scrolling content | Overlays rendered below the fold on short screens (toast at y=733–779 on a 640px screen) | `App.jsx` |

## Flagged but not changed

- **TextField**: no label, helper or error state, and no way to pass an accessible label. Not used (TierPicker replaces it).
- **BottomSheet**: closes on a backdrop tap, has no close button, no `role="dialog"`/`aria-modal`/focus trap. Deliberately not used for a loan decision.
- **Brand ramp**: called "full" but has 50/100/200/400/DEFAULT/pressed/800; `pressed` is a state name inside a numeric ramp; `800` is Tailwind indigo-900. `accent-600` is Tailwind amber-700.
- **Accent amber** labelled "for expressive moments": 2.15:1 as text on white. Used here only as a caution tint (`accent-600` text, 4.71:1 on `accent-50`), never to sell the loan.
- **No semantic colours** (error, warning, info) and `success` has no tint. I didn't add any: this flow needed none. If a real error tone is needed later, add `danger` / `danger-50` with a contrast check.
- `text-caption` + `neutral-500` is a fine-print pattern at 3.95:1. Home's captions now use `neutral-700`.

## Contrast checks (WCAG 2.x)

| Pair | Ratio | Use |
|---|---|---|
| neutral-700 on white | 8.45 | Secondary button text, labels, body copy |
| white on neutral-900 | 17.40 | Toast |
| success on neutral-900 | 5.05 | Toast icon (graphic) |
| brand-800 on brand-50 | 10.22 | Info notice title |
| neutral-900 on brand-50 | 15.56 | Info notice body |
| accent-600 on accent-50 | 4.71 | Caution notice title |
| neutral-900 on accent-50 | 16.33 | Caution notice body |
| brand on brand-50 | 5.62 | Selected tier |
| neutral-500 on white | 3.95 | Radio and checkbox borders (graphics, ≥3:1) |
| brand on white | 6.29 | Focus ring, primary button |
