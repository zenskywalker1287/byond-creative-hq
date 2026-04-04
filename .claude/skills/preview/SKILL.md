---
name: preview
description: Always use this skill when the user wants to preview, view, or open a website or web app they are building. Use it when the user says "show me the site", "open it", "preview it", "pull it up", "let me see it", or any time they want to look at their project in a browser. Never take static screenshots — always open localhost in the browser. Automatically detects and starts the dev server if it's not already running.
---

# Preview — Live Localhost

Always open the project in the browser via localhost. Never take static screenshots as a substitute.

## How to preview

1. **Detect the framework and port:**
   - Vite (React, Vue, Svelte) → port `5173`
   - Create React App → port `3000`
   - Next.js → port `3000`
   - Astro → port `4321`
   - SvelteKit → port `5173`
   - If unsure, check `package.json` scripts for the dev command

2. **Check if the server is already running:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:<PORT>
   ```
   - If it returns `200` → server is up, skip to step 3
   - If it returns `000` → start the server first

3. **Start the dev server if needed:**
   ```bash
   cd <project-dir> && npm run dev > /tmp/dev-server.log 2>&1 &
   sleep 4
   ```

4. **Open in the browser:**
   ```bash
   open http://localhost:<PORT>
   ```

5. **Confirm to the user** — tell them the URL it opened at.

## Important rules

- **Always use `open` to launch the browser** — never show a screenshot as the primary preview
- If the server fails to start, check `/tmp/dev-server.log` for errors and fix them
- Keep the dev server running in the background for the rest of the session
- If the port is already in use by a different process, use `lsof -i :<PORT>` to investigate
