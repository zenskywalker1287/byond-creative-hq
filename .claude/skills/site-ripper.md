# Site Ripper Skill

You are executing the **site-ripper** skill. Read every step carefully and follow them in order. Do not skip steps.

## What This Does

Takes a target website URL + a brand book/aesthetic, then rebuilds the site 1:1 in structure and layout but with the new brand applied throughout. All images are AI-generated via fal.ai to match the provided aesthetic. Output is a fully self-contained deployable site.

---

## Step 0: Collect Inputs

Before doing anything else, ask the user for anything not yet provided:

| Input | Required | Default |
|-------|----------|---------|
| `TARGET_URL` | Yes | — |
| `BRAND_AESTHETIC` | Yes | — |
| `FAL_API_KEY` | Yes | — |
| `BRAND_NAME` | No | "Brand" |
| `BRAND_COLORS` | No | Extract from aesthetic description |
| `OUTPUT_DIR` | No | `./ripped/<domain-name>/` |

The brand aesthetic can be: a paragraph description, a list of adjectives, reference sites/moods, color palettes, font vibes, or an uploaded mood board description. Accept anything the user gives you.

---

## Step 1: Analyze the Target Site

Use WebFetch on `TARGET_URL`. Extract and document:

### Layout Map
- How many sections/blocks on the page (top to bottom)
- Section types: hero, nav, feature grid, testimonials, pricing, CTA, footer, etc.
- Column layout of each section (full-width, 2-col, 3-col, asymmetric, etc.)
- Approximate padding/spacing density (tight / medium / airy)

### Visual Tokens
- Approximate color palette (background, primary, accent, text)
- Typography feel (serif/sans, bold/light, large/small headings)
- Border style (sharp / soft / rounded)
- Overall aesthetic (minimal, loud, luxury, techy, organic, etc.)

### Content Inventory
- Number of images and their role: hero bg, product shot, avatar/testimonial, icon, background texture, etc.
- Approximate aspect ratio of each image slot
- Headline copy style (punchy short / descriptive long / question-based)
- Social proof elements (logos, star ratings, testimonial cards, stats)

### Interactions
- Scroll animations? (fade in, slide up, parallax)
- Hover effects on cards/buttons
- Sticky nav?
- Any sliders/carousels?

Write a clean summary of your analysis before proceeding.

---

## Step 2: Build Image Generation Plan

For each image slot identified, create a generation job with:

```
Job N:
  Role: [hero bg / product / avatar / texture / etc.]
  Aspect ratio: [landscape_4_3 / square_hd / portrait_4_3 / landscape_16_9]
  Prompt: "[specific image content], [brand aesthetic keywords], [style modifiers]"
  Filename: image-N-[role].png
```

**Prompt construction rules:**
1. Start with what the image actually depicts (pulled from original site context)
2. Add the brand aesthetic from user input
3. End with quality modifiers appropriate to the image type

**Example prompts:**
- Hero: `"expansive ocean vista at golden hour, dark luxury aesthetic, deep navy and gold tones, cinematic wide shot, premium lifestyle photography"`
- Product: `"minimalist supplement bottle on marble surface, clinical clean aesthetic, soft shadows, stark white background, e-commerce product photography"`
- Avatar: `"professional headshot of diverse person smiling, warm natural light, neutral background, editorial portrait photography"`
- Texture/BG: `"abstract dark gradient texture, subtle grain, moody atmospheric, no faces or text"`

---

## Step 3: Generate Images with fal.ai

For each job, run this curl command via Bash:

```bash
# Generate image
RESPONSE=$(curl -s -X POST "https://fal.run/fal-ai/flux/schnell" \
  -H "Authorization: Key $FAL_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{
    \"prompt\": \"PROMPT_HERE\",
    \"image_size\": \"ASPECT_RATIO_HERE\",
    \"num_inference_steps\": 4,
    \"num_images\": 1
  }")

# Extract image URL from response
IMAGE_URL=$(echo $RESPONSE | python3 -c "import sys,json; print(json.load(sys.stdin)['images'][0]['url'])")

# Download the image
curl -s "$IMAGE_URL" -o "$OUTPUT_DIR/images/FILENAME_HERE"
```

Use `fal-ai/flux/schnell` for speed. If the user wants higher quality, use `fal-ai/flux-pro` (costs more).

Available aspect ratios: `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9`

If a generation fails, retry once with a simplified prompt. Log which images succeeded.

---

## Step 4: Build the Site

Create a single `index.html` file at `$OUTPUT_DIR/index.html` that is fully self-contained (CSS in `<style>` tags, JS in `<script>` tags). Use the following structure:

### HTML Architecture

```
<html>
  <head> — meta, title, Google Fonts link, CSS variables </head>
  <body>
    <nav> — sticky navigation matching original layout </nav>
    [sections in the same order as original]
    <footer>
  </body>
</html>
```

### CSS Rules

- Define all brand colors as CSS custom properties at `:root`
- Use the brand color palette derived from user's aesthetic description
- Match the original site's spacing density
- Replicate border-radius, shadow, and border styles
- Fonts: pick from Google Fonts that match the aesthetic vibe

### Content Rules

- Replace all original brand copy with new copy in the same style/length
- Use `BRAND_NAME` wherever the brand name appears
- Headlines should match the original's tone and length
- Keep all structural text (nav items, section labels, button text) generic but fitting
- Stats/numbers: use realistic-looking placeholder numbers

### Animations

Replicate the original's animation style using CSS + vanilla JS (IntersectionObserver for scroll reveals, CSS transitions for hovers). Do NOT import external animation libraries.

```javascript
// Scroll reveal pattern
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => el.isIntersecting && el.target.classList.add('visible'));
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Image References

Reference all generated images with relative paths: `./images/image-1-hero.png`

---

## Step 5: Quality Check

Before finishing, verify:

- [ ] Every section from the original is present in the rebuild
- [ ] All image slots have a generated image (or a placeholder if generation failed)
- [ ] Colors feel cohesive and match brand aesthetic
- [ ] The page renders correctly as a standalone HTML file (no broken imports)
- [ ] Fonts loaded via Google Fonts link in `<head>`
- [ ] Nav links scroll to sections (use `href="#section-id"`)
- [ ] Mobile responsive (use flexbox/grid with `flex-wrap` and media queries)

---

## Step 6: Deliver

Tell the user:
1. Where the output is (`$OUTPUT_DIR/index.html`)
2. Which images were generated successfully
3. Any sections that had to be approximated
4. How to open it: `open $OUTPUT_DIR/index.html` or drag into browser

Offer to iterate on:
- Regenerating specific images with different prompts
- Tweaking colors or fonts
- Adding/removing sections
- Adjusting copy tone

---

## Error Handling

| Problem | Fix |
|---------|-----|
| fal.ai returns 401 | Ask user to verify their API key |
| fal.ai returns 422 | Prompt was flagged — simplify/rephrase it |
| Site fetch fails | Try fetching with a different URL format (add/remove www, https) |
| Image download fails | Use the fal.ai URL directly in the `<img src>` as fallback |
| Site too complex to parse | Focus on the above-the-fold hero section first, then add sections one by one |

---

## fal.ai Model Reference

| Model | Use case | Speed |
|-------|----------|-------|
| `fal-ai/flux/schnell` | Default, good quality | Fast (~3s) |
| `fal-ai/flux-pro` | High quality, photorealistic | Slower (~15s) |
| `fal-ai/flux-realism` | Hyper-realistic photos | Medium |
| `fal-ai/stable-diffusion-v3-medium` | Artistic/stylized | Medium |

Use schnell unless the user specifically asks for higher quality.
