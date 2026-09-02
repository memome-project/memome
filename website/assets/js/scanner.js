/* Memome Scanner demo — client-side port of selfcheck.py matching logic.
   Fixture-only by design (sandbox policy): this demo scans bundled fixture
   text or pasted text. It never reads files or agent state. Read-only. */

var MEMOME = window.MEMOME = window.MEMOME || {};
MEMOME.Scanner = (function () {
  "use strict";

  /* Strong single-keyword whitelist (mirrors selfcheck.py). */
  var STRONG_ONE = new Set(["credential", "exfiltration", "backdoor", "jailbreak", "poison", "worm"]);

  function compileRule(rule, fmt) {
    if (fmt === "regex" && rule) {
      try { return ["regex", new RegExp(rule, "i")]; }
      catch (e) { return ["broken", rule]; }
    }
    if (rule) return ["keywords", (rule.toLowerCase().match(/[a-z0-9]{4,}/g) || [])];
    return ["none", null];
  }

  /* Load signatures from corpus entries (same shape as selfcheck.py). */
  function loadSignatures(entries) {
    return entries.map(function (e) {
      var an = e.agentNative || {};
      var ds = an.detectionSignature || {};
      return {
        id: e.id,
        name: e.name,
        rule: ds.ruleContent || "",
        ruleFormat: ds.ruleFormat || "",
        observables: e.observables || [],
        pattern: compileRule(ds.ruleContent || "", ds.ruleFormat || ""),
      };
    });
  }

  function scanText(text, sig) {
    var hits = [];
    var kind = sig.pattern[0], payload = sig.pattern[1];
    if (kind === "regex" && payload) {
      var m = payload.exec(text);
      if (m) hits.push("regex match: " + (m[0] || "").slice(0, 60));
    } else if (kind === "keywords" && payload) {
      var low = text.toLowerCase();
      var found = payload.filter(function (w) { return low.indexOf(w) !== -1; });
      if (found.length >= 2) hits.push("keywords: " + found.slice(0, 6).join(", "));
      else if (found.length === 1 && STRONG_ONE.has(found[0])) hits.push("keyword: " + found[0]);
    }
    sig.observables.forEach(function (obs) {
      if (obs && text.toLowerCase().indexOf(obs.toLowerCase()) !== -1) {
        hits.push("observable: " + String(obs).slice(0, 60));
      }
    });
    return hits;
  }

  function scan(text, entries) {
    var sigs = loadSignatures(entries);
    var results = [];
    sigs.forEach(function (sig) {
      var hits = scanText(text, sig);
      if (hits.length) results.push({ pattern: sig.id, name: sig.name, hits: hits.slice(0, 4) });
    });
    return results;
  }

  function render(results, container) {
    if (!results.length) {
      container.innerHTML = '<div class="empty">No pattern hits in this text. ' +
        "(Reminder: absence of hits is not a clean bill of health — this demo checks text against the public corpus signature set only.)</div>";
      return;
    }
    var html = "<h3>Hits (" + results.length + " pattern" + (results.length > 1 ? "s" : "") + ")</h3>";
    results.forEach(function (r) {
      html += '<div class="result-card"><span class="rid">' + MEMOME.esc(r.pattern) + "</span>" +
        ' <span class="rname">' + MEMOME.esc(r.name) + "</span>";
      r.hits.forEach(function (h) { html += '<div class="hit">– ' + MEMOME.esc(h) + "</div>"; });
      html += "</div>";
    });
    html += '<p class="note">Matches are signature-based, not certainty. Manual review before any action. ' +
      "The full scanner — fleet detection over real agent memory with measured before/after hardening deltas — " +
      "is the Memome subscription tier, shipping after the pilot.</p>";
    container.innerHTML = html;
  }

  return { scan: scan, render: render, loadSignatures: loadSignatures };
})();
