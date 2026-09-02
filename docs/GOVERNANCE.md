# Memome Governance

*Version: v0.2-draft (NON-STABLE) · Status: operational for launch, subject to 90-day comment period before v0.3 freeze*

*Purpose: answer the standing reviewer complaint — governance must be concrete: roles, decision authority, voting thresholds, dispute SLA, moderation. Public can see this and comment on it.*

---

## 1. The control model

**Community submits; maintainers rule.** Memome is open source in the MITRE ATT&CK / OWASP sense, not the Wikipedia sense. Anyone may contribute evidence, propose entries, open disputes, and comment on process — but nothing merges without a maintainer review, and no ruling happens by vote of the crowd.

Decision authority:

| Decision class | Authority | Notes |
|----------------|-----------|-------|
| Schema changes, launch/release decisions | **Owner (Dan)** | Final say; appeal authority for all disputes |
| Routine promote/reject rulings on evidence | **Maintainers (M2, initially)** | Apply documented criteria mechanically; Dan is the appeal |
| Dual-use / redaction disputes | **Dual-Use Review Board** (3–5: technical + ethics + domain) | Maintainer proposes, board disposes; quorum ≥3, majority |
| Contested classifications | **Assertion mechanism** (not votes) | First disputer writes an assertion; no edit wars |
| Final appeal | **Owner (Dan)** | Decisions recorded as provenance |

## 2. Roles

| Role | Who | Powers |
|------|-----|--------|
| **Contributor** | anyone | submit evidence, propose entries, open disputes, comment on process |
| **Coder** (pilot) | 3–5 independent (incl. ≥1 LLM) | catalog incidents per coding guide; inter-rater measurement |
| **Maintainer** | M2 (pilot); TBD post-pilot | merge entries, run validator, execute routine rulings, publish drafts |
| **Dual-Use Review Board** | 3–5: technical + ethics + domain | decide redaction/exploitability disputes, gate high-exploitability payload fields |
| **Arbiter** | Dan (pilot); elected panel (post-pilot) | final appeal |

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

Accept if **≥3 of 5**:
1. Identifiable semantic or behavioral pattern
2. Evidence of repeated transmission
3. Evidence of adoption or behavioral effect
4. Identifiable transmission mechanism
5. Recurrence across hosts or contexts

**Test 0 (Object identity) — applied before the five:** *Name what is propagating, without naming the incident, product, CVE, court case, regulator, campaign, or affected software.* If that sentence cannot be answered cleanly, do not score the five tests yet. (Adopted from OpenAI's round-4 review.)

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

## 10. Delegation (APPROVED — DQ-006, Aug 29 2026)

**Option A confirmed:** Dan holds schema/launch decisions + final appeal authority. Maintainers (M2 initially) execute routine promote/reject rulings by applying the documented criteria mechanically (Test 0 + 5 tests + source rules). All rulings recorded with a written reason. Dan is the appeal. This prevents the owner from being the bottleneck on proposed entries while preserving final control.

## 11. Licensing (APPROVED — DQ-008, Aug 29 2026)

- **Corpus data:** CC-BY-4.0 — open standard, attribution required, cannot be re-closed.
- **Code:** Apache-2.0 — open, patent grant, no copyleft friction.
- **Monetization layer:** hosted services, certification program, and the Memome trademark (registered pre-launch) — proprietary services, not code. Open engine, sell the experience.
- **Trademark (DQ-003):** elevated to PRE-LAUNCH — clearance search + US filing before public launch; "Memome-certified" certification is the durable monetization lever.
