#!/usr/bin/env python3
"""
Gemini Imagen 3 — fallback image generator when fal.ai credits run out
Usage: python3 gemini-image-gen.py --prompt "..." --output /path/to/save.jpg
"""

import os
import sys
import argparse
import requests
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

load_dotenv(Path.home() / "Downloads" / "RICH HAIR CITY" / ".env")
load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_KEY:
    print("ERROR: GEMINI_API_KEY not set in .env")
    sys.exit(1)

IMAGEN_URL = f"https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key={GEMINI_KEY}"


def generate_image(prompt: str, output_path: str = None, aspect_ratio: str = "1:1") -> str:
    """Generate image via Gemini Imagen 3"""

    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": aspect_ratio,  # "1:1", "16:9", "9:16", "4:3", "3:4"
            "safetyFilterLevel": "block_only_high",
            "personGeneration": "allow_adult",
        }
    }

    print(f"Generating via Gemini Imagen 3...")
    print(f"Prompt: {prompt[:80]}...")

    resp = requests.post(IMAGEN_URL, json=payload, timeout=120)

    if resp.status_code != 200:
        print(f"ERROR: {resp.status_code} — {resp.text}")
        return None

    data = resp.json()
    predictions = data.get("predictions", [])

    if not predictions:
        print("No image returned.")
        return None

    # Decode base64 image
    import base64
    img_b64 = predictions[0].get("bytesBase64Encoded")
    if not img_b64:
        print("No image data in response.")
        return None

    img_bytes = base64.b64decode(img_b64)

    if not output_path:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"/tmp/gemini_image_{timestamp}.jpg"

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    Path(output_path).write_bytes(img_bytes)

    print(f"Saved: {output_path}")
    return output_path


def generate_batch(prompts: list, out_dir: str, aspect_ratio: str = "1:1") -> list:
    """Generate multiple images"""
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    saved = []

    for i, prompt in enumerate(prompts, 1):
        print(f"\nShot {i}/{len(prompts)}")
        timestamp = datetime.now().strftime("%H%M%S")
        out_path = out_dir / f"shot-{i:02d}-{timestamp}.jpg"
        result = generate_image(prompt, str(out_path), aspect_ratio)
        if result:
            saved.append(result)

    print(f"\nDone. {len(saved)}/{len(prompts)} images saved to {out_dir}")
    return saved


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate images via Gemini Imagen 3")
    parser.add_argument("--prompt", help="Image prompt")
    parser.add_argument("--output", help="Output file path")
    parser.add_argument("--aspect", default="1:1", choices=["1:1", "16:9", "9:16", "4:3", "3:4"])
    parser.add_argument("--batch-file", help="JSON file with list of prompts")
    parser.add_argument("--out-dir", default="/tmp/gemini-images", help="Output directory for batch")
    args = parser.parse_args()

    if args.batch_file:
        import json
        prompts = json.loads(Path(args.batch_file).read_text())
        generate_batch(prompts, args.out_dir, args.aspect)
    elif args.prompt:
        generate_image(args.prompt, args.output, args.aspect)
    else:
        print("ERROR: provide --prompt or --batch-file")
        sys.exit(1)
