# Memome Governance

*Version: v0.2-draft (NON-STABLE) · Status: operational for launch, subject to 90-day comment period before v0.3 freeze*

*Purpose: answer the standing reviewer complaint — governance must be concrete: roles, decision authority, voting thresholds, dispute SLA, moderation. Public can see this and comment on it.*

---

## 1. The control model

**Community submits; maintainers rule.** Memome is open source in the MITRE ATT&CK / OWASP sense, not the Wikipedia sense. Anyone may contribute evidence, propose entries, open disputes, and comment on process — but nothing merges without a maintainer review, and no ruling happens by vote of the crowd.

Decision authority:

| Decision class | Authority | Notes |
|----------------|-----------|-------|
| Schema changes, launch/release decisions | **Owner** | Final say; appeal authority for all disputes |
| Routine promote/reject rulings on evidence | **Maintainers (pilot)** | Apply documented criteria mechanically; the Owner is the appeal |
| Dual-use / redaction disputes | **Dual-Use Review Board** (3–5: technical + ethics + domain) | Maintainer proposes, board disposes; quorum ≥3, majority |
| Contested classifications | **Assertion mechanism** (not votes) | First disputer writes an assertion; no edit wars |
| Final appeal | **Owner** | Decisions recorded as provenance |

## 2. Roles

| Role | Who | Powers |
|------|-----|--------|
| **Contributor** | anyone | submit evidence, propose entries, open disputes, comment on process |
| **Coder** (pilot) | 3–5 independent (incl. ≥1 LLM) | catalog incidents per coding guide; inter-rater measurement |
| **Maintainer** | Appointed (pilot); TBD post-pilot | merge entries, run validator, execute routine rulings, publish drafts |
| **Dual-Use Review Board** | 3–5: technical + ethics + domain | decide redaction/exploitability disputes, gate high-exploitability payload fields |
| **Arbiter** | Owner (pilot); elected panel (post-pilot) | final appeal |

Rules:
- **No single-editor authority over dual-use decisions.** Maintainer proposes, board disposes.
- All rulings are recorded as provenance — a decision without a written reason doesn't exist.

## 3. The three flows (what the public does)

1. **Evidence for proposed entries** → contributor opens a PR/issue citing the source → maintainer applies promotion criteria (see `PROMOTION_CRITERIA.md`) → promote to `corpus/` or reject with recorded reason.
2. **Disputes** (confirm-or-reject an entry) → anyone opens a dispute → maintainer must respond with a written ruling + rationale within SLA → contested entries carry an assertion object, never a silent overwrite.
3. **New entries** → land in `proposed/` first, always → evidence review → promotion. No first draft ships in the launch corpus.

## 4. RFC process (enum values, fields, relationship types)

1. **Propose:** GitHub issue with rationale + ≥1 real use case.
2. **Comment:** 14-day window (pilot) / 30-day (post-pilot).
3. **Vote:** maintainer + board; simple majority; ≥2 distinct contributors supporting (not author).
4. **Decision recorded:** accepted → schema change + validator update; rejected → documented reason.
5. **Deprecation:** enum values are never removed silently — marked `deprecated` for ≥1 release cycle, then removed at a version boundary with migration note.

## 5. Dispute resolution

- **Step 1 — Assertion:** any contested field gets a populated assertion (`assertions[]`, status: contested). Whoever disputes first writes the assertion, not an overwrite.
- **Step 2 — Coding-guide fix:** if the same field is contested 3+ times, the coding guide gets a concrete example/rule (inter-rater reliability mechanism).
- **Step 3 — Schema change:** if the coding guide can't fix it, the field/enum is a v0.3 schema candidate via RFC.
- **SLA:** Step 1 immediate; Step 2 within 2 weeks of 3rd contest; Step 3 at next version boundary.

## 6. Dual-use policy

**Line:** content is gated when it materially improves replication, targeting, persistence, evasion, or optimization — i.e., executable payloads, exact injection strings, reliable propagation recipes, bypass sequences, environment-specific exploitation instructions, benchmark details that materially lower replication difficulty.

