# WEBSITE SECTIONS REPO — SETUP & USAGE GUIDE
## For Claude Code + Windsurf
## This is the shared library of reusable site sections across all Zatreides / Jarvis projects.

---

## CREATE THE REPO (one-time setup)

```bash
# 1. Create private repo on GitHub
gh repo create zatreides-creatives/website-sections --private --description "Reusable site sections for Zatreides + Jarvis projects"

# 2. Clone it
git clone git@github.com:zatreides-creatives/website-sections.git
cd website-sections

# 3. Create folder structure
mkdir -p hero listings market stats about calculators testimonials contact footer ui transitions

# 4. Push initial structure
git add . && git commit -m "init: folder structure" && git push
```

---

## FOLDER STRUCTURE

```
website-sections/
├── SECTIONS.md              ← Index of every section (AI reads this first)
├── AGENTS.md                ← Handoff protocol between Claude and Windsurf
├── SECTION-TRANSITIONS.md   ← All transition patterns with GSAP code
│
├── hero/
│   ├── FindHero/            ← Opposition parallax (photo up, text down)
│   └── SonderStyle/         ← Cinematic text in sky + gravity inversion
│
├── market/
│   └── LiveMarketPulse/     ← LA MARKET PULSE — time-based + card grid
│
├── listings/
│   └── ReserveStyle/        ← Full-bleed card, Netflix navigator, 3 circles
│
├── stats/
├── about/
├── calculators/
├── testimonials/
├── contact/
├── footer/
├── ui/                      ← Shared components: pills, cards, buttons
└── transitions/             ← Standalone transition utilities
```

---

## SECTION FOLDER STRUCTURE (each section)

Every section pushed to this repo must include:

```
SectionName/
├── Component.tsx      ← The actual React component (self-contained)
├── README.md          ← What it is, dependencies, how to drop it in
├── config-shape.ts    ← TypeScript type for the data it expects
└── preview.jpg        ← Screenshot (optional but helpful)
```

---

## README.md TEMPLATE (per section)

```markdown
# [SectionName]

## What it is
One sentence description.

## Visual
[Describe the layout — what the user sees]

## Dependencies
- gsap + ScrollTrigger
- Space Grotesk font
- [any other deps]

## Data shape
See config-shape.ts — pass as props or import from your agent-config.

## Drop-in instructions
1. Copy Component.tsx into your /components/blocks/ folder
2. Match the config shape to your data source
3. Import and add to your page
4. Copy any referenced public assets (images) to /public/

## Brand tokens needed
- Primary color (used for pill tags, bar fills)
- Gold/accent color (used for trend indicators)
- Navy/dark bg color

## Transitions used
[Reference to SECTION-TRANSITIONS.md entry if applicable]
```

---

## HOW CLAUDE PUSHES A SECTION

After completing and build-verifying a section:

```bash
# 1. Copy the component to the sections repo
cp /tmp/[project]/src/components/blocks/SectionName.tsx \
   ~/path/to/website-sections/[category]/SectionName/Component.tsx

# 2. Write the README for that section
# 3. Write config-shape.ts
# 4. Commit and push
cd ~/path/to/website-sections
git add [category]/SectionName/
git commit -m "add: SectionName — [one-line description]"
git push

# 5. Update SECTIONS.md index
```

---

## HOW WINDSURF PULLS A SECTION

```
1. Read SECTIONS.md to find the right section
2. Read that section's README.md for drop-in instructions
3. Copy Component.tsx into the project
4. Adapt config-shape.ts to match the project's data source
5. Do NOT change the animation logic — only update data/copy/colors
```

---

## SECTIONS.md INDEX FORMAT

Keep this file updated every time a section is added:

```markdown
# SECTIONS INDEX

| Section | Category | Description | Key Animation | Status |
|---|---|---|---|---|
| FindHero | hero | Opposition parallax — text down, photo up | GSAP scrub | ✅ ready |
| SonderStyle | market | Cinematic text in sky + gravity inversion to cards | Time-based + gravity | ✅ ready |
| ReserveStyle | listings | Full-bleed card, Netflix navigator, neighborhood circles | GSAP clip-path | ✅ ready |
```

---

## AGENTS.md (put this in the repo root)

```markdown
# AGENTS HANDOFF PROTOCOL

## Who does what
- Claude Code: builds sections, animates, pushes to this repo
- Windsurf: handles hero + section 2, can pull from this repo, handles mobile

## Before touching any section
1. Read SECTIONS.md — check if a version already exists
2. Read the section's README.md before editing
3. Never change animation logic — only data/copy/colors

## Pushing a new section
- Build must pass before pushing (vite build or npm run build)
- README.md is required
- Update SECTIONS.md index

## Coordination rule
If both agents are working simultaneously:
- Claude owns: animations, GSAP, data wiring
- Windsurf owns: hero, mobile styles, layout polish
- Neither touches the other's active file without noting it in AGENTS.md
```

---

## SECTIONS TO ADD FIRST (priority order)

1. `market/LiveMarketPulse` — built ✅ ready to push
2. `listings/ReserveStyle` — built ✅ ready to push
3. `hero/FindHero` — spec exists in FIND HERO guide ✅ ready to document
4. `hero/SonderStyle` — same pattern as LiveMarketPulse hero layer
5. `ui/PillTag` — shared pill component used across all sections
6. `ui/AppleCard` — shared card component (image + pill + stat + copy)

---

## WHAT GOES IN THIS REPO vs THE PROJECT REPO

| Belongs in website-sections | Belongs in project repo |
|---|---|
| Completed, verified sections | In-progress work |
| Self-contained components | Site-specific config |
| Reusable UI atoms | agent-config.ts |
| Transition patterns | index.tsx page assembly |
| AGENTS.md, SECTIONS.md | Project-specific assets |
