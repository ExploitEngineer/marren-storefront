# Framies - Design System

> An original visual identity for Framies: dark, automotive, premium.
> This is the single source of truth for color, type, space, shape, and motion.
> Values here are encoded directly into `src/app/globals.css` and the Tailwind theme.

## 0. Design principles

1. Dark and cinematic, not clinical.
The canvas is near-black gunmetal so the frames and their die-cast subjects read like lit exhibits.
2. Whitespace is still a feature.
Premium reads as restraint; sections breathe even on a dark ground.
3. The product is the hero.
Frames and the art inside them get the contrast and the glow; the UI stays quiet.
4. One accent, used with intent.
Racing red marks actions, emphasis, and live signals, and nothing else.
5. Motion serves meaning.
Reveals set rhythm, hovers signal affordance, sliders show range; nothing moves purely for decoration.
6. Type carries the voice.
A bold grotesk for headlines, a clean grotesque for everything else.

## 1. Color

### 1.1 Neutrals - "Carbon" (light to near-black gunmetal)

Standard ramp direction: low index is light, high index is dark.

| Token | Hex | Use |
| --- | --- | --- |
| carbon-50 | `#F4F6F8` | Primary text / headings on dark |
| carbon-100 | `#E4E7EA` | Strong text, light-on-dark labels |
| carbon-200 | `#C3C8CF` | Body text |
| carbon-300 | `#9AA1AB` | Muted / secondary text |
| carbon-400 | `#6B7280` | Faint text, captions |
| carbon-500 | `#4A515E` | Decorative, disabled |
| carbon-600 | `#363C47` | Empty-state icons, subtle strokes |
| carbon-700 | `#262B34` | Borders, inputs, dividers |
| carbon-800 | `#1B1F26` | Hairline borders, subtle fills |
| carbon-850 | `#14171C` | Elevated panel / card surface |
| carbon-900 | `#101318` | Raised section surface |
| carbon-950 | `#0B0D10` | Page background |

### 1.2 Primary accent - "Race" (racing red)

| Token | Hex | Use |
| --- | --- | --- |
| race-50 | `#FFE8E6` | Accent tint backgrounds |
| race-100 | `#FFC7C2` | Illustrative highlights |
| race-300 | `#FF5A4D` | Illustrative, gradients |
| race-400 | `#FF2D1F` | Accent text/links on dark (brighter for contrast) |
| race-500 | `#E10600` | Primary CTA, focus ring, brand mark, live signals |
| race-600 | `#B80500` | CTA hover, promo bar |
| race-700 | `#8F0400` | Deep accent, pressed states |

Accent glow token: `--glow-race: 0 0 40px -8px rgba(225,6,0,0.45)` for the brand mark, loader, and hover lifts.

### 1.3 Secondary accent - "Steel" (cool highlight)

Used very sparingly for cool ambient washes only; never competes with race for actions.

| Token | Hex |
| --- | --- |
| steel-400 | `#5B8BFF` |
| steel-500 | `#2B6CFF` |

### 1.4 Support

- Destructive: `#FF4D3D` (bright red for on-dark error text/borders).

### 1.5 Semantic tokens (what the code references)

| Semantic | Value | Notes |
| --- | --- | --- |
| `--background` | carbon-950 `#0B0D10` | page |
| `--foreground` | carbon-50 `#F4F6F8` | text |
| `--card` | carbon-850 `#14171C` | cards/popovers |
| `--muted-foreground` | carbon-300 `#9AA1AB` | secondary text |
| `--border` | carbon-700 `#262B34` | |
| `--input` | carbon-700 `#262B34` | |
| `--primary` | race-500 `#E10600` | |
| `--primary-foreground` | `#FFFFFF` | white on red |
| `--secondary` | carbon-800 `#1B1F26` | |
| `--accent` | carbon-800 `#1B1F26` | |
| `--ring` | race-500 `#E10600` | focus |
| `--destructive` | `#FF4D3D` | |

`:root` declares `color-scheme: dark`.

### 1.6 Contrast (WCAG)

