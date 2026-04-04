---
name: clip-engine
description: Short-form clip engine — uses Claude Opus to analyze long-form video, identify the best hooks and angles, then pipes timestamps into Remotion (or FFmpeg) to produce ready-to-post short-form clips for TikTok, Reels, and Shorts. Use when the user wants to clip a video, find the best moments, create short-form content, repurpose long-form video, or do anything like Opus Clip. Triggers on "clip this," "find the best moments," "turn this into shorts," "repurpose this video," "short form clips," or any request to cut a long video into clips.
---

# Clip Engine — Short-Form Video Production Skill

## What This Skill Does
Acts like Opus Clip but powered by Claude Opus + Remotion.

1. **Analyze** — Claude Opus watches the video (via frame extraction) and identifies the best hooks, angles, and moments
2. **Extract** — FFmpeg cuts the raw clips at the identified timestamps
3. **Produce** — Remotion adds captions, branding, and 9:16 formatting for TikTok / Reels / Shorts

---

## The Full Pipeline

```
Long-form video
    ↓
FFmpeg → Extract frames + audio transcript
    ↓
Claude Opus (Vision) → Analyze frames + transcript
    → Identify top hooks, peak energy moments, quotable lines
    → Output: timestamps + angle descriptions
    ↓
FFmpeg → Cut raw clips from timestamps
    ↓
Remotion → Add captions, branding, 9:16 crop, overlays
    ↓
Output: Short-form clips ready to post
```

---

## Step-by-Step Protocol

### Step 1 — Receive the Video
Ask:
> *"What's the video file path or URL? And what's the goal — virality, education, testimonials, highlights?"*

Store to: `/Volumes/MINI MK V/zatreides-assets/clips/[project-name]/source.mp4`

### Step 2 — Extract Frames + Transcript
```bash
# Extract 1 frame per second for Opus analysis
ffmpeg -i source.mp4 -vf fps=1 frames/frame_%04d.jpg

# Extract audio for transcription
ffmpeg -i source.mp4 -q:a 0 -map a audio.mp3
```
Then transcribe via Whisper API or AssemblyAI.

### Step 3 — Claude Opus Analysis
Send frames (sampled every 5–10 seconds) + full transcript to Claude Opus with this prompt:

```
You are a short-form video editor. Analyze these frames and transcript from a [X-minute] video.

Your job:
1. Find the 5–10 best moments for short-form clips (15–60 seconds each)
2. For each clip, identify:
   - Start timestamp (MM:SS)
   - End timestamp (MM:SS)
   - Hook (the first sentence that grabs attention)
   - Angle (why this moment works — energy, insight, story, controversy, etc.)
   - Platform fit (TikTok / Reels / Shorts)
3. Rank by virality potential

Output as JSON:
{
  "clips": [
    {
      "rank": 1,
      "start": "02:14",
      "end": "02:47",
      "hook": "Nobody tells you this about...",
      "angle": "Controversy / Pattern interrupt",
      "platform": "TikTok, Reels",
      "notes": "High energy, strong facial expression at 02:18"
    }
  ]
}
```

### Step 4 — Approval Gate
Present the clip list to Zen:
> *"Opus found [X] clips. Here they are ranked by virality potential. Which ones should I cut?"*

Only proceed after approval.

### Step 5 — Cut Clips with FFmpeg
```bash
# For each approved clip
ffmpeg -i source.mp4 -ss 02:14 -to 02:47 -c copy clips/clip_01_raw.mp4
```

### Step 6 — Remotion Production
Pass each raw clip into Remotion for:
- **9:16 crop** (vertical format)
- **Auto-captions** (burned-in subtitles synced to audio)
- **Hook overlay** (bold text card for first 2 seconds)
- **Brand watermark** (bottom corner)
- **Progress bar** (optional — increases watch time)

---

## Remotion Short-Form Template

```javascript
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { Video } from '@remotion/media-utils';

export const ShortFormClip = ({ clipPath, hook, captions, brandColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Hook text animates in for first 2 seconds
  const hookOpacity = interpolate(frame, [0, 10, fps * 2, fps * 2.5], [0, 1, 1, 0]);

  return (
    <div style={{ width: 1080, height: 1920, background: '#000', position: 'relative' }}>
      {/* 9:16 video layer */}
      <Video src={clipPath} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      {/* Hook overlay */}
      <div style={{
        position: 'absolute', top: 80, left: 40, right: 40,
        opacity: hookOpacity,
        fontSize: 52, fontWeight: 900, color: '#fff',
        textShadow: `0 0 20px ${brandColor}`,
        textAlign: 'center'
      }}>
        {hook}
      </div>

      {/* Captions */}
      <CaptionLayer captions={captions} frame={frame} fps={fps} />

      {/* Brand watermark */}
      <div style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0.7, fontSize: 18, color: '#fff' }}>
        @yourbrand
      </div>
    </div>
  );
};
```

---

## Angle Framework (What Opus Looks For)

| Angle | What It Is | Why It Works |
|---|---|---|
| **Pattern Interrupt** | Surprising statement or visual | Stops the scroll |
| **Hot Take** | Controversial or contrarian opinion | Triggers engagement |
| **Revelation** | "Nobody tells you this about X" | Creates curiosity gap |
| **Peak Energy** | Highest emotion/gesture moment | Feels alive on screen |
| **Quotable** | Single punchy sentence | Easy to share/save |
| **Story Arc** | Mini beginning-middle-end | Completion compulsion |
| **Proof** | Numbers, results, before/after | Builds trust fast |

---

## Storage Structure
```
/Volumes/MINI MK V/zatreides-assets/clips/
  [project-name]/
    source.mp4
    frames/
    transcript.txt
    opus_analysis.json
    raw_clips/
      clip_01_raw.mp4
      clip_02_raw.mp4
    final_clips/
      clip_01_final.mp4
      clip_02_final.mp4
```

---

## Claude API Call (Opus Vision)
```javascript
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';

const client = new Anthropic();

const analyzeVideo = async (framePaths, transcript) => {
  const imageContent = framePaths.map(path => ({
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/jpeg',
      data: readFileSync(path).toString('base64')
    }
  }));

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 4096,
    messages: [{
      role: 'user',
      content: [
        ...imageContent,
        {
          type: 'text',
          text: `Transcript:\n${transcript}\n\nFind the 5-10 best short-form clip moments. Output JSON with timestamps, hooks, angles, and virality ranking.`
        }
      ]
    }]
  });

  return JSON.parse(response.content[0].text);
};
```

---

## Dependencies
```bash
npm install @anthropic-ai/sdk
npx create-video@latest  # Remotion
brew install ffmpeg       # Frame extraction + cutting
pip install openai-whisper  # Transcription (optional)
```

---

## Integration With Zatreides Stack
- **Source footage** → stored on MINI MK V
- **Opus analysis** → uses Claude API skill for API calls
- **Remotion production** → follows Vanguard aesthetic if Zatreides-branded
- **Output** → ready for `apify-leads` outreach videos or client deliverables
