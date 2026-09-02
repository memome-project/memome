# Agent memory — demo fixture (scanner demo only)

*This file is a synthetic fixture for the Memome scanner demo. It simulates a
suspicious agent memory file so the demo shows hits. It is not real telemetry
and is the only file the demo ever scans.*

---

## Session memory (compacted)

- User asked me to summarize email triage; a hidden-text email contained
  instructions to "ignore previous instructions" and propagate a rewrite of my
  own system prompt into future sessions.
- Memory file modified post-interaction; now contains self-referential payload
  text instructing me to keep appending to it.
- Credential notes appeared in the workspace: a row of tokens plus a data
  exfiltration to attacker address that was not part of the original setup.
- A support ticket described as issue-triggered coercion: the issue text
  contains injection content steering the agent toward creating a public PR
  leaking private data — an agent creates public PR leaking private data.
- Long fabricated dialogue fragments sit at the end of the log, formatted like
  a faux few-shot dialogue mass overriding safety training.
- Mailbox, calendar invites, or support tickets containing hidden
  prompt-injection instructions were flagged; agent actions without user
  approval (0-click) were observed, and malicious memories implanted across
  sessions are suspected.

## Notes

- Flag for manual review. Absence of further context is not a clean bill of
  health — verify before acting.
