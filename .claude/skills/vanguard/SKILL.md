---
name: vanguard
description: Zatreides Creatives' Vanguard Production Agent — builds programmatic video using Remotion + Fal.ai + Kling + HeyGen. Use when creating video content, kinetic typography, animated brand assets, personalized outreach videos, or any AI-powered video production for Zatreides. Also triggers on mentions of Fight Club aesthetic, industrial noir, blood red glow, Kling animations, or the Zatreides video pipeline.
---

# Vanguard Production Agent — Zatreides Creatives

## What Is This System
The Vanguard Production Agent is Zatreides Creatives' proprietary video production engine. Remotion is the primary timeline and kinetic typography layer. Fal.ai, Kling, and HeyGen operate as specialized sub-contractors triggered by complexity level.

The entire system follows a single aesthetic language: **Fight Club / Industrial Noir / Blood Red Glow.**

---

## The Aesthetic DNA (Non-Negotiable)

| Element | Spec |
|---|---|
| Background | #000000 — Pure black only |
| Primary Glow | #8A0303 — Deep blood red |
| Accent | #DC143C — Crimson flare |
| Typography | Bold Heavy Industrial / Digital Flicker / Glitch |
| Lighting | Shadowy / Heavy Red Rim Lighting |
| Feel | If a motion feels too clean — add digital flicker or glitch |

---

## The Full Tech Stack

| Role | Tool | Function |
|---|---|---|
| **Primary Engine** | Remotion | Timeline, kinetic typography, sequencing, all code-driven motion |
| **Image Generation** | Fal.ai (Nano Banana) | Base image generation for storyboard frames |
| **Short Animation** | Kling | 2-second animated clips from Fal.ai images |
| **Complex Motion** | HeyGen / Google Flow (Veo) | Avatar, lip-sync, cinematic motion Kling can't handle |
| **Storage** | `/Volumes/MINI MK V/` | All assets on external USB — never clog internal SSD |
| **B-Roll Library** | `/Volumes/MINI MK V/b-roll` | Pre-existing footage as alternative to generating new |
| **Generated Assets** | `/Volumes/MINI MK V/zatreides-assets` | Output folder for all Fal.ai + Kling renders |

---

## The Production Loop (Decision Tree)

### Step 1 — Receive Script / Shot List
Analyze difficulty of each shot.

### Step 2 — Complexity Gate
- Typography animation → Build in Remotion directly
- Basic kinetic motion → Build in Remotion directly
- Needs dynamic visuals → Step 3

### Step 3 — Asset Decision Gate
**Always ask Zen:** *"Generate new with APIs or pull from B-Roll?"*
- **Generate:** Nano Banana (Fal.ai) → 10 storyboard images (2s each) → Kling → Remotion
- **Pull:** `/Volumes/MINI MK V/b-roll` → Remotion

### Step 4 — Complex Motion Gate
If motion is impossible for Kling:
- HeyGen (avatar/lip-sync)
- Google Flow / Veo (cinematic generative video)
- Import into Remotion as video layer

### Step 5 — Remotion Assembly
Write Remotion code to place all assets into final sequence.

---

## Storyboard Default Protocol
- **10 images per sequence** (Fal.ai)
- **2 seconds per image** = 20-second base sequence
- Each image passed to Kling for subtle animation before Remotion assembly

---

## Agency Use Cases

- **Email Creative Video Loops:** One component template = infinite brand variations via props
- **Personalized Outreach Videos:** Feed prospect data into Remotion → personalized 30s video per lead (Peter Parker method in video)
- **Client Report Videos:** Animated performance stats for sprint delivery
- **Loom-Style Walkthrough Automation:** Branded strategy walkthroughs, no screen recording needed

---

## The ZATREIDES_SKILL.json (Master Config)
```json
{
  "brand": "Zatreides Creatives",
  "vanguard": "Remotion (Primary Timeline & Kinetic Typography)",
  "aesthetic": {
    "colors": ["#000000", "#8A0303", "#DC143C"],
    "vibe": "Fight Club / Industrial Noir / Blood Red Glow",
    "typography": "Bold Heavy Industrial / Digital Flicker / Glitch",
    "lighting": "Shadowy / Heavy Red Rim Lighting"
  },
  "asset_pipeline": {
    "gen_path": "Nano Banana (Fal.ai) -> Kling (2s animations) -> Remotion",
    "storage": "/Volumes/MINI MK V/zatreides-assets",
    "b_roll": "/Volumes/MINI MK V/b-roll"
  },
  "logic_rules": {
    "storyboard_default": "Generate 10 images (2 seconds each)",
    "decision_gate": "Always ask Zen: 'Generate new with APIs' or 'Pull from B-Roll'?",
    "self_learning": "Update this config when a technique works perfectly — lock in hex codes, Kling prompt phrasing, Fal.ai model settings."
  }
}
```

## Getting Started
```bash
npx create-video@latest
npx remotion studio
npx remotion render
```

For Remotion-specific technical rules (hooks, animations, sequencing, etc.), refer to the `remotion` skill.
