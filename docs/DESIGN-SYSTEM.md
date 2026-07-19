# Marren - Design System

> An original visual identity for Marren: warm, premium, minimal.
> This is the single source of truth for color, type, space, shape, and motion.
> It is not derived from any existing brand. Values here are encoded directly into `src/app/globals.css` and the Tailwind theme.

## 0. Design principles

1. Warm, not clinical. The palette is sand, clay, and espresso, never cold blue-white.
2. Whitespace is a feature. Premium reads as restraint; sections breathe.
3. The product is the hero. Frames and the art inside them get the contrast; the UI stays quiet.
4. One accent, used with intent. Clay marks actions and emphasis and nothing else.
5. Motion serves meaning. Reveals set rhythm, hovers signal affordance; nothing moves for decoration.
6. Type carries the voice. A warm serif for headlines, a clean grotesque for everything else.

## 1. Color

### 1.1 Neutrals - "Oat" (warm sand to espresso)

| Token | Hex | Use |
| --- | --- | --- |
| oat-50 | `#FAF7F1` | Page background (cream) |
| oat-100 | `#F2ECE1` | Subtle fills, secondary buttons |
| oat-200 | `#E6DCCB` | Borders, dividers |
| oat-300 | `#D4C4AB` | Input borders, stronger dividers |
| oat-400 | `#B8A384` | Decorative, disabled text |
| oat-500 | `#96805F` | Large decorative text only (below AA for body) |
| oat-600 | `#746147` | Muted/secondary text (AA on cream) |
| oat-700 | `#574838` | Strong secondary text |
| oat-800 | `#3A3025` | Headings on light, high emphasis |
| oat-900 | `#211C15` | Primary ink / body text |

Warm white surface: `#FFFDFA` (cards, inputs, elevated surfaces).

### 1.2 Primary accent - "Clay" (terracotta)

| Token | Hex | Use |
| --- | --- | --- |
| clay-50 | `#FBEEE7` | Accent tint backgrounds |
| clay-100 | `#F5D8C7` | Hover tints, highlight blocks |
| clay-200 | `#E9B396` | Illustrative |
| clay-300 | `#DB8E68` | Illustrative, gradients |
| clay-400 | `#C96E45` | Decorative emphasis |
| clay-500 | `#B0572F` | Focus ring, icons on light |
| clay-600 | `#954829` | Primary CTA background, links (AA on cream and with white text) |
| clay-700 | `#78391F` | CTA hover, accent text on tint |

### 1.3 Secondary accent - "Sage" (muted olive)

Used sparingly for variety: eyebrows, "new" badges, illustrative blocks. Never competes with clay for actions.

| Token | Hex |
| --- | --- |
| sage-50 | `#EEF0EA` |
| sage-100 | `#DBE0D0` |
| sage-300 | `#A9B393` |
| sage-500 | `#6E7A57` |
| sage-700 | `#47502F` |

### 1.4 Support

- Destructive: `#B23B2E` (bg with white text AA), destructive-tint `#F7E4E0`.
- Success: `#4B6B44`.

### 1.5 Semantic tokens (what the code references)

| Semantic | Value | Notes |
| --- | --- | --- |
| `--background` | oat-50 | |
| `--surface` | `#FFFDFA` | cards/inputs |
| `--foreground` | oat-900 | body text |
| `--muted-foreground` | oat-600 | secondary text |
| `--border` | oat-200 | |
| `--input` | oat-300 | |
| `--primary` | clay-600 | |
| `--primary-foreground` | `#FDF8F2` | warm white on clay |
| `--secondary` | oat-100 | |
| `--secondary-foreground` | oat-800 | |
| `--accent` | clay-50 | subtle accent bg |
| `--accent-foreground` | clay-700 | |
| `--ring` | clay-500 | focus |
| `--destructive` | `#B23B2E` | |

### 1.6 Contrast (WCAG)

Validated pairings (target AA, 4.5:1 body / 3:1 large):
- oat-900 on oat-50: ~14:1 (AAA) - body text.
- oat-600 on oat-50: ~5:1 (AA) - muted text.
- White on clay-600: ~5.6:1 (AA) - primary buttons.
- clay-600 on oat-50: ~5.8:1 (AA) - links and accent text.
- oat-800 on oat-50: ~10:1 (AAA) - headings.

Rule: never use oat-400/500 or clay-300/400 for body-size text on cream; those are decorative or large-text only.

### 1.7 Theme

The brand is light-first by design (a warm cream world).
A warm-dark palette (espresso background `#1C1813`, oat-50 text, clay-500 accent) is defined as tokens for future use, but no theme toggle ships in this build; it is a documented next step.

## 2. Typography

### 2.1 Families

- Display: Fraunces (variable serif, optical sizing) - warm, high-craft, editorial. Headlines, hero, section titles.
- Text/UI: Inter (variable grotesque) - clean, neutral, highly legible. Body, nav, buttons, labels.
- Both self-hosted via `next/font/google`, `display: swap`, subset latin.

### 2.2 Scale (fluid)

| Token | Size (clamp) | Font / weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| display | `clamp(2.75rem, 1.9rem + 4vw, 4.5rem)` | Fraunces 500 | 1.02 | -0.02em |
| h1 | `clamp(2.25rem, 1.7rem + 2.6vw, 3.25rem)` | Fraunces 500 | 1.05 | -0.015em |
| h2 | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | Fraunces 500 | 1.1 | -0.01em |
| h3 | `clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)` | Fraunces 500 | 1.15 | -0.005em |
| h4 | `1.25rem` | Inter 600 | 1.3 | 0 |
| body-lg | `1.125rem` | Inter 400 | 1.7 | 0 |
| body | `1rem` | Inter 400 | 1.65 | 0 |
| small | `0.875rem` | Inter 400 | 1.5 | 0 |
| eyebrow | `0.75rem` | Inter 600 | 1.4 | 0.14em, uppercase |