Validated pairings (target AA, 4.5:1 body / 3:1 large):
- carbon-50 on carbon-950: ~16:1 (AAA) - headings and body.
- carbon-300 on carbon-950: ~6:1 (AA) - muted text.
- carbon-300 on carbon-850 (panels): ~4.6:1 (AA) - muted text on cards.
- White on race-500: ~4.7:1 (AA) - primary buttons and the promo bar.
- race-400 on carbon-950: ~5:1 (AA) - accent links on dark.

Rule: on panel/card surfaces (`carbon-850`) do not drop muted text below `carbon-300`; `carbon-400+` are decorative there.

### 1.7 Section tones

Rhythm on a dark page comes from stepping surface lightness, defined in `src/components/layout/section.tsx`:

| Tone | Surface | Use |
| --- | --- | --- |
| `base` | carbon-950 (`--background`) | default section ground |
| `raise` | carbon-900 | a step up for alternating rhythm |
| `panel` | carbon-850 | elevated blocks (stats, testimonials) |
| `contrast` | pure black | the deepest, most cinematic bands (reel, closing CTA) |

## 2. Typography

### 2.1 Families

- Display: Space Grotesk (variable grotesk) - technical, confident, automotive. Headlines, hero, section titles, the wordmark. Exposed as `--font-display` / `font-heading`.
- Text/UI: Inter (variable grotesque) - clean, neutral, highly legible. Body, nav, buttons, labels. Exposed as `--font-sans`.
- Both self-hosted via `next/font/local` (`src/fonts/*.woff2`), `display: swap`, subset latin.

### 2.2 Scale (fluid)

| Token | Size (clamp) | Font / weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| display | `clamp(2.75rem, 1.9rem + 4vw, 4.5rem)` | Space Grotesk 500 | 1.02 | -0.02em |
| h1 | `clamp(2.25rem, 1.7rem + 2.6vw, 3.25rem)` | Space Grotesk 500 | 1.05 | -0.015em |
| h2 | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | Space Grotesk 500 | 1.1 | -0.01em |
| h3 | `clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)` | Space Grotesk 500 | 1.15 | -0.005em |
| h4 | `1.25rem` | Inter 600 | 1.3 | 0 |
| body-lg | `1.125rem` | Inter 400 | 1.7 | 0 |
| body | `1rem` | Inter 400 | 1.65 | 0 |
| small | `0.875rem` | Inter 400 | 1.5 | 0 |
| eyebrow | `0.75rem` | Inter 600 | 1.4 | 0.14em, uppercase |

Headings use sentence case (confident, not shouty); eyebrows are the only uppercase.
Prose measure caps at ~65ch.

## 3. Spacing and grid

- Base unit: 4px. Scale follows Tailwind defaults (1=4, 2=8, 3=12, 4=16, 6=24, 8=32, 12=48, 16=64, 20=80, 24=96, 32=128).
- Section rhythm: mobile `py-14`/`py-16` (56-64px), desktop `py-24`/`py-32` (96-128px), via `.section-y`.
- Container: max-width 1280px, gutters `px-5` (mobile) / `px-6` (sm) / `px-8` (lg).
- Grid: 12 columns, `gap-6` to `gap-8`. Product grids: 2 cols mobile, 3 tablet, 4 desktop.
- Vertical spacing inside sections uses a consistent 4/6/8/12 step so rhythm feels intentional.

## 4. Shape and elevation

### 4.1 Radius

- `--radius`: 0.625rem (10px) base.
- sm 6px, md 8px, lg 10px, xl 14px, 2xl 18px.
- Buttons: 10px. Cards: 14px. Inputs: 8px. Badges/pills: full. Framed-art imagery: 2-4px (deliberately crisp, gallery feel).
- Radii stay modest overall; premium reads calmer than bubbly.

### 4.2 Shadows (true black, deeper for a dark UI)

- `shadow-xs`: `0 1px 2px rgba(0,0,0,0.3)`
- `shadow-sm`: `0 2px 8px -2px rgba(0,0,0,0.4)`
- `shadow-md`: `0 12px 32px -12px rgba(0,0,0,0.55)`
- `shadow-lg`: `0 26px 64px -24px rgba(0,0,0,0.65)`
- `shadow-xl`: `0 34px 84px -28px rgba(0,0,0,0.72)`

