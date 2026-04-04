#!/usr/bin/env python3
"""
Rich Hair City — Image Generator
Uses fal.ai Nano Banana Pro 2
Run: python3 scripts/generate-rhc-images.py --dry-run
     python3 scripts/generate-rhc-images.py
"""

import os, sys, json, requests
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
FAL_KEY = os.getenv("FAL_KEY")
if not FAL_KEY:
    print("ERROR: FAL_KEY not found in .env")
    sys.exit(1)

FAL_API_URL = "https://fal.run/fal-ai/nano-banana-pro"
OUT_DIR = Path("public/images/generated")
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS = [
    {
        "file": "rhc-model-body-wave.jpg",
        "label": "Hero model — body wave",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4 lens, beautiful Black woman with long silky Brazilian body wave hair extensions flowing past shoulders, blush rose seamless studio background, natural skin texture visible pores no retouching, soft directional studio lighting subtle rim light from behind, confident relaxed pose, minimal white satin top, photorealistic luxury hair brand campaign photography 2024, shallow depth of field"
    },
    {
        "file": "rhc-model-kinky-curly.jpg",
        "label": "Model — kinky curly",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman with voluminous kinky curly hair extensions big and bouncy, dusty rose pink seamless studio background, real skin pores and texture clearly visible, soft-box studio lighting key light from upper left, side profile turning toward camera natural confident expression, black sleeveless ribbed top, photorealistic beauty photography editorial quality luxury hair brand"
    },
    {
        "file": "rhc-model-straight.jpg",
        "label": "Model — straight bundles",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman with sleek straight Brazilian hair extensions pin-straight glossy black, soft mauve pink seamless studio background, realistic skin pores visible no smoothing, overhead key light slight fill from right, three-quarter body pose, looking down slightly at camera, luxury hair campaign photography high fashion editorial 2024"
    },
    {
        "file": "rhc-model-blonde-613.jpg",
        "label": "Model — blonde 613 frontal",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman wearing honey blonde 613 lace frontal wig hair flowing, rose gold studio background, natural skin pores realistic skin texture warm undertones, soft studio lighting with slight warm fill, front facing looking directly into camera, gold statement earrings, luxury hair brand campaign photography high fashion"
    },
    {
        "file": "rhc-model-holding-bundle.jpg",
        "label": "Model holding bundle (lifestyle)",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 50mm f2.0, beautiful Black woman with natural hair holding up a Brazilian body wave hair bundle showing the texture between her fingers, blush pink seamless paper background, realistic skin natural glow no retouching, warm soft box lighting, playful confident expression, lifestyle hair brand photography, natural pores visible"
    },
    {
        "file": "rhc-model-editorial-back.jpg",
        "label": "Editorial — back shot deep wave",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman photographed from behind showing long deep wave hair extensions cascading down her back, soft rose pink seamless studio background, visible skin texture on neck and shoulders, dramatic rim lighting outlining hair silhouette, luxury editorial hair brand campaign photography 2024, photorealistic"
    },
    {
        "file": "rhc-flatlay-black-bundles.jpg",
        "label": "Flat lay — black bundles",
        "prompt": "Professional studio flat lay photograph overhead DSLR shot, three natural black Brazilian hair bundles arranged artfully on a blush pink surface one straight one body wave one deep wave, soft directional studio lighting subtle shadows, extreme hair texture detail individual strands visible, scattered pink dried rose petals minimal styling, luxury hair product photography editorial e-commerce"
    },
    {
        "file": "rhc-flatlay-blonde-bundles.jpg",
        "label": "Flat lay — blonde 613 bundles",
        "prompt": "Professional studio flat lay photograph overhead DSLR shot, golden honey blonde 613 hair bundles and lace frontal arranged on dusty rose pink surface, soft studio lighting extreme detail on hair color sheen and texture, small gold ring and chain props scattered, luxury hair e-commerce product photography editorial"
    },
    {
        "file": "rhc-closeup-texture.jpg",
        "label": "Close-up texture detail",
        "prompt": "Extreme close-up DSLR photograph 100mm macro lens, close-up detail of Brazilian body wave hair bundle, individual strands clearly visible with natural wave pattern and deep lustre, soft pink background out of focus, directional lighting showing hair texture and natural sheen, luxury hair product photography magazine quality"
    },
    {
        "file": "rhc-bundle-hero-group.jpg",
        "label": "Bundle group hero",
        "prompt": "Professional DSLR product photography, five different hair bundles arranged together on soft pink marble surface — straight, body wave, deep wave, kinky curly, blonde 613 — soft warm studio lighting golden glow, each bundle showing distinct texture and sheen, luxury hair brand hero image, overhead slight angle, editorial product photography"
    },
    {
        "file": "rhc-model-deep-wave.jpg",
        "label": "Model — deep wave",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman with bouncy deep wave hair extensions, warm rose studio background, natural realistic skin with pores visible no digital smoothing, sitting pose one hand gently running through hair, confident sensual energy, soft box main light gentle rim light, luxury hair brand campaign photography photorealistic 2024"
    },
    {
        "file": "rhc-model-raw-straight.jpg",
        "label": "Model — raw kinky straight",
        "prompt": "DSLR photograph Canon EOS 5D Mark IV 85mm f1.4, beautiful Black woman with raw kinky straight hair extensions natural texture slight movement, light mauve studio background, real skin texture visible pores no retouching, dramatic side lighting sculpting her face and hair, three-quarter profile confident gaze, luxury editorial hair brand photography"
    },
]

def generate(shot: dict, dry_run: bool = False) -> bool:
    if dry_run:
        print(f"  [{shot['label']}] → {shot['file']}")
        print(f"  {shot['prompt'][:100]}...\n")
        return True

    print(f"Generating: {shot['label']}...")
    res = requests.post(
        FAL_API_URL,
        headers={"Authorization": f"Key {FAL_KEY}", "Content-Type": "application/json"},
        json={
            "prompt": shot["prompt"],
            "image_size": {"width": 1536, "height": 1536},
            "num_inference_steps": 30,
            "guidance_scale": 4.0,
            "num_images": 1,
        },
        timeout=120
    )

    if res.status_code != 200:
        print(f"  ERROR {res.status_code}: {res.text}")
        return False

    data = res.json()
    images = data.get("images", [])
    if not images:
        print(f"  No images returned: {data}")
        return False

    img_url = images[0].get("url")
    img_res = requests.get(img_url, timeout=60)
    out_path = OUT_DIR / shot["file"]
    out_path.write_bytes(img_res.content)
    print(f"  Saved → {out_path}")
    return True

if __name__ == "__main__":
    dry_run = "--dry-run" in sys.argv
    single = next((a.split("=")[1] for a in sys.argv if a.startswith("--shot=")), None)

    shots = PROMPTS
    if single:
        shots = [p for p in PROMPTS if p["file"] == single or str(PROMPTS.index(p) + 1) == single]

    print(f"\nRich Hair City — fal.ai Nano Banana Pro")
    print(f"Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"Shots: {len(shots)}\n")

    for shot in shots:
        generate(shot, dry_run=dry_run)

    if not dry_run:
        print(f"\nDone. Images saved to {OUT_DIR}")
        print(f"Gallery: open {OUT_DIR}/gallery.html")
