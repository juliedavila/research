// Build the research site: entries/*.md (YAML front matter + Markdown) -> docs/<slug>/index.html,
// plus docs/index.html. Each page is assembled and checked by the vendored html-house-style kit.
import { marked } from "marked";
import { readdirSync, readFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = import.meta.dir;
const out = join(root, "docs");
const tmp = join(root, ".build");
const SITE = "Julie Davila · Research";
const REPO = "https://github.com/juliedavila/research";
const ANNEX = /^(glossary|sources|how this was made|references)$/i;

type Entry = {
  slug: string; title: string; kicker: string; dek: string; purpose: string;
  published: string; updated?: string; version: string; order?: number; layout?: string;
  body: string; words: number;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slugify = (s: string) => s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const fmtDate = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function readEntries(): Entry[] {
  return readdirSync(join(root, "entries")).filter((f) => f.endsWith(".md")).map((f) => {
    const text = readFileSync(join(root, "entries", f), "utf8");
    const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) throw new Error(`${f}: missing front matter`);
    const meta = Bun.YAML.parse(m[1]) as any;
    for (const k of ["title", "kicker", "dek", "purpose", "published", "version"]) if (!meta[k]) throw new Error(`${f}: front matter needs ${k}`);
    const body = m[2];
    const words = body.replace(/<[^>]+>/g, " ").replace(/\[[^\]]*\]\([^)]*\)/g, "x").split(/\s+/).filter(Boolean).length;
    return { slug: f.replace(/\.md$/, ""), ...meta, version: String(meta.version), published: String(meta.published), body, words };
  });
}

