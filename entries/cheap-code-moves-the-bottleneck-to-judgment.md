---
title: Cheap code moves the bottleneck to judgment
kicker: Research brief · Engineering organizations and AI
dek: As AI agents make writing code cheap, the scarce work moves to deciding what to build, verifying what agents produce, and pushing decision rights to small teams. This brief collects what companies, researchers and labour-market data show about team shape, roles and pilots as of late 2026.
purpose: After reading this brief you can explain how AI coding tools are changing software team size, roles and management, what the evidence does and does not support, and how to run a pilot of a smaller AI-native team that produces honest data.
published: 2026-10-29
version: "1.0"
order: 3
sources: inline
---

## Small owning pods on a strong platform are the emerging pattern {#summary}

The emerging best practice is **small, flat, multidisciplinary pods of roughly 3 to 6 people who own outcomes end to end, on a strong platform that supplies agent tooling and deterministic guardrails**. Writing code is no longer the hard part; deciding what to build, verifying what agents produce, and pushing decision rights to teams is.

"Product engineer" is real and spreading, but in documented practice it means PM-light and PM-late, not PM-free. Big tech is cutting layers and shrinking teams, mostly without formally blaming AI. Individual output rises 10 to 30% net on typical enterprise work, while review load, instability and incidents rise with it. Early-career hiring in AI-exposed jobs is down 8 to 19% versus comparison groups. For security organizations in regulated industries, verification and guardrail capacity, not authoring capacity, is the resource to plan around.

## Big tech is delayering first and attributing it to AI second

The consistent 2026 pattern is **fewer layers, wider spans, player-coach managers and small generalist teams**. AI is the stated rationale only some of the time.

