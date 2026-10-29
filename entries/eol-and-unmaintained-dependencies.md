---
title: End-of-life and unmaintained dependencies are one debt with three costs
kicker: Research brief · Software supply chain and engineering practice
dek: An abandoned library is a security risk, a growing technical debt and a recurring drain on developer attention at the same time. The evidence favours one response for all three, which is to make upgrading continuous, owned and cheap, rather than a periodic emergency.
purpose: After reading this brief you can explain why end-of-life and unmaintained libraries are a different risk from known vulnerabilities, how deferred upgrades compound as debt, what the research says about the tools and practices teams use, and which responses fit which situation.
published: 2026-10-29
version: "1.0"
order: 2
---

## The evidence points to one response for all three costs {#summary}

**The risk is the next vulnerability nobody will fix.** A library or runtime that has reached its [[end of life]], or whose maintainers have quietly stopped, may carry no known vulnerability today. What it has lost is someone to fix the next one. Standards bodies treat this as its own category: the US Cybersecurity and Infrastructure Security Agency (CISA) lists use of end-of-life software first in its catalogue of bad practices, and the Payment Card Industry Data Security Standard (PCI DSS) now requires a management-approved plan for every technology a vendor has announced as end of life.

**It is widespread.** Depending on the definition, 42% to 59% of npm packages show no activity in two years, and abandonment is common even among widely used packages. Downstream projects mostly do not respond when it happens.

**As debt, it compounds.** Each skipped release makes the eventual upgrade larger, and the upgrade usually arrives at the worst moment, forced by a security disclosure. Developers delay updates mainly for fear of breakage. The measured rate of breakage is far lower than the fear.

**For developers, the cost is attention.** Update bots raise upgrade rates, but badly configured they flood teams with pull requests, many of them for dependencies the code never uses. Grouping, scheduling and automatic merging behind good tests are the remedies with support.

**What works is continuous, centrally owned upgrading.** The organizations with the best public record moved from year-long upgrade projects to small weekly bumps, made a platform team responsible for authoring fleet-wide changes, and made deprecation compulsory with a deadline and a staffed migration. No controlled study tests this approach yet; the evidence is the organizations' own reports.

> [!NOTE] This brief complements [Paving vulnerability classes](../paving-vulnerability-classes/), which covers engineering whole classes of vulnerability out of existence. Dependency currency is the condition that keeps a paved road paved: a safe library nobody upgrades becomes the next unmaintained dependency.

## Abandonment is terminal lag, and version counts miss it {#terms}

Three different situations get called "old dependencies", and they need different responses.

| Situation | What it means | What the downstream team can do |
| --- | --- | --- |
| Outdated | Newer releases exist and the project is maintained | Upgrade; the gap closes |
| End of life | The maintainer or vendor has announced that support has ended | Migrate, replace, buy extended support, or isolate |
| [[Unmaintained]] | Nobody has announced anything; activity has simply stopped | First find out, then choose as for end of life |

The research literature measures the first situation as **[[technical lag]]**: how far a project's dependencies trail their latest releases, counted in versions or in time. A common practitioner form is the *[[libyear]]*, the summed age of each dependency against its newest release ([CHAOSS](https://chaoss.community/kb/metric-libyears/)). Technical lag is resolvable when the upstream is alive. When the upstream is abandoned, it becomes **[[terminal lag]]**: no update will arrive, however long the team waits.

