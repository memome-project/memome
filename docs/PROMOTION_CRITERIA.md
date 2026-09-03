# Memome Promotion Criteria

*Version: v0.2-draft · Public and commentable · Applies to all entries in `proposed/` and any contribution*

*Purpose: make promotion mechanical, not vibes. Anyone can argue for or against a promotion on the same terms. Coordinated up/down-voting cannot game a documented rule set.*

---

## 1. The five inclusion tests

An entry is **accepted** if it satisfies **≥3 of 5**:

1. **Identifiable semantic or behavioral pattern** — there is a shape you can name and describe.
2. **Evidence of repeated transmission** — the pattern has been observed moving more than once.
3. **Evidence of adoption or behavioral effect** — hosts actually changed behavior per the pattern.
4. **Identifiable transmission mechanism** — you can say *how* it propagates (channel, carrier, vector).
5. **Recurrence across hosts or contexts** — it appears in more than one host, platform, or environment.

Tests 1 and 4 are near-universal (almost anything has a shape and a plausible mechanism). **Tests 2, 3, and 5 are load-bearing** — because only two tests are cheap, any 3-of-5 pass necessarily includes at least one load-bearing test. A 2-of-5 candidate is logged as *proposed*, never rejected outright, and may be upgraded when evidence accumulates.

**Admission vs core (ruling 2026-09-03):** admission to the living corpus requires ≥1 load-bearing test (the ≥3-of-5 rule above). Promotion *within* the corpus to core/stable status is stricter: replicated evidence plus reviewer consensus ≥4 of 5. The INT- (interventions) catalog likewise holds the higher bar. This asymmetry is deliberate — include generously, certify conservatively. Harm inside Test 3 (documented `potentialImpact ≥ moderate`) satisfies it regardless of adoption evidence, so genuinely harmful memes clear admission by construction.

## 2. Test 0 — Object identity (applied BEFORE the five)

*Name what is propagating, without naming the incident, product, CVE, court case, regulator, campaign, or affected software.*

If that sentence cannot be answered cleanly, **do not score the five tests yet** — the entry is describing the wrong unit (an incident, a product, a court ruling) rather than a transmissible pattern. Examples:
- ❌ "The Biden robocall" → the incident, not the pattern
- ✅ "Political deepfake robocall" → what propagates

Incidents, products, court cases, and campaigns are still valuable — they become `observations/` and `responses/` records linked to patterns, never patterns themselves.

## 3. Hard rules (any violation → cannot accept)

- **Real cases only.** No hypotheticals, no thought experiments presented as observed.
- **One Source ID = one evidentiary object.** The same URL may not appear under two source IDs.
- **No forced values.** Blank / `unknown` is valid and preferred over a guess. An entire block of `unknown` values is itself evidence the block was forced — flag it.
- **Mechanism, not ideology.** Entries describe what a pattern does and how it moves. Never whether an idea is "bad."
- **Source independence.** Multiple sources repeating the same original report do **not** count as corroboration. `replicated` requires ≥2 genuinely independent sources or a replication study.
- **Evidence must support the claim.** An FCC order is high-reliability evidence that an enforcement event occurred, but weak evidence that a broad memetic pattern recurs. Source credibility ≠ claim sufficiency.

## 4. Evidence-status ladder

| Status | Requirement |
|--------|-------------|
| `anecdotal` | A single claim, no named verifiable source |
| `observed` | ≥1 verifiable source named (paper, CVE, vendor disclosure, regulatory document, named outlet) |
| `replicated` | ≥2 independent sources, or a replication study |
| `disputed` | Conflicting evidence on record |

## 5. Promotion path (proposed → accepted)

1. Contributor opens a PR/issue citing the **specific evidence** that satisfies the missing test(s) — e.g., for a weak-accept (3/5 via impact only), a second independent source demonstrating repeated transmission or recurrence.
2. Maintainer applies Test 0 + the five tests + hard rules mechanically; promotions also clear the reviewer-consensus bar (≥3 of 5 independent votes, proposer excluded; core-tier promotion requires ≥4 of 5 and replicated evidence).
3. Decision recorded: **promote** (with reason) or **keep proposed** (with the specific evidence gap named).
4. Promotion is always reversible: if new evidence contradicts an entry, it is *demoted*, never silently edited.

## 6. What does NOT promote an entry

- "Important" or "interesting" — inclusion is about transmissible patterns, not significance.
- A CVE or exploit existing — the exploit can *carry* a pattern; the exploit is not automatically the pattern.
- A court ruling or enforcement action — evidence, not pattern.
- A lab demonstration without field observation — `observed` requires deployed-system evidence; lab results are labeled as such (lab-vs-field distinction).
- Renaming the incident as the pattern — Test 0 catches this.

## 7. The tier map

```
corpus/        37 entries — accepted, interrogation-proof core (NON-STABLE)
proposed/      42 entries — real patterns awaiting evidence; promotion paths documented
observations/  7 dated incident records — evidence attached to patterns
responses/     5 enforcement/court/policy records — responses attached to patterns
references/    1 taxonomy pointer — classes, not entries
```

*This document is itself open to comment during the 90-day comment period. If you think a criterion is wrong, argue it on the same terms — with evidence.*
