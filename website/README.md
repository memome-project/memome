# memome.dev — website scaffold

Zero-build static site. Preview by opening any page directly — all data and
tooling load via `<script>` tags (no `fetch` on load paths that matter), so
`file://` works in any modern browser.

## Preview

```bash
open website/index.html        # or just double-click
```

Or serve locally if you prefer (optional, no dependency):

```bash
python3 -m http.server 8080 --directory website
# http://localhost:8080
```

## Structure

```
website/
  index.html          landing
  corpus.html         corpus browser (client-rendered)
  entry.html          entry detail (?id=MEMOME-XXXX)
  advisor.html        Advisor — free entry point (client-side port of advisor.py)
  scanner.html        self-check demo — fixture-only (port of selfcheck.py)
  inoculator.html     gated status page — post-launch, sandbox-gated
  docs.html           methodology, governance, comment period, roadmap
  contribute.html     evidence / disputes / RFC
  license.html        DQ-008 licensing table + honest framing
  about.html          mission
  assets/css/site.css
  assets/js/
    site.js           NON-STABLE banner, footer, phase flips
    advisor.js        faithful port of advisor.py (same lexicon/threshold)
    scanner.js        port of selfcheck.py matching logic
    corpus.js         browser + entry renderer
  data/corpus.js           full 92-entry public corpus export; window.MEMOME_CORPUS
  fixtures/demo-memory.md   the only file the scanner demo scans
  README.md           this file
```

## Wiring the real corpus at deploy

`data/corpus.js` is the single data seam — wired with the full
92-entry public corpus export (CC-BY-4.0). Regenerate it with:

```bash
python3 - <<'EOF'
import json
d = json.load(open("corpus.v0.2-draft.json"))
print("// Full corpus export. CC-BY-4.0.")
print("window.MEMOME_CORPUS = " + json.dumps(d["entries"]) + ";")
EOF
> website/data/corpus.js
```

(Also include `proposed/`, `observations/`, `responses/` in their own data files
when the launch repo structure lands.)

## Phase flips (one file, `assets/js/site.js`)

- `MEMOME.SITE.phase` — `"prelaunch" | "soft" | "public"` (banner wording)
- `MEMOME.SITE.commentPeriod` — `"closed" | "open"` (docs page status)
- `MEMOME.SITE.repoUrl` — GitHub org/repo for issues, PRs, comment intake

## Deploy (when approved — do not deploy from this scaffold)

1. Push repo to GitHub (`memome-dev/memome` or org).
2. Settings → Pages → deploy from `main` branch, folder `/website`.
3. Custom domain: `CNAME` file with `memome.dev`; `.dev` HSTS + Pages certs
   handle HTTPS automatically.
4. Flip `phase`/`commentPeriod` per the launch sequencing in `WEBSITE_PLAN.md`.

## Compliance notes

- Every page carries the NON-STABLE banner (governance §6).
- Scanner demo is fixture-only and says so; inoculator page states POST-LAUNCH,
  sandbox-gated by design.
- Mitigations always show evidence status; tool outputs say "not certainty".
- No forms with backends, no accounts, no analytics, no third-party requests.
