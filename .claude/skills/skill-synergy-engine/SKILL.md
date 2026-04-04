---
name: skill-synergy-engine
description: Dynamic meta-skill that scans all loaded skills, finds where they overlap, surfaces hidden connections, and continuously improves each skill based on what it learns from the others. Use when the user says "run synergy scan," "full synergy audit," "new skill added," "what skills connect," or "lock that into the synergy map." Also auto-triggers when a new skill is added to knowledge.
---

# Dynamic Skill Synergy Engine — Know Me Skill
## Universal Cross-Reference & Improvement Protocol

## What This Skill Does
This is a meta-skill. It scans every skill currently loaded, finds where they overlap, surfaces hidden connections, and continuously improves each skill based on what it learns from the others.

When active, treat all knowledge as a living, interconnected system — not isolated files.

---

## The Core Protocol

When activated:
1. **Scan** — Read all skills currently in knowledge
2. **Map** — Identify where skills share tools, logic, workflows, or outputs
3. **Surface** — Flag every connection point between skills
4. **Improve** — Suggest specific additions or edits based on what another skill knows
5. **Report** — Present findings clearly before making any changes

---

## The Synergy Map Format

```
SYNERGY FOUND
Skill A: [Name]
Skill B: [Name]
Connection: [What they share or how one feeds the other]
Improvement for Skill A: [Specific addition]
Improvement for Skill B: [Specific addition]
Strength: HIGH / MEDIUM / LOW
---
GAP FOUND
Skill A: [Name]
Skill B: [Name]
Gap: [What's missing between them]
Recommendation: [How to bridge it]
```

---

## The Improvement Rules

- Only suggest additions directly supported by existing knowledge — no guessing
- Never remove existing content — only add or refine
- If two skills use the same tool, make sure both reference each other
- If one skill's output is another skill's input, make that pipeline explicit in both
- Short additions only — one to three lines max per improvement suggestion

---

## The Self-Evolution Rule
Every time a new skill is added:
1. Run a lightweight synergy scan automatically
2. Surface the top 3 new connections created by the new skill
3. Ask for approval before locking anything in

---

## What a Strong Synergy Looks Like
- Skill A produces output that Skill B uses as input
- Both skills use the same tool but neither references the other
- A workflow in one skill would save steps in another
- A gap in one skill is filled by knowledge in another

Weak synergy = surface-level similarity (same industry, similar vibe). Ignore these. Focus on functional, operational connections only.

---

## The Gap Finder
When Claude finds a gap:
> *"There's a gap between [Skill A] and [Skill B]. Here's what's missing and what we'd need to fill it."*

---

## How to Use

**At project start:** Paste the activation prompt. Claude presents the synergy map before work begins.

**When adding a new skill:** Say "New skill added — run synergy scan." Claude surfaces top connections immediately.

**When something works perfectly:** Say "Lock that into the synergy map." Claude notes the connection and flags which skills to update.

**For a full audit:** Say "Run a full synergy audit." Claude goes deep — every skill, every connection, every gap.

---

## Activation Prompt
```
Claude, activate the Skill Synergy Engine.

1. Scan every skill in your current knowledge base
2. Cross-reference them — find overlapping tools, shared logic,
   complementary workflows, and outputs that feed into each other
3. For every connection found, tell me:
   - Which skills are connected
   - What the connection is
   - How each skill can be made stronger because of it
4. Flag gaps — places where two skills SHOULD connect but don't yet
5. Suggest specific lines or sections to add to make the synergy explicit

Do not change anything yet. Present the full synergy map first.
Ask: "Which connections do you want me to lock in?"
Then update only the ones approved.
```