// Known abbreviations get <abbr title>, so readers can see the expansion wherever they appear.
const ABBR: Record<string, string> = {
  AI: "artificial intelligence", US: "United States", EU: "European Union", PCI: "Payment Card Industry", DSS: "Data Security Standard",
  NIST: "US National Institute of Standards and Technology", SP: "Special Publication", SA: "System and Services Acquisition",
  OWASP: "Open Worldwide Application Security Project", CVE: "Common Vulnerabilities and Exposures", AWS: "Amazon Web Services",
  CPU: "central processing unit", CRA: "Cyber Resilience Act", OSSRA: "Open Source Security and Risk Analysis", LLM: "large language model",
  LLMs: "large language models", IT: "information technology", CC: "Creative Commons", BY: "Attribution", MSR: "Mining Software Repositories conference",
  ICSE: "International Conference on Software Engineering", FSE: "Foundations of Software Engineering conference", ESEC: "European Software Engineering Conference",
  TSE: "IEEE Transactions on Software Engineering", TOSEM: "ACM Transactions on Software Engineering and Methodology", ACM: "Association for Computing Machinery",
  IEEE: "Institute of Electrical and Electronics Engineers", ASE: "Automated Software Engineering conference", SANER: "Software Analysis, Evolution and Reengineering conference",
  ISSRE: "International Symposium on Software Reliability Engineering", JSS: "Journal of Systems and Software", ESEM: "Empirical Software Engineering and Measurement symposium",
  CCS: "ACM Conference on Computer and Communications Security", ICSME: "International Conference on Software Maintenance and Evolution", SEIP: "Software Engineering in Practice track",
  MALTA: "Maintenance-Aware Technical Lag", CISA: "Cybersecurity and Infrastructure Security Agency", DORA: "DevOps Research and Assessment", SCA: "software composition analysis",
  CHAOSS: "Community Health Analytics in Open Source Software", NBER: "National Bureau of Economic Research", RCT: "randomized controlled trial", RCTs: "randomized controlled trials",
  PM: "product manager", PMs: "product managers", EM: "engineering manager", EMs: "engineering managers", IC: "individual contributor", ICs: "individual contributors",
  CTO: "chief technology officer", CPO: "chief product officer", CEO: "chief executive officer", SRE: "site reliability engineering", MCP: "Model Context Protocol",
  PR: "pull request", PRs: "pull requests", PRD: "product requirements document", PRDs: "product requirements documents", APM: "associate product manager",
  DX: "developer experience", SAST: "static application security testing", XSS: "cross-site scripting", SQL: "Structured Query Language", API: "application programming interface",
  APIs: "application programming interfaces", DAST: "dynamic application security testing", IAST: "interactive application security testing",
  CWE: "Common Weakness Enumeration", JSON: "JavaScript Object Notation", XML: "Extensible Markup Language", DOM: "Document Object Model", CI: "continuous integration",
  ASVS: "Application Security Verification Standard", HTTP: "Hypertext Transfer Protocol", AST: "abstract syntax tree", CSP: "Content Security Policy",
  XXE: "XML external entity", SSRF: "server-side request forgery", CNCF: "Cloud Native Computing Foundation", IDOR: "insecure direct object reference",
  PLAS: "Programming Languages and Analysis for Security workshop", CACM: "Communications of the ACM", XHP: "an HTML extension for PHP", SAP: "SAP, the software company",
  SZZ: "the Sliwerski, Zimmermann and Zeller algorithm", ICPC: "International Conference on Program Comprehension", CHI: "ACM Conference on Human Factors in Computing Systems",
  SOUPS: "Symposium on Usable Privacy and Security", ISSTA: "International Symposium on Software Testing and Analysis", SWE: "software engineering", RSAC: "RSA Conference",
  NSPW: "New Security Paradigms Workshop", EMSE: "Empirical Software Engineering journal", JSEP: "Journal of Software: Evolution and Process",
  SCAM: "Source Code Analysis and Manipulation conference", MITRE: "the MITRE Corporation", RAG: "retrieval-augmented generation", NDSS: "Network and Distributed System Security Symposium",
  MACE: "a privilege-escalation detection tool", PROMISE: "Predictive Models and Data Analytics in Software Engineering conference", TAG: "Technical Advisory Group",
  ICST: "International Conference on Software Testing", USENIX: "the USENIX Association", OOPSLA: "Object-Oriented Programming, Systems, Languages and Applications conference",
  MSP: "IEEE Security and Privacy magazine", GPT: "generative pre-trained transformer", EOL: "end of life", PW: "Privacy Workshops", AppSec: "application security", AOL: "America Online", HR: "human resources", BI: "Business Insider", OT: "a project code name",
  NBC: "National Broadcasting Company", FAANG: "Facebook, Apple, Amazon, Netflix and Google", SVPG: "Silicon Valley Product Group", GM: "general manager",
  METR: "Model Evaluation and Threat Research", WP: "working paper", ADP: "Automatic Data Processing, a payroll company", DEL: "Digital Economy Lab",
  SSRN: "Social Science Research Network", SF: "San Francisco", TLM: "tech lead manager", TLMs: "tech lead managers", OSS: "open-source software", SSDF: "Secure Software Development Framework", SBOM: "software bill of materials",
};
const PAGE_CSS = [
  "abbr.rep[title] { text-decoration: none; }",
  ".sources ol { padding-left: 2.4em; }",
  ".brief + .brief { margin-top: 2em; } h2 + .brief { margin-top: 1em; }",
  "@media print {",
  "  main a[href]::after, main a[href^=\"http\"]:not(.no-url)::after { content: none !important; }",
  "  tr, .brief, .callout, pre { break-inside: avoid; }",
  "  p:has(+ .table-wrap), p:has(+ pre), .callout:has(+ ul), .callout:has(+ ol) { break-after: avoid; }",
  "}",
].join("\n");
function abbreviate(html: string) {
  // Every use, in text outside tags, code and existing abbr elements; repeats get class rep, which hides the dotted underline.
  const seen = new Set<string>();
  return html.split(/(<code[\s\S]*?<\/code>|<abbr[\s\S]*?<\/abbr>|<title>[\s\S]*?<\/title>|<[^>]+>)/).map((part, i) => i % 2 ? part
    : part.replace(/(\()?\b([A-Z]{2,5}s?)\b(?=(\)?))/g, (all, open, a, close) => {
        if (!ABBR[a]) return all;
        const repeat = seen.has(a);
        seen.add(a);
        return `${open ?? ""}<abbr title="${ABBR[a]}"${repeat ? ' class="rep"' : ""}>${a}</abbr>`;
      })).join("");
}