Version-based measures cannot tell the two apart. A 2026 study of 11,047 Debian packages built a maintenance-aware score from commit activity, maintainer responsiveness and repository metadata. It reclassified 62.2% of the packages that version lag alone rated low risk as high risk; those packages averaged 2,019 days since their last commit ([Panter and Eisty, 2026](https://doi.org/10.48550/arXiv.2603.10265)).

How common is abandonment? Every number depends on its definition, so read them as a range:

| Measure | Value | Source and grade |
| --- | --- | --- |
| npm packages not modified in over two years | 58.7% (44.3% of maintainers inactive) | [Zahan et al., 2021](https://doi.org/10.1145/3510457.3513044), peer-reviewed |
| npm packages not updated in over two years | 42.7% | Pu and Liang, 2025, peer-reviewed (abstract only) |
| Maven dependencies whose library had halted releases | 14% | [Pashchenko et al., 2018](https://doi.org/10.1145/3239235.3268920), peer-reviewed |
| Commercial codebases containing a component with no development in two years | 79% (2025 report) | Black Duck OSSRA, [as reported](https://www.securitymagazine.com/articles/101420-open-source-software-vulnerabilities-found-in-86-of-codebases); vendor |
| Open-source projects receiving active maintenance | 11% of 1.18 million | Sonatype, 2023, [as reported](https://www.itbrew.com/stories/2023/11/01/just-11-of-open-source-packages-are-still-being-maintained-report); vendor |

Note: the two vendor figures come from companies that sell software composition analysis, and the Black Duck figure has swung from 49% to 79% to a reported 93% across three annual editions, which suggests changes in sample and method as much as in the world.

Abandonment also reaches packages people care about. A 2025 study of widely used npm packages found abandonment common and downstream response rare. Projects removed an abandoned dependency significantly faster when its maintainer had explicitly declared it end of life ([Miller et al., 2025](https://doi.org/10.1109/ICSE55347.2025.00004)). Deprecation alone is weaker: among 864 deprecated npm packages whose usage kept growing, use rose an average of 14.5% a month after deprecation ([Tang et al., 2026](https://doi.org/10.1145/3832180)).

> [!SYNTHESIS] An explicit end-of-life statement is the cheapest intervention with measured effect. That applies to an organization's own internal libraries as much as to open source: a dated end-of-life notice tells every consumer to move, and silence lets them stay.

You now know the three situations and why version counts hide the worst one. Next: why the security risk is different from a vulnerability count.

## The security risk is the next unfixed vulnerability, not today's count {#security}

A scanner keyed to known vulnerabilities reports an end-of-life library as clean until the day a flaw is published, and then reports a finding that has no fix. That is why standards treat unsupported software as a category of its own:

- **CISA**'s catalogue of bad practices lists use of unsupported or end-of-life software first, for any system supporting critical infrastructure ([CISA](https://www.cisa.gov/stopransomware/bad-practices)).
- **NIST SP 800-53** control SA-22, *Unsupported System Components*, requires replacing components when support ends, or providing alternative sources of support, and discusses isolation as a way to reduce the risk of those kept ([control text](https://csf.tools/reference/nist-sp-800-53/r5/sa/sa-22/)).
- **PCI DSS v4.0** requirement 12.3.4 requires reviewing hardware and software technologies at least every 12 months, with a senior-management-approved plan to remediate outdated technologies, including those a vendor has announced as end of life. It became mandatory on 31 March 2025 ([summary](https://withpci.pages.dev/requirements/12/12.3/12.3.4); the standard itself is published by the PCI Security Standards Council).
- **The EU Cyber Resilience Act** requires manufacturers to state a support period, five years unless the product's expected use is shorter, and to provide security updates through it; open-source *stewards* must keep a documented vulnerability-handling policy ([Regulation (EU) 2024/2847](https://eur-lex.europa.eu/eli/reg/2024/2847/oj); [OpenSSF summary](https://policy.openssf.org/CRA/stewards-one-pager.html)).
- **OWASP Top 10** folded 2021's "Vulnerable and Outdated Components" into a broader 2025 category, A03 Software Supply Chain Failures ([OWASP](https://owasp.org/Top10/2025/0x00_2025-Introduction)).

The research explains why waiting does not work. Fixes rarely travel backwards: among vulnerabilities affecting several major release lines, 83.9% were fixed only in the newest line, leaving 5,056 dependents on older lines exposed ([Decan et al., 2021](https://doi.org/10.1109/TSE.2021.3112204)). A project pinned to an old major version is effectively on an end-of-life branch even if the library is alive. Vulnerabilities persist downstream: critical ones last over a year on average across languages ([Kumar et al., 2024](https://doi.org/10.1109/ISSRE62328.2024.00020)), and in Maven, 58.7% of studied vulnerabilities still affected most downstream libraries when the data was collected ([Zhang et al., 2023](https://doi.org/10.1109/ASE56229.2023.00058)). And when a library has halted, there is no fixed version to move to at all ([Pashchenko et al., 2018](https://doi.org/10.1145/3239235.3268920)).

Abandonment also opens a door that vulnerability counts never show: someone else can take the package over.

- **event-stream, 2018.** The sole maintainer of a popular npm package, no longer interested in it, handed publishing rights to a volunteer, who added a dependency carrying code aimed at a cryptocurrency wallet ([npm](https://blog.npmjs.com/post/180565383195/details-about-the-event-stream-incident.html)).
- **xz-utils, 2024.** Over about two years, an account called "Jia Tan" won the trust of a project run largely by one person, helped by other accounts pressing for a new maintainer, then shipped a backdoor in releases 5.6.0 and 5.6.1 (CVE-2024-3094, rated 10.0) ([Russ Cox's timeline](https://research.swtch.com/xz-timeline)).
- **Expired domains.** One study found 2,818 npm maintainer email addresses on expired domains, enough to take over 8,494 packages through account recovery ([Zahan et al., 2021](https://doi.org/10.1145/3510457.3513044)).

A counterweight keeps this in proportion. Dependency-level scanning overstates what an application runs: about 20% of dependencies flagged as vulnerable in one study were never deployed ([Pashchenko et al., 2018](https://doi.org/10.1145/3239235.3268920)), and in a function-level study 22 of 30 outdated projects never called the vulnerable code ([Zapata et al., 2018](https://doi.org/10.1109/ICSME.2018.00067)). Reachability lowers the urgency of a single finding. It does not lower the risk of a dependency that will never be fixed, because the next flaw may sit in code the application does call.

> [!GAP] Most [[software composition analysis]] tools match components against vulnerability databases, so an end-of-life component with no published vulnerability raises nothing. Lifecycle data has to come from elsewhere, such as the open [endoflife.date](https://endoflife.date) dataset and its public interface, or vendor support calendars. No study was found that measures how often scanners miss end-of-life components.

You now know why end-of-life risk is forward-looking. Next: why the cost of dealing with it grows the longer it waits.

## Deferred upgrades compound like interest {#debt}

The technical-debt literature has no category for this debt. The common taxonomies spread it across *build debt*, *infrastructure debt* and security debt ([Rios et al., 2018](https://doi.org/10.1016/j.infsof.2018.05.010)), so a debt register organized by them has no natural row for an end-of-life framework.

The interest is real, and Google's engineering book describes how it accrues. A team imports a library once and never upgrades it. Other code comes to depend on its exact behaviour, because "with a sufficient number of users, every observable behavior of your system will be depended upon by someone" ([[Hyrum's Law]]). Years later a security disclosure forces the upgrade: "Nobody in this scenario has practice in performing the upgrade, and the upgrade is extra difficult because it is covering many smaller releases covering the entire period between initial introduction of the package ... and the security disclosure" ([Software Engineering at Google, ch. 21](https://abseil.io/resources/swe-book/html/ch21.html)). The same book names the trap that follows a painful upgrade: teams overestimate the next one, decide "never again", and stop upgrading at all ([ch. 1](https://abseil.io/resources/swe-book/html/ch01.html)).

Public accounts show what a large catch-up costs. GitHub's move from Rails 3.2 to 5.2 took a year and a half, began as a part-time effort with no dedicated team, and was shaped by end of life: GitHub had been backporting security fixes to 3.2 itself, so it could only deploy intermediate versions that were still supported ([GitHub, 2018](https://github.blog/engineering/infrastructure/upgrading-github-from-rails-3-2-to-5-2/)).

Why do teams let it build? The studies agree on the reasons:

- **They do not prioritize it.** In a study of over 4,600 GitHub projects, 81.5% kept outdated dependencies, 69% of surveyed developers were unaware of their vulnerable ones, and developers described updating as "extra effort and added responsibility" ([Kula et al., 2018](https://doi.org/10.1007/s10664-017-9521-5)).
- **They fear breakage.** Breaking changes, understanding what changed, and migration effort top developers' concerns ([Mirhosseini and Parnin, 2017](https://doi.org/10.1109/ASE.2017.8115621); [Pashchenko et al., 2020](https://doi.org/10.1145/3372297.3417232)).
- **Trust falls as code ages.** Across 6,374 Maven systems, 81% of dependencies added to an existing system used the latest release, against 60% of those a system started with, and teams rarely revisit either ([Kula et al., 2015](https://doi.org/10.1109/SANER.2015.7081869)).

The fear is larger than the measured risk. In Maven Central, 83.4% of library upgrades complied with [[semantic versioning]] and only 7.9% of clients were affected by a breaking change ([Ochoa et al., 2022](https://arxiv.org/abs/2110.07889)). Across 18 ecosystems, individual developers met breaking changes less than once a year ([Bogart et al., 2021](https://doi.org/10.1145/3447245)). Only 3.2% of a manually examined sample of automated security pull requests broke the build ([Alfadel et al., 2021](https://doi.org/10.1109/MSR52588.2021.00037)). The worst case is real but bounded: naive updates failed to compile or pass tests in 28% of sampled Java modules in one controlled experiment ([Dann et al., 2023](https://doi.org/10.1109/ICSE48619.2023.00031)).

> [!SYNTHESIS] The gap between feared and measured breakage is mostly a gap in test confidence. A team that cannot tell whether an upgrade broke something will rationally avoid upgrading. The investment that pays back fastest is usually the test coverage that lets upgrades merge without a person reading them.

You now know how the debt accrues and why teams let it. Next: what the tools meant to help do to developers' attention.

## Update bots raise upgrade rates and can exhaust attention {#dx}

Automated pull requests work, on average. Projects using them upgraded 1.6 times as often as projects using no tool, and projects using a status badge 1.4 times as often ([Mirhosseini and Parnin, 2017](https://doi.org/10.1109/ASE.2017.8115621)). After teams adopted Dependabot, average technical lag fell from about 49 days to 25 within 90 days ([He et al., 2023](https://doi.org/10.1109/TSE.2023.3278129)).

Merge rates vary widely by sample, so no single number describes "bot acceptance":

| Study | Sample | Bot pull requests merged |
| --- | --- | --- |
| [Mirhosseini and Parnin, 2017](https://doi.org/10.1109/ASE.2017.8115621) | 7,470 projects, Greenkeeper | About one third |
| [Alfadel et al., 2021](https://doi.org/10.1109/MSR52588.2021.00037) | 2,904 JavaScript projects, security updates | 65% |
| [Mohayeji et al., 2023](https://aserebre.win.tue.nl/MSR2023.pdf) | npm projects, security updates | 57% |
| [He et al., 2023](https://doi.org/10.1109/TSE.2023.3278129) | 1,823 well-engineered projects | 70% of version updates; 74% to 76% of security updates |
| [Rebatchi et al., 2024](https://doi.org/10.1007/s10664-024-10523-y) | Large multi-language sample, security updates | 25%, against 74% for security pull requests opened by people |

Notes: the samples differ in ecosystem, project maturity and period. When a security update is not merged, developers usually fix the vulnerability by hand, and that path often takes months (Mohayeji et al., 2023).

The cost lands on attention. The first named failure modes were *update suspicion* (doubt that a bot's change is safe) and *notification fatigue* ([Mirhosseini and Parnin, 2017](https://doi.org/10.1109/ASE.2017.8115621)). In the largest Dependabot study, teams commonly reconfigured the bot to reduce notifications and 11.3% of projects dropped it, most often for notification fatigue, a lack of grouped updates, or incompatibility with their package manager. Most that left moved to another bot, usually Renovate ([He et al., 2023](https://doi.org/10.1109/TSE.2023.3278129)). Much of the noise is waste: 22.6% of Dependabot updates in one Java study targeted dependencies the code did not use ([Soto-Valero et al., 2021](https://doi.org/10.1145/3468264.3468589)), and across 1,487 npm projects, updates to unused dependencies triggered 55.9% of all dependency-update build time ([Weeraddana et al., 2024](https://doi.org/10.1145/3660823)).

The remedies with the best support:

1. **Remove unused dependencies first.** It shrinks both the attack surface and the update stream.
2. **Group and schedule updates.** Dependabot added grouped version updates in August 2023 and grouped security updates in March 2024 ([GitHub changelog](https://github.blog/changelog/2024-03-28-dependabot-grouped-security-updates-generally-available/)). Renovate's maintainers describe the usual arc, from "feel the power of automation" to "this is getting overwhelming" within weeks, and recommend grouping, schedules outside working hours and automatic merging, with the goal that "you should 'see' Renovate less and less" ([Renovate docs](https://docs.renovatebot.com/noise-reduction/)). Grouping has a cost: a failed group takes longer to diagnose.
3. **Merge automatically when tests pass**, for every kind of update a person would merge anyway. Developers already behave this way: in one survey, 85% merged bot updates when tests passed and updated by hand otherwise ([He et al., 2023](https://doi.org/10.1109/TSE.2023.3278129)).
4. **Know the limits of the tests.** In one study, test suites covered under 60% of direct dependency calls in half of projects and caught 47% of injected faults in direct dependencies and 35% in transitive ones; static change-impact analysis caught 74% and 64% ([Hejderup and Gousios, 2021](https://doi.org/10.1016/j.jss.2021.111097)).

> [!GAP] No study after 2023 was found that measures whether grouping reduced bot abandonment or raised merge rates. Release-age cooldowns, which delay adopting brand-new releases to dodge malicious ones, have practitioner support but no outcome data.

**Prevention starts at selection, and it is informal.** In interviews and a survey of 115 developers, 44% rated active maintenance a highly influential factor when choosing a library, against 39% for security ([Larios Vargas et al., 2020](https://arxiv.org/abs/2005.12574)). Revealed choices track something else: the npm packages developers pick correlate with downloads, stars and the length of the README ([Mujahid et al., 2022](https://arxiv.org/abs/2204.04562)), all of which an abandoned package keeps. Health scores help a little. In OpenSSF Scorecard studies, the *Maintained* check ranks among the practices most associated with vulnerability outcomes, but the models explain 9% to 12% of the variance ([Zahan et al., 2023](https://doi.org/10.1109/ICSE-SEIP58684.2023.00032)).

You now know what bots and selection screens do for developers and to them. Next: the costs that have nothing to do with security.

## Beyond security, end of life costs operability, money and speed {#quality}

Dependency currency is a general quality attribute, and the delivery research files it that way. The DevOps Research and Assessment (DORA) program places "keep dependencies up-to-date" inside its *code maintainability* capability, a predictor of delivery performance, and names the common failure: "most organizations leave it up to teams to manage their dependencies, with highly variable results", so that finding the services a new vulnerability affects becomes "a substantial archaeology project" ([DORA](https://dora.dev/capabilities/code-maintainability/)). DORA's construct mixes dependency items with code search and reuse, so its data does not isolate dependency freshness on its own.

The other costs show up in concrete ways:

- **Operability.** Managed platforms enforce end of life by freezing change. AWS Lambda first blocks creating functions on a deprecated runtime and later blocks updating them, except to move to a supported runtime ([AWS](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)). A function on an end-of-life runtime keeps running but cannot take an urgent fix until it is migrated, which turns a quiet debt into an incident-time blocker.
- **Defects.** Outdated packages in Debian-based container images carried more known bugs as well as more vulnerabilities ([Zerouali et al., 2019](https://arxiv.org/abs/1811.12874)).
- **Performance and cost.** Instagram reported 12% fewer CPU instructions per request on its web tier after moving from Python 2 to 3 ([PyCon 2017 keynote](https://speakerdeck.com/pycon2017/keynote-lisa-guo-and-hui-ding-python-at-instagram); practitioner). Amazon reported that moving applications to Java 17 with an AI assistant cut the average upgrade from about 50 developer-days to hours and estimated 4,500 developer-years saved ([as reported](https://the-decoder.com/amazons-ai-assistant-saves-4500-years-of-development-time-ceo-andy-jassy-says/)); that figure is self-reported by the company that sells the tool.
- **Developer time.** A vendor-commissioned survey put maintenance, debugging and technical debt at about 17 hours of a developer's week (Stripe, *The Developer Coefficient*, 2018; secondary). It does not separate dependency work.

> [!GAP] No study was found that links dependency freshness directly to incident rates, change failure rate or developer satisfaction. The links above are mechanisms and case reports, not measured effects across organizations.

You now know the full cost picture. Next: the approach the organizations with the best record converged on.

## Continuous, centrally owned upgrading has the best public record {#what-works}

The organizations that published their experience describe the same move: from episodic catch-up projects to small, continuous, automated upgrades, with the work owned centrally. These are primary-industry accounts, self-reported and unaudited.

- **Google** made infrastructure teams responsible for moving their own users to new versions in 2012, its "Churn Rule": "having a dedicated group of experts execute the change scales better than asking for more maintenance effort from every user" ([ch. 1](https://abseil.io/resources/swe-book/html/ch01.html)). Its deprecation chapter finds that warnings "rarely lead to migration of existing systems", that compulsory deprecation needs "an enforcement mechanism", and that it works best when a specialized team staffs the migration to completion ([ch. 15](https://abseil.io/resources/swe-book/html/ch15.html)).
- **Spotify** moved to *[[fleet management]]*, in which platform teams author changes across every repository. A new version of its internal service framework once took about 200 days to reach 70% of backend services and now takes under 7; automation had merged over 300,000 changes, about 75% without a person in the loop; and a Log4j fix reached 80% of production backend services within 9 hours ([Spotify, part 1](https://engineering.atspotify.com/2023/04/spotifys-shift-to-a-fleet-first-mindset-part-1); [part 3](https://engineering.atspotify.com/2023/05/fleet-management-at-spotify-part-3-fleet-wide-refactoring/)). Automatic merging is opt-out, and component owners receive changes they were not consulted on first.
- **GitHub** went from an 18-month Rails catch-up to an automated pull request every Monday that bumps the application to the latest commit on the Rails main branch; "nearly every week" one of its deploys is a Rails upgrade ([GitHub, 2023](https://github.blog/engineering/architecture-optimization/building-github-with-ruby-and-rails/)).
- **Shopify** runs its main application on the unreleased edge of Rails with weekly automated bumps, so it does not "dedicate a whole team and months of work" to each upgrade, behind more than 130,000 tests and canary deploys ([Shopify, 2019](https://shopify.engineering/living-on-the-edge-of-rails)).

The preconditions repeat across all four: a trusted test suite, automation that opens the change, progressive deployment, and a small set of standard frameworks to keep current. **AI-assisted migration** lowers the cost of the hard cases. Across 39 migrations at Google over twelve months, a language model generated 74% of the submitted code changes, and developers estimated the total time spent fell by half; the authors call it a case study, not a controlled comparison ([Ziftci et al., 2025](https://arxiv.org/abs/2504.09691)). Research tools that repair breaking updates report high success on benchmarks, but none has production-scale adoption evidence yet.

> [!GAP] The academic literature has no empirical study of centralized approaches, such as platform-owned upgrades, monorepos with one version per library, or curated dependency sets, against team-by-team ownership. Everything above is organizations reporting on themselves.

You now know what the strongest organizations did. Next: how to choose a response for a dependency that is already at end of life.

## Five responses, chosen by what is still possible {#playbook}

> [!SYNTHESIS] This section combines the evidence above into a decision aid. It is reasoning from the sources, not a tested method.

When a dependency reaches end of life or stops being maintained, five responses are available. They are listed from the most durable to the least.

| Response | When it fits | What it costs | Evidence |
| --- | --- | --- | --- |
| Upgrade or migrate to the supported line | A supported successor exists | The accumulated debt; least when upgrades have been continuous | Primary-industry accounts above |
| Replace with a maintained alternative | The project is abandoned and a credible alternative exists | Migration effort and new selection risk | The most common response developers report ([Miller et al., 2023](https://doi.org/10.1145/3611643.3616293)) |
| Fork, or copy the code in, and own it | No alternative exists and the code is small or stable | Ongoing maintenance, forever; it rarely ends | Copied files rarely record their origin and wait a median 640 days for upstream fixes ([He et al., 2026](https://doi.org/10.48550/arXiv.2607.02059)) |
| Buy extended support | Migration cannot finish before support ends | Licence cost; a dependency on the support vendor | Vendor offerings only; no independent outcome data found |
| Isolate and accept, with an expiry date | Nothing else is feasible yet | Residual risk, carried visibly | NIST SA-22 and PCI DSS 12.3.4 both require this to be documented and approved |

Choose by asking, in order: is there a supported successor; is there a maintained alternative; how much of the library the code calls; how long until a migration could finish; and who will own the result. Three rules make any choice hold:

1. **Every exception expires.** A risk acceptance without a date becomes permanent by default.
2. **Someone owns the dependency.** Google's own account of an orphaned package began with an ownership file listing two engineers, one of whom had moved to management and one to another team ([ch. 21](https://abseil.io/resources/swe-book/html/ch21.html)). An ownership record needs a periodic check that the named people still work on the code.
3. **The platform owns the common path.** Runtimes, base images and the standard frameworks belong to a team that keeps them current for everyone, the way a paved road is maintained for its users.

**What to measure.** DORA's suggested measures transfer directly: the share of applications not on the latest stable version of everything they use, how many versions of each library run in production and how many are over a year old, and how often and how long upgrades take ([DORA](https://dora.dev/capabilities/code-maintainability/)). Add two that capture end of life itself: the number of end-of-life components in production, from lifecycle data rather than vulnerability data, and the count of open exceptions past their expiry date.

## Five misreadings keep teams waiting {#misreadings}

- **"No known vulnerabilities, so it is safe."** An end-of-life component is clean only until the next disclosure, and then it has no fix. The risk is forward-looking.
- **"Our scanner would tell us."** Most scanners match vulnerability databases, not support lifecycles. Lifecycle data has to be added separately.
- **"Upgrades break things, so stay put."** Measured breakage is far below the fear: most upgrades follow semantic versioning, and few clients are hit by the breaking changes that do occur. Staying put makes the eventual upgrade larger.
- **"A deprecation notice will move people."** On its own it does not. Usage of deprecated packages keeps growing, and warnings rarely produce migration. Deadlines, enforcement and a staffed migration do.
- **"Turning on an update bot solves it."** Bots raise upgrade rates, but without grouping, pruning and trustworthy tests they generate noise that teams learn to ignore or switch off.

## Check that you can explain it {#self-check}

<details><summary>What is the difference between technical lag and terminal lag?</summary><div class="body"><p>Technical lag is the gap between the versions in use and the newest ones, which closes when the team upgrades. Terminal lag is the same gap when the upstream is abandoned: no new version will come, so waiting never closes it.</p></div></details>
<details><summary>Why can a reachability analysis lower the urgency of a finding but not the risk of an end-of-life library?</summary><div class="body"><p>Reachability says whether the application calls the vulnerable code in today's known flaw. An end-of-life library's risk is the next flaw, which may sit in code the application does call, and which nobody will fix.</p></div></details>
<details><summary>A team has pinned an old major version of a well-maintained library. Is it exposed to end-of-life risk?</summary><div class="body"><p>Often, yes. Most vulnerabilities that affect several major lines are fixed only in the newest one, so an old major line behaves like an end-of-life branch even though the project is alive.</p></div></details>
<details><summary>What three conditions do the organizations with continuous upgrading share?</summary><div class="body"><p>A test suite trusted enough to merge upgrades without a person reading them, automation that opens the change, and a central team that owns authoring the change across every repository, usually with progressive deployment as a safety net.</p></div></details>

## Glossary

<dl class="glossary">
<dt>End of life</dt><dd>The point after which a maintainer or vendor has announced it will no longer fix bugs or vulnerabilities in a release line.</dd>
<dt>Unmaintained</dt><dd>A project whose maintainers have stopped work without announcing it; also called abandoned.</dd>
<dt>Technical lag</dt><dd>How far a project's dependencies trail their latest releases, in versions or in time.</dd>
<dt>Terminal lag</dt><dd>Technical lag that can never close, because the upstream is abandoned.</dd>
<dt>Libyear</dt><dd>A lag measure: the summed age of each dependency in use compared with its newest release.</dd>
<dt>Semantic versioning</dt><dd>A version-numbering convention in which only a major version change may break compatibility.</dd>
<dt>Software composition analysis</dt><dd>Tools that inventory a project's third-party components and match them against vulnerability databases.</dd>
<dt>Fleet management</dt><dd>Spotify's term for platform teams authoring and rolling out changes across every repository at once.</dd>
<dt>Hyrum's Law</dt><dd>With enough users, every observable behaviour of a system will be depended on by someone.</dd>
</dl>

## How this was made

**Question.** How are end-of-life and unmaintained libraries handled, seen from risk, security, technical-debt management and developer experience together? Set by Julie Davila on 29 October 2026, as a companion to the paving research.

**Process.** An orchestrating agent split the question into three lines (security and risk, technical-debt economics, developer experience) and gave each to a research agent working from the public web, with a budget of 30 searches and 25 page reads per line. In parallel, two structured literature screens in Elicit each included 40 peer-reviewed or preprint studies (27 full texts read in each). The security line's agent stalled, so its standards and incident material was gathered directly by the orchestrating agent from search results and primary pages. The orchestrating agent reconciled the notes and drafted this brief; Julie Davila reviewed it before publication.

**What was checked and what was not.** Quotations from Google's engineering book, GitHub, Shopify, Renovate, DORA and the arXiv papers were read in the source. Figures for studies marked "abstract only", the vendor reports, and several standards summaries come from abstracts, search results or secondary pages, as marked. The standards texts for PCI DSS and the Cyber Resilience Act were not read in full. No adversarial review pass has been run on this version yet.

**Model and tools.** Anthropic Claude agents for planning, search, reading and drafting; Elicit for the literature screens; the [html-house-style](https://github.com/juliedavila/html-house-style) kit for this page.

## Sources

**Peer-reviewed and preprint studies**

<div class="sources"><ol>
<li>Alfadel, Costa, Shihab, Mkhallalati (2021). On the Use of Dependabot Security Pull Requests. MSR. <a href="https://doi.org/10.1109/MSR52588.2021.00037">doi.org/10.1109/MSR52588.2021.00037</a></li>
<li>Bogart, Kästner, Herbsleb, Thung (2021). When and How to Make Breaking Changes. ACM TOSEM. <a href="https://doi.org/10.1145/3447245">doi.org/10.1145/3447245</a></li>
<li>Dann, Hermann, Bodden (2023). UpCy: Safely Updating Outdated Dependencies. ICSE. <a href="https://doi.org/10.1109/ICSE48619.2023.00031">doi.org/10.1109/ICSE48619.2023.00031</a></li>
<li>Decan, Mens, Zerouali, De Roover (2021). Back to the Past: Analysing Backporting Practices in Package Dependency Networks. IEEE TSE. <a href="https://doi.org/10.1109/TSE.2021.3112204">doi.org/10.1109/TSE.2021.3112204</a></li>
<li>He, He, Zhang, Zhou (2023). Automating Dependency Updates in Practice: An Exploratory Study on GitHub Dependabot. IEEE TSE. <a href="https://doi.org/10.1109/TSE.2023.3278129">doi.org/10.1109/TSE.2023.3278129</a></li>
<li>He, Mockus, Yang, Zhou (2026). File-Level Copying Is an Implicit Dependency in Open Source. Preprint. <a href="https://doi.org/10.48550/arXiv.2607.02059">doi.org/10.48550/arXiv.2607.02059</a></li>
<li>Hejderup, Gousios (2021). Can We Trust Tests to Automate Dependency Updates? A Case Study of Java Projects. JSS. <a href="https://doi.org/10.1016/j.jss.2021.111097">doi.org/10.1016/j.jss.2021.111097</a></li>
<li>Kula, German, Ishio, Inoue (2015). Trusting a Library: A Study of the Latency to Adopt the Latest Maven Release. SANER. <a href="https://doi.org/10.1109/SANER.2015.7081869">doi.org/10.1109/SANER.2015.7081869</a></li>
<li>Kula, German, Ouni, Ishio, Inoue (2018). Do Developers Update Their Library Dependencies? Empirical Software Engineering. <a href="https://doi.org/10.1007/s10664-017-9521-5">doi.org/10.1007/s10664-017-9521-5</a></li>
<li>Kumar, Sampaio, Martin, Brito, Fetzer (2024). A Comprehensive Study on the Impact of Vulnerable Dependencies on Open-Source Software. ISSRE. <a href="https://doi.org/10.1109/ISSRE62328.2024.00020">doi.org/10.1109/ISSRE62328.2024.00020</a></li>
<li>Larios Vargas, Aniche, Treude, Bruntink, Gousios (2020). Selecting Third-Party Libraries: The Practitioners' Perspective. ESEC/FSE. <a href="https://arxiv.org/abs/2005.12574">arxiv.org/abs/2005.12574</a></li>
<li>Miller, Kästner, Vasilescu (2023). "We Feel Like We're Winging It": A Study on Navigating Open-Source Dependency Abandonment. ESEC/FSE. <a href="https://doi.org/10.1145/3611643.3616293">doi.org/10.1145/3611643.3616293</a></li>
<li>Miller, Jahanshahi, Mockus, Vasilescu, Kästner (2025). Understanding the Response to Open-Source Dependency Abandonment in the npm Ecosystem. ICSE. <a href="https://doi.org/10.1109/ICSE55347.2025.00004">doi.org/10.1109/ICSE55347.2025.00004</a></li>
<li>Mirhosseini, Parnin (2017). Can Automated Pull Requests Encourage Software Developers to Upgrade Out-of-Date Dependencies? ASE. <a href="https://doi.org/10.1109/ASE.2017.8115621">doi.org/10.1109/ASE.2017.8115621</a></li>
<li>Mohayeji, Agaronian, Constantinou, Zannone, Serebrenik (2023). Investigating the Resolution of Vulnerable Dependencies with Dependabot Security Updates. MSR. <a href="https://aserebre.win.tue.nl/MSR2023.pdf">aserebre.win.tue.nl/MSR2023.pdf</a></li>
<li>Mujahid, Abdalkareem, Shihab (2022). What Are the Characteristics of Highly-Selected Packages? A Case Study on the npm Ecosystem. Preprint. <a href="https://arxiv.org/abs/2204.04562">arxiv.org/abs/2204.04562</a></li>
<li>Ochoa, Degueule, Falleri, Vinju (2022). Breaking Bad? Semantic Versioning and Impact of Breaking Changes in Maven Central. Empirical Software Engineering. <a href="https://arxiv.org/abs/2110.07889">arxiv.org/abs/2110.07889</a></li>
<li>Panter, Eisty (2026). MALTA: Maintenance-Aware Technical Lag Estimation to Address Software Abandonment. Preprint. <a href="https://doi.org/10.48550/arXiv.2603.10265">doi.org/10.48550/arXiv.2603.10265</a></li>
<li>Pashchenko, Plate, Ponta, Sabetta, Massacci (2018). Vulnerable Open Source Dependencies: Counting Those That Matter. ESEM. <a href="https://doi.org/10.1145/3239235.3268920">doi.org/10.1145/3239235.3268920</a></li>
<li>Pashchenko, Vu, Massacci (2020). A Qualitative Study of Dependency Management and Its Security Implications. CCS. <a href="https://doi.org/10.1145/3372297.3417232">doi.org/10.1145/3372297.3417232</a></li>
<li>Pu, Liang (2025). Prevalence and impact of outdated dependencies in npm. Abstract only; full citation via the Elicit screen.</li>
<li>Rebatchi, Bissyandé, Moha (2024). Dependabot and Security Pull Requests: Large Empirical Study. Empirical Software Engineering. <a href="https://doi.org/10.1007/s10664-024-10523-y">doi.org/10.1007/s10664-024-10523-y</a></li>
<li>Rios, Mendonça Neto, Spínola (2018). A Tertiary Study on Technical Debt. Information and Software Technology. <a href="https://doi.org/10.1016/j.infsof.2018.05.010">doi.org/10.1016/j.infsof.2018.05.010</a></li>
<li>Soto-Valero, Durieux, Baudry (2021). A Longitudinal Analysis of Bloated Java Dependencies. ESEC/FSE. <a href="https://doi.org/10.1145/3468264.3468589">doi.org/10.1145/3468264.3468589</a></li>
<li>Tang et al. (2026). Deprecated npm packages with growing user demand. <a href="https://doi.org/10.1145/3832180">doi.org/10.1145/3832180</a></li>
<li>Weeraddana, Alfadel, McIntosh (2024). Dependency-Induced Waste in Continuous Integration. Proc. ACM Softw. Eng. <a href="https://doi.org/10.1145/3660823">doi.org/10.1145/3660823</a></li>
<li>Zahan, Williams, Zimmermann, Godefroid, Murphy, Maddila (2021). What Are Weak Links in the npm Supply Chain? ICSE-SEIP 2022. <a href="https://doi.org/10.1145/3510457.3513044">doi.org/10.1145/3510457.3513044</a></li>
<li>Zahan, Shohan, Harris, Williams (2023). Do Software Security Practices Yield Fewer Vulnerabilities? ICSE-SEIP. <a href="https://doi.org/10.1109/ICSE-SEIP58684.2023.00032">doi.org/10.1109/ICSE-SEIP58684.2023.00032</a></li>
<li>Zapata, Kula, Chinthanet, Ishio, Matsumoto, Ihara (2018). Towards Smoother Library Migrations: Vulnerable Dependency Migrations at Function Level for npm. ICSME. <a href="https://doi.org/10.1109/ICSME.2018.00067">doi.org/10.1109/ICSME.2018.00067</a></li>
<li>Zerouali, Mens, Robles, Gonzalez-Barahona (2019). On the Relation between Outdated Docker Containers, Severity Vulnerabilities, and Bugs. SANER. <a href="https://arxiv.org/abs/1811.12874">arxiv.org/abs/1811.12874</a></li>
<li>Zhang et al. (2023). Mitigating Persistence of Open-Source Vulnerabilities in Maven Ecosystem. ASE. <a href="https://doi.org/10.1109/ASE56229.2023.00058">doi.org/10.1109/ASE56229.2023.00058</a></li>
<li>Ziftci, Nikolov, Sjövall et al. (2025). Migrating Code at Scale with LLMs at Google. FSE industry track. <a href="https://arxiv.org/abs/2504.09691">arxiv.org/abs/2504.09691</a></li>
</ol></div>

**Primary industry, standards and practitioner sources**

<div class="sources"><ol>
<li>CISA. Bad Practices. <a href="https://www.cisa.gov/stopransomware/bad-practices">cisa.gov/stopransomware/bad-practices</a></li>
<li>NIST SP 800-53 Rev. 5, SA-22 Unsupported System Components (mirror). <a href="https://csf.tools/reference/nist-sp-800-53/r5/sa/sa-22/">csf.tools/reference/nist-sp-800-53/r5/sa/sa-22</a></li>
<li>PCI DSS v4.0 requirement 12.3.4 (secondary summary). <a href="https://withpci.pages.dev/requirements/12/12.3/12.3.4">withpci.pages.dev/requirements/12/12.3/12.3.4</a></li>
<li>Regulation (EU) 2024/2847, Cyber Resilience Act. <a href="https://eur-lex.europa.eu/eli/reg/2024/2847/oj">eur-lex.europa.eu/eli/reg/2024/2847/oj</a>; OpenSSF stewards summary <a href="https://policy.openssf.org/CRA/stewards-one-pager.html">policy.openssf.org/CRA/stewards-one-pager.html</a></li>
<li>OWASP Top 10:2025 introduction. <a href="https://owasp.org/Top10/2025/0x00_2025-Introduction">owasp.org/Top10/2025</a></li>
<li>Winters, Manshreck, Wright (2020). Software Engineering at Google, chapters 1, 15 and 21. <a href="https://abseil.io/resources/swe-book/html/ch01.html">ch. 1</a>, <a href="https://abseil.io/resources/swe-book/html/ch15.html">ch. 15</a>, <a href="https://abseil.io/resources/swe-book/html/ch21.html">ch. 21</a></li>
<li>Spotify Engineering (2023). Fleet management, parts 1 and 3. <a href="https://engineering.atspotify.com/2023/04/spotifys-shift-to-a-fleet-first-mindset-part-1">part 1</a>, <a href="https://engineering.atspotify.com/2023/05/fleet-management-at-spotify-part-3-fleet-wide-refactoring/">part 3</a></li>
<li>GitHub Engineering (2018). Upgrading GitHub from Rails 3.2 to 5.2. <a href="https://github.blog/engineering/infrastructure/upgrading-github-from-rails-3-2-to-5-2/">github.blog</a>; (2023) Building GitHub with Ruby and Rails. <a href="https://github.blog/engineering/architecture-optimization/building-github-with-ruby-and-rails/">github.blog</a></li>
<li>Shopify Engineering (2019). Living on the Edge of Rails. <a href="https://shopify.engineering/living-on-the-edge-of-rails">shopify.engineering</a></li>
<li>DORA. Code maintainability capability. <a href="https://dora.dev/capabilities/code-maintainability/">dora.dev/capabilities/code-maintainability</a></li>
<li>Renovate documentation. Noise reduction. <a href="https://docs.renovatebot.com/noise-reduction/">docs.renovatebot.com/noise-reduction</a></li>
<li>GitHub changelog (2024). Dependabot grouped security updates generally available. <a href="https://github.blog/changelog/2024-03-28-dependabot-grouped-security-updates-generally-available/">github.blog/changelog</a></li>
<li>AWS. Lambda runtimes and deprecation. <a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html">docs.aws.amazon.com</a></li>
<li>npm (2018). Details about the event-stream incident. <a href="https://blog.npmjs.com/post/180565383195/details-about-the-event-stream-incident.html">blog.npmjs.com</a></li>
<li>Cox, R. (2024). Timeline of the xz open source attack. <a href="https://research.swtch.com/xz-timeline">research.swtch.com/xz-timeline</a></li>
<li>endoflife.date. Open product lifecycle data. <a href="https://endoflife.date">endoflife.date</a></li>
<li>CHAOSS. Libyears metric. <a href="https://chaoss.community/kb/metric-libyears/">chaoss.community/kb/metric-libyears</a></li>
<li>Guo, Ding (2017). Python 3 at Instagram, PyCon keynote. <a href="https://speakerdeck.com/pycon2017/keynote-lisa-guo-and-hui-ding-python-at-instagram">speakerdeck.com</a></li>
</ol></div>

**Vendor reports and press coverage**

<div class="sources"><ol>
<li>Black Duck, Open Source Security and Risk Analysis 2025, as reported by Security Magazine. <a href="https://www.securitymagazine.com/articles/101420-open-source-software-vulnerabilities-found-in-86-of-codebases">securitymagazine.com</a></li>
<li>Sonatype, State of the Software Supply Chain 2023, as reported by IT Brew. <a href="https://www.itbrew.com/stories/2023/11/01/just-11-of-open-source-packages-are-still-being-maintained-report">itbrew.com</a></li>
<li>Amazon Java 17 migration figures, as reported by The Decoder (2024). <a href="https://the-decoder.com/amazons-ai-assistant-saves-4500-years-of-development-time-ceo-andy-jassy-says/">the-decoder.com</a></li>
<li>Stripe (2018). The Developer Coefficient. Survey report; figures via press coverage.</li>
</ol></div>
