# WINDSURF HANDOFF — LiveMarketPulseBlock
## Read this fully before touching anything. Do not improvise.

---

## WHAT WAS BUILT

`LiveMarketPulseBlock.tsx` — a 2-phase, 300vh scroll section for the William Johnson LA real estate site.

**Phase 1 (time-based, fires once on enter):**
- Full-bleed Beverly Hills photo background (`/public/market-pulse-hero-la.jpeg`)
- Massive "LA MARKET" (left) + "PULSE" (right, bleeds off edge) in Space Grotesk 900
- Text positioned at `top: 8vh` — floating IN THE SKY of the photo. NOT centered.
- Subtitle fades in below
- After 1s hold: text blur-dissolves out
- 4 stat blocks appear distributed across the sky (Space Grotesk numbers + typewriter labels)
- Fast ticker count-up (~0.75s) fires simultaneously with typewriter labels

**Phase 2 (scroll-triggered via Gravity Inversion transition):**
- At 38% of 300vh scroll: photo layer rockets upward (`yPercent: -120, ease: power3.in`)
- Card grid snaps up from below (`back.out(1.2)`)
- Dark navy (`#0a0a0f`) background revealed
- Left 34%: "WHAT WE'RE SEEING" editorial block — WJ gold pill tag, headline, 3-sentence market take, attribution
- Right 66%: 2×2 Apple-style white cards — each has: neighborhood photo, pill tag (gold or WJ blue), big stat number, 1-line copy, trend indicator

---

## FILE LOCATION

```
/tmp/william-johnson-realty/src/components/blocks/LiveMarketPulseBlock.tsx
```

---

## BRAND TOKENS (do not change)

```
NAVY  = "#0a0a0f"
BLUE  = "#2563eb"   ← WJ electric blue (primary)
GOLD  = "#f59e0b"   ← WJ gold (accent, trend up)
AMBER = "#d97706"   ← trend down

Fonts:
sg = Space Grotesk (headlines, numbers)
sf = SF Pro Rounded / Nunito (labels, UI text)
mn = GeistMono / JetBrains Mono (pills, metadata, typewriter)
```

---

## GSAP ARCHITECTURE

Two separate ScrollTriggers:

**1. Time-based trigger** (`start: "top 70%"`, `once: true`):
- Fires a `gsap.timeline()` with no scrub — pure time-based animation
- Controls: text fade-in → hold → dissolve → stat numbers appear → count-up + typewriter

**2. Gravity Inversion trigger** (`start: "38% top"`):
- `paused: true` timeline played via `onEnter`, reversed via `onLeaveBack`
- Photo layer: `yPercent: -120`, `ease: "power3.in"`, `duration: 0.65`
- Card grid: `y: 0, opacity: 1`, `ease: "back.out(1.2)"`, `duration: 0.55`, at offset `0.18`
- NO scrub — this is a discrete play/reverse, not a scrub

**Structure:**
```
300vh wrapper (ref: wrapperRef)
└── 100vh sticky container
    ├── Layer 1: cardGridRef  (zIndex: 1, position: absolute, inset: 0)
    └── Layer 2: photoLayerRef (zIndex: 2, position: absolute, inset: 0, willChange: "transform")
```

---

## WHAT NOT TO TOUCH

- Do NOT add a dark overlay to the photo — the sky must read bright and clear
- Do NOT change `top: 8vh` on the headline — it must sit in the sky, not the center
- Do NOT use `scrub` on the gravity trigger — it kills the `ease` feel
- Do NOT add `pin: true` to any ScrollTrigger — sticky CSS handles pinning
- Do NOT change the wrapper to `100vh` — it must be `300vh` for scroll room
- Do NOT touch the `once: true` time-based trigger

---

## DATA SOURCE

All stats pull from:
```ts
import { agentConfig } from "@/config/agent-config";
const { tableData } = agentConfig.marketPulse;
// tableData[0-3] used (4 of 5 stats)
```

Card images are Unsplash URLs hardcoded in the `CARDS` array at the top of the file.

---

## WHAT WINDSURF CAN ADD / IMPROVE

- Mobile responsive styles (390px breakpoint) — reduce font sizes, stack card grid to 1 column
- Hover states on the Apple cards (subtle lift: `translateY(-4px)` + shadow)
- The "WHAT WE'RE SEEING" copy can be updated from `agentConfig` if a field is added
- A "View Full Report" CTA button at the bottom of the card grid section

---

## TRANSITION REFERENCE

The Gravity Inversion transition used here is documented with full implementation details in:
```
/Users/Skywalker/Downloads/Zatreides HQ/SECTION-TRANSITIONS.md
```
Use this doc for ALL future section transitions on this project.
