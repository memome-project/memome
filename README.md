# Memome

**The open knowledge base of transmissible information patterns — how they spread, persist, mutate, affect hosts, and can be detected or mitigated across humans and AI systems.**

*Status: v0.2-draft (NON-STABLE) · Launch edition · 37 core entries · 42 proposed · 12 observations/responses*

Memome is the MITRE ATT&CK of information propagation and manipulation: a shared, evidence-based vocabulary that lets researchers, defenders, platform teams, and AI labs say *"we're seeing MEMOME-XXXX-like behavior"* instead of vague prose.

## What's here

| Directory | Contents |
|-----------|----------|
| `corpus/` | **37 launch entries** — the launch core. These 37 of the 94 entries assessed for this draft survived six independent adversarial reviews plus strict triage with no substantive flags standing; the rest remain in `proposed/`, live as dated observation/response records, or were retired. |
| `proposed/` | **42 entries awaiting evidence** — patterns we believe are real but that need repeated-transmission/recurrence evidence or source upgrades. **We want your input here.** Each proposed entry documents its promotion path. |
| `observations/` | **7 dated incident records** — real events attached as evidence to parent patterns (e.g., the July 2026 Hugging Face incident). |
| `responses/` | **5 enforcement/court/policy records** — mitigations, rulings, takedowns (e.g., FCC forfeiture orders). |
| `references/` | Taxonomy pointers (e.g., OWASP ASI06) — classes, not entries. |
| `schema/` | The validator-enforced JSON schema (v0.2-draft, NON-STABLE). |
| `docs/` | Governance, contributing, promotion criteria, sourcing rubric, naming protocol, dispute process, audit manifest. |

## The three-tier model

We deliberately ship a *tiered* corpus rather than one flat list:

- **Patterns** are named by what propagates — never by the incident, product, CVE, court case, regulator, campaign, or software that evidenced them. The incident lives in `observations/`; the enforcement action in `responses/`; the colloquial name in the entry's aliases.
- **Proposed** is a feature, not a weakness: it signals we know what we don't know, and it's the queue where community evidence promotes entries into the core corpus.
- **NON-STABLE is honest:** IDs are provisional, enums will change before v0.3, and nothing is frozen until real data says so. We run a **90-day comment period** before the v0.3 freeze — on the entries *and* on the processes in `docs/`.

## How to contribute

1. **Submit evidence** for a `proposed/` entry → open a PR citing the source; maintainers apply the promotion criteria (see `docs/PROMOTION_CRITERIA.md`).
2. **Propose a new entry** → lands in `proposed/` first, always.
3. **Dispute an entry** → open a dispute; maintainers must respond with a written ruling within the SLA (see `docs/DISPUTE_PROCESS.md`).
4. **Comment on process** → the 90-day comment period covers `docs/` too. Governance is reviewable, not aspirational.

## Why trust this

- Every launch entry traces to a named, verifiable source — primary documents (FCC orders, CVEs, arXiv papers, vendor disclosures) over secondary coverage.
- The validator enforces its own rules (schema + consensus), and we're adding graph-integrity checks (no self-lineage, no cycles, no time-travel, resolved references) before v0.3.
- The launch core was adversarially reviewed by six independent models; the worst-entry test was applied to all 94, and anything with a substantive flag was moved out of the core.
- We publish an `AUDIT_MANIFEST.md`: every entry is labeled primary-verified / independently-replicated / simulated / contested / proposed.

## License

- **Corpus data** (entries, schema, docs): **CC-BY-4.0** — open, attribution required, cannot be re-closed.
- **Contributions** are accepted under these terms. See LICENSE for details.

## The one-line version

**Memome is the evidence-based knowledge base of how information propagates and manipulates — built agent-native first, earned from real incidents, and trusted because it's verifiable.**