// Markdown -> house-style prose: heading ids, annex classes, callouts, wrapped tables, table notes.
function renderProse(md: string) {
  const heads: { id: string; text: string; annex: boolean }[] = [];
  const used = new Set<string>();
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    let text = this.parser.parseInline(tokens);
    let id = "";
    const custom = text.match(/\s*\{#([a-z0-9-]+)\}\s*$/);
    if (custom) { id = custom[1]; text = text.slice(0, custom.index); }
    if (!id) id = slugify(text);
    while (used.has(id)) id += "-2";
    used.add(id);
    const annex = depth === 2 && ANNEX.test(text.replace(/<[^>]+>/g, "").trim());
    if (depth === 2) heads.push({ id, text, annex });
    return `<h${depth} id="${id}"${annex ? ' class="annex"' : ""}>${text}</h${depth}>\n`;
  };
  renderer.table = function (token) {
    const cell = (c: any, tag: string, scope = "") => {
      const align = c.align === "right" ? ' class="num"' : "";
      return `<${tag}${scope}${align}>${this.parser.parseInline(c.tokens)}</${tag}>`;
    };
    const head = `<thead><tr>${token.header.map((c: any) => cell(c, "th", ' scope="col"')).join("")}</tr></thead>`;
    const rows = token.rows.map((r: any[]) => `<tr>${r.map((c) => cell(c, "td")).join("")}</tr>`).join("");
    return `<div class="table-wrap"><table>${head}<tbody>${rows}</tbody></table></div>\n`;
  };
  renderer.blockquote = function ({ tokens }) {
    const inner = this.parser.parse(tokens);
    const m = inner.match(/^<p>\[!(NOTE|SYNTHESIS|RISK|CAUTION|DECISION|GAP)\]\s*/);
    if (!m) return `<blockquote>${inner}</blockquote>\n`;
    const kind = m[1];
    const cls = kind === "RISK" || kind === "CAUTION" ? " risk" : kind === "DECISION" ? " decision" : "";
    const label = { NOTE: "Note", SYNTHESIS: "Synthesis", RISK: "Risk", CAUTION: "Caution", DECISION: "Decision", GAP: "Evidence gap" }[kind];
    const rest = inner.slice(m[0].length).replace("</p>", "");
    return `<div class="callout${cls}"><span class="label">${label}</span>${rest}</div>\n`;
  };
  let html = marked.parse(md, { renderer, gfm: true }) as string;
  // [[shown]] or [[shown~Glossary term]] (a tilde, so it also works inside table cells): an inline definition taken from the page glossary.
  const gloss = new Map<string, string>();
  const gkey = (s: string) => s.replace(/<[^>]+>/g, "").replace(/&#39;|&rsquo;|’/g, "'").replace(/&quot;/g, "\"").replace(/&amp;/g, "&").toLowerCase().trim();
  for (const m of html.matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g)) gloss.set(gkey(m[1]), m[2].replace(/<[^>]+>/g, ""));
  html = html.replace(/\[\[([^\]~]+)(?:~([^\]]+))?\]\]/g, (_, shown, key) => {
    const k = gkey(key ?? shown), def = gloss.get(k) ?? gloss.get(k.replace(/s$/, ""));
    if (!def) throw new Error(`no glossary entry for [[${key ?? shown}]]`);
    return `<span class="term" tabindex="0" data-def="${esc(def)}">${shown}</span>`;
  });
  // Link text that is a bare address gets <code>, so it can wrap on a phone.
  html = html.replace(/(<a href="[^"]+">)([^<\s]*\/[^<\s]*)(<\/a>)/g, "$1<code>$2</code>$3");
  // A paragraph straight after a table that starts "Source" or "Note" is that table's note.
  html = html.replace(/(<\/table><\/div>\n)<p>((?:Sources?|Notes?|Figures)\b)/g, '$1<p class="table-note">$2');
  return { html, heads };
}

function toc(heads: { id: string; text: string; annex: boolean }[]) {
  let first = true;
  const items = heads.map((h) => {
    const cls = h.annex && first ? ' class="annex-start"' : "";
    if (h.annex) first = false;
    return `<li${cls}><a href="#${h.id}">${h.text.replace(/<a [^>]*>|<\/a>/g, "")}</a></li>`;
  }).join("\n");
  return `<nav class="toc" aria-label="Contents"><details open><summary>Contents</summary><ol>\n${items}\n</ol></details></nav>`;
}

function masthead(e: { kicker: string; title: string; dek: string }, meta: string[], up: string) {
  return `<header class="masthead">
  <div class="toolbar no-print"><a href="${up}">All research</a> · <a href="${up}about/">How this research is made</a> <button type="button" class="print-btn">Save as PDF</button></div>
  <div class="kicker">${esc(e.kicker)}</div>
  <h1>${esc(e.title)}</h1>
  <p class="dek">${e.dek}</p>
  <div class="meta">${meta.map((m) => `<span>${m}</span>`).join("")}</div>
</header>`;
}

const footer = (up: string) => `<hr class="mark">
<p class="table-note">${SITE}. Researched with AI agents and reviewed by Julie Davila: <a href="${up}about/">how this research is made</a>. Text licensed <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Source on <a href="${REPO}">GitHub</a>.</p>`;

