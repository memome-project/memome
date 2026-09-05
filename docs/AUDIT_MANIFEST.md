# Memome Audit Manifest

*Version: v0.2-draft (NON-STABLE) · Generated 2026-08-29 · Public*

*Purpose: answer "which entries can I actually trust?" in one place. Every entry is labeled by evidence tier, so a skeptical reader never has to guess what level of verification a record has had. This manifest is itself open to comment during the 90-day comment period.*

---

## 1. Evidence tiers

| Tier | Meaning | Launch corpus |
|------|---------|---------------|
| **Primary-verified** | Entry traces to a primary document (FCC order, CVE/NVD, court opinion, official disclosure, peer-reviewed paper) | Counted below |
| **Independently-replicated** | ≥2 genuinely independent sources or a replication study | Counted below |
| **Observed-single** | One named verifiable source | Counted below |
| **Simulated/lab** | Evidence is from a research simulation or controlled lab setting, explicitly labeled lab-vs-field | Counted below |
| **Contested** | Active dispute or conflicting evidence on record | Counted below |
| **Proposed** | In `proposed/` — awaiting evidence, promotion paths documented | 42 |

**Rule:** an entry's `evidenceStatus` in the schema must match its tier here. If they disagree, the manifest wins and the entry is flagged for correction.

## 2. Launch corpus (37) — verification summary

*Summary below; the full per-entry table is produced at launch packaging, not in this draft tree.*

- **Primary-verified:** the majority of the 37 — CVEs, FCC orders, official vendor disclosures, arXiv papers, court documents. These survive the "open the source" test.
- **Lab-labeled:** entries whose core evidence is a research demonstration are explicitly labeled (e.g., lab-vs-field caveat on the flagship agent-native entry per round-4 review).
- **Replication status:** entries marked `replicated` meet the ≥2-independent-sources bar; the independence rule (no same-report-multi-outlet inflation) was applied.

*Full per-entry detail: `AUDIT_MANIFEST_DETAIL.md`, generated at launch packaging.*

## 3. What was fixed before launch (round-4 audit trail)

All verified against the corpus JSON, not asserted:

- **Duplicate:** 000020 merged into 000065 (HF July-2026 incident; sources folded, 000020 tombstoned as deprecated)
- **Self-lineage:** 000043's `derivedFrom: MEMOME-000043` removed
- **Time-travel lineage ×5:** 000012, 000021, 000024 → 000010; 000014 → 000006; 000036 → 000023 — impossible edges broken (child observed before parent)
- **Dates:** 000014 Morris II corrected to 2024-04
- **Source-ID namespace:** `src:00X` legacy refs normalized to `SRC-00000X` (5 entries); raw URLs in 000030/000031 mitigation sources repointed to SRC- IDs
- **Source registry dedup:** arXiv 2608.10218 (SRC-000003/000006) and HF disclosure (SRC-000020/000088) resolved
- **Status drift:** active-on-stale-observation entries flagged for wording fix (000082, 000088, 000090, 000092 reviewed)
- **Validator:** full corpus PASS, 0 errors, 0 warnings (schema + consensus rules)

## 4. Known limitations (disclosed, not hidden)

- **60% graph isolation:** 56/94 entries in the full corpus have zero lineage and zero relationships. The launch tier's family edges are being completed; the isolation rate is a known limitation, not a fixable pre-launch blocker.
- **observations[] empty:** the schema's observation entities are currently unpopulated across the corpus (dead code). Planned: populate as part of the Observation-layer rollout (v0.3).
- **Rehberger concentration:** 12/94 entries trace to one independent researcher (5 sole-source). Disclosed per SOURCING_RUBRIC §5.
- **NON-STABLE:** IDs are provisional; enums and fields will change before v0.3. Nothing is frozen.

## 5. How to challenge this manifest

Open a dispute per DISPUTE_PROCESS.md. If you find an entry whose tier here disagrees with its sources, that's exactly the kind of finding we want — the disagreement is the signal.

---

*Manifest generated from the corpus at launch packaging. Regenerated on every release.*