Headings use sentence case (warm, not shouty); eyebrows are the only uppercase.
Prose measure caps at ~65ch.

## 3. Spacing and grid

- Base unit: 4px. Scale follows Tailwind defaults (1=4, 2=8, 3=12, 4=16, 6=24, 8=32, 12=48, 16=64, 20=80, 24=96, 32=128).
- Section rhythm: mobile `py-14`/`py-16` (56-64px), desktop `py-24`/`py-32` (96-128px).
- Container: max-width 1280px, gutters `px-5` (mobile) / `px-6` (sm) / `px-8` (lg).
- Grid: 12 columns, `gap-6` to `gap-8`. Product grids: 2 cols mobile, 3 tablet, 4 desktop.
- Vertical spacing inside sections uses a consistent 4/6/8/12 step so rhythm feels intentional.

## 4. Shape and elevation

### 4.1 Radius

- `--radius`: 0.5rem (8px) base.
- sm 6px, md 8px, lg 12px, xl 16px, 2xl 20px.
- Buttons: 10px. Cards: 14px. Inputs: 8px. Badges/pills: full. Framed-art imagery: 2-4px (deliberately crisp, gallery feel).
- Radii stay modest overall; premium reads calmer than bubbly.

### 4.2 Shadows (warm-tinted, espresso `33,28,21`)

- `shadow-xs`: `0 1px 2px rgba(33,28,21,0.06)`
- `shadow-sm`: `0 2px 6px -2px rgba(33,28,21,0.08)`
- `shadow-md`: `0 10px 30px -12px rgba(33,28,21,0.14)`
- `shadow-lg`: `0 24px 60px -24px rgba(33,28,21,0.20)`

Shadows are used sparingly. Most separation comes from tone shifts and hairline `oat-200` borders.

## 5. Components

### 5.1 Buttons

| Variant | Base | Hover | Notes |
| --- | --- | --- | --- |
| primary | bg clay-600, text `#FDF8F2` | bg clay-700 | main CTA, shadow-sm, ring clay-500 |
| secondary | border oat-300, text oat-900, bg transparent | bg oat-100 | quiet alternative |
| ghost | text oat-900 | bg oat-100 | tertiary, nav |
| link | text clay-600, underline offset 4 | clay-700 | inline |
| inverse | bg `#FDF8F2`, text oat-900 | bg oat-100 | on dark hero blocks |

Sizes: sm 36px, default 44px, lg 52px. Padding `px-5`/`px-6`. Font Inter 500. Focus: 2px ring clay-500 with 2px offset.

### 5.2 Badges

- default: bg oat-100, text oat-700.
- accent: bg clay-50, text clay-700.
- new: bg sage-100, text sage-700.
- outline: border oat-300, text oat-700.

### 5.3 Cards

- Product card: surface `#FFFDFA`, border oat-200, radius 14, image top at 4:5 aspect, body padding 16-20. Hover: lift `-4px`, shadow-md, image scale 1.03. Price in Inter 500; name in Inter 500/600.
- Feature card: borderless on cream with a tone-block or icon; used in trust strip and differentiators.

### 5.4 Inputs

- Height 44px, radius 8, border oat-300, bg surface. Label Inter 500 small above field.
- Focus: border clay-500 + 2px ring clay-500/40.
- Error: border destructive, `aria-describedby` error text in destructive.
- Textarea min 5 rows.

### 5.5 Header

- Sticky, transparent over hero, condenses after 24px scroll (reduced padding, `oat-200` bottom border, `backdrop-blur` over `oat-50/80`).
- Logo left, nav center/left, cart + primary CTA right. Mobile: logo + hamburger opening a shadcn Sheet.

### 5.6 Footer

- Multi-column: brand blurb + newsletter, shop links, company links, support links. Bottom row: socials, legal, copyright. Background oat-100 or a deep espresso block for contrast at page end (inverse text).

## 6. Motion

### 6.1 Tokens

- Easing: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`; `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`.
- Durations: fast 180ms, base 280ms, slow 440ms, slower 640ms.

### 6.2 Patterns and rationale

| Pattern | Spec | Why |
| --- | --- | --- |
| Scroll reveal | opacity 0->1, y 16->0, 560ms ease-out, once, viewport `-80px` | Sets reading rhythm, draws the eye down the page |
| Stagger | children delayed 70ms | Turns a grid into a considered sequence |
| Hover lift | translateY -4px + shadow-md, 200ms | Signals a card is interactive |
| Image zoom | scale 1.03 on card hover, 300ms | Subtle life without distraction |
| Header condense | padding + border/blur transition on scroll, 280ms | Communicates context and depth |
| Page transition | fade + 8px rise, 300ms | Continuity between routes |
| Press marquee | slow linear scroll, pauses on hover | Ambient credibility, not attention-grabbing |

### 6.3 Reduced motion

Under `prefers-reduced-motion: reduce`, all transforms and transitions collapse to instant opacity or no change.
Reveals render in their final state, marquees are static, hovers keep only color changes.
This is enforced centrally in the motion wrappers and a global CSS guard.

## 7. Iconography and art direction

- Icons: lucide-react, 1.5px stroke, 20-24px, ink or clay.
- Imagery target: warm natural light, frames flat-lay and on-wall, generous negative space, no cold studio white.
- Placeholders in this build emulate that with warm tone-block gradients and framed-art SVG components, all local and flagged for replacement with real photography.
