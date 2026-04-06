# WINDSURF TASK — Replace All Sections Except Two
## Read fully before touching anything.

---

## CONTEXT

Site: `/tmp/william-johnson-realty`
Dev server: `node_modules/.bin/vite --port 5199 --host`
Page controller: `src/components/FullPageObserver.tsx` — fullscreen movie-style transitions, GSAP Observer

---

## YOUR JOB

Replace every section in the site with your own sections EXCEPT these two — do NOT touch them:

1. `src/components/blocks/ListingsBlock.tsx` — Featured Properties (Claude built this)
2. `src/components/blocks/LiveMarketPulseBlock.tsx` — Live Market Pulse (Claude built this)

---

## CURRENT INDEX.TSX STRUCTURE

The page assembly is in `src/pages/Index.tsx`. It uses `FullPageObserver` which takes a `sections` array:

```tsx
const SECTIONS = [
  { id: "hero",          node: <HeroWJBlock />,            scrollable: false },
  { id: "stats",         node: <StatsScoreboardBlock />,   scrollable: false },
  { id: "listings",      node: <ListingsBlock />,          scrollable: false }, // ← KEEP
  { id: "market-pulse",  node: <LiveMarketPulseBlock />,   scrollable: true  }, // ← KEEP
  { id: "about",         node: <AboutWJBlock />,           scrollable: false },
  { id: "sold",          node: <SoldStoriesBlock />,       scrollable: false },
  { id: "neighborhoods", node: <NeighborhoodCarouselBlock />, scrollable: false },
  { id: "roi",           node: <ROICalculatorBlock />,     scrollable: true  },
  { id: "timing",        node: <MarketTimingBlock />,      scrollable: false },
  { id: "testimonials",  node: <TestimonialsBlock />,      scrollable: false },
  { id: "book",          node: <BookACallBlock />,         scrollable: false },
  { id: "footer",        node: <FooterBlock />,            scrollable: true  },
];
```

---

## WHAT TO DO

1. **Add your sections** as new component files in `src/components/blocks/`
2. **Replace the SECTIONS array** in `Index.tsx` with your sections, keeping `listings` and `market-pulse` in the correct order
3. **Keep the FullPageObserver** — do NOT remove it or change how it works
4. **Keep NavBar and CustomCursor** at the top

### Suggested section order (adapt to what you've built):
```tsx
const SECTIONS = [
  { id: "hero",         node: <YourHeroSection />,        scrollable: false },
  { id: "numbers",      node: <YourNumbersSection />,     scrollable: false },
  { id: "listings",     node: <ListingsBlock />,          scrollable: false }, // ← DO NOT CHANGE
  { id: "market-pulse", node: <LiveMarketPulseBlock />,   scrollable: true  }, // ← DO NOT CHANGE
  // ... add your remaining sections here
];
```

---

## FULLPAGEOBSERVER RULES (read before adding sections)

- Each section must visually fill `100vh` — use `height: 100vh` or `min-height: 100vh`
- `position: fixed/absolute` is handled by FullPageObserver — your section just needs to fill its container
- If a section has scrollable content taller than viewport, mark `scrollable: true` — FullPageObserver wraps it in `data-inner-scroll`
- Do NOT add scroll event listeners — FullPageObserver owns all scroll
- Do NOT use `position: sticky` inside sections — it won't work inside a fixed panel
- For internal navigation between sections, dispatch: `window.dispatchEvent(new CustomEvent('fpJump', { detail: 'section-id' }))`

---

## TRANSITION REFERENCE

All section transitions documented in:
`/Users/Skywalker/Downloads/Zatreides HQ/SECTION-TRANSITIONS.md`

The FullPageObserver already has 10 built-in transitions cycling per section. You do NOT need to add transitions manually.

---

## BRAND TOKENS

```
Navy:  #0a0a0f
Blue:  #2563eb  (WJ electric blue — primary)
Gold:  #f59e0b  (WJ gold — accent)
Fonts: Space Grotesk (headlines), Inter (body), SF Pro Rounded/Nunito (labels)
```

---

## PUSH TO SECTIONS REPO

After the site builds clean:

1. Copy each of your new section components into the sections repo at `/tmp/website-sections/`
   - Hero → `/tmp/website-sections/hero/YourHeroName/Component.tsx`
   - Numbers/stats → `/tmp/website-sections/stats/YourStatsName/Component.tsx`
   - etc.
2. Write a `README.md` per section (see SECTIONS-REPO.md for template)
3. Commit and push: `cd /tmp/website-sections && git add . && git commit -m "add: windsurf sections" && git push`

---

## VERIFY BEFORE FINISHING

```bash
cd /tmp/william-johnson-realty
node_modules/.bin/vite build
# Must say: ✓ built — zero errors
```

Then open `localhost:5199` and verify:
- Scroll = fullscreen movie transition (not regular scroll)
- Gold nav dots visible on right side
- ListingsBlock and LiveMarketPulseBlock are untouched
- All your sections fill the full viewport
