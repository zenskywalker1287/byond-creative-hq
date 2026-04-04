#!/usr/bin/env python3
"""
Watch Skill — Gemini 1.5 Pro video analysis
Give it a URL or local file path. It watches the whole thing and reports back.
"""

import os
import sys
import subprocess
import tempfile
import shutil
from pathlib import Path
from dotenv import load_dotenv

# Load env
load_dotenv(Path.home() / "Downloads" / "RICH HAIR CITY" / ".env")
load_dotenv()

GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_KEY:
    print("ERROR: GEMINI_API_KEY not set in .env")
    sys.exit(1)

try:
    import google.generativeai as genai
except ImportError:
    print("Installing google-generativeai...")
    subprocess.run([sys.executable, "-m", "pip", "install", "--user", "google-generativeai"], check=True)
    import google.generativeai as genai

genai.configure(api_key=GEMINI_KEY)

def download_video(url: str, out_dir: Path) -> Path:
    """Download video using yt-dlp"""
    yt_dlp = None
    for candidate in [
        shutil.which("yt-dlp"),
        str(Path.home() / "Library/Python/3.9/bin/yt-dlp"),
    ]:
        if candidate and Path(candidate).exists():
            yt_dlp = candidate
            break

    if not yt_dlp:
        yt_dlp = f"{sys.executable} -m yt_dlp"

    out_path = out_dir / "video.mp4"
    cmd = f'{yt_dlp} -f "best[height<=720][ext=mp4]/best[height<=720]/best" -o "{out_path}" "{url}"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=300)

    if not out_path.exists():
        # Try without format filter
        cmd2 = f'{yt_dlp} -o "{out_path}" "{url}"'
        subprocess.run(cmd2, shell=True, capture_output=True, timeout=300)

    return out_path if out_path.exists() else None


def watch_video(source: str, prompt: str = None) -> str:
    """
    Watch a video and analyze it with Gemini 1.5 Pro.
    source: URL or local file path
    prompt: what to look for (optional)
    """
    model = genai.GenerativeModel("gemini-1.5-pro")

    default_prompt = """Watch this video completely and give me:

1. HOOK ANALYSIS — What happens in the first 5 seconds? Why does it work (or not)?
2. STRUCTURE — Break down the full video: opening, middle, CTA, close. Timestamps.
3. VISUALS — Describe the transitions, cuts, motion graphics, text overlays, color palette, lighting
4. PACING — Fast cuts? Slow burn? Where does energy peak?
5. COPY — Every spoken line and on-screen text, in order
6. WHAT WORKS — The 3 strongest moments and why
7. WHAT TO STEAL — Specific techniques worth repurposing

Be specific. Timestamps. Real observations. Not generic."""

    analysis_prompt = prompt or default_prompt

    is_url = source.startswith("http")

    if is_url:
        print(f"Downloading video from: {source}")
        tmp = Path(tempfile.mkdtemp(prefix="watch_"))
        video_path = download_video(source, tmp)

        if not video_path:
            print("Could not download video. Trying direct URL analysis...")
            # For YouTube, try with just the URL via File API
            response = model.generate_content([
                analysis_prompt,
                {"mime_type": "text/plain", "data": f"Video URL: {source}"}
            ])
            return response.text
    else:
        video_path = Path(source)
        if not video_path.exists():
            return f"ERROR: File not found: {source}"

    print(f"Uploading to Gemini... ({video_path.stat().st_size / 1024 / 1024:.1f} MB)")

    # Upload to Gemini File API
    video_file = genai.upload_file(str(video_path))

    print("Gemini is watching the video...")

    import time
    while video_file.state.name == "PROCESSING":
        time.sleep(3)
        video_file = genai.get_file(video_file.name)

    if video_file.state.name == "FAILED":
        return "ERROR: Gemini failed to process the video."

    print("Analysis in progress...\n")

    response = model.generate_content(
        [video_file, analysis_prompt],
        request_options={"timeout": 300}
    )

    # Cleanup
    try:
        genai.delete_file(video_file.name)
        if is_url:
            shutil.rmtree(tmp, ignore_errors=True)
    except:
        pass

    return response.text


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: watch-video.py <url-or-file-path> [optional: 'custom prompt']")
        sys.exit(1)

    source = sys.argv[1]
    custom_prompt = sys.argv[2] if len(sys.argv) > 2 else None

    result = watch_video(source, custom_prompt)
    print(result)
