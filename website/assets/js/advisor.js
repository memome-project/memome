/* Memome Advisor — faithful client-side port of advisor.py.
   Same lexicon, same scoring, same strong/weak split (threshold 4, top 4).
   Read-only: text in, text out. Runs entirely in the browser. */

var MEMOME = window.MEMOME = window.MEMOME || {};
MEMOME.Advisor = (function () {
  "use strict";

  var STOP = new Set(("the a an and or of to in on for with that this is are was were " +
    "it from by as at be been being has have had not but its").split(" "));

  /* Signal lexicon: keyword -> [field, weight] — mirrors advisor.py exactly. */
  var SIGNALS = {
    memory: ["persistenceMechanisms", 2], persistent: ["persistenceMechanisms", 2],
    rewrite: ["agentNative.memoryMutability", 2], injection: ["agentNative.propagationMechanism", 2],
    prompt: ["agentNative.propagationMechanism", 2], agent: ["substrate", 1],
    email: ["transmissionModes", 1], hidden: ["agentNative.cognitiveHooks", 2],
    exfiltrat: ["observables", 2], leak: ["observables", 2], stolen: ["observables", 2],
    phishing: ["observables", 2], voice: ["observables", 2], clone: ["observables", 2],
    deepfake: ["observables", 2], spoof: ["observables", 2], scam: ["observables", 2],
    viral: ["activityStatus", 1], spread: ["transmissionModes", 1], propagat: ["transmissionModes", 2],
    jailbreak: ["agentNative.propagationMechanism", 2], safety: ["harm.impactDomains", 1],
    fake: ["observables", 2], review: ["observables", 1], astro: ["observables", 2],
    poison: ["agentNative.propagationMechanism", 2], backdoor: ["agentNative.cognitiveHooks", 2],
    robocall: ["observables", 2], election: ["harm.impactDomains", 1], voter: ["observables", 2],
    worm: ["agentNative.capabilities", 2], "self-replicat": ["agentNative.capabilities", 2],
    credential: ["agentNative.privilegeRequirements", 2], "zero-day": ["agentNative.cognitiveHooks", 2],
    lateral: ["agentNative.interactionTopology", 2], tool: ["agentNative.cognitiveHooks", 1],
    file: ["persistenceMechanisms", 1], workspace: ["persistenceMechanisms", 1],
    retriev: ["agentNative.propagationMechanism", 2], rag: ["agentNative.propagationMechanism", 2],
    session: ["agentNative.temporalScope", 1], context: ["agentNative.runtimeMedium", 1],
    dark: ["facets.primaryPersuasionPrinciple", 1], pattern: ["type.contentForm", 1],
    suffix: ["agentNative.detectionSignature", 2], token: ["agentNative.detectionSignature", 2],
    disinfo: ["observables", 2], influence: ["harm.impactDomains", 1], coordinated: ["type.functionalRole", 2],
    manipulat: ["harm.impactDomains", 1], instruction: ["type.contentForm", 2],
    persist: ["agentNative.capabilities", 2], dormant: ["activityStatus", 1],
    resurrect: ["activityStatus", 1], mutat: ["agentNative.mutationAdaptation", 2],
  };

  function tokenize(text) {
    var tokens = (text.toLowerCase().match(/[a-z0-9]+/g) || []);
    var out = new Set();
    tokens.forEach(function (t) { if (!STOP.has(t)) out.add(t); });
    return out;
  }

  function fieldGet(entry, dotted) {
    var cur = entry;
    dotted.split(".").forEach(function (part) {
      if (cur && typeof cur === "object" && part in cur) cur = cur[part];
      else cur = undefined;
    });
    return cur;
  }

  function flatten(entry) {
    var texts = [];
    (function walk(o) {
      if (typeof o === "string") texts.push(o.toLowerCase());
      else if (Array.isArray(o)) o.forEach(walk);
      else if (o && typeof o === "object") Object.keys(o).forEach(function (k) { walk(o[k]); });
    })(entry);
    return texts;
  }

  function scoreEntry(entry, tokens) {
    var score = 0, hits = [];
    var joined = flatten(entry).join(" ");
    tokens.forEach(function (tok) {
      if (joined.indexOf(tok) !== -1) { score += 1; hits.push(tok); }
    });
    Object.keys(SIGNALS).forEach(function (tok) {
      var sig = SIGNALS[tok];
      var stem = tok.replace(/e$/, "");
      var matched = false;
      tokens.forEach(function (t) {
        if (t.indexOf(stem) === 0 || t === tok) matched = true;
      });
      if (matched && fieldGet(entry, sig[0]) != null) {
        score += sig[1];
        hits.push(sig[0] + "=" + tok);
      }
    });
    return [score, Array.from(new Set(hits)).sort()];
  }

  function mitigateHTML(m) {
    if (!m) return "";
    var ev = m.evidenceStatus || "?";
    var cls = ev === "observed" || ev === "replicated" ? "observed" : ev === "proposed" || ev === "suggested" ? "proposed" : "unknown";
    return (
      '<div class="mit">– <b>' + MEMOME.esc(m.type || "?") + "</b>" +
      ' <span class="ev ' + cls + '">' + MEMOME.esc(ev) + "</span>" +
      " eff=" + MEMOME.esc(String(m.effectiveness || "?")) + ": " +
      MEMOME.esc((m.description || "").slice(0, 140)) + "</div>"
    );
  }

  function entryCard(r, strong) {
    var html =
      '<div class="result-card">' +
      '<span class="rid">' + MEMOME.esc(r.id) + "</span>" +
      ' <span class="rname">' + MEMOME.esc(r.name) + "</span>" +
      ' <span class="ev ' + (strong ? "observed" : "unknown") + '">' + (strong ? "strong" : "weak") + " match</span>" +
      "<div class=\"kv\">substrate: <b>" + MEMOME.esc(r.substrate || "n/a") + "</b>" +
      " · type: <b>" + MEMOME.esc(r.type || "n/a") + "</b>" +
      " · score <b>" + r.score + "</b></div>" +
      "<div class=\"kv\">mechanisms: <b>" + MEMOME.esc((r.mechanism_hint || []).join(", ") || "n/a") + "</b></div>" +
      "<div class=\"kv\">harm domains: <b>" + MEMOME.esc((r.harm || []).join(", ") || "n/a") + "</b></div>" +
      (r.match_terms && r.match_terms.length ? '<div class="kv">match terms: ' + r.match_terms.map(function (t) { return '<span class="chip">' + MEMOME.esc(t) + "</span>"; }).join("") + "</div>" : "") +
      "<div style=\"margin-top:8px\"><b>Mitigations</b>" + (r.mitigations && r.mitigations.length ? r.mitigations.map(mitigateHTML).join("") : '<div class="empty">none cataloged</div>') + "</div>" +
      "</div>";
    return html;
  }

  /* advise(text, entries) -> {strong:[...], weak:[...], none:bool} */
  function advise(text, entries, topN) {
    topN = topN || 4;
    var tokens = tokenize(text);
    var scored = entries.map(function (e) {
      var r = scoreEntry(e, tokens);
      return { score: r[0], hits: r[1], e: e };
    }).filter(function (s) { return s.score > 0; });
    scored.sort(function (a, b) { return b.score - a.score; });

    var STRONG = 4;
    var strong = [], weak = [];
    scored.forEach(function (s) {
      var r = {
        id: s.e.id, name: s.e.name, score: s.score,
        substrate: s.e.substrate,
        type: (s.e.type || {}).contentForm,
        mechanism_hint: ((s.e.agentNative || {}).propagationMechanism || []),
        harm: ((s.e.harm || {}).impactDomains || []),
        mitigations: s.e.mitigations || [],
        match_terms: s.hits.slice(0, 12),
      };
      if (s.score >= STRONG && strong.length < topN) strong.push(r);
      else if (weak.length < topN) weak.push(r);
    });
    return { strong: strong, weak: weak, none: strong.length === 0 && weak.length === 0 };
  }

  function render(result, container) {
    var html = "";
    if (result.strong.length) {
      html += "<h3>Strong matches (top " + result.strong.length + ")</h3>";
      html += result.strong.map(function (r) { return entryCard(r, true); }).join("");
    }
    if (result.weak.length) {
      html += "<h3>No strong match — weak matches (verify before acting)</h3>";
      html += result.weak.map(function (r) { return entryCard(r, false); }).join("");
    }
    if (result.none) {
      html +=
        '<div class="note danger"><b>No matching patterns found.</b> This is a catalog gap — worth reporting.<br>' +
        "Tip: Memome is indexed by <i>how a pattern propagates</i> (its mechanism), not the surface details of an incident. " +
        "Try mechanism vocabulary: 'memory write', 'prompt injection', 'voice clone', 'phishing'.</div>";
    } else {
      html += '<p class="note">Matches are keyword/signal-based, not certainty. Verify before acting. ' +
        'Found something mislabeled? <a href="contribute.html">Dispute it</a> — assertions, never edit wars.</p>';
    }
    container.innerHTML = html;
  }

  return {
    advise: advise,
    render: render,
    SIGNALS: SIGNALS,
    tokenize: tokenize,
  };
})();
