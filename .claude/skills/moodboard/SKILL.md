---
name: moodboard
description: Mass brand photo generation and moodboard creation using fal.ai Nano Banana 2 (and optionally Weavy AI or Flora). Use this skill whenever the user wants to generate product visuals, creative concepts, moodboards, brand photography, campaign imagery, or batch AI images for any brand. Triggers include "generate visuals", "make a moodboard", "create product shots", "generate concepts", "batch images", "brand photography", or any request to produce multiple images for a brand or campaign. Works with three input modes: (1) inspo link or reference URL, (2) uploaded images, (3) text description only.
---

# Moodboard & Brand Visual Generator

Generates studio-quality product photography and creative moodboards at scale using fal.ai Nano Banana 2. Supports Weavy AI and Flora when API keys are provided.

## Script
`scripts/generate_visuals.py` — handles API calls, saves images, and builds an HTML gallery. Call it directly with a prompts JSON file. Run `--dry-run` first to preview prompts before spending API credits.

## Input Modes

### Mode 1 — Inspo Link or URL
User gives a URL (brand site, Pinterest, Instagram, etc.)

1. Fetch the page and extract visual cues: colors, lighting, composition, vibe
2. Build a session aesthetic config from what you find
3. Generate prompts based on extracted DNA
4. Run the script

### Mode 2 — User Uploads Images
User drops image files or gives local file paths

1. Analyze each image: background, lighting, color palette, composition style, mood
2. Lock those cues into the session config
3. Pass the image URLs to the script as `image_url` for image-to-image generation (strength 0.75)
4. Also generate text-only variants for diversity

### Mode 3 — Text Description Only
User describes the brand, product, or vibe

1. Ask: brand name, product, color palette, vibe/feel, number of shots, resolution
2. Build prompts from scratch
3. Run the script

---

## Session Config (fill at start of every session)

```json
{
  "brand": "",
  "product": "",
  "aesthetic": {
    "colors": [],
    "background": "",
    "lighting": "",
    "vibe": "",
    "composition": ""
  },
  "resolution": "2K",
  "shots": 10,
  "api": "fal.ai"
}
```

---

## Prompt Formula

Every prompt should follow this structure:

```
[Shot type] of [product description]. [Background]. [Lighting]. [Mood/vibe]. [Texture detail]. [Resolution]. [Style reference].
```

**Example:**
```
Professional top-down product shot of a matte black supplement bottle.
Seamless dark charcoal surface with subtle grain texture.
Soft directional studio lighting, single key light from upper left,
minimal shadow. Clean luxury supplement brand aesthetic.
Extreme detail on label texture and cap material. 8K resolution.
Editorial product photography.
```

---

## Shot Types to Cover Per Brand

Generate variety across:
- Hero shot (primary product angle)
- Top-down flat lay
- 45-degree studio angle
- Close-up texture/detail
- Lifestyle context (product in use or in environment)
- Bundle/group shot (multiple products together)
- Ingredient/component detail
- Brand story / editorial

---

## Running the Script

```bash
# Dry run first — check prompts before API spend
python scripts/generate_visuals.py \
  --brand rich-hair-city \
  --product "curl cream" \
  --prompts-file /tmp/prompts.json \
  --resolution 2K \
  --dry-run

# Full run
python scripts/generate_visuals.py \
  --brand rich-hair-city \
  --product "curl cream" \
  --prompts-file /tmp/prompts.json \
  --resolution 2K
```

Output goes to `brands/{brand}/outputs/` with an auto-built `gallery.html`.

---

## API Priority

| API | Use When |
|---|---|
| fal.ai Nano Banana 2 | Default — fastest, best product photography |
| Weavy AI | User provides API key + wants Weavy-specific models |
| Flora | User provides API key + wants Flora-specific aesthetic |

Always ask which API to use if the user mentions Weavy or Flora. Default to fal.ai.

---

## Approval Gate (Non-Negotiable)

Before running any API call, present the full prompt list and say:

> "Here are the [N] prompts I've built. Want me to run these or adjust anything first?"

Only generate after explicit approval. API credits are real money.

---

## After Generation

1. Open the gallery: `open brands/{brand}/outputs/gallery.html`
2. Show the user the output path
3. Ask: "Which shots do you want to keep, regenerate, or push to Remotion/Vanguard?"

---

## Connections to Other Skills

- **vanguard** — Feed approved images into Remotion as video composition layers
- **3d-motion** — Pass images to Kling for Z-axis animation
- **clip-engine** — Use generated visuals as B-roll in short-form clips
- **zatreides** — Moodboards feed directly into the 14-Day Sprint creative production pipeline
- **remotion** — Final assembly of image sequences into branded video