On dark, cards separate with a hairline `ring-white/5` plus shadow.
Frame cards add a race-tinted glow on hover (`rgba(225,6,0,0.28)`).

## 5. Components

### 5.1 Buttons

| Variant | Base | Hover | Notes |
| --- | --- | --- | --- |
| primary | bg race-500, text white | bg race-600 | main CTA, ring race-500 |
| secondary | border carbon-700, text carbon-50, bg transparent | bg carbon-800 | quiet alternative |
| ghost | text carbon-100 | bg carbon-800 | tertiary, nav |
| link | text race-400, underline offset 4 | race-300 | inline |
| inverse | bg carbon-50, text carbon-950 | bg carbon-100 | on the rare light block |

Sizes: sm 36px, default 44px, lg 52px. Font Inter 500. Focus: 2px ring race-500 with 2px offset.

### 5.2 Badges

- default: bg carbon-800, text carbon-300.
- accent: bg race-500/10, text race-400.
- new: bg carbon-800, text carbon-300.

### 5.3 Cards

- Product card: surface carbon-850, hairline `ring-white/5`, radius 14, image top at 4:5 aspect. Hover: lift `-1.5`, deeper shadow + race glow, image scale 1.045. Price and name in Inter 500/600.
- Frame card: a slim per-marque dark keyline echoing the real moulding, glass glazing reflection, black shadow.

### 5.4 Inputs

- Height 44px, radius 8, border carbon-700, bg carbon-850. Label Inter 500 small above field.
- Focus: 2px ring race-500.
- Error: border/ring destructive, `aria-describedby` error text in destructive.

### 5.5 Header

- Sticky, transparent over hero, condenses after scroll (reduced padding, carbon-800 bottom border, `backdrop-blur` over `carbon-950/80`).
- Logo left, nav, cart + primary CTA right. Mobile: logo + hamburger opening a shadcn Sheet.
- Promo announcement bar sits above the header in race-600 with white text.

### 5.6 Footer

- Multi-column: brand blurb + newsletter, shop links, company links, support links. Deep black (`bg-black`) block for contrast at page end.

## 6. Motion

### 6.1 Tokens (`src/lib/motion.ts` + CSS)

- Easing: `--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1)`; `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)`; `--ease-in-out-quart: cubic-bezier(0.65, 0, 0.35, 1)`.
- Durations: fast 180ms, base 280ms, slow 440ms, slower 640ms.

### 6.2 Patterns and rationale

| Pattern | Spec | Why |
| --- | --- | --- |
| Intro loader | headlight beams sweep out from centre, a race-red streak, then the wordmark; first visit only, ~1.85s then exit | An automotive "ignition" that reveals the site |
| Scroll reveal | opacity 0->1, y 16->0, ~600ms ease-out, once | Sets reading rhythm down the page |
| Stagger | children delayed ~70ms | Turns a grid into a considered sequence |
| Testimonials slider | auto-advancing crossfade/slide, arrows + dots, pause on hover, framer-motion | Shows range without a wall of quotes |
| Featured frames rail | seamless auto-scroll of product cards, pause on hover, framer `useAnimationFrame` | Ambient sense of a busy workshop |
| Stats count-up | numbers animate 0->value on scroll into view | Rewards arrival at the proof strip |
| Hover lift | translateY -1.5 + shadow + race glow, ~500ms | Signals a card is interactive |
| Image zoom | scale ~1.05 on card/gallery hover | Subtle life without distraction |
| Press marquee | slow linear scroll, pauses on hover | Ambient credibility |

### 6.3 Reduced motion

Under `prefers-reduced-motion: reduce`, all transforms and transitions collapse to instant.
The intro loader never plays, reveals render final, marquees and sliders are static, stats show final values, count-ups are skipped, hovers keep only color changes.
This is enforced in the motion wrappers (`useReducedMotion` / `useInViewOnce`) and a global CSS guard.

## 7. Iconography and art direction

- Icons: lucide-react, ~1.5px stroke, 16-24px, carbon or race.
- Imagery target: die-cast hypercar frames shot on dark or neutral grounds, on-wall and shelf contexts, generous negative space.
- Product photography lives in `public/images/products/`; the customer gallery uses on-wall shots in `public/images/`.
