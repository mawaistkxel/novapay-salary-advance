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

## High-fidelity view: NovaKit Hi-Fi (added 7 Nov, restyled the same day)

A second component set behind the "High fidelity" toggle. **It doesn't replace NovaKit Lite**: the wireframe still uses `src/novakit/`, unchanged. Where a Lite component exists, the Hi-Fi one keeps **the same contract** (props, states, accessibility), so the hi-fi screens take identical props and share the flow logic in `App.jsx`. Import from `src/hifi/index.js`.

**Visual direction (v2):** misty slate with one navy accent and a web approximation of liquid glass, after my "Payno" reference: light-weight Geist, frosted white cards with bright top edges, round glass icon buttons with thin line icons, liquid navy buttons, and a glass tab bar with a haloed centre button. v1 (cobalt hero + frosted tiles) was replaced because it read as heavy and generic next to the reference.

**Packages added (approved):** `framer-motion` (spring motion, `layoutId`, `MotionConfig` for reduced motion), `@phosphor-icons/react` (thin "light" icons via `IconContext` in `App.jsx`), `@fontsource-variable/geist` (self-hosted). The `npm audit` warnings come from the starter's vite/postcss, not from these.

### Tokens (`tailwind.config.js`, `hf` namespace)

| Token | Value | Rationale |
|---|---|---|
| `hf-page` / `hf-mist` / `hf-line` | #EEF1F5 / #F5F7FA / #E1E6EE | Cool mist page, solid tile, hairline. One temperature throughout |
| `hf-slate-300 / 400` | #B9C2D5 / #8F9CB9 | Home haze only. **No text sits directly on it** (ink-700 on slate-300 is 4.18:1) |
| `hf-navy-50 / 100` | #EDF0F7 / #DCE2EE | Selected and info surfaces; text on navy |
| `hf-navy-500` | #56669A | Decorative only |
| `hf-navy-600` | #36457C | **The accent**: buttons, selected rims, focus, links (white on it 9.13:1) |
| `hf-navy-700 / 800 / 900` | #2B386A / #222C56 / #161D3B | Pressed, info titles, toast |
| `hf-ink-900 / 700` | #1B2238 / #4B556B | Text: 13.91 / 6.59:1 on the page |
| `hf-ink-500 / 300` | #7E879C / #CDD3DF | Graphics only (radio and checkbox rings, 3.60:1) / borders |
| `hf-amber-*` | unchanged | Caution |
| `hf-green-600` | #11663A (was #16804A) | Money in; darkened so it passes over the haze |
| `font-geist` | Geist Variable | Display at weight 300, headings 400, labels 500 |
| `rounded-hf-sm / md / lg` | 14 / 20 / 28px | Rule: cards 28, rows and options 20, controls pill |
| `shadow-hf-soft / float` | navy-tinted | Elevation tinted with the navy, never black glows |
| `text-hf-hero / h1 / h2 / body / small` | 42 light / 26 regular / 18 medium / 15 / 13px | Money facts never use `hf-small` |

### Materials (`src/index.css`, `@layer components`)

| Class | What it is | Where |
|---|---|---|
| `.hf-glass` | White 82→62% fill, white hairline border, bright inset top edge, navy-tinted drop, `backdrop-filter: blur(22px) saturate(160%)` | Cards, rows, tier options |
| `.hf-glass-strong` | White 92→80%, used where something floats or sits over the haze | Tab bar, round buttons, secondary button, Home cards over the haze |
| `.hf-liquid` | Navy 600→800 with a glossy radial cap of light, inner rim and navy drop | Primary button, selected radio, checkbox, total band, emphasised badge |
| `.hf-liquid-deep` | Navy 700→900 with a soft corner bloom instead of the glossy cap (the cap is too bright across a tall card) | Home offer card (`Tile tone="navy"`) |
| `.hf-soft-white` | Frosted white glass (90→78%) with a bright top rim and sheen, faint lower rim, navy drop, blur | `Button variant="inverse"` (on navy) |
| `.hf-grain-light` | The grain tile tinted white at 0.10, so it shows on navy | Home offer card |
| `.hf-liquid-halo` | Adds a white glass halo ring | Tab bar centre button |
| `.hf-grain` | Static navy SVG noise under the content (pseudo-element, opacity 0.26); an image, not a live filter | Home balance card |
| `.hf-haze` | Page→slate gradient rising from the bottom | Home only |
| `.hf-backdrop` | Frosted vertical panes | Behind the phone frame (prototype page, not product UI) |

These approximate Apple's Liquid Glass on the web; there is no official web version. Text never depends on the blur: each fill is opaque enough on its own, and `prefers-reduced-transparency: reduce` swaps in solid white.

### Components

