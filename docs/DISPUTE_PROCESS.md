# Memome Dispute Process

*Version: v0.2-draft · Public and commentable · Applies to any entry in `corpus/`, `proposed/`, `observations/`, `responses/`*

*Purpose: make dispute resolution concrete — who can dispute, how, and how fast a ruling must come. No edit wars, no silent overwrites, no vibes.*

---

## 1. Who can dispute

**Anyone.** You don't need to be a contributor, maintainer, or coder. A disputed entry is not a failure — it's the assertion machinery working.

## 2. What can be disputed

- A classification (contentForm, functionalRole, substrate, scope)
- A status axis (activityStatus, evidenceStatus, recordStatus)
- A source (wrong source, inflated reliability, missing URL, unsupported claim)
- A lineage/relationship edge (wrong family, time-travel, self-reference)
- A mitigation (unevidenced mitigation presented as effective)
- Naming (violates Test 0 / naming protocol)

## 3. How to open a dispute

1. Open a GitHub issue (or PR if you have a fix) referencing the entry ID (e.g., `MEMOME-000024`).
2. State what you believe is wrong and what you believe it should be.
3. If possible, cite evidence (a source, a date, a contradiction inside the corpus itself).

**No edit wars:** whoever disputes first files the assertion — nobody overwrites the entry to "win." The entry carries a visible `assertions[]` object with status: contested until ruled.

## 4. The ruling ladder

| Step | Who | Timeline | Output |
|------|-----|----------|--------|
| **1. Assertion** | Disputer | Immediate | Contested entry flagged; assertion recorded |
| **2. Maintainer ruling** | Maintainer | Within 14 days | Written ruling: uphold / change / demote / remove, with reason |
| **3. Coding-guide fix** | Maintainer | Within 2 weeks of 3rd contest on same field | If the same field is contested 3+ times, the coding guide gets a concrete example/rule |
| **4. Schema RFC** | Maintainer + board | Next version boundary | If the guide can't fix it, the field/enum becomes a v0.3 schema candidate |
| **5. Appeal** | Owner (Dan) | Final | Last-resort appeal, decisions recorded as provenance |

**SLA:** Step 1 immediate; Step 2 within 14 days; Step 3 within 2 weeks of the 3rd contest; Step 4 at the next version boundary; Step 5 as scheduled.

## 5. Ruling standards

- A ruling without a written reason doesn't exist. Every ruling is recorded in `DECISIONS_LOG.md` with the entry ID, the dispute, the decision, and the reasoning.
- **Mechanical rules win over opinion.** If the dispute is about a documented criterion (e.g., "source lacks URL per SOURCING_RUBRIC §4"), the ruling applies the rubric, not judgment.
- **Benefit of the doubt goes to the evidence, not the entry.** If evidence is genuinely ambiguous, the entry stays `proposed` rather than `accepted` — consistent with the launch rule: *better safe than sorry*.

## 6. Demotion & correction

- If new evidence contradicts an accepted entry, it is **demoted** (accepted → proposed → disputed), never silently edited.
- Named individuals, victims, criminal actors, companies, and alleged malicious intent get the same dispute path — with the option of **redaction** where privacy or defamation risk exists. Redacted material is never pretended away: the ID and a redaction reason stay visible.

## 7. Moderation against gaming

- Promotion/dispute outcomes follow the documented criteria (PROMOTION_CRITERIA.md), so coordinated up/down-voting cannot flip an entry.
- A dispute that is itself frivolous or abusive is dismissed with a recorded reason — but dismissal is reviewable through the appeal step.

---

*This process is open to comment during the 90-day comment period. If you want a shorter SLA, a different appeal path, or a public review board — argue it with a concrete proposal.*
