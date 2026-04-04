---
name: lovable-deploy
description: Deploy any Claude Code site to Lovable for client handoff, live preview, and easy visual editing. Use this skill whenever the user wants to send a client a live site, hand off a project, get a shareable URL, move a site to Lovable, or says anything like "deploy this", "get it live", "send the client a link", "push to Lovable", or "hand off the site". Always use this skill — do not just push to GitHub manually.
---

# Lovable Deploy Skill

## What This Does
Takes any site built in Claude Code and gets it live on Lovable so:
- Client gets a real live URL (not localhost)
- Client can make their own edits in Lovable's visual editor
- You can make quick edits in Lovable without reopening Claude Code
- It doesn't look like Lovable built it — it looks like a custom professional site

---

## The Full Workflow

### Step 1 — Push to GitHub
Make sure the project is committed and pushed:

```bash
git add .
git commit -m "Ready for client deploy"
git push origin main
```

If no remote is set:
```bash
git remote add origin https://github.com/YOURUSERNAME/REPONAME
git push -u origin main
```

### Step 2 — Import into Lovable
1. Go to **lovable.dev**
2. Click **New Project → Import from GitHub**
3. Select the repo
4. Lovable imports the code and deploys it automatically
5. You get a live URL: `yourproject.lovable.app`

### Step 3 — Connect Custom Domain (Optional but recommended for clients)
1. In Lovable → **Settings → Custom Domain**
2. Add the client's domain
3. Update DNS records as instructed
4. URL becomes `clientbrand.com` — no trace of Lovable

### Step 4 — Remove "Built with Lovable" Badge
- Free tier shows badge
- **$25/month** plan removes it completely
- Always recommend paid plan for client handoffs

### Step 5 — Hand Off to Client
Send this message template:

---
*"Your site is live at [URL]. You can log into Lovable at lovable.dev to make any edits yourself — change text, colors, sections — no coding needed. Just describe what you want to change and it updates instantly."*

---

## White-Label Rules
- Use a **custom domain** — never send client a `lovable.app` URL
- Remove the badge (paid plan)
- The code is clean React/Vite — nothing in it says Lovable
- Tell clients: "We built it custom, Lovable is just the hosting and editing platform"

## Quick Edit Flow (For You)
When you need a fast tweak after handoff:
1. Open Lovable → find the project
2. Describe the change in chat (e.g. "change the hero headline to X")
3. Lovable updates live — no Claude Code needed for small edits
4. For complex changes (logic, APIs, new features) → come back to Claude Code

## When to Use Claude Code vs Lovable

| Task | Use |
|---|---|
| New features, APIs, complex logic | Claude Code |
| Copy changes, color tweaks, layout shifts | Lovable |
| Image swaps, section reorders | Lovable |
| New integrations, scripts, data | Claude Code |
| Client's own edits after handoff | Lovable |

## Stack Compatibility
Lovable works best with:
- **Vite + React + TypeScript** ✅ (your default stack)
- Tailwind CSS ✅
- shadcn/ui ✅
- Simple REST API calls ✅

Lovable does NOT support:
- Node.js backend/server code
- Complex build pipelines
- Native FFmpeg/Python scripts

Keep backend logic in separate services — Lovable is frontend only.
