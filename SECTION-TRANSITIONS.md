# SECTION TRANSITIONS — DEFINITIVE REFERENCE
## For Claude Code / Windsurf / Lovable
## When doing ANY section-to-section transition, pick from this library first.

---

## HOW TO USE THIS DOC

1. Pick a transition that fits the emotional beat you want
2. Follow the GSAP implementation exactly
3. Adjust `duration`, `ease`, and `scrub` to taste — do NOT change the core clip-path / transform logic
4. Always use `will-change: transform` on elements that animate
5. Never animate `width` or `height` — use `transform: scaleX/scaleY` or `clip-path` instead (GPU)

---

## THE TRANSITIONS

---

### 1. GRAVITY INVERSION
**Vibe:** Fast. Snappy. The old scene rockets off, the new one lands.
**Best for:** Data reveals, stat sections, "what's underneath" moments.

**How it works:**
- Section B (cards/new content) lives BEHIND section A (photo/hero)
- Section A has `position: absolute, zIndex: 2`
- On scroll trigger: Section A flies upward with `ease: "power3.in"` (accelerates like gravity reversed)
- Section B snaps into place from below with a subtle bounce `ease: "back.out(1.2)"`
- Fast — total transition under 0.7s

**GSAP:**
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: wrapperRef.current,
    start: "40% top",
    end: "41% top",
    scrub: false,
    toggleActions: "play none none reverse",
  }
});

tl.to(photoLayerRef.current, {
  yPercent: -120,
  duration: 0.65,
  ease: "power3.in",
}, 0);

tl.fromTo(cardGridRef.current,
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
  0.15  // slight lag so cards appear as photo exits
);
```

**HTML structure:**
```html
<section style="height: 300vh; position: relative;">
  <div style="position: sticky; top: 0; height: 100vh; overflow: hidden;">
    <!-- Section B: cards — sits behind, zIndex 1 -->
    <div ref={cardGridRef} style="position: absolute; inset: 0; zIndex: 1;" />
    <!-- Section A: photo — sits on top, zIndex 2 -->
    <div ref={photoLayerRef} style="position: absolute; inset: 0; zIndex: 2; willChange: 'transform'" />
  </div>
</section>
```

---

### 2. FAULT LINE CRACK
**Vibe:** Dramatic. Tectonic. The scene breaks open.
**Best for:** Revealing something hidden, "behind the curtain" moments, data that disrupts.

**How it works:**
- Section A (photo) is split into two halves via `clip-path`
- Top half: `inset(0 0 50% 0)` → slides up off screen
- Bottom half: `inset(50% 0 0 0)` → slides down off screen
- Section B materializes in the gap as it widens

**GSAP:**
```js
const tl = gsap.timeline({ scrollTrigger: { trigger, start, scrub: 1 } });

tl.to(topHalfRef.current, {
  yPercent: -100, duration: 1, ease: "power2.inOut"
}, 0);

tl.to(bottomHalfRef.current, {
  yPercent: 100, duration: 1, ease: "power2.inOut"
}, 0);

