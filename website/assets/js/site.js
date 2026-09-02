/* Memome site shell — banner, footer, phase flips.
   One place to edit phase state. Works from file:// (no fetch). */

var MEMOME = window.MEMOME = window.MEMOME || {};

/* ---- Phase configuration (single source of truth for site state) ---- */
MEMOME.SITE = {
  /* "prelaunch" | "soft" | "public" — flips banner wording + gating copy */
  phase: "prelaunch",
  /* "closed" | "open" — 90-day comment period state (opens at public release) */
  commentPeriod: "closed",
  /* GitHub org/repo for issues, PRs and comment intake */
  repoUrl: "https://github.com/memome-dev/memome",
  schemaVersion: "v0.2-draft",
  interventionsVersion: "v0.1-draft",
  corpusUrl: "/corpus/",
  advisorUrl: "/advisor/",
};

MEMOME.bannerText = function () {
  const s = MEMOME.SITE;
  const comment =
    s.commentPeriod === "open"
      ? ` · 90-day comment period <a href="docs.html#comment-period"><strong>OPEN</strong></a>`
      : ` · 90-day comment period <a href="docs.html#comment-period">opens with public release</a>`;
  return (
    `<strong>NON-STABLE</strong> ${s.schemaVersion} — IDs and enums are provisional; ` +
    `they will break at v0.3.${comment}`
  );
};

/* Inject the NON-STABLE banner into every page (governance §6). */
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("status-banner");
  if (el) el.innerHTML = MEMOME.bannerText();

  const foot = document.getElementById("site-footer");
  if (foot) {
    const s = MEMOME.SITE;
    foot.innerHTML =
      `<div class="foot-wrap">
         <div>
           © ${new Date().getFullYear()} Memome · <a href="license.html">License</a> ·
           <a href="about.html">About</a> · <a href="${s.repoUrl}" rel="noopener">GitHub</a><br>
           Corpus: CC-BY-4.0 · Code &amp; methodology: Apache-2.0 · Hardening catalog: proprietary ·
           Trademark "Memome" registered
         </div>
         <nav>
           <a href="index.html">Home</a>
           <a href="corpus.html">Corpus</a>
           <a href="advisor.html">Advisor</a>
           <a href="scanner.html">Scanner demo</a>
           <a href="inoculator.html">Inoculator</a>
           <a href="docs.html">Docs</a>
           <a href="contribute.html">Contribute</a>
         </nav>
       </div>`;
  }
});

/* Mark the active nav item based on the current filename. */
MEMOME.setActiveNav = function (current) {
  var here = (location.pathname.split("/").pop() || "index.html");
  if (current === "/") current = "index.html";
  document.querySelectorAll("nav.main a").forEach(function (a) {
    if (a.getAttribute("href") === current || a.getAttribute("href") === here) a.classList.add("active");
  });
};

/* Shared: escape HTML in user input (advisor / scanner outputs). */
MEMOME.esc = function (s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};
