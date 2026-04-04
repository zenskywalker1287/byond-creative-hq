---
name: 3d-motion
description: 3D Spatial Motion skill — adds depth, parallax, Z-axis animation, and immersive 3D effects to websites and videos. Use when the user wants objects flying toward the screen, camera orbits, parallax layers, CSS 3D transforms, Three.js scenes, or Kling Z-axis animation. Also use when the user mentions depth, spatial motion, parallax, fly-through, 3D website, or immersive motion. Always asks for the project aesthetic before touching any tool.
---

# 3D Spatial Motion — Know Me Skill
## Universal Protocol | Adaptive to Any Project Aesthetic

## What This Skill Does
3D Spatial Motion makes websites and videos feel like they have depth — objects flying toward the screen, cameras orbiting through environments, immersive parallax layers. This skill is **aesthetic-agnostic** — it adapts to whatever visual language the active project demands.

**At the start of every session, ask for the aesthetic before touching any tool.**

---

## The Opening Protocol (Every Session)

Always ask first:
> *"What project are we working on, and what kind of images do you want generated? Give me the aesthetic — colors, vibe, lighting, and feel — so I can lock in the visual DNA before we start."*

Never assume an aesthetic. Never default to a previous project. Wait for input, lock the style into the session config, then proceed.

---

## The Full Tech Stack

| Role | Tool | Function |
|---|---|---|
| **Base Image** | Fal.ai (Nano Banana) | Generate 3D-styled base image with depth map |
| **Z-Axis Animation** | Kling API | Turn image into 3D video clip — camera flying through scene |
| **Video Integration** | Remotion Three (Three.js) | Overlay 3D clips into video timeline with synced text/motion |
| **Website Integration** | CSS 3D Transforms + Parallax | Live depth on web — elements floating on separate Z-layers |
| **Complex 3D Scenes** | Three.js (via Remotion) | Full 3D geometry, lighting, and camera rigs in code |

---

## The Session Config (Filled Per Project)

```json
{
  "project": "[PROJECT NAME]",
  "aesthetic": {
    "colors": ["[PRIMARY]", "[SECONDARY]", "[ACCENT]"],
    "vibe": "[DESCRIBE THE FEEL]",
    "typography": "[FONT STYLE]",
    "lighting": "[LIGHTING STYLE]"
  },
  "asset_pipeline": {
    "gen_path": "Fal.ai (Nano Banana) -> Kling (animations) -> Remotion",
    "storage": "[PROJECT STORAGE PATH]"
  }
}
```

---

## The 3D Production Loop

### Step 1 — Aesthetic Brief
Ask: *"What project are we working on and what kind of images do you want generated?"*
Lock in the session config based on response.

### Step 2 — Identify Output Type
Video (Remotion) or Website (CSS/Three.js) or both.

### Step 3 — Generate Base Image
Run Fal.ai (Nano Banana) with a prompt built from the session aesthetic.
Always request a depth map alongside the base image for parallax splitting.

### Step 4 — Approval Gate (Non-Negotiable)
**Before hitting the Kling API — STOP.**

Present the full Kling prompt and say:
> *"Hey Zen, here is the Kling prompt I've designed. Is this what you want?"*

Only execute after explicit approval. Prompts cost API credits — get it right first.

### Step 5 — Kling Animation
Run the Kling API. Camera move style: Dolly zoom / Orbit / Flying POV — chosen based on brief.

### Step 6 — Assembly
- **Video:** Use Remotion Three (Three.js) — sync text and overlay motion to clip
- **Website:** Write CSS 3D Transforms with Parallax layers

---

## Website 3D Implementation (CSS Layer)

### Parallax Structure
```css
.scene {
  transform-style: preserve-3d;
  perspective: 1000px;
}

.layer-background {     /* Glow / atmospheric elements */
  transform: translateZ(-200px) scale(1.2);
}

.layer-midground {      /* Secondary elements */
  transform: translateZ(-100px) scale(1.1);
}

.layer-foreground {     /* Primary text / UI */
  transform: translateZ(0px);
}

.layer-floating {       /* Accent / overlay elements */
  transform: translateZ(50px);
}
```

**PARALLAX RULE:** On all website builds, background elements always float on a negative Z-layer behind primary text.

### Chromatic Aberration (add when aesthetic calls for it)
```css
.glitch-text {
  text-shadow:
    2px 0 var(--accent-color),
    -2px 0 var(--secondary-color);
  animation: chromatic 0.1s infinite alternate;
}
```

---

## Remotion Three.js Base Template

```javascript
import { ThreeCanvas } from "@remotion/three";
import { useCurrentFrame, useVideoConfig } from "remotion";

export const Scene3D = ({ primaryColor, secondaryColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const angle = (frame / fps) * Math.PI * 0.5;
  const camX = Math.sin(angle) * 5;
  const camZ = Math.cos(angle) * 5;

  return (
    <ThreeCanvas>
      <pointLight color={primaryColor} intensity={2} position={[0, 2, 0]} />
      <ambientLight intensity={0.1} />
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={secondaryColor}
          emissive={primaryColor}
          emissiveIntensity={0.5}
        />
      </mesh>
    </ThreeCanvas>
  );
};
```

Colors, geometry, and camera behavior are passed as props — set by the session aesthetic config.

---

## Pro Tips

- **Always ask first** — aesthetic input before any tool is touched
- **Parallax on every web build** — background elements always behind text on negative Z
- **Kling approval gate is mandatory** — prompts cost API credits, get it right first
- **Depth map from Fal.ai** — always request alongside base image for proper parallax splitting
- **Motion blur threshold** — under 1 second: add blur. Over 1 second: let it breathe
- **Self-updating config** — when something works perfectly, lock it into the session config immediately

---

## Stack Connection
```
SESSION CONFIG (filled per project)   →  Aesthetic lock for this session
VANGUARD SKILL                        →  Timeline + sequence assembly
3D MOTION SKILL (this file)           →  Depth, spatial motion, parallax
```