tl.fromTo(sectionBRef.current,
  { opacity: 0, scale: 0.96 },
  { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
  0.3
);
```

**Implementation note:** Duplicate the background image in both `topHalfRef` and `bottomHalfRef` with matching `clip-path` so the split looks seamless.

---

### 3. IRIS CLOSE (Camera Aperture)
**Vibe:** Cinematic. Precise. Like a lens closing.
**Best for:** Photography brands, real estate, luxury — anything with a camera/vision metaphor.

**How it works:**
- Section A clips inward using a polygon `clip-path` that starts fully open and animates to a center point
- Use an 8-point polygon approximating a camera iris
- Section B opens outward from the same center point

**GSAP:**
```js
const open  = "polygon(50% 0%, 100% 0%, 100% 50%, 100% 100%, 50% 100%, 0% 100%, 0% 50%, 0% 0%)";
const closed = "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)";

tl.to(sectionARef.current, {
  clipPath: closed,
  duration: 0.8,
  ease: "power3.inOut",
});

tl.fromTo(sectionBRef.current,
  { clipPath: closed, opacity: 1 },
  { clipPath: open, duration: 0.8, ease: "power3.out" },
  "-=0.2"
);
```

---

### 4. VENETIAN SLATS
**Vibe:** Editorial. Magazine. Methodical reveal.
**Best for:** Content-heavy sections, editorial layouts, "chapter" transitions.

**How it works:**
- Section A (photo) is divided into N horizontal strips (8–12)
- Each strip has `overflow: hidden` and clips its portion of the photo via `translateY`
- On trigger: strips animate `translateY` with staggered delays
- Odd strips go left (`translateX: -110%`), even strips go right (`translateX: 110%`)

**GSAP:**
```js
// stripRefs = array of N divs each showing 1/N of the photo via clip-path or overflow
gsap.to(stripRefs.current, {
  xPercent: (i) => i % 2 === 0 ? -110 : 110,
  stagger: 0.04,
  duration: 0.5,
  ease: "power2.inOut",
  onComplete: () => gsap.set(sectionARef.current, { display: "none" }),
});
```

---

### 5. ZOOM THROUGH
**Vibe:** Immersive. Like entering a portal.
**Best for:** Going from establishing shot → detail view. Scene → data. Macro → micro.

**How it works:**
- Section A photo scales from 1 → 8 and blurs simultaneously
- At peak blur/scale, Section B fades in
- Feels like moving THROUGH the scene into a new space

**GSAP:**
```js
const tl = gsap.timeline({ scrollTrigger: { trigger, scrub: 1 } });

tl.to(sectionARef.current, {
  scale: 8,
  filter: "blur(40px)",
  opacity: 0,
  duration: 1,
  ease: "power2.in",
}, 0);

tl.fromTo(sectionBRef.current,
  { opacity: 0 },
  { opacity: 1, duration: 0.4, ease: "power1.out" },
  0.6
);
```

---

### 6. FILM BURN
**Vibe:** Nostalgic. Organic. Like old film dissolving.
**Best for:** Memory, timeline, before/after moments. Emotional transitions.

**How it works:**
- Radial gradient mask on Section A expands from center outward
- Uses CSS `mask-image` animated via GSAP
- Section B bleeds in through the dissolving zones

**CSS + GSAP:**
```js
// Use a custom GSAP plugin or inline style updates for mask-size
gsap.to(sectionARef.current, {
  "--mask-size": "200%",  // CSS custom prop driving mask-image radial gradient
  opacity: 0,
  duration: 1.2,
  ease: "power2.inOut",
});
// Section A CSS:
// mask-image: radial-gradient(circle, transparent var(--mask-size, 0%), black 100%);
```

---

### 7. NEGATIVE EXPOSURE
**Vibe:** Avant-garde. Fashion editorial. High contrast.
**Best for:** Bold brands, unexpected moments, "invert expectations" conceptually.

**How it works:**
- Section A inverts color (`filter: invert(1)`) while fading
- Section B fades in from white (`background: white → transparent`)
- The flash of inverted color + white feels like a camera flash

**GSAP:**
```js
tl.to(sectionARef.current, {
  filter: "invert(1) brightness(2)",
  duration: 0.3,
  ease: "power4.out",
});
tl.to(sectionARef.current, {
  opacity: 0,
  duration: 0.25,
  ease: "power2.in",
});
tl.fromTo(sectionBRef.current,
  { backgroundColor: "#ffffff", opacity: 1 },
  { backgroundColor: "#000000", duration: 0.4, ease: "power2.out" },
  "-=0.1"
);
```

---

## CHOOSING THE RIGHT TRANSITION

| Situation | Recommended Transition |
|---|---|
| Photo → Data/Stats | Gravity Inversion, Zoom Through |
| Section → Section (same tone) | Venetian Slats, Fault Line |
| Hero → Content | Iris Close, Gravity Inversion |
| Emotional/Memory beat | Film Burn, Negative Exposure |
| Fast/Snappy feel | Gravity Inversion |
| Slow/Cinematic feel | Iris Close, Film Burn |
| Maximum Drama | Fault Line Crack |

---

## RULES TO NEVER BREAK

1. **Never animate `width` or `height`** — use `transform: scale` or `clip-path`
2. **Always `will-change: transform`** on animated elements
3. **Never `scrub: true`** — always `scrub: 1` or higher for smoothness
4. **Z-index stack:** New section always BEHIND (z: 1), exiting section ABOVE (z: 2)
5. **Cleanup:** Always kill ScrollTrigger instances on unmount
6. **Mobile:** Test at 390px — reduce distances by 30%, simplify complex clip-paths

---

*Maintained by Zatreides Creatives. Add new transitions below this line.*