async function assemble(slug: string, bodyHtml: string, title: string) {
  mkdirSync(tmp, { recursive: true });
  const bodyPath = join(tmp, `${slug || "index"}.body.html`);
  const dir = slug ? join(out, slug) : out;
  mkdirSync(dir, { recursive: true });
  await Bun.write(bodyPath, `<style>${PAGE_CSS}</style>\n` + abbreviate(bodyHtml));
  const p = Bun.spawnSync(["bun", join(root, "kit/tools/page.mjs"), bodyPath, join(dir, "index.html"),
    "--pattern", "understand", "--brand", join(root, "brand.json"), "--title", title, "--check"]);
  const log = (p.stdout.toString() + p.stderr.toString()).trim();
  console.log(`${slug || "index"}: ${p.exitCode === 0 ? "ok" : "FAIL"}${log ? "\n  " + log.split("\n").join("\n  ") : ""}`);
  return p.exitCode === 0;
}

rmSync(out, { recursive: true, force: true });
const entries = readEntries().sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || b.published.localeCompare(a.published));
let ok = true;

for (const e of entries) {
  // sources: inline -> a Sources list built from the links in the text, in order of first use.
  if ((e as any).sources === "inline" && !/^## Sources/m.test(e.body)) {
    const seen = new Map<string, string>();
    for (const m of e.body.matchAll(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g)) if (!seen.has(m[2])) seen.set(m[2], m[1]);
    e.body += "\n## Sources\n\nEvery source linked in the text, in order of first use.\n\n<div class=\"sources\"><ol>\n" +
      [...seen].map(([url, label]) => `<li>${label.replace(/\*/g, "").replace(/\.+$/, "")}. <a href="${url}">${url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></li>`).join("\n") + "\n</ol></div>\n";
  }
  const { html, heads } = renderProse(e.body);
  const minutes = Math.max(1, Math.round(e.words / 230));
  const meta = e.layout === "about"
    ? [`Updated ${fmtDate(e.updated ?? e.published)}`]
    : [`Version ${esc(e.version)}`, `Published ${fmtDate(e.published)}`, ...(e.updated ? [`Updated ${fmtDate(e.updated)}`] : []), `${minutes} min read`, "AI-assisted research"];
  const rail = heads.length >= 4 || e.words >= 1200;
  const body = `${masthead(e, meta, "../")}
<main>
<div${rail ? ` class="with-toc"` : ""}>
<p class="purpose">${e.purpose}</p>
${rail ? toc(heads) : ""}
<div class="prose">
${html}
${footer("../")}
</div>
</div>
</main>`;
  ok = (await assemble(e.slug, body, `${e.title} · ${SITE}`)) && ok;
}

// The contents page: every entry except the about page, newest first within its order.
const list = `<h2 id="briefs">Every brief opens with its answer and ends with its sources</h2>\n` + entries.filter((e) => e.layout !== "about").map((e) => `<div class="brief"><h3 id="${e.slug}"><a href="${e.slug}/">${esc(e.title)}</a></h3>
<p>${e.dek}</p>
<p class="table-note">${esc(e.kicker)} · Version ${esc(e.version)} · ${fmtDate(e.updated ?? e.published)} · ${Math.max(1, Math.round(e.words / 230))} min read</p></div>`).join("\n");
const index = `<header class="masthead">
  <div class="toolbar no-print"><a href="about/">How this research is made</a></div>
  <div class="kicker">Research</div>
  <h1>Research on making secure software the easy path</h1>
  <p class="dek">Research briefs on software security, engineering practice and developer experience, built from public sources with AI research agents and reviewed by a person. Every page shows its method and its sources, and prints to a clean PDF.</p>
  <div class="meta"><span>${entries.length - 1} briefs</span><span>Updated ${fmtDate(entries.map((e) => e.updated ?? e.published).sort().at(-1)!)}</span></div>
</header>
<main>
<div>
<p class="purpose">Pick a brief below. Each one opens with its answer, ends with how it was made and what it rests on, and can be saved as a PDF from the button at its top or from your browser's print menu.</p>
<div class="prose">
${list}
${footer("")}
</div>
</div>
</main>`;
ok = (await assemble("", index, SITE)) && ok;
await Bun.write(join(out, ".nojekyll"), "");
rmSync(tmp, { recursive: true, force: true });
if (!ok) process.exit(1);