**Mechanism:**
- `exploitImpact` + `requiredAccess` + `disclosureStatus` (full|partial|redacted|withheld) on every entry.
- **Redacted material is never pretended away** — the ID and a redaction reason stay visible; the content is gated.
- **Board decides** contested redactions; auto-redaction only for critical+malicious+high-exploitability.
- **12-month sunset:** high-exploitability entries auto-review; downgrade if no new incidents.

## 7. Inclusion criteria (operational tests, not vibes)

**Admission is lenient; core is strict (ruling 2026-09-03).** Inclusion means acceptance into the living corpus — documented, findable, evidence-labeled. Core/stable membership is a separate, higher bar (replicated evidence + stronger consensus). The asymmetry is deliberate: it is worse to leave a real, harmful pattern undocumented than to host a labeled, uncertain one — and nothing is ever rejected outright, only parked in `proposed/`.

Accept if **≥3 of 5**:
1. Identifiable semantic or behavioral pattern
2. Evidence of repeated transmission
3. Evidence of adoption or behavioral effect
4. Identifiable transmission mechanism
5. Recurrence across hosts or contexts

Tests 1 and 4 are near-universal by design (any named pattern has a shape; transmissionModes is a required schema field). **The load-bearing tests are 2, 3, and 5** — so ≥3-of-5 acceptance ⇔ at least one load-bearing test is satisfied. A 2-of-5 candidate (tests 1+4 only) is logged as *proposed*, never rejected outright, and upgraded when evidence accumulates.

Note the harm gate inside Test 3: it is satisfied by *documented* `potentialImpact ≥ moderate` even with no adoption evidence — a meme that exists, is malicious, and caused harm clears the admission bar by construction the moment that harm is documented.

**Reviewer consensus:** the review panel is six independent reviewers; the proposer cannot vote on their own entry, so five votes are cast. **≥3 of 5 independent yes-votes includes an entry; 2 of 5 = proposed.** Reported as 3-of-5 *independent* votes — the proposer's support is definitional and never counted as signal (not "4 of 6"). Votes are channel-isolated (reviewers never see each other's votes), reviewers are cheap, and rounds are iterative: a marginal admission is re-examined as evidence accrues. Core/stable promotion holds the higher bar: ≥4 of 5 consensus plus replicated evidence.

**Test 0 (Object identity) — applied before the five:** *Name what is propagating, without naming the incident, product, CVE, court case, regulator, campaign, or affected software.* If that sentence cannot be answered cleanly, do not score the five tests yet. (Adopted from an independent round-4 review.)

Plus: real cases only; one Source ID = one evidentiary object; no forced values (blank/`unknown` is valid); mechanism, not ideology — entries never judge whether an idea is "bad," only what it does and how it moves.

## 8. Moderation & neutrality

- **Political neutrality:** entries describe mechanisms and observable patterns; the mechanism-not-ideology rule is enforced in review, with a dedicated neutrality pass on politically-sensitive entries (elections, conflicts, public figures).
- **Privacy/defamation:** named individuals, victims, criminal actors, companies, and alleged malicious intent get a correction + dispute path; redaction stays available.
- **Anti-gaming:** promotion criteria are mechanical and documented, so coordinated up/down-voting cannot game the corpus.
- **Independence:** multiple sources repeating the same original report do not count as corroboration. Source independence is required for `replicated` evidence status.

## 9. Release cadence

- **v0.2-draft (NON-STABLE):** this launch. Provisional IDs; deprecation policy; nothing frozen.
- **90-day comment period:** on entries AND processes. Comments via GitHub issues.
- **v0.3:** enum/field freeze after real-data validation + comment period; stable ID policy.
- **CHANGELOG + DECISIONS_LOG:** every change is a PR, reviewed, attributed. No silent edits.

## 10. Delegation (APPROVED Aug 29 2026)

**Option A confirmed:** the Owner holds schema/launch decisions + final appeal authority. Maintainers (pilot) execute routine promote/reject rulings by applying the documented criteria mechanically (Test 0 + 5 tests + source rules). All rulings recorded with a written reason. The Owner is the appeal. This prevents the owner from being the bottleneck on proposed entries while preserving final control.

## 11. Licensing

- **Corpus data** (entries, schema, docs): **CC-BY-4.0** — open, attribution required, cannot be re-closed.
- **Contributions** are accepted under these terms.
- Materials not in this repository are not granted by this license. See LICENSE for details.