**Uber** is the best-documented case. Agent-authored code changes rose from under 1% to about 8% by March 2026, when CTO Praveen Neppalli Naga described a "zero human authoring" workflow where engineers review and approve agent changes ([Business Insider via AOL](https://www.aol.com/articles/uber-cto-says-going-big-121842597.html)). By April, agents wrote about 11% of live backend updates and Claude Code usage blew past plan ([Benzinga via Yahoo Finance](https://finance.yahoo.com/sectors/technology/articles/ubers-anthropic-ai-push-hits-223109852.html)). Spend became the constraint: $500 to $2,000 per engineer per month, then a reported $1,500 cap by June ([Tech Times](https://www.techtimes.com/articles/317842/20260605/uber-cuts-23-hr-staff-new-president-denies-ai-role-95-engineers-use-it-daily.htm)). Uber built verification early: its uReview AI reviewer covers over 90% of \~65,000 weekly diffs ([Uber Engineering, Aug 2025](https://www.uber.com/us/en/blog/ureview/)). The Sep 2, 2026 layoff of \~3,300 (10%) cut managers 20%, halved one- and two-person teams and merged engineering, science and delivery, with no mention of AI ([TechCrunch](https://techcrunch.com/2026/09/02/uber-is-laying-off-10-of-staff-or-3300-people/); [Gizmodo](https://gizmodo.com/ai-or-overhiring-uber-targets-middle-management-with-10-cut-to-workforce-2000806239)). "Agentic Pods" embedded 30 AI-proficient engineers in finance, legal and HR; results are self-reported ([BI via AOL](https://www.aol.com/articles/ubers-cto-embedded-top-ai-152402000.html)).

**Meta** made the most explicit AI redesign and the most visible partial reversal. "Project OT" (Jan 2026) aimed to cut many teams by \~60%, and "AI-native pods" of 3 to 5 were piloted to do the work of 10 to 20 ([Pragmatic Engineer](https://blog.pragmaticengineer.com/the-pulse-meta-wanted-to-reduce-teams-by-60-because-of-ai/)). AI impact entered 2026 performance reviews ([eWeek](https://www.eweek.com/news/meta-ai-performance-reviews/)). After \~8,000 cuts in May, weighted to managers, Meta began inviting ICs back into management by September ([Fortune](https://fortune.com/2026/09/12/meta-year-of-efficiency-managers-ai-investment/)). Instagram's Adam Mosseri describes teams of four to six more generalist engineers ([BI via Yahoo Finance](https://finance.yahoo.com/technology/ai/articles/2-pizza-days-over-heres-095501046.html)).

**Amazon** has the clearest operating-model statement. Werner Vogels amended Working Backwards on Jun 30, 2026 to build a prototype *before* the doc, with everyone owning the product end to end ([All Things Distributed](https://www.allthingsdistributed.com/2026/06/return-to-two-pizza-culture.html)). GeekWire reports projects that took 30 to 40 people now run with 6 to 8; Swami Sivasubramanian claims a median 4.5x gain for restructured teams (internal, self-reported) ([GeekWire](https://www.geekwire.com/2026/how-agentic-ai-is-rewiring-amazons-teams-and-upending-its-traditions/)).

**Others:** Google cut 35% of small-team managers in the year to Aug 2025 ([NBC News](https://www.nbcnews.com/business/business-news/google-eliminated-35-percent-managers-overseeing-small-teams-exec-says-rcna227486), headline-level). Microsoft says AI is not behind its Oct 2026 voluntary exit offer; Netflix's \~1,000 cuts cited no AI; Apple is retraining Siri engineers in an AI coding bootcamp ([MacRumors](https://www.macrumors.com/2026/04/15/siri-engineers-ai-coding-bootcamp/)). Coinbase (May 2026) replaced pure managers with player-coaches, capped layers at 5 below the CEO with spans of 15+, and is testing "one person teams" ([Fast Company](https://www.fastcompany.com/91537137/read-the-email-coinbase-ceo-brian-armstrong-sent-when-he-laid-off-14-of-his-staff)). Block cut \~40% explicitly citing AI ([Semafor](https://www.semafor.com/article/02/27/2026/jack-dorseys-block-to-slash-staff-by-40-over-ai-progress)). Salesforce froze engineering hiring while expecting \~$300M of Anthropic token spend ([Outlook Business](https://www.outlookbusiness.com/corporate/300-mn-on-anthropic-zero-on-engineers-inside-salesforces-ai-pivot)). **AI spend now competes directly with headcount budgets**. Skeptics including Sam Altman and Forrester call much of this "AI washing" ([Forbes](https://www.forbes.com/sites/maryroeloffs/2026/05/07/ceos-say-layoffs-are-ais-fault-but-some-experts-think-companies-are-lying/)).

"Percent of code written by AI" has become an investor-relations metric, and the figures are not comparable:

| Company | Claim | Date | What it likely measures | Verification |
| --- | --- | --- | --- | --- |
| Google | 75% of new code | Apr 2026 | AI-generated new code, definition undisclosed | Self-reported ([Semafor](https://www.semafor.com/article/04/24/2026/google-ceo-says-75-of-companys-new-code-is-ai-generated)) |
| Snap | 65% | Apr 2026 | AI-generated code | Self-reported (same source) |
| Airbnb | 60% | Q1 2026 | Code engineers produced | Earnings call ([TechCrunch](https://techcrunch.com/2026/05/08/airbnb-says-ai-now-writes-60-of-its-new-code/)) |
| Uber | \~8% / \~11% / \~70% | Mar / Apr / Jun 2026 | Fully agent-authored changes / live backend updates / AI-assisted code | Mixed; 70% is secondary, no method |
| DX (cross-industry) | 22% of merged code | Q4 2025 | AI-authored merged code, 135k devs | Vendor telemetry ([DX](https://getdx.com/report/ai-assisted-engineering-q4-impact-report/)) |

No FAANG company has published a PM:eng ratio change, and there is no verified 2026 manager:IC ratio for Google or Amazon.

## The product engineer is PM-light and PM-late, not PM-free

A product engineer is a full-stack engineer who owns a feature from problem framing through shipping, talks to users and judges outcomes, with little or no PM layer. Lee Robinson framed it in 2023 as working backwards from the product experience ([leerob.com](https://leerob.com/product-engineers)). **PostHog** documents it best: engineers lead product teams, run support rotations and pick the roadmap, and PMs arrive only once a product earns revenue ([PostHog careers](https://posthog.com/careers/product-engineer); [handbook](https://posthog.com/handbook/product/product-manager-role.md)). Its co-founder later admitted he was partly wrong to resist PMs ([PostHog newsletter, Dec 2024](https://newsletter.posthog.com/p/product-management-is-broken-engineers)). **Linear**'s current "Product Engineer, AI" posting adds prompt optimization and model evaluation to the job ([Linear careers](https://linear.app/careers/b4a7764e-c680-4bdf-9956-dc78f2ca94d5)). The 2025-26 change is that **evals, prompts and agent-facing surfaces joined the role**. WorkOS runs about 1 PM per 80 engineers ([Pragmatic Engineer, Jan 2026](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what)). These exemplars are mostly dev-tools and AI-native companies with technical users, which limits how far the model generalizes.

**LinkedIn** is the only large company with a fully documented ladder change. CPO Tomer Cohen introduced the "Full Stack Builder" in Jan 2025, wrote it into hiring and reviews in Aug 2025, and replaced the APM program with an "Associate Product Builder" program from Jan 2026 ([BI via AOL](https://www.aol.com/articles/linkedin-scrapping-associate-product-manager-063508038.html)). Specialist tracks persist ("System Builders" for platforms, "Craft Leaders" for standards) and no consolidation ratio was published; one analysis concludes LinkedIn changed a job description, not a staffing ratio ([pearpages, Aug 2026](https://pearpages.com/blog/2026/08/10/linkedins-full-stack-builder-what-actually-got-merged)). Meta retitled \~1,000 developer-tools staff "AI Builder" or "AI Pod Lead" in a March 2026 pilot ([The Decoder](https://the-decoder.com/meta-tests-new-way-of-working-with-ai-native-pods-to-boost-productivity/)).

The voices split into two camps that agree more than they admit:

- **Engineers absorb product.** Anthropic's Boris Cherny expects the "software engineer" title to fade; on his Claude Code team everyone, PM and designer included, shares one title and codes ([Roger Wong, Feb 2026](https://rogerwong.me/2026/02/what-happens-after-coding-is-solved-boris-cherny)).
- **Product becomes the bottleneck.** Anthropic's Head of Growth says a 5-engineer team now produces the output of 15 to 20, PM capacity hasn't kept up, so Anthropic is *hiring more PMs* and deputizing engineers as "mini-PMs" on sub-two-week projects ([Lenny's thread, Apr 2026](https://threadreaderapp.com/thread/2041166073794592926.html), secondhand). SVPG argues the product trio persists because discovery still needs distinct judgment ([SVPG](https://www.svpg.com/ai-resource-guide/)).
- **Andrew Ng moved.** In mid-2025 he relayed a team proposing 2 PMs per engineer ([HackerNoon](https://hackernoon.com/andrew-ng-product-team-ratios-evolving-to-just-one-software-developer-for-every-two-product-manager)); by Apr 2026 he saw engineer:PM ratios moving from about 8:1 toward 1:1 as engineers take on product work ([The Batch #349](https://www.deeplearning.ai/the-batch/issue-349/)).

Both camps agree handoffs (PRD → ticket → implementation) are shrinking and judgment is the scarce input; they differ on whether it sits in a specialist PM or in every builder.

The day-to-day loop: prototype several variants with agents instead of writing specs (Simon Willison: a UI prototype is "free now"; [simonwillison.net](https://simonwillison.net/2026/Apr/2/lennys-podcast/)), pick through usage data or evals ("evals are the new PRDs", Anthropic's Dianne Penn; [summary](https://completeaitraining.com/news/evals-replace-prds-as-core-tool-for-ai-product-managers/)), harden, measure, and unship. Non-engineers ship too: Intercom set a goal for PMs, designers and EMs to ship small changes ([Fin Ideas](https://ideas.fin.ai/p/2)); Ramp reportedly saw \~1,000 PRs a month from non-engineers and split PM into Technical PM, Taste-maker and GM tracks ([BuildBetter](https://blog.buildbetter.ai/ramp-ai-product-factory-internal-tools/), secondhand). PM demand data conflict: TrueUp via Lenny Rachitsky showed PM openings at a three-year high in Mar 2026 ([X](https://x.com/lennysan/status/2036483059407810640)), while a report cited by Forbes claims a 30% decline ([Forbes](https://www.forbes.com/sites/larryenglish/2026/07/30/ai-is-rewriting-the-rules-of-product-development/)).

## Output rises, delivery lags, and stability pays the bill

The evidence trades rigor against recency: the cleanest RCTs predate agentic tools, and agentic-era data is mostly vendor telemetry and surveys.

| Study | Design, sample | Finding |
| --- | --- | --- |
| [METR follow-up, Feb 2026](https://metr.org/blog/2026-02-24-uplift-update/) | RCT, 57 devs, 800+ tasks | Broke down: devs refused to work without AI; METR now thinks true speedup exceeds what it can measure |
| [Faros AI, 2026](https://www.faros.ai/blog/ai-acceleration-whiplash-takeaways) | Vendor telemetry, 22k devs | Throughput +34%, review time +441%, unreviewed merges +31%, incidents per PR +243% |
| [DORA 2025](https://dora.dev/insights/dora-2025-year-in-review/) | Survey, \~5,000 | Throughput link turned positive; instability still elevated; AI amplifies the existing system |
| [Stanford, Denisov-Blanch](https://www.sirris.be/en/inspiration/how-much-more-productive-does-ai-make-developers) | Telemetry, \~100k devs | 15-20% net of rework; 5-10% on complex brownfield; not peer-reviewed |
| [METR, Jul 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | RCT, 16 experienced OSS devs | 19% slower, while believing they were \~20% faster |
| [GitClear](https://devclass.com/2025/02/20/ai-is-eroding-code-quality-states-new-in-depth-report/) | Vendor, 2024 code data | Duplicated blocks \~8x; refactoring −40% |
| [Google RCT](https://arxiv.org/abs/2410.12944) | RCT, 96 engineers, 2024 | \~21% faster task completion |
| [Cui, Demirer et al.](https://economics.mit.edu/sites/default/files/inline-files/draft_copilot_experiments.pdf) | Field RCTs, 4,867 devs (Microsoft, Accenture, Fortune 100) | PRs +26%; build success −5.5% (−17.4% at Accenture) |
| [DORA 2024](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report) | Survey | Each +25% AI adoption: stability −7.2% |

DORA 2025 names seven capabilities that turn individual gains into organizational ones, including quality internal platforms, small batches and a clear AI stance ([RedMonk](https://redmonk.com/rstephens/2025/12/18/dora2025/)). Qodo's Sep 2026 survey (a vendor that sells AI review) finds reviewing AI code the top delivery bottleneck, and only 45% of leaders can trace AI activity to code changes ([Qodo](https://www.qodo.ai/blog/state-of-ai-code-quality-report-2026/)). Charity Majors' summary: AI demands more engineering discipline, not less ([via Simon Willison](https://simonwillison.net/2026/Jun/17/charity-majors/)).

Two results support small autonomous units. In a pre-registered RCT of 776 P&G professionals, **one person with AI matched a two-person team without it** and bridged R&D/commercial silos ([NBER w33641](https://www.nber.org/papers/w33641); non-software). A GitHub quasi-experiment found Copilot shifted maintainers from coordination toward coding, more autonomous and less collaborative ([CESifo WP 11479](https://ideas.repec.org/p/ces/ceswps/_11479.html)). Together: AI makes the individual a more complete unit but loads verification and operations, so **small pods need stronger platform, quality and SRE support, not less**.

## The academic literature confirms convergence and warns about review and learning

A structured literature screen in Elicit of 20 papers (2022-2026) lands where industry does: **role convergence runs both ways, and gains track workflow redesign rather than tool access**.

- **Convergence.** Ulloa et al. (2025) surveyed 885 Microsoft PMs plus telemetry: PMs now script, prototype and build agents, with delegation shaped by identity and accountability. Li et al. (2025, 22 interviews) found designers coding more and developers shifting to oversight and product thinking, with new asymmetries in trust and responsibility. Zhang et al. (2026) describe vertically integrated "Super-Cells"; their 8-33x person-month reduction is a projection, not a measurement.
- **Capacity.** He et al. (2026), a staggered diff-in-diff on 802 developers and 196,212 PRs under a "2x" mandate: merged PRs per engineer hit 2.09x at peak (1.46x attributable to adoption), **per-reviewer load roughly doubled**, automated review overtook human review, and merge and revert rates held. Song et al. (2024): +5.9% merged PRs in open source but +41.6% integration time.
- **Experience.** Vella & Blincoe (2026) followed 158 engineers for six months: 84% reported productivity gains, yet those reporting worse developer experience rose from 14% to 27%. They name the new category "supervisory engineering work."
- **Closest analog.** Vilas Boas et al. (2026): one staff engineer with four agents at a **financial institution** delivered five features in three sprints vs. six planned for a four-person team, with 90% first-review acceptance. Binding constraints were spec quality and institutional knowledge; authors say it is no general substitute for teams outside bounded, familiar brownfield work.
- **Team learning.** Ulfsnes et al. (2024): consulting AI instead of colleagues disrupts knowledge sharing ("pair prompting" helps). Miller et al. (2025): productivity pressure without learning support undermines the skill growth that produces the gains. Rico & Öberg (2025) and Sun & Staron (2026) expect managers to move into AI governance, with traceability and artifact certification still open problems.

Caveat: the literature is mostly qualitative and single-organization, and **no large-sample study yet measures AI-driven team-size change directly**.

## The junior pipeline narrows through missing hires, not layoffs

Labor-market data is the most rigorous evidence here, and it points to a slow-building senior-pipeline risk.

- Stanford's "Canaries in the Coal Mine" (ADP payroll data): employment for 22-25-year-olds in AI-exposed jobs is **19% below** the counterfactual as of Jun 2026, up from 13% a year earlier, through reduced hiring, not separations; descriptive, not causal ([Stanford DEL](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/)).
- Hosseini & Lichtinger: junior employment at GenAI-adopting firms down 9-10% after six quarters while senior employment kept growing ([SSRN 5425555](https://www.alejandrobarros.com/wp-content/uploads/2025/11/ssrn-5425555.pdf)).
- Indeed: software postings are 27.5% below Feb 2020, and **senior roles account for 71%** of the 2025-26 rebound ([Indeed Hiring Lab, Jul 2026](https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/)).
- Bain: juniors fell from about a third of team composition to under a fifth ([Bain, Sep 2026](https://www.bain.com/insights/the-half-finished-redesign-how-ai-reshapes-software-organizations-technology-report-2026/)). Gartner predicts firms cutting junior roles will have weakened talent pipelines by 2028.

This sits awkwardly with the field experiments, where juniors gained *most* from AI (Cui et al., though mostly not significant). Firms appear to be substituting AI for junior task bundles rather than amplifying juniors, leaving no clear source for tomorrow's senior reviewers.

Management is reshaping too. Gergely Orosz sees EMs managing 12 to 14 people, up from 4 to 8; Will Larson says tech-lead managers are in demand and leadership "as we know it" won't survive three years ([Pragmatic Engineer, Oct 2026](https://newsletter.pragmaticengineer.com/p/the-revised-rules-of-engineering)). Meta's September move back toward managers is the counterweight: over-flattening costs workload strain and lost domain knowledge.

## Frameworks agree on bounded agency, platforms and decision rights

**Gartner** (Jul 2026) predicts 60% of organizations will run "tiny teams" of 4-5 at scale by 2029, up from 15% in 2026, including a PM and an "agent experience" designer, on platform engineering, and explicitly not as cost optimization ([People Matters recap](https://www.peoplematters.in/news/ai-and-emerging-tech/60percent-of-organisations-to-adopt-smaller-software-engineering-teams-by-2029-gartner-50748); primary not retrieved).

**Bain**'s "Half-Finished Redesign" (n=155) gives the sharpest diagnosis. Traditional pyramids fell from 66% to 29% and engineer time spent directing agents rose from 4% to 23%, but **70% still decide centrally**, so approvals and escalations haven't moved. The fix is redistributing decision rights: where humans decide, where agents act, who owns the outcome ([Bain, Sep 2026](https://www.bain.com/insights/the-half-finished-redesign-how-ai-reshapes-software-organizations-technology-report-2026/)). **McKinsey** recommends cross-functional pods with governance expertise plus an AI-native platform team owning guardrails, and names a "model governance officer" role ([McKinsey, Jul 2026](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/ai-native-development-rethinking-software-from-the-ground-up)).

**Team Topologies** carries over largely intact, per Matthew Skelton: stream-aligned teams steward services, platforms deliver capability as a service, and cognitive-load limits map to agent context windows. He adds **"bounded agency"** (citing OWASP LLM06 Excessive Agency) and an "Innovation and Practices Enabling Team" that spreads working patterns by opt-in, not mandate ([InfoQ, Mar 2026](https://infoq.com/news/2026/03/ai-agency-team-topologies)). Kief Morris on martinfowler.com puts humans "on the loop": engineer the harness of specs, checks, evals and telemetry, and fix the system rather than each artifact ([summary](https://github.com/MLOpsEngineer/harness-engineering/blob/main/docs/blogs/2026-03-04-martinfowler-humans-and-agents-in-software-engineering-loops.md)). Thoughtworks Radar Vol. 34 calls for a return to fundamentals against "cognitive debt" and treats zero trust and sandboxing for agents as table stakes ([PR Newswire](https://www.prnewswire.com/news-releases/as-ai-accelerates-software-complexity-thoughtworks-technology-radar-urges-a-return-to-engineering-fundamentals-to-combat-cognitive-debt-302737210.html)).

**Security** guidance has converged on treating agents as identities. At the May 2026 SF AppSec Summit, practitioners said manual code review is no longer the primary control, and recommended a revocable identity per agent, logged tool calls, per-invocation scoping, sandboxing, egress allowlists, no ambient credentials, and human approval for irreversible actions ([GitGuardian recap](https://blog.gitguardian.com/san-francisco-secure-software-and-appsec-summit-2026/), vendor-hosted). A practitioner mapping adds that guardrails must be deterministic code, not prompts, and a guardrail duplicated across three teams belongs in the platform ([Wulveryck, Jun 2026](https://blog.owulveryck.info/2026/06/24/who-does-what-team-topologies-for-the-agentic-platform.html)). No source publishes AppSec:developer or reviewer:agent ratios for the agent era.

## What this means for security engineering in regulated industries

*Synthesis and judgment drawn from the evidence above, not sourced fact.*

**Team shape.** Move toward stream-aligned pods of about 4 to 6 that own a security product or control end to end: problem, build, rollout, adoption metrics and on-call. Write "product engineer" into the ladder as expectations (user contact, outcome ownership, evals) rather than using it to remove roles. Keep a distinct platform function that supplies the paved road for agent use, and consider a small enabling team that spreads working agent patterns across the enterprise. Avoid one- and two-person teams for regulated controls: Uber halved them, and key-person and segregation-of-duties risk make them fragile under audit. Flatten deliberately; Meta's reversal shows removing managers faster than domain knowledge can move costs more than it saves.

**Review and verification capacity.** Plan for per-reviewer load to roughly double as authoring speeds up (He et al.), and budget reviewer time explicitly. Brownfield, compliance-heavy code sits at the low end of the gain range, so don't size teams on vendor or big-tech figures. Point human review at intent, design, threat models and irreversible changes; let AI first-pass review and deterministic checks (policy-as-code, mutation tests, generation-time SAST and secrets scanning) handle line-level work. Track review latency, PR size, unreviewed-merge rate, change failure rate and incidents per change. Percent of AI-written code and PR counts measure activity, not outcomes.

**Guardrails for agents.** This is where a security engineering org has the most enterprise leverage, and it is a natural platform product: per-agent revocable identities, scoped short-lived credentials, sandboxed execution, egress allowlists, logged tool calls, approval gated on reversibility, and **traceability from agent activity to code change**: the gap only 45% of leaders say they can close, and one regulators and auditors will ask about. Guardrails should be code, not prompts, and apply equally to humans, agents and pipelines. Expect AI spend to compete with headcount, as at Uber and Salesforce, and build cost observability into the platform.

**Junior pipeline.** Keep hiring early-career engineers deliberately, as a resilience investment. Redesign the junior role around verification, threat modeling, eval writing and supervised agent direction, and pair juniors with seniors ("pair prompting") to offset the team-learning loss the literature documents. Don't attach productivity targets to juniors without learning support.

**PM:eng.** For a security platform whose customers are internal engineering teams, a PM-light model (roughly one product-minded lead per one to three pods, engineers as mini-PMs on small scopes) is defensible because users are technical and reachable. Don't drop product judgment: adoption, prioritization across business lines and alignment with risk, compliance and audit are exactly the coordination work no source says AI has automated.

## Transition: from the traditional split to an AI-native model

The documented cases follow a recognizable order; the firms that skipped steps are the ones patching side effects.

1. **Change job definitions before headcount.** LinkedIn rewrote its ladder (Full Stack Builder) and hiring and review criteria first, and never published a consolidation ratio.
2. **Pilot pods on bounded work.** Meta piloted 3-5 person "AI-native pods"; the Vilas Boas bank case worked because the work was familiar brownfield with tight specs. Amazon changed Working Backwards to build a prototype before the doc.
3. **Build the harness before scaling.** Uber had its AI reviewer (uReview) covering 90%+ of diffs before agent-written code reached 8-11% of changes. DORA's framing: AI amplifies whatever system it lands in.
4. **Move decision rights, not just boxes.** Bain's central warning: most firms reshaped teams, but 70% still decide centrally, so approvals and escalations became the new bottleneck. Define where humans decide, where agents act, and who owns each outcome.
5. **Then resize.** Meta and Uber cut first and are now adjusting (Meta re-adding managers; Uber capping AI spend).

*Synthesis:* run it as a sequence of experiments with explicit exit criteria rather than a single reorg. Gate each step on leading indicators: review latency, PR size, unreviewed-merge rate, change failure rate, incidents per change, never on PR counts or percent of AI-written code.

## Middle managers: four paths, and a warning

The evidence shows where managers are going, but almost nothing on how to make the transition well.

| Path | What it looks like | Evidence |
| --- | --- | --- |
| Player-coach, wider span | Hands-on lead with 12-15+ reports | Coinbase: no "pure managers", 5 layers max, spans 15+ ([Fast Company](https://www.fastcompany.com/91537137/read-the-email-coinbase-ceo-brian-armstrong-sent-when-he-laid-off-14-of-his-staff)); Orosz sees EM spans of 12-14, up from 4-8 |
| Tech lead manager or IC | Back to building, leading a small pod | Will Larson: TLMs in high demand ([Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/the-revised-rules-of-engineering)) |
| AI governance and enablement | Owns agent policy, practices, adoption | Rico & Öberg 2025, Sun & Staron 2026 (Elicit review); McKinsey's "model governance officer"; Skelton's enabling team |
| Product lead | PM-light owner across a few pods | Anthropic's "mini-PM" pattern; Ng's shifting PM:eng ratios |

The warning is Meta: it cut \~8,000 in May 2026, weighted to managers, then began inviting ICs back into management by September ([Fortune](https://fortune.com/2026/09/12/meta-year-of-efficiency-managers-ai-investment/)). Coordination load and domain knowledge don't disappear with the role. Uber's 20% manager cut came with merged divisions, not a stated AI rationale.

*Synthesis:* in a regulated organization, governance, risk ownership and audit liaison are real landing spots, not consolation prizes, because that coordination work is exactly what AI hasn't automated. Decide each manager's path explicitly and early, and widen spans only as platform tooling and decision rights actually reduce coordination load.

## Internal platform teams: agents as customers, risk as value

Every source treats platforms as more important in this model, not less: DORA 2025 lists quality internal platforms among its seven AI capabilities, and McKinsey puts guardrails in a dedicated AI platform team.

- **Agents are now customers too.** Expose capabilities through APIs and MCP, and make internal docs and data AI-accessible (another DORA capability). Design the paved road for agents as well as engineers.
- **Guardrails as a product.** Ship agent identity, scoped short-lived credentials, sandboxing, egress controls and agent-to-code traceability as deterministic code, not prompts. A guardrail duplicated across three teams moves into the platform ([Wulveryck](https://blog.owulveryck.info/2026/06/24/who-does-what-team-topologies-for-the-agentic-platform.html)).
- **Verification as a service.** AI first-pass review, policy-as-code and generation-time scanning absorb the review load that roughly doubles per reviewer (He et al.).
- **Cost observability.** AI token spend now competes with headcount (Uber, Salesforce); the platform should make spend per team and per workflow visible.
- **Keep a product function.** Internal users are technical and reachable, so PM-light fits, but cross-business prioritization and alignment with risk, compliance and audit still need an owner.

*Synthesis: risk as measurable value delivery.* Treat each control as a product with adoption and outcome metrics, so risk reduction shows up as value rather than overhead:

| Value claim | Example metric |
| --- | --- |
| Paved-road adoption | % of changes (human and agent) through the paved road |
| Auditability | % of agent activity traceable to a code change |
| Exposure reduced | Time to remediate; standing credentials eliminated |
| Delivery unblocked | Review latency and approval wait time saved |
| Cost governed | AI spend per team vs. budget |

DORA names value stream management as what turns individual AI gains into organizational ones, so these metrics can sit directly on a value stream map alongside delivery work.

## Published pilots share a shape but rarely set exit criteria

The published pilots share a shape: bounded scope, short time box, a baseline to beat, and a human validation gate. What they mostly lack is exit criteria and downstream measurement: the academic studies find the costs show up in review load, incidents and team learning, which pilots rarely track.

### Documented examples

| Pilot | Shape | Result | Caveat |
| --- | --- | --- | --- |
| Vilas Boas et al., bank (2026) | 1 staff engineer + 4 agents on a backlog planned for 4 people | 5 features in 3 sprints vs. 6 planned; 90% first-review acceptance | Familiar brownfield, tight specs; human validation on every feature |
| Amazon Bedrock rebuild | 6 engineers on a contained rebuild | 76 days vs. est. 30 engineers × 12-18 months | Internal, self-reported; clear target, not discovery |
| Meta AI-native pods (Feb 2026) | 3-5 people given work of 10-20; \~1,000 retitled "AI Builder" / "AI Pod Lead" | Led into broader team cuts | Domain experts left; managers partly re-added by Sep 2026 |
| Uber Agentic Pods (2026) | 30 engineers on two-week embeds in finance, legal, HR | e.g. a 2-day report cut to 10 minutes | Self-reported; automation of other teams, not an eng reorg |
| Intercom, Ramp | PMs, designers, EMs shipping small changes | Ramp: \~1,000 non-engineer PRs a month | Deploy previews as the safety net; secondhand |
| Coinbase (May 2026) | "One-person teams" spanning eng, design, product | No results published | Announced alongside 14% layoffs |

### What org and people theory says about pilot design

*Established theory applied to the evidence above; the application is synthesis.*

- **Sociotechnical systems (Tavistock, Trist & Bamforth).** New technology underperforms when the technical system is optimized and the social system is left alone; the gains come from *joint* optimization. This is the academic finding restated: gains track workflow redesign, not tool access. A pilot that only hands a team agents tests the wrong thing. Redesign roles, review flow and decision rights with it.
- **Conway's Law and the inverse Conway maneuver.** Systems mirror the communication structure that builds them. A pod that owns a control end to end will produce a more cohesive control, but only if its boundary matches a real service boundary. Pick pilot scope along an existing architectural seam, or the pod inherits cross-team handoffs it can't remove.
- **Coordination cost and Brooks's Law.** Communication paths grow as n(n−1)/2: 10 people have 45, 4 have 6. Small pods win mostly by cutting paths, not by typing faster. But agents add a new path type, human-to-agent supervision, which is why review load doubles. Count review as coordination cost when sizing the pod.
- **Mintzberg's coordination mechanisms.** Large teams coordinate by direct supervision and standardized process; small autonomous ones by mutual adjustment. Agent work pushes toward *standardization of outputs*: specs, evals, policy-as-code. The pilot should invest in those artifacts; they are what let a 4-person pod coordinate with the rest of the org without a manager layer.
- **Galbraith's information-processing view.** Structure exists to move information to where decisions are made. AI raises a team's processing capacity, so central approval becomes the bottleneck (Bain's 70% still deciding centrally). Give the pilot pod explicit decision rights in writing: what it can ship, approve and change without escalation, or you are measuring the old approval chain.
- **Cognitive load (Team Topologies).** Each team has a finite load budget; Skelton maps agent context windows onto the same idea. A pod doing product, build, review, on-call and agent supervision can exceed it. Track load directly. Vella & Blincoe saw worse developer experience nearly double while perceived productivity held.
- **Exploration vs. exploitation (March) and ambidexterity (O'Reilly & Tushman).** Pilots are exploration, but published wins are exploitation of known work. Run the pilot as a protected unit with different metrics, then plan explicitly how practices integrate back; most failed pilots die at reintegration, not in the trial.
- **Hawthorne and selection effects.** Volunteer teams under executive attention outperform for reasons unrelated to the intervention. Use a comparison pod, measure for a full quarter, and don't generalize from your most enthusiastic team.
- **Psychological safety (Edmondson).** Pilots announced next to layoffs (Meta, Coinbase) teach people to hide problems and overstate wins. Separate the pilot from headcount decisions in communication and in fact, or the data will be optimistic.
- **Professional identity and role theory.** Ulloa et al. found PM delegation to AI shaped by identity and accountability, not just capability. Changing titles (LinkedIn, Meta) is a lever, but people need to see what "good" looks like in the new role, so write it into the ladder before the pilot ends.
- **Situated learning (Lave & Wenger).** Juniors learn through legitimate peripheral participation in real work. When agents take the peripheral tasks, the on-ramp disappears (Ulfsnes et al.; the Canaries data). Put at least one early-career engineer in the pilot with an explicit learning plan.
- **Goodhart's Law.** Uber ranked engineers on AI-usage leaderboards; Miller et al. describe the Productivity Pressure Paradox. Once a metric becomes a target it stops measuring. Don't make AI usage or PR count a pilot target.
- **Diffusion of innovations (Rogers).** Adoption spreads through peer observability and trialability, which is why Skelton favors opt-in enabling teams over mandates. Plan for the pilot team to demo and pair with others, not just report up.

### Pilot blueprint

*Synthesis for security engineering teams in regulated industries.*

1. **Pick scope on a seam.** One or two security controls or platform features with known scope and a clean service boundary; a comparison pod on similar work without the new model.
2. **Compose the pod.** 3-4 people: a senior engineer who can own product decisions, one or two engineers, one early-career engineer with a learning plan; access to a product-minded lead and a risk partner.
3. **Write decision rights down.** What the pod ships and approves on its own; what needs a human gate (anything irreversible, anything touching regulated controls); who owns the outcome.
4. **Build the harness first.** Agent identities, scoped credentials, sandboxing, traceability from agent activity to change, AI first-pass review, policy-as-code.
5. **Time-box to one quarter** with a baseline: the original plan or estimate for the same work.
6. **Set exit criteria up front**, across four lenses:

| Lens | Measures |
| --- | --- |
| Delivery | Lead time vs. baseline; features shipped |
| Quality and risk | Change failure rate, incidents per change, unreviewed-merge rate, traceability coverage |
| Coordination | Review latency, reviewer load, escalations to outside the pod |
| People | Cognitive load and developer-experience pulse; junior learning milestones; would the team keep working this way |

7. **Separate it from headcount.** Say so explicitly, and mean it, so the data stays honest.
8. **Plan reintegration.** Decide in advance which outcomes trigger a second pod, which practices move into the platform, and what changes in the career ladder.

## Scarcity relocates to judgment, verification and decision rights

The industry frames this period as code becoming free; the evidence reframes it as **scarcity relocating**: to deciding what to build, verifying what was built, and the decision rights and guardrails that let small teams act without central approval. That explains the contradictory moves: Uber caps AI spend while cutting managers, Meta flattens then rebuilds management, Anthropic gives everyone one title and hires more PMs. The "product engineer" is best read as a demand that every engineer hold some product and verification judgment, because handoffs are now the costliest part of the system.

Two things remain unknown as of late 2026: no rigorous study shows solo or duo pods beating 5- to 8-person teams on real enterprise work, and no independent longitudinal data shows agentic-era delivery outcomes at the org level. Treat big-tech restructurings as experiments with visible side effects, not templates. The defensible bet is to invest where every source agrees the constraint now sits: verification capacity, deterministic guardrails and traceability, decision rights pushed to small owning teams, and a deliberately preserved junior pipeline.

Notes: several big-tech details rest on headlines or secondhand podcast summaries and are labeled as such; vendor figures (Faros, GitClear, Qodo, DX) are flagged inline.

## How this was made

**Question.** How are AI coding agents changing software team structures, roles such as the product engineer, and management layers, and what follows for security engineering organizations? Set by Julie Davila in October 2026.

**Process.** AI research agents built on Anthropic Claude models searched company announcements, engineering blogs, press coverage, practitioner newsletters and labour-market reports, and a structured literature screen in Elicit included 20 academic papers from 2022 to 2026. The agents drafted the brief; Julie Davila reviewed it before publication.

**What was checked and what was not.** Several big-tech details rest on headlines or secondhand podcast summaries and are labelled as such inline. Vendor figures (Faros, GitClear, Qodo, DX) are flagged where they appear. Passages marked *Synthesis* are reasoning from the evidence, not sourced findings. No adversarial review pass has been run on this version yet.
