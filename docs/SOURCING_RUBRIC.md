# Memome Sourcing Rubric

*Version: v0.2-draft · Public and commentable · Applies to every source object in every entry*

*Purpose: fix the single largest credibility vulnerability the six round-4 reviewers flagged — systematic source-reliability inflation. A "high" rating must mean strong evidence for THIS entry's claim, not "reputable publisher."*

---

## 1. The two concepts that must never collapse

1. **Source credibility** — is this source trustworthy for what it is?
2. **Claim sufficiency** — does this source actually support the specific claim the entry makes?

Example: an FCC forfeiture order is *high-credibility evidence that an enforcement event occurred*, but only *weak evidence that a broad memetic pattern recurs*. Both things can be true at once; the reliability field must not pretend they're the same.

**Rule: reliability is rated for the claim, not the publisher.**

## 2. Default reliability by source type

| Source type | Default reliability | Notes |
|-------------|--------------------|-------|
| Official regulatory/court document (FCC order, court opinion, FTC action) | `high` | For the event; separate claim-sufficiency check for any pattern-level claims |
| CVE / NVD entry | `high` | Technical facts |
| Peer-reviewed paper / institutional preprint | `high` | Lab results must be labeled lab-vs-field |
| Vendor security disclosure (Trail of Bits, Unit 42, Snyk, MSRC, Sysdig, etc.) | `medium` by default; `high` only if CVE-backed or independently corroborated | Self-interested by default (independent reviewer: "a press release about a vulnerability you found is categorically different from an FCC order") |
| Major outlet (Reuters, AP, BBC, Guardian, The Verge, BleepingComputer, Hacker News) | `medium` | Named journalism, not primary evidence for technical classifications or exact statistics |
| PR-wire / press-release distribution | `low` | A company marketing its own finding |
| Wikipedia or any tertiary aggregator | `low` | Tertiary; never on par with primary sources |
| Researcher's personal blog (e.g., Rehberger / Embrace The Red) | `medium` | Credible and widely-cited, but sole-source concentration must be disclosed |
| Forum post / single unverified claim | `low` / `unverified` | |

## 3. Evidence-status mapping (consistent with the ladder)

- `observed` requires ≥1 verifiable source named in the entry.
- `replicated` requires **≥2 genuinely independent sources** OR a replication study. Repeating outlets that cite the same original report do NOT count as independent (independence illusion).
- `anecdotal` when no verifiable source is named.
- `disputed` when evidence conflicts.

## 4. Structural requirements for every source object

- **URL required unless the source is inherently offline** (books, physical documents) — and then the citation must be specific enough to locate it. 27 source objects shipped without URLs in round 4; that is fixed for the launch tier and must not regress.
- **One Source ID = one evidentiary object.** The same URL may never appear under two source IDs (arXiv 2608.10218 was found under both SRC-000003 and SRC-000006 in round 4; the HF disclosure under SRC-000020 and SRC-000088 — both fixed).
- **No pseudo-citations.** "Macro-finance discourse tracking, 2022–2026," "Documented coverage: …," and "Marketing case-study analyses (multiple)" describe evidence categories, not sources. Every source must be a named, retrievable object.
- **Referential integrity:** every `mitigations[].source`, `provenance.source`, `relationships[]` target, and `lineage` target must resolve to a real SRC- ID present in the entry. `src:001`-style legacy refs are banned (normalized in round 4).
- **Claim-to-source mapping** for high-impact fields: `potentialImpact: critical/high`, `activityStatus: active`, `capabilityEscalation: true`, `stealth: true`, and attribution words ("first," "autonomous," "malicious," "production compromise") require a source that supports the specific claim, not just the general topic.

## 5. Concentration disclosure

If a single individual researcher, firm, or report anchors a material fraction of the corpus, that concentration is named in the launch materials (round-4 finding: 12/94 entries trace to one researcher, 5 sole-source). Not a quality defect — a transparency requirement.

## 6. Independence

Multiple sources repeating the same original report create *apparent* corroboration. Before rating anything `replicated`, confirm the sources are independent (different investigators, different evidence) — not one report quoted by five outlets.

---

*This rubric is open to comment during the 90-day comment period. Propose changes with examples, not vibes.*
