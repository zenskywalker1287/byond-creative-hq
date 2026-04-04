---
name: watch
description: Watch any video from a URL or file and analyze it with Gemini 1.5 Pro — the only AI that actually watches video natively. Use whenever the user gives a video URL and wants to analyze it, study ad creative, pull hooks, check pacing, understand transitions, do competitor research, or says anything like "watch this", "analyze this video", "what's in this", "pull hooks from", "break this down", "study this ad". Works with YouTube, Instagram, TikTok, Twitter/X, Vimeo, and any downloadable video.
---

# Watch Skill — Gemini Video Analysis

## What This Does
Sends any video to Gemini 1.5 Pro which **actually watches it** — not just frames, but full temporal video understanding including motion, transitions, timing, pacing, cuts, and on-screen text.

## How to Run

```bash
python3 ~/.claude/skills/watch/scripts/watch-video.py "https://youtube.com/watch?v=..."
```

With a custom question:
```bash
python3 ~/.claude/skills/watch/scripts/watch-video.py "https://..." "What hooks does this ad use and why do they work?"
```

Local file:
```bash
python3 ~/.claude/skills/watch/scripts/watch-video.py "/path/to/video.mp4"
```

## Default Analysis Output
1. Hook analysis — first 5 seconds
2. Full structure with timestamps
3. Visuals — transitions, cuts, graphics, color, lighting
4. Pacing — energy peaks and valleys
5. Copy — every spoken line and on-screen text
6. What works — 3 strongest moments
7. What to steal — techniques worth repurposing

## Workflow
1. User gives URL or file
2. Say: "Pulling the video now — Gemini's going to watch the whole thing."
3. Run the script
4. Read output and respond with what they asked for
5. If they want clips → pipe findings into clip-engine skill

## Requirements
- `GEMINI_API_KEY` in .env ✅
- `google-generativeai` Python package
- `yt-dlp` for URL downloads (installed)
- Works on YouTube, Instagram, TikTok, Twitter/X, Vimeo, direct mp4 URLs

## Limits
- Max video length: ~1 hour (Gemini 1.5 Pro)
- File size: up to 2GB via File API
- Private/DRM videos: may not download — ask for local file instead
