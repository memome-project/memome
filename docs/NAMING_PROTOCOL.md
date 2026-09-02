# Memome Naming Protocol

*Version: v0.2-draft · Approved by owner 2026-08-29 · Applies to all entries in `corpus/`, `proposed/`, `observations/`, `responses/`*

## The rule in one line

**Patterns are named by what propagates. Incidents are named by what happened, when, and where. Responses are named by what was done.**

An entry's *name* must pass **Test 0** (object identity): it should be possible to say what the entry is about *without naming the incident, product, CVE, court case, regulator, campaign, or affected software*.

## Naming by layer

### Patterns (`corpus/`, `proposed/`)
- Name the **transmissible thing**: the information, instruction, behavioral pattern, frame, narrative, norm, or identity pattern that propagates.
- No proper nouns of incidents, products, courts, regulators, campaigns, or software in the **primary name**.
- The incident/product/court names still exist — as **aliases** (search terms) and as links to `observations/` records.
- Format: Title Case noun phrase, kebab-case slug, concise. No vendor names as primary.

| Wrong (incident-named) | Right (pattern-named) | Aliases kept |
|---|---|---|
| Biden Deepfake Robocall | Political Deepfake Robocall | Biden NH Primary 2024; Lingo Telecom |
| Taylor Swift Deepfake Wave | Nonconsensual Celebrity Deepfake Wave | Taylor Swift; #TayAI |
| Amazon Q Hidden-Instruction Injection | Repo-File Hidden-Instruction Injection | Amazon Q Developer; AWS-2025-019 |
| Gemini Email-Summarization Phishing | Email-Summarization Phishing | Gemini; 0DIN |
| Moffatt v. Air Canada | (not a pattern — RSP record) | Air Canada chatbot liability |
| JADEPUFFER | Agentic Ransomware (see observation) | JADEPUFFER |

### Observations (`observations/`)
- ID namespace: `OBS-<seq>` (colloquial names become aliases on the linked pattern).
- Name format: **dated, factual descriptor** — `<YYYY-MM> <what happened> (<where>)`.
- Examples: `2024-01 NH-primary AI robocall (impersonating Biden)` · `2026-07 HF production intrusion (autonomous agent, malicious-dataset beachhead)`
- Every OBS record **must** link to its parent pattern via `relationships[]`.

### Responses (`responses/`)
- ID namespace: `RSP-<seq>`.
- Name format: **what was done** — `FCC forfeiture order (NAL 2024-…)`, `FTC enforcement action (Operation AI Comply)`, `Wikipedia community ban (AI-slop policy)`.
- Every RSP record links to the pattern/observation it responds to. Responses are evidence, not entries.

### References (`references/`)
- ID namespace: `REF-<seq>`.
- For taxonomy classes (e.g., OWASP ASI06), standards, and framework pointers — never cataloged as patterns, always linked *from* concrete entries.

## Aliases

- `aliases[]` carries every colloquial, incident, product, and campaign name so search still finds the record: *"Taylor Swift"* → Nonconsensual Celebrity Deepfake Wave.
- Aliases are lowercase, comma-free, human-searchable strings.
- Renaming an entry never changes its ID (`MEMOME-0000XX` is permanent); the old name moves to `aliases[]` + `CHANGELOG` entry.

## Renaming existing entries (the 94 → launch mapping)

All 94 entries get re-checked against Test 0 before launch. The 37 launch entries are renamed in `LAUNCH_NAMING_TABLE.md`; the 42 proposed entries keep working titles but get pattern-name candidates recorded in their promotion path. Incident/product names move to aliases. No ID changes.

## Why this protocol

The six round-4 reviewers independently converged on the same failure: entries named after incidents, products, and court cases invite the unit-of-analysis challenge *"how is this a transmissible information pattern?"* and create the impression that "Memome means anything interesting involving information or AI." Naming by what propagates:
- makes the object identity test visible at a glance
- moves incidents to where they belong (observations/evidence)
- keeps searchability via aliases
- is the cheapest credibility fix in the entire launch package
