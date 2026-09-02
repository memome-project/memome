/* Memome corpus browser + entry detail — client-rendered from
   data/corpus.js (full public corpus export). */

var MEMOME = window.MEMOME = window.MEMOME || {};
MEMOME.Corpus = (function () {
  "use strict";

  var entries = (typeof window.MEMOME_CORPUS !== "undefined" && window.MEMOME_CORPUS) || [];

  function recordStatus(e) {
    return ((e.status || {}).recordStatus || "?");
  }
  function evidenceStatus(e) {
    return ((e.status || {}).evidenceStatus || "?");
  }

  function statusBadge(e) {
    var rs = recordStatus(e);
    var cls = rs === "accepted" || rs === "reviewed" ? "observed" : "proposed";
    return '<span class="ev ' + cls + '">' + MEMOME.esc(rs) + "</span>";
  }

  function renderTable(list, container) {
    if (!list.length) {
      container.innerHTML = '<div class="empty">No entries match your filter.</div>';
      return;
    }
    var html =
      "<table><thead><tr><th>ID</th><th>Name</th><th>Substrate</th><th>Type</th>" +
      "<th>Transmission</th><th>Status</th></tr></thead><tbody>";
    list.forEach(function (e) {
      var type = (e.type || {}).contentForm || "?";
      html +=
        "<tr><td class=\"mono\"><a href=\"entry.html?id=" + encodeURIComponent(e.id) + '">' +
        MEMOME.esc(e.id) + "</a></td>" +
        "<td><b>" + MEMOME.esc(e.name) + "</b><br><span class=\"hit\">" + MEMOME.esc(e.slug || "") + "</span></td>" +
        "<td>" + MEMOME.esc(e.substrate || "?") + "</td>" +
        "<td>" + MEMOME.esc(type) + "</td>" +
        "<td>" + MEMOME.esc((e.transmissionModes || []).join(", ") || "—") + "</td>" +
        "<td>" + statusBadge(e) + " · " + MEMOME.esc(evidenceStatus(e)) + "</td></tr>";
    });
    container.innerHTML = html + "</tbody></table>";
  }

  function renderEntry(id, container) {
    var e = entries.filter(function (x) { return x.id === id; })[0];
    if (!e) {
      container.innerHTML = '<div class="empty">Entry ' + MEMOME.esc(id) +
        ' not found in this fixture. (Full corpus ships at deploy.)</div>';
      return;
    }
    var an = e.agentNative || {};
    var ds = an.detectionSignature || {};
    var harm = e.harm || {};
    var html = "";

    html += '<h1><span class="mono" style="color:var(--accent)">' + MEMOME.esc(e.id) + "</span> — " +
      MEMOME.esc(e.name) + "</h1>";
    html += '<div class="entry-meta">' +
      '<span class="chip">' + MEMOME.esc(e.slug || "") + "</span>" +
      '<span class="chip">substrate: ' + MEMOME.esc(e.substrate || "?") + "</span>" +
      '<span class="chip">' + statusBadge(e) + "</span>" +
      '<span class="chip">evidence: ' + MEMOME.esc(evidenceStatus(e)) + "</span>" +
      "</div>";

    html += '<div class="grid grid-2">';

    html += "<div><h3>Mechanics</h3>";
    html += '<p class="kv"><b>Content form:</b> ' + MEMOME.esc((e.type || {}).contentForm || "?") + "</p>";
    html += '<p class="kv"><b>Functional role:</b> ' + MEMOME.esc(((e.type || {}).functionalRole || []).join(", ") || "—") + "</p>";
    html += '<p class="kv"><b>Transmission modes:</b> ' + MEMOME.esc((e.transmissionModes || []).join(", ") || "—") + "</p>";
    html += '<p class="kv"><b>Persistence mechanisms:</b> ' + MEMOME.esc((e.persistenceMechanisms || []).join(", ") || "—") + "</p>";
    if (an.propagationMechanism && an.propagationMechanism.length) {
      html += '<p class="kv"><b>Propagation:</b> ' + MEMOME.esc(an.propagationMechanism.join(", ")) + "</p>";
    }
    html += "</div>";

    html += "<div><h3>Harm & evidence</h3>";
    html += '<p class="kv"><b>Impact domains:</b> ' + MEMOME.esc((harm.impactDomains || []).join(", ") || "—") + "</p>";
    html += '<p class="kv"><b>Potential impact:</b> ' + MEMOME.esc(harm.potentialImpact || "?") +
      " · <b>Attributed intent:</b> " + MEMOME.esc(harm.attributedIntent || "?") +
      " · <b>Confidence:</b> " + MEMOME.esc(harm.confidence || "?") + "</p>";
    html += '<p class="kv"><b>Activity window:</b> ' + MEMOME.esc(((e.status || {}).activityReferenceWindow || "—")) + "</p>";
    html += '<p class="kv"><b>License:</b> ' + MEMOME.esc((((e.governance || {}).license) || "CC-BY-4.0")) + "</p>";
    html += "</div></div>";

    if (e.observables && e.observables.length) {
      html += "<h3>Observables</h3><ul>";
      e.observables.forEach(function (o) { html += "<li>" + MEMOME.esc(o) + "</li>"; });
      html += "</ul>";
    }
    if (ds.ruleContent && ds.ruleFormat) {
      html += "<h3>Detection signature</h3>";
      html += '<p class="kv"><b>Format:</b> ' + MEMOME.esc(ds.ruleFormat) +
        "</p><p><code>" + MEMOME.esc(ds.ruleContent) + "</code></p>";
    }
    if (e.mitigations && e.mitigations.length) {
      html += "<h3>Mitigations</h3>";
      e.mitigations.forEach(function (m) {
        var ev = m.evidenceStatus || "?";
        var cls = ev === "observed" || ev === "replicated" ? "observed" : ev === "proposed" ? "proposed" : "unknown";
        html += '<div class="mit">– <b>' + MEMOME.esc(m.type || "?") + "</b>" +
          ' <span class="ev ' + cls + '">' + MEMOME.esc(ev) + "</span>" +
          " eff=" + MEMOME.esc(String(m.effectiveness || "?")) +
          (m.effectivenessConfidence ? " (conf " + MEMOME.esc(String(m.effectivenessConfidence)) + ")" : "") +
          ": " + MEMOME.esc(m.description || "") +
          (m.limitations && m.limitations.length ? ' <span class="hit">limits: ' + MEMOME.esc(m.limitations.join("; ")) + "</span>" : "") +
          "</div>";
      });
    } else {
      html += '<div class="empty">None cataloged for this entry.</div>';
    }

    html += '<p class="note">NON-STABLE: this ID is provisional until v0.3. ' +
      'See <a href="docs.html">methodology</a> and <a href="contribute.html">contribute</a> to dispute or add evidence.</p>';
    container.innerHTML = html;
  }

  function filter(q, list) {
    q = q.toLowerCase().trim();
    if (!q) return list;
    return list.filter(function (e) {
      var hay = [e.id, e.name, e.slug, e.substrate || "", (e.transmissionModes || []).join(" "),
        (e.type || {}).contentForm || "", recordStatus(e), evidenceStatus(e)].join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  return { entries: entries, renderTable: renderTable, renderEntry: renderEntry, filter: filter };
})();
