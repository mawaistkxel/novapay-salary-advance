# NovaKit Lite: system changes and design↔code mapping

One row per token or component added or modified. This doubles as the **Code Connect–style mapping** the brief asks for: each design property maps to a code prop and to tokens in `tailwind.config.js`. Import everything from the barrel: `import { TierPicker } from "./novakit"`.

**Figma component sheet:** [Nova Lite → Components page](https://www.figma.com/design/OM0mESsfRjnVjeNucMPgW0/Nova-Lite?node-id=1-133). It mirrors `src/novakit/`:
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

---

## High-fidelity view: NovaKit Hi-Fi (added 7 Nov)

A second component set behind the "High fidelity" toggle, styled from my moodboard (blue + frosted glass, images 3 and 5). It **doesn't replace NovaKit Lite**: the wireframe still uses `src/novakit/`, unchanged. Where a Lite component exists, the Hi-Fi one keeps **the same contract** (props, states, accessibility), so the hi-fi screens take identical props and share the flow logic in `App.jsx`. Import from `src/hifi/index.js`.

**Packages added (approved):** `framer-motion` (spring motion, `layoutId` transitions, `MotionConfig` for reduced motion), `@phosphor-icons/react` (icons; replaces the wireframe's ↑ ↓ glyphs), `@fontsource-variable/geist` (Geist, self-hosted). The `npm audit` warnings come from the starter's vite/postcss, not from these.

### Tokens added (`tailwind.config.js`, `hf` namespace)

| Token | Value | Rationale |
|---|---|---|
| `hf-page` / `hf-mist` / `hf-line` | #E8EEF8 / #F3F6FB / #E3E9F3 | Cool page, tile and hairline neutrals that match the blue (one temperature, no warm grays) |
| `hf-blue-50 / 100 / 400 / 600 / 700` | #EEF4FF / #DCE7FD / #5B8DEF / #2560D8 / #1D4CB0 | Hero and primary. 600 is the lightest blue that carries white text (5.61:1); 400 is decoration only (3.23:1) |
| `hf-navy-800 / 900` | #1A2B63 / #121F4A | The "Total you repay" band and the toast |
| `hf-ink-900 / 700 / 500 / 300` | #0E1629 / #3D4A63 / #6B7894 / #C9D2E3 | Text 18.02 / 8.91; 500 is graphics only (4.09:1 on mist fails for text); 300 is borders |
| `hf-amber-50 / 100 / 700` | #FFF6E8 / #FBE3BF / #9A4B07 | Caution Notice (title 5.79:1) |
| `hf-green-50 / 400 / 600` | #EAF7F0 / #4ADE80 / #16804A | Money in (4.98:1); 400 is the toast tick on navy only |
| `font-geist` | Geist Variable | Hi-fi typeface (the skill bans Inter; Geist is close to the moodboard) |
| `rounded-hf-sm / md / lg` | 14 / 20 / 28px | Tile and sheet radii from the moodboard |
| `shadow-hf-soft / float / press / sheet / glass` | blue-tinted | Elevation tinted with the hero blue, never black glows; `glass` is the inner edge highlight |
| `text-hf-hero / h1 / h2 / body / small` | 44 / 26 / 19 / 15 / 13px | Hi-fi type scale. Money facts never use `hf-small` |

### Components

| Component | Lite counterpart | Design property → code | Notes |
|---|---|---|---|
| **Button** | Button | `variant` primary \| secondary \| glass · `size` md 48 \| lg 56 · `loading` · `disabled` · `icon` | Pill. Primary and secondary are the same size and weight; "Not now" is ink-900 on mist (17:1). Press = `scale .98` spring |
| **Money** | AmountText | `amount` · `size` hero \| h1 \| h2 \| body · `weight` (body) | "Rs" set smaller and lighter, tabular figures. Rolls to a new value on change (never from zero on mount); screen readers get the final value only |
| **TierPicker** | TierPicker | same props; option states default / selected / focused / locked | Native radios. The selected highlight is one `layoutId` element that glides between tiles. Focus = outline outside the tile, so it's distinct from selection |
| **Receipt** + **Timeline** | CostBreakdown | `receivedLabel` · `disbursed` · `fee` · `total` · `date` · `showHints` | A `<dl>`; same row order as CostBreakdown; the total sits in a navy band. Timeline: two points (today, payday), no day counts |
| **Checkbox** | Checkbox | same props | Native checkbox (sr-only); the tick draws itself. Tile turns blue-50 when ticked |
| **Notice** | Notice | same props | Phosphor icon; enters with a small drop when it's an `alert` |
| **Toast** ("island") | Toast | `open` · `message` · `icon` | Navy pill that drops from under the status bar. Same always-mounted `role="status"` region |
| **Screen** | ScreenLayout | `variant` hero \| plain · `title` · `onBack` · `heading` · `lead` · `hero` · `icon` | Hero: blue gradient + rising white sheet. Plain: light page for reading and bad news. Focus moves to the heading; children reveal in a short stagger |
| **Tile** + **IconBadge** | Card (+ ListRow icon) | `tone` white \| mist · `as` | One surface container (Lite has two: Card and Panel) |
| **TxRow** | ListRow | `icon` · `title` · `subtitle` · `amount` · `direction` in \| out \| advance | Signed amounts; an advance is ink, not green |
| **StatusBar**, **TopBar**, **Avatar**, **QuickAction**, **TabBar** | AppBar (TopBar) / none | — | Device dressing and Home chrome. TabBar's other tabs and the quick actions toast "not part of this prototype" |

Prototype-only (not in either kit): `src/ViewToggle.jsx`, beside `DemoSwitcher`.

### Contrast checks, hi-fi

| Pair | Ratio | Use |
|---|---|---|
| white on hf-blue-600 / 700 | 5.61 / 7.74 | All text on the hero (the gradient runs 700 → 600) |
| white on white/10 glass over blue-600 | 4.63 | Quick-action labels at the hero's lightest point. **At white/14 this was 4.30 and failed**, so glass stays at 10% and hover uses a ring, not a lighter fill |
| white/80 "Rs" on the hero | 4.71–5.10 | Currency prefix next to the balance and the limit |
| hf-ink-900 / 700 on white | 18.02 / 8.91 | Text |
| hf-ink-700 on hf-mist | 8.22 | Locked tier, secondary text on tiles |
| hf-blue-700 on hf-blue-50 | 7.01 | Info Notice title, "Active" chip |
| hf-amber-700 on hf-amber-50 | 5.79 | Caution Notice title |
| hf-blue-100 on hf-navy-900 | 12.79 | "Total you repay" label |
| white on hf-navy-900 | 15.90 | Total, toast |
| hf-green-600 on white | 4.98 | Money in |
| hf-ink-500 on white | 4.43 | Radio/checkbox borders only (graphics, ≥3:1) |
| Focus outline: hf-blue-600 on light, white on the hero | ≥5.6 | Scoped in `index.css` (`[data-view="hifi"]`, `.hf-on-blue`) |
