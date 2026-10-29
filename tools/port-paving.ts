// One-off port: the peer-facing paving guide (doc.html) -> entries/paving-vulnerability-classes.md.
// Usage: bun tools/port-paving.ts <doc.html> <paving repo dir>
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { join } from "node:path";

const [docPath, repo] = process.argv.slice(2);
let html = await Bun.file(docPath).text();
html = html.slice(html.indexOf("<body>") + 6, html.indexOf("</body>"));

// Drop the cover, the printed contents and the placeholder reference list; the site builds its own.
html = html.replace(/<div class="cover">[\s\S]*?<p class="lic">[\s\S]*?<\/p>\s*<\/div>/, "");
html = html.replace(/<section class="toc"[\s\S]*?<\/section>/, "").replace(/<section class="refs"[\s\S]*?<\/section>/, "");

// Section headings: strip the printed number, carry the section id.
html = html.replace(/<section[^>]*id="([^"]+)"[^>]*>\s*<h2>(?:<span class="n">\d+<\/span>)?([\s\S]*?)<\/h2>/g, (_, id, t) => `<section><h2>${t} {#${id}}</h2>`);
// Synthesis paragraphs and caution boxes become callouts; inline marks become a bold word.
html = html.replace(/<p><span class="syn">SYNTHESIS<\/span>([\s\S]*?)<\/p>/g, "<blockquote><p>[!SYNTHESIS] $1</p></blockquote>");
html = html.replace(/<span class="syn">SYNTHESIS<\/span>\s*/g, "<strong>Synthesis:</strong> ");
html = html.replace(/<div class="caution">([\s\S]*?)<\/div>/g, "<blockquote><p>[!CAUTION] $1</p></blockquote>");
// The ranking formulas stay a code block.
html = html.replace(/<div class="formula">([\s\S]*?)<\/div>/g, (_, f) => "<pre><code>" + f + "</code></pre>");
// Fit ratings, timeline years and key-term blocks.
html = html.replace(/<span class="fit (?:hi|md|lo)">([^<]+)<\/span>/g, (_, w) => "<strong>" + w.charAt(0) + w.slice(1).toLowerCase() + "</strong>").replace(/<br>\s*<span class="small">([\s\S]*?)<\/span>/g, " ($1)");
html = html.replace(/<span class="small">([\s\S]*?)<\/span>/g, "$1");
html = html.replace(/<li><span class="yr">(\d{4})<\/span><span>([\s\S]*?)<\/span><\/li>/g, "<li><strong>$1.</strong> $2</li>");
html = html.replace(/<div><span class="k">([\s\S]*?)<\/span>([\s\S]*?)<\/div>/g, "<p><strong>$1.</strong> $2</p>");
html = html.replace(/<div class="(?:box|three|flow)">|<\/?section[^>]*>/g, "").replace(/<td([^>]*)>([\s\S]*?)<\/td>/g, (_, a, c) => `<td${a}>${c.replace(/<br\s*\/?>/g, " · ")}</td>`);

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", emDelimiter: "*" });
td.use(gfm);
let md = td.turndown(html);
md = md.replace(/\\\[!(SYNTHESIS|CAUTION)\\\]/g, "[!$1]").replace(/\\\{#([a-z0-9-]+)\\\}/g, "{#$1}").replace(/\{\\#/g, "{#").replace(/\n{3,}/g, "\n\n");
// Claim headings in place of the printed guide's topic labels (same sections, same ids).
for (const [from, to] of [
  ["## Summary {#summary}", "## Safe APIs, build-time checks and audited exceptions retire whole classes {#summary}"],
  ["## The core model {#model}", "## A class is paved when its preconditions live in the API {#model}"],
  ["## Developer experience evidence {#dx}", "## Developers take the easiest path, so the safe path has to be easiest {#dx}"],
  ["## Guardrail tiers {#tiers}", "## Guardrails escalate from paved defaults to nudges to blocks {#tiers}"],
  ["## AI-generated code {#ai}", "## AI-generated code makes build-time invariants more valuable {#ai}"],
  ["## Running the analysis {#playbook}", "## The analysis runs in eight phases with human checkpoints {#playbook}"],
  ["## Open questions {#gaps}", "## Seven gaps remain open for anyone who runs the method {#gaps}"],
]) { if (!md.includes(from)) throw new Error("heading not found: " + from); md = md.replace(from, to); }
// A callout that ends in a colon takes the list after it inside the callout.
md = md.replace(/(^> \[!SYNTHESIS\][^\n]*:)\n\n((?:(?:-|\d+\.) +[^\n]*\n?(?: {2,}[^\n]*\n?)*)+)/gm, (_, lead, list) => lead + "\n>\n" + list.trimEnd().split("\n").map((l) => "> " + l).join("\n") + "\n");
md = md.replace(/\*\*(Retire|Keep and repurpose|Invest)\*\* /g, "**$1:** ");
// Printed section numbers become links to the section.
md = md.replace("Section 09 covers how detection's job changes", "[From scanner volume to paved roads](#transition) covers how detection's job changes")
  .replace("(Section 10)", "([How this goes wrong](#failure))")
  .replace("turns Sections 04 and 05 into", "turns [mining](#method) and [deciding what to pave](#scoring) into");
md = md.replace("carry a **Synthesis:** mark", "carry a **Synthesis** mark").replace("add IF preconditions", "add `if` preconditions");
md = md.replace(/[—]/g, ", ").replace(/(\d)–(\d)/g, "$1-$2").replace(/–/g, "-");

// Sources, grouped by evidence grade, from the companion repository.
const sources: any[] = Bun.YAML.parse(await Bun.file(join(repo, "sources.yaml")).text()) as any[];
const groups: [string, string][] = [["peer-reviewed", "Peer-reviewed"], ["primary-industry", "Primary industry"], ["secondary", "Secondary"], ["practitioner", "Practitioner"]];
let refs = "\n## Sources\n\nThe full bibliography, with every claim it supports, is in the companion repository's [sources.yaml](https://github.com/juliedavila/paving-vulnerability-classes/blob/main/sources.yaml) and [claims.yaml](https://github.com/juliedavila/paving-vulnerability-classes/blob/main/claims.yaml).\n";
for (const [kind, label] of groups) {
  const items = sources.filter((s) => s.kind === kind && s.id !== "elicit-review-2026");
  refs += `\n**${label} (${items.length})**\n\n<div class="sources"><ol>\n` + items.map((s) => `<li>${s.cite.replace(/&/g, "&amp;").replace(/</g, "&lt;")}${s.url ? ` <a href="${s.url}">${s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>` : ""}</li>`).join("\n") + "\n</ol></div>\n";
}

const front = `---
title: Paving vulnerability classes
kicker: Research guide · Application security engineering
dek: How to mine a history of true-positive vulnerabilities for the classes you can engineer out of existence with secure-by-default frameworks, libraries, APIs and platform controls, and what the evidence says about doing it without wrecking developer experience.
purpose: After reading this guide you can explain how a vulnerability class is eliminated by moving its safety preconditions into a safe API with a build-time conformance check, how to find the classes in your own findings data that pave well, and how to shift scanning effort as paving lands.
published: 2026-10-29
version: "0.9"
order: 1
---

> [!NOTE] This guide has a companion repository and agent playbook: [github.com/juliedavila/paving-vulnerability-classes](https://github.com/juliedavila/paving-vulnerability-classes). It holds every claim with its source and evidence grade, the eight-phase method, and the schemas, so a team of agents can run the analysis on an organization's own data.

`;
const how = `
## How this was made

**Question.** Given an organization's history of true-positive vulnerability findings, which vulnerability classes can be engineered out of existence with secure-by-default frameworks, libraries, APIs and platform controls, and how is that rolled out without hurting developer experience? A follow-up asked how high-volume scanning shifts toward AI-assisted review and paved roads. Set by Julie Davila in October 2026.

**Process.** AI research agents built on Anthropic Claude models searched the public literature and industry sources; a structured literature screen in Elicit covered the academic side. The agents drafted the guide and the companion repository. A separate adversarial review pass then checked the claims against their primary sources and scrubbed method and publication details, and every fix it found was applied before publication. Julie Davila reviewed the result.

**What was checked.** Every factual claim is listed with its source, grade and caveats in the repository's claims file. Passages marked **Synthesis** are inferences drawn in the guide itself and should be tested against your own data.
`;
await Bun.write(join(import.meta.dir, "..", "entries", "paving-vulnerability-classes.md"), front + md.trim() + "\n" + how + refs);
console.log("wrote", md.length, "chars of body");
