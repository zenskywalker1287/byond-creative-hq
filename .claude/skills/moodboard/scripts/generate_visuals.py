#!/usr/bin/env python3
"""
Product Visual Generator
Uses fal.ai Nano Banana 2 to generate studio-quality product photography
Called by Claude Code as part of the product visual workflow
"""

import os
import sys
import json
import argparse
import requests
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

# Load env
load_dotenv()
FAL_KEY = os.getenv("FAL_KEY")

if not FAL_KEY:
    print("ERROR: FAL_KEY not found in .env file")
    sys.exit(1)

FAL_API_URL = "https://fal.run/fal-ai/nano-banana-2"

RESOLUTION_MAP = {
    "1K": {"width": 1024, "height": 1024},
    "2K": {"width": 2048, "height": 2048},
    "4K": {"width": 4096, "height": 4096},
}


def load_brand_profile(brand: str) -> dict:
    profile_path = Path(f"brands/{brand}/brand-profile.md")
    if not profile_path.exists():
        print(f"WARNING: No brand profile found at {profile_path}")
        return {}
    return {"content": profile_path.read_text()}


def load_style_brief(brand: str) -> str:
    brief_path = Path(f"brands/{brand}/style-brief.md")
    if not brief_path.exists():
        print(f"WARNING: No style brief found at {brief_path}")
        return ""
    return brief_path.read_text()


def generate_image(prompt: str, resolution: str = "2K", image_url: str = None) -> dict:
    """Call fal.ai Nano Banana 2 to generate an image"""
    size = RESOLUTION_MAP.get(resolution, RESOLUTION_MAP["2K"])

    headers = {
        "Authorization": f"Key {FAL_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "prompt": prompt,
        "image_size": {"width": size["width"], "height": size["height"]},
        "num_inference_steps": 28,
        "guidance_scale": 3.5,
        "num_images": 1,
        "enable_safety_checker": False,
    }

    # If reference image provided use image-to-image
    if image_url:
        payload["image_url"] = image_url
        payload["strength"] = 0.75

    resp = requests.post(FAL_API_URL, headers=headers, json=payload, timeout=120)

    if resp.status_code != 200:
        print(f"ERROR from fal.ai: {resp.status_code} — {resp.text}")
        return {}

    return resp.json()


def save_image(image_data: dict, output_dir: Path, shot_num: int) -> Path:
    """Download and save image from fal.ai response"""
    images = image_data.get("images", [])
    if not images:
        print(f"No images returned for shot {shot_num}")
        return None

    img_url = images[0].get("url")
    if not img_url:
        return None

    img_resp = requests.get(img_url, timeout=60)
    timestamp = datetime.now().strftime("%H%M%S")
    filename = output_dir / f"shot-{shot_num:02d}-{timestamp}.jpg"
    filename.write_bytes(img_resp.content)
    print(f"  Saved: {filename}")
    return filename


def build_gallery(output_dir: Path, brand: str, prompts: list, saved_files: list):
    """Build an HTML gallery page for easy browsing"""
    images_html = ""
    for i, (f, p) in enumerate(zip(saved_files, prompts)):
        if f:
            rel = f.name
            images_html += f"""
            <div class="shot">
                <img src="{rel}" alt="Shot {i+1}" loading="lazy">
                <div class="prompt">
                    <strong>Shot {i+1}</strong>
                    <p>{p}</p>
                </div>
            </div>"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{brand} — Product Visuals</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{ background: #0a0a0a; color: #fff; font-family: -apple-system, sans-serif; padding: 2rem; }}
  h1 {{ font-size: 1.5rem; margin-bottom: 2rem; color: #fff; letter-spacing: 0.1em; text-transform: uppercase; }}
  .grid {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 2rem; }}
  .shot img {{ width: 100%; display: block; border-radius: 4px; }}
  .prompt {{ padding: 0.75rem 0; font-size: 0.8rem; color: #888; line-height: 1.5; }}
  .prompt strong {{ color: #fff; display: block; margin-bottom: 0.25rem; }}
</style>
</head>
<body>
<h1>{brand} — Generated Visuals</h1>
<div class="grid">{images_html}</div>
</body>
</html>"""

    gallery_path = output_dir / "gallery.html"
    gallery_path.write_text(html)
    print(f"\nGallery built: {gallery_path}")


def log_prompts(output_dir: Path, prompts: list):
    """Save a record of all prompts used"""
    log_path = output_dir / "prompts-used.md"
    content = f"# Prompts Used\nGenerated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n"
    for i, p in enumerate(prompts, 1):
        content += f"## Shot {i}\n{p}\n\n"
    log_path.write_text(content)


def run(brand: str, product: str, prompts: list, resolution: str = "2K",
        dry_run: bool = False, start_shot: int = 1, end_shot: int = None):

    output_dir = Path(f"brands/{brand}/outputs")
    output_dir.mkdir(parents=True, exist_ok=True)

    if end_shot:
        prompts = prompts[start_shot - 1:end_shot]
    else:
        prompts = prompts[start_shot - 1:]

    print(f"\nBrand: {brand}")
    print(f"Product: {product}")
    print(f"Shots: {len(prompts)}")
    print(f"Resolution: {resolution}")
    print(f"Dry run: {dry_run}\n")

    log_prompts(output_dir, prompts)

    if dry_run:
        print("DRY RUN — prompts written, no images generated")
        print("\nPrompts:")
        for i, p in enumerate(prompts, 1):
            print(f"\nShot {i}: {p}")
        return

    saved = []
    for i, prompt in enumerate(prompts, start_shot):
        print(f"Generating shot {i}/{len(prompts) + start_shot - 1}...")
        print(f"  Prompt: {prompt[:80]}...")
        result = generate_image(prompt, resolution)
        saved_path = save_image(result, output_dir, i)
        saved.append(saved_path)

    build_gallery(output_dir, brand, prompts, saved)
    print(f"\nDone. {len([s for s in saved if s])} images saved to {output_dir}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate product visuals via fal.ai")
    parser.add_argument("--brand", required=True, help="Brand folder name")
    parser.add_argument("--product", required=True, help="Product name")
    parser.add_argument("--shots", type=int, default=4, help="Number of shots")
    parser.add_argument("--resolution", default="2K", choices=["1K", "2K", "4K"])
    parser.add_argument("--dry-run", action="store_true", help="Write prompts only, no API calls")
    parser.add_argument("--shot-start", type=int, default=1)
    parser.add_argument("--shot-end", type=int, default=None)
    parser.add_argument("--prompts-file", help="JSON file with prompts array")
    args = parser.parse_args()

    if args.prompts_file:
        prompts = json.loads(Path(args.prompts_file).read_text())
    else:
        print("ERROR: --prompts-file required when calling directly")
        print("This script is normally called by Claude Code with prompts injected")
        sys.exit(1)

    run(
        brand=args.brand,
        product=args.product,
        prompts=prompts,
        resolution=args.resolution,
        dry_run=args.dry_run,
        start_shot=args.shot_start,
        end_shot=args.shot_end,
    )