| Component | Lite counterpart | Design property → code | Notes |
|---|---|---|---|
| **Button** | Button | `variant` primary \| secondary \| inverse (soft white glass on navy, navy text ≥ 7.33:1) · `size` md 48 \| lg 56 · `loading` · `disabled` · `icon` | Primary = liquid navy; secondary = white liquid glass with navy text. Same size, weight and type. Press = `scale .98` spring |
| **Money** | AmountText | `amount` · `size` hero \| h1 \| h2 \| body · `weight` | Light large figures, softer "Rs". Rolls on change, never from zero; screen readers get the final value |
| **TierPicker** | TierPicker | same props; default / selected / focused / locked | Glass rows; one `layoutId` slab with a navy rim glides to the choice; radio fills with liquid navy. Focus = outline outside the row |
| **Receipt** + **Timeline** | CostBreakdown | `receivedLabel` · `disbursed` · `fee` · `total` · `date` · `showHints` | `<dl>` in glass; total on a liquid navy slab |
| **Checkbox** | Checkbox | same props | Glass tile; ticked = brighter glass, navy rim, liquid box, tick draws itself |
| **Notice** | Notice | same props | info = navy-50, caution = amber-50; thin Phosphor icon |
| **Toast** ("island") | Toast | `open` · `message` · `icon` | Smoked navy glass pill under the status bar; always-mounted `role="status"` |
| **Screen** + **Atmosphere** | ScreenLayout | `title` · `onBack` · `heading` · `lead` · `icon` · `feature` · `footer` (pinned "continue" bar with a fade above; Choose amount only, never Accept) | Mist page with soft light sources; `feature` puts the heading in a glass card (Choose amount). Focus moves to the heading; content staggers in |
| **Tile**, **IconBadge**, **RoundButton** | Card (+ ListRow icon) | `tone` glass \| strong \| solid \| navy (one emphasised surface per screen; sets white focus outlines via `.hf-on-dark`); badge `tone` glass \| navy; button `tone` glass \| navy, `pressed` | One surface family instead of Card + Panel |
| **TxRow** | ListRow | `leading` · `icon` · `title` · `subtitle` · `amount` · `direction` in \| out \| advance | An advance is ink, not green |
| **FactStrip** | none | `items[{value, label}]` · `tone` light \| dark | Up to three facts as large values over small labels, in a `<dl>` (label read first). Values top-aligned. Choose amount: "3% one-time fee · 0% interest · 28 Jul repayment". Light: ink-900 values, ink-700 labels (≥ 6.6:1); dark: white / navy-100 on navy (≥ 6.39:1) |
| **Logo** | none | `as` (h1 on Home) · `showWord` | Prototype mark: two rounded uprights and a softened diagonal (a segmented "N") + "NovaPay" wordmark, one colour (navy-900, 14.56:1 on the page). Hand-drawn SVG, allowed as a single simple geometric mark |
| **QuickAction**, **TabBar**, **Avatar**, **StatusBar**, **TopBar** | AppBar (TopBar) / none | — | Round 56px glass actions; glass tab bar with haloed liquid centre button; controls outside the advance toast "not part of this prototype" |

Prototype-only (not in either kit): `src/ViewToggle.jsx`, beside `DemoSwitcher`.

### Contrast checks, hi-fi

| Pair | Ratio | Use |
|---|---|---|
| white on hf-navy-600 (lightest point of `.hf-liquid`) | 9.13 | Primary button, total band, badges |
| hf-navy-100 on hf-navy-600 | 7.03 | "Total you repay" label |
| hf-ink-900 / 700 on hf-page | 13.91 / 6.59 | Text on the page |
| hf-ink-700 on `.hf-glass` over the page | 7.09 | Secondary text in cards |
| hf-ink-700 on 62% glass over slate-400 (worst case) | 5.28 | Cards that scroll over the Home haze |
| hf-ink-900 on the same | 11.14 | Primary text over the haze |
| hf-green-600 (#11663A) on white / on 62% glass over slate-400 | 7.03 / 4.97 | Money in. **The first green (#16804A) measured 3.52 on glass over the haze and still 4.17 on strong glass, so it failed**; darkened until it passes on any glass |
| hf-navy-700 on hf-navy-50 | 9.81 | Info title, "Active" chip, current tab |
| hf-navy-700 on white glass | ≥9.8 | "Not now" |
| hf-ink-700 on the grained balance card (average / darkest speck) | 6.05 / 5.19 | "Available balance" over `.hf-grain` |
| white / hf-navy-100 on `.hf-liquid-deep` under the bloom (worst case) | 7.35 / 5.65 | Offer card title, body and labels. **The glossy `.hf-liquid` cap measured 3.12 for navy-100 on a tall card**, so the card uses its own material |
| hf-navy-700 on `.hf-soft-white` (78% white over navy, worst case) | 7.33 | "See your offer" on navy |
| White focus outline on navy | ≥ 7.35 | `.hf-on-dark` |
| hf-amber-700 on hf-amber-50 | 5.79 | Caution title |
| white on hf-navy-900 | 15.90 | Toast |
| hf-ink-500 on white / page | 3.60 / 3.18 | Radio and checkbox rings only (graphics, ≥3:1) |
| Focus outline hf-navy-600 on the page | 8.06 | All hi-fi controls (`[data-view="hifi"]` in `index.css`) |
