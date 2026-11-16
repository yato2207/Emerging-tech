/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  BREACH_ROOT_CAUSE_TABLE,
  CODEBOOK,
  DYADIC_GAP_MATRIX,
  PLAYBOOK_STAGES,
  TEAM_MEMBERS,
} from './data/reportData';

export default function App() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#111C30]">
      {/* Clean 3-Zone Top Bar */}
      <header className="sticky top-0 z-30 grand-navy-surface text-white border-b border-[#D9A21B]/35">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-white hover:text-[#E7BA46] transition-colors whitespace-nowrap shrink-0"
          >
            The Trust Desk
          </a>

          <nav
            aria-label="Report sections"
            className="hidden md:flex items-center gap-6 text-[13px] font-medium text-white/85"
          >
            <a
              href="#case-1"
              className="hover:text-white border-b border-transparent hover:border-[#E7BA46] py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Case 1
            </a>
            <a
              href="#case-2"
              className="hover:text-white border-b border-transparent hover:border-[#E7BA46] py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Case 2
            </a>
            <a
              href="#playbook"
              className="hover:text-white border-b border-transparent hover:border-[#E7BA46] py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Playbook
            </a>
            <a
              href="#dyadic-matrix"
              className="hover:text-white border-b border-transparent hover:border-[#E7BA46] py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Gap Matrix
            </a>
            <a
              href="#codebook"
              className="hover:text-white border-b border-transparent hover:border-[#E7BA46] py-1 transition-colors whitespace-nowrap shrink-0"
            >
              Codebook
            </a>
          </nav>

          <a
            href="#team"
            className="px-4 py-2 rounded-md bg-[#D9A21B] hover:bg-[#E7BA46] text-[#102342] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
          >
            Research Team
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-9 space-y-14">
        {/* Hero Monograph Header */}
        <section
          aria-labelledby="report-title"
          className="grand-navy-surface text-white rounded-2xl border border-[#D9A21B]/45 p-7 sm:p-10 shadow-[0_18px_40px_-18px_rgba(11,25,48,0.42)]"
        >
          <p className="text-xs font-semibold tracking-wide text-[#E7BA46]">
            DMS, IIT Delhi · MBA Section B, Group 1 · November 2026 · Qualitative Case Study
          </p>
          <h1
            id="report-title"
            className="font-display text-3xl sm:text-5xl font-bold leading-[1.12] text-white mt-2.5 text-balance max-w-4xl"
          >
            Enterprise LLM Adoption and B2B Trust in Cybersecurity
          </h1>
          <div className="w-24 h-px bg-[#D9A21B]/70 my-5" />
          <p className="font-display italic text-lg sm:text-xl text-[#FBF4E2] leading-relaxed max-w-3xl">
            &ldquo;For a manager working with emerging technology, the scarce resource is not capability. It is warranted trust, and it is built by whoever makes verification cheap.&rdquo;
          </p>
          <p className="mt-4 text-[15px] text-white/85 leading-relaxed max-w-3xl">
            This briefing synthesizes a two-case qualitative study conducted at the Department of Management Studies, IIT Delhi, based on three practitioner interviews: the CTO of an AI-native firm (Case 1, LLM adoption) and a conceptual buyer-vendor dyad of Client C1 and Vendor V1 in enterprise cybersecurity (Case 2).
          </p>

          <div className="mt-7 pt-5 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <div className="font-mono-data text-xl font-semibold text-[#E7BA46]">3 Interviews</div>
              <div className="text-xs text-white/75 mt-0.5">39–42 min semi-structured, Nov 11–13, 2026</div>
            </div>
            <div>
              <div className="font-mono-data text-xl font-semibold text-[#E7BA46]">14 Codes</div>
              <div className="text-xs text-white/75 mt-0.5">Braun &amp; Clarke (2006) thematic coding</div>
            </div>
            <div>
              <div className="font-mono-data text-xl font-semibold text-[#E7BA46]">4 Lenses</div>
              <div className="text-xs text-white/75 mt-0.5">TOE, TAM, Commitment-Trust &amp; TCE</div>
            </div>
            <div>
              <div className="font-mono-data text-xl font-semibold text-[#E7BA46]">9 Dimensions</div>
              <div className="text-xs text-white/75 mt-0.5">Dyadic alignment &amp; gap comparison</div>
            </div>
          </div>
        </section>

        {/* 01. Case 1 */}
        <section id="case-1" className="pt-12 border-t border-[#DED8CA] space-y-7">
          <div>
            <p className="font-mono-data text-xs font-semibold text-[#B8830D]">01 · Case 1 (41m 35s)</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] mt-1 text-balance">
              Enterprise LLM Adoption: The CTO of an AI-Native Firm
            </h2>
            <p className="text-[15px] text-[#52607A] mt-2 max-w-3xl">
              How an AI-native enterprise CTO separates verifiable productivity from costly hallucination risk, runaway token bills, and banking liability.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#52607A]">
              <h3 className="text-base font-bold text-[#102342]">Figure 1.1 — Scale-or-Stop Decision Matrix</h3>
              <span aria-hidden="true">·</span>
              <span className="font-mono-data text-[#102342] font-semibold">
                Evidence tag: Said directly (except bonus row)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="grand-card rounded-xl p-5">
                <div className="text-xs text-[#52607A]">
                  <strong className="text-[#102342]">Keep Humans in Charge</strong> · Hard to verify · High cost if wrong
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED8CA]/70">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <strong>Core business decisions</strong>
                    <span className="font-mono-data text-[11px] font-semibold text-[#102342]">Said directly</span>
                  </div>
                  <p className="text-[13px] text-[#52607A] mt-1">
                    Hallucinations &ldquo;could kill my revenue.&rdquo; LLMs assist with ~10% analysis, never final strategic reasoning.
                  </p>
                </div>
              </div>

              <div className="grand-card rounded-xl p-5">
                <div className="text-xs text-[#52607A]">
                  <strong className="text-[#102342]">Scale Behind Review Gates</strong> · Easy to verify · High cost if wrong
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED8CA]/70">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <strong>Sales outreach &amp; proposals</strong>
                    <span className="font-mono-data text-[11px] font-semibold text-[#102342]">Said directly</span>
                  </div>
                  <p className="text-[13px] text-[#52607A] mt-1">
                    &ldquo;I will have to think twice&rdquo; — client-facing errors directly risk revenue and reputation unless human-reviewed.
                  </p>
                </div>
              </div>

              <div className="grand-card rounded-xl p-5">
                <div className="text-xs text-[#52607A]">
                  <strong className="text-[#102342]">Pilot with Care</strong> · Hard to verify · Low-to-moderate scope
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED8CA]/70">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <strong>Customer-facing chatbot (Bonus)</strong>
                    <span className="font-mono-data text-[11px] font-semibold text-[#7D5700]">Inferred</span>
                  </div>
                  <p className="text-[13px] text-[#52607A] mt-1">
                    Not discussed directly by the CTO; inferred that unchecked external replies create brand and regulatory liability.
                  </p>
                </div>
              </div>

              <div className="grand-card rounded-xl p-5">
                <div className="text-xs text-[#52607A]">
                  <strong className="text-[#102342]">Scale Now</strong> · Easy to verify · Low cost if wrong
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED8CA]/70">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <strong>Software development</strong>
                    <span className="font-mono-data text-[11px] font-semibold text-[#102342]">Said directly</span>
                  </div>
                  <p className="text-[13px] text-[#52607A] mt-1">
                    31–32% self-reported productivity gain (unverified method); outputs are cheaply verified via tests, builds, and code review.
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED8CA]/70">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <strong>Marketing outreach</strong>
                    <span className="font-mono-data text-[11px] font-semibold text-[#102342]">Said directly</span>
                  </div>
                  <p className="text-[13px] text-[#52607A] mt-1">
                    &ldquo;Doing exceptionally well&rdquo; — minimal downside when an individual post misses the mark.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <figure className="py-5 border-y border-[#DED8CA]">
                <blockquote className="font-display italic text-xl text-[#102342]">
                  &ldquo;We can&apos;t bank on the hallucination of LLMs.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-xs text-[#52607A]">
                  CTO of an AI-native firm · <span className="font-mono-data">6:33</span> · Code{' '}
                  <span className="font-mono-data">RELIABILITY</span>
                </figcaption>
              </figure>
              <figure className="py-5 border-y border-[#DED8CA]">
                <blockquote className="font-display italic text-xl text-[#102342]">
                  &ldquo;You can&apos;t offload the thinking.&rdquo;
                </blockquote>
                <figcaption className="mt-2 text-xs text-[#52607A]">
                  CTO of an AI-native firm · <span className="font-mono-data">28:54</span> · Code{' '}
                  <span className="font-mono-data">OFFLOADING</span>
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grand-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#102342]">ROI Reality Check &amp; Cost Economics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-32 bg-[#F8F6F0] border border-[#DED8CA] rounded-lg p-2 flex flex-col justify-end">
                    <div className="h-[64%] bg-[#102342] rounded text-white font-mono-data text-xs font-bold flex items-center justify-center">
                      +31–32%
                    </div>
                  </div>
                  <p className="text-xs font-bold">CTO Self-Reported Gain</p>
                  <p className="text-xs text-[#52607A]">Coding productivity claim; measurement method unverified.</p>
                </div>
                <div className="space-y-2">
                  <div className="h-32 bg-[#F8F6F0] border border-[#DED8CA] rounded-lg p-2 flex flex-col justify-end">
                    <div className="h-[38%] bg-[#9F1239] rounded text-white font-mono-data text-xs font-bold flex items-center justify-center">
                      19% slower
                    </div>
                  </div>
                  <p className="text-xs font-bold">Becker et al. (2025) RCT</p>
                  <p className="text-xs text-[#52607A]">
                    Experienced devs forecast +24% and felt +20% faster, yet measured 19% slower.
                  </p>
                </div>
              </div>
              <div className="pt-3.5 border-t border-[#DED8CA] text-[13px] space-y-1.5">
                <p>
                  <strong>&ldquo;Adopting LLM is more of a cost-based decision.&rdquo;</strong> (
                  <span className="font-mono-data">19:12</span>, <span className="font-mono-data">ROI-GATE</span>)
                </p>
                <p className="text-[#52607A]">
                  Fine-tuning runs <strong>$6–10 million</strong> (self-reported), pushing most firms to public models. Two US engagements with ROI-linked fees lost money because ROI never materialized. Run a <strong>60–90 day pilot</strong> measuring real defects, review time, and token spend before scaling.
                </p>
              </div>
            </div>

            <div className="grand-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#102342]">Regulation &amp; Theoretical Framing (Case 1)</h3>
              <div className="text-[13px] space-y-1">
                <p>
                  <strong>CTO&apos;s Reading of RBI Liability:</strong>{' '}
                  <span className="font-mono-data text-xs text-[#102342] font-semibold">Said directly · 19:12</span>
                </p>
                <p className="text-[#52607A]">
                  &ldquo;The bank is liable.&rdquo; Banks are &ldquo;very scared&rdquo; because legal responsibility sits with the bank—not the model vendor—if PII leaks or an LLM errs.
                </p>
              </div>
              <div className="pt-3.5 border-t border-[#DED8CA] text-[13px] space-y-1">
                <p>
                  <strong>Counterpoint — RBI FREE-AI Report (2025):</strong>{' '}
                  <span className="font-mono-data text-xs text-[#7D5700] font-semibold">Inferred</span>
                </p>
                <p className="text-[#52607A]">
                  The RBI FREE-AI framework proposes graded liability and focuses on <em>enabling AI while safeguarding against risk</em>—turning fear into Indian data residency, PII stripping, and human sign-off.
                </p>
              </div>
              <div className="pt-3.5 border-t border-[#DED8CA] text-xs text-[#52607A] space-y-1.5">
                <p>
                  <strong className="text-[#102342]">TOE Lens:</strong> Technology (hallucination limits), Organisation ($6–10M cost &amp; token budgets), Environment (RBI liability &amp; &ldquo;Instagram type adoption&rdquo; hype at <span className="font-mono-data">32:05</span>).
                </p>
                <p>
                  <strong className="text-[#102342]">TAM Lens:</strong> Perceived usefulness determined every adoption choice; perceived ease of use never surfaced for skilled engineers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02. Case 2 */}
        <section id="case-2" className="pt-12 border-t border-[#DED8CA] space-y-7">
          <div>
            <p className="font-mono-data text-xs font-semibold text-[#B8830D]">02 · Case 2 Conceptual Dyad (39m–40m each)</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] mt-1 text-balance">
              B2B Trust in Cybersecurity: Vendor V1 &amp; Client C1
            </h2>
            <p className="text-[15px] text-[#52607A] mt-2 max-w-3xl">
              Where Vendor V1 and Client C1 agree—and where dangerous blind spots separate how cybersecurity vendors sell trust from how enterprise gatekeepers verify it.
            </p>
          </div>

          <div className="grand-card rounded-xl overflow-x-auto p-0">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#102342] text-white text-xs">
                  <th className="py-3 px-4 font-semibold">Pre-Sale Trust Signal</th>
                  <th className="py-3 px-4 font-semibold">C1 (Client Gatekeeper) Weight &amp; View</th>
                  <th className="py-3 px-4 font-semibold">V1 (Vendor) Belief &amp; Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#DED8CA]">
                  <td className="py-3 px-4 font-semibold">ISO/IEC 27001 &amp; SOC 2 Type II</td>
                  <td className="py-3 px-4"><strong className="text-[#065F46]">High</strong> — Essential baseline to justify vendor selection to internal auditors and the CISO.</td>
                  <td className="py-3 px-4">Medium — Included in compliance packs, though V1 notes: &ldquo;Checking mark and actual working... are two different things.&rdquo; (<span className="font-mono-data">16:41</span>)</td>
                </tr>
                <tr className="border-t border-[#DED8CA]">
                  <td className="py-3 px-4 font-semibold">Audit, pen-test summaries &amp; POC</td>
                  <td className="py-3 px-4"><strong className="text-[#065F46]">High</strong> — Proves remediation and live operation (&ldquo;Ultimately, credibility comes from evidence.&rdquo; <span className="font-mono-data">21:26</span>).</td>
                  <td className="py-3 px-4">High (POCs/demos) — Shared alongside selective open defect briefings.</td>
                </tr>
                <tr className="border-t border-[#DED8CA]">
                  <td className="py-3 px-4 font-semibold">5–6 year track record &amp; roadmap candour</td>
                  <td className="py-3 px-4"><strong className="text-[#065F46]">High</strong> — Guards against startup fragility and overpromising.</td>
                  <td className="py-3 px-4">Medium — V1 stresses being conservative about remaining risk.</td>
                </tr>
                <tr className="border-t border-[#DED8CA]">
                  <td className="py-3 px-4 font-semibold">Client references, logos &amp; firm size/brand</td>
                  <td className="py-3 px-4"><strong className="text-[#7D5700]">Some / Low</strong> — Context only; large brands suffer breaches too.</td>
                  <td className="py-3 px-4"><strong className="text-[#9F1239]">High (Gap)</strong> — V1 leans heavily here (&ldquo;References... that creates a lot of credibility.&rdquo; <span className="font-mono-data">13:54</span>), especially in the Middle East.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grand-card rounded-xl p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#52607A]">
                <h3 className="text-base font-bold text-[#102342]">The Oil Refinery Exposure Funnel</h3>
                <span aria-hidden="true">·</span>
                <span>V1&apos;s recollection (unverified)</span>
              </div>
              <div className="space-y-3 text-[13px]">
                <div>
                  <div className="flex justify-between">
                    <span>1. Enterprise data classified</span>
                    <strong className="font-mono-data">~99%</strong>
                  </div>
                  <div className="h-5 bg-[#F8F6F0] border border-[#DED8CA] rounded mt-1.5 overflow-hidden">
                    <div className="h-full w-[99%] bg-[#102342]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>2. Sensitive data actually protected</span>
                    <strong className="font-mono-data text-[#7D5700]">Only 8%</strong>
                  </div>
                  <div className="h-5 bg-[#F8F6F0] border border-[#DED8CA] rounded mt-1.5 overflow-hidden">
                    <div className="h-full w-[8%] bg-[#D9A21B]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>3. Unprotected portion leaving perimeter</span>
                    <strong className="font-mono-data text-[#9F1239]">~40% leaving</strong>
                  </div>
                  <div className="h-5 bg-[#F8F6F0] border border-[#DED8CA] rounded mt-1.5 overflow-hidden">
                    <div className="h-full w-[40%] bg-[#9F1239]" />
                  </div>
                </div>
              </div>
              <p className="pt-3 border-t border-[#DED8CA] text-[13px]">
                <strong>Education beats reassurance:</strong> C1 values risk diagnostics on real gaps over &ldquo;we are secure&rdquo; claims: <em>&ldquo;I would consider education more valuable than reassurance.&rdquo;</em> (<span className="font-mono-data">24:24</span>, <span className="font-mono-data">EDUCATE</span>)
              </p>
            </div>

            <div className="grand-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#102342]">The Three-Legged Stool &amp; Visibility Paradox</h3>
              <div className="space-y-2.5 text-[13px]">
                <p>
                  <strong>1. Contracts (Floor):</strong> SLAs, breach-notice timelines, audit rights, data residency, liability. <em>&ldquo;I actually don&apos;t believe in contractual agreements alone.&rdquo;</em> (C1, <span className="font-mono-data">8:00</span>)
                </p>
                <p>
                  <strong>2. Relationship &amp; Value:</strong> Candour and conservative honesty. <em>&ldquo;Neither is sufficient... we&apos;ll have to do both.&rdquo;</em> (V1, <span className="font-mono-data">4:57</span>)
                </p>
                <p>
                  <strong>3. Client&apos;s Own Verification:</strong> Dashboards, DLP, DRM, dark-web checks. <em>&ldquo;The risks also keep increasing. So is our task.&rdquo;</em> (C1, <span className="font-mono-data">14:05</span>)
                </p>
              </div>
              <p className="pt-3 border-t border-[#DED8CA] text-xs text-[#52607A]">
                <strong className="text-[#102342]">Visibility Paradox:</strong> C1 wants full insight, while V1 shares certs/audits/open defects yet keeps deep architecture verbal because written blueprints &ldquo;would become a risk for us as well.&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="grand-card rounded-xl overflow-hidden p-0">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#102342] text-white text-xs">
                    <th colSpan={2} className="py-3 px-4 font-semibold">
                      C1&apos;s Incident Response by Root Cause (Table 2.9)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BREACH_ROOT_CAUSE_TABLE.map((row) => (
                    <tr key={row.cause} className="border-t border-[#DED8CA]">
                      <td className="py-3 px-4">{row.cause}</td>
                      <td
                        className={`py-3 px-4 font-bold ${
                          row.outcomeTone === 'severe'
                            ? 'text-[#9F1239]'
                            : row.outcomeTone === 'warn'
                            ? 'text-[#7D5700]'
                            : 'text-[#065F46]'
                        }`}
                      >
                        {row.c1Reaction}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-3 text-xs text-[#52607A] border-t border-[#DED8CA]">
                <strong className="text-[#111C30]">&ldquo;The vendor&apos;s response is more important than the incident itself.&rdquo;</strong> (C1,{' '}
                <span className="font-mono-data">16:57</span>)
              </div>
            </div>

            <div className="grand-card rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#102342]">Switching Costs &amp; Asset Specificity (TCE)</h3>
              <p className="text-sm font-semibold text-[#102342]">
                &ldquo;Switching comes at a cost. It&apos;s never free.&rdquo;{' '}
                <span className="font-mono-data text-xs text-[#52607A]">(C1, 32:59)</span>
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><strong>Data migration:</strong> Moving logs, labels, and repositories safely.</div>
                <div><strong>Integration:</strong> Re-wiring connectors and identity workflows.</div>
                <div><strong>Retraining:</strong> Re-onboarding admins and staff.</div>
                <div><strong>SIEM / SOC rebuild:</strong> Rebuilding detection rules and dashboards.</div>
              </div>
              <p className="pt-3 border-t border-[#DED8CA] text-xs text-[#52607A]">
                <strong className="text-[#102342]">Commitment-Trust &amp; TCE:</strong> High switching costs breed pre-sale caution—yet repeated breaches force exit &ldquo;even if it comes at a heavier cost.&rdquo; Offering exit-assistance clauses up front lowers ex-ante fear.
              </p>
            </div>
          </div>
        </section>

        {/* 03. Strategic Playbook & Dyadic Matrix */}
        <section id="playbook" className="pt-12 border-t border-[#DED8CA] space-y-7">
          <div>
            <p className="font-mono-data text-xs font-semibold text-[#B8830D]">03 · Strategic Synthesis (Company A → Company B)</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] mt-1 text-balance">
              Company A&apos;s Trust Playbook &amp; Dyadic Alignment
            </h2>
            <p className="text-[15px] text-[#52607A] mt-2 max-w-3xl">
              Five trust-building roles mapped across four lifecycle stages to resolve Company B&apos;s three worries: (a) safety vs. third-party data control, (b) adoption inertia, and (c) privacy &amp; trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLAYBOOK_STAGES.map((st, idx) => {
              const roleCopy: Record<string, { title: string; body: string }> = {
                'pre-sale': {
                  title: 'Educator & Evidence Provider',
                  body: 'Run a free risk check on client data to expose real leaks, and deliver a standard Trust Pack (ISO 27001, SOC 2 Type II, audits, POC).',
                },
                contracting: {
                  title: 'Co-Governor',
                  body: 'Proactively codify SLAs, breach-notice timelines, audit rights, data residency, and exit-assistance clauses.',
                },
                onboarding: {
                  title: 'Enabler',
                  body: 'Deliver role-based training ("enforce, enable, govern") so users do not downgrade sensitivity labels to get work done (V1, 31:32).',
                },
                retention: {
                  title: 'Transparent Communicator',
                  body: 'Maintain roadmap candour ("what we will and will not build") and run a joint incident drill against an agreed breach playbook.',
                },
              };
              const info = roleCopy[st.id];
              return (
                <div key={st.id} className="grand-card rounded-xl p-5 space-y-2">
                  <div className="font-mono-data text-[11px] font-bold text-[#B8830D]">
                    0{idx + 1} · {st.label.toUpperCase()}
                  </div>
                  <h3 className="text-base font-bold text-[#102342]">{info.title}</h3>
                  <p className="text-xs text-[#52607A] leading-relaxed">{info.body}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="grand-card rounded-xl p-5 space-y-1.5">
              <h3 className="text-base font-bold text-[#102342]">Sector: Government</h3>
              <p className="text-xs text-[#52607A]">Lead with formal compliance standards, auditability, and deployment sovereignty.</p>
            </div>
            <div className="grand-card rounded-xl p-5 space-y-1.5">
              <h3 className="text-base font-bold text-[#102342]">Sector: Banks / BFSI</h3>
              <p className="text-xs text-[#52607A]">Lead with customer PII protection, Indian data residency, and RBI FREE-AI / GDPR safeguards.</p>
            </div>
            <div className="grand-card rounded-xl p-5 space-y-1.5">
              <h3 className="text-base font-bold text-[#102342]">Sector: Manufacturing</h3>
              <p className="text-xs text-[#52607A]">Lead with intellectual property protection, trade secrets, and partner-perimeter controls.</p>
            </div>
          </div>

          <div id="dyadic-matrix" className="space-y-3">
            <h3 className="text-base font-bold text-[#102342]">
              Table 2.7 — Complete 9-Row Dyadic Alignment &amp; Gap Matrix
            </h3>
            <div className="grand-card rounded-xl overflow-x-auto p-0">
              <table className="w-full text-left border-collapse text-[13px]">
                <thead>
                  <tr className="bg-[#102342] text-white text-xs">
                    <th className="py-3 px-4 font-semibold">Dimension</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Client (C1) View</th>
                    <th className="py-3 px-4 font-semibold">Vendor (V1) View</th>
                    <th className="py-3 px-4 font-semibold">Playbook Takeaway</th>
                  </tr>
                </thead>
                <tbody>
                  {DYADIC_GAP_MATRIX.map((m) => (
                    <tr key={m.row} className="border-t border-[#DED8CA]">
                      <td className="py-3 px-4 font-semibold">{m.row}</td>
                      <td
                        className={`py-3 px-4 font-bold whitespace-nowrap ${
                          m.status === 'Aligned'
                            ? 'text-[#065F46]'
                            : m.status === 'Gap'
                            ? 'text-[#9F1239]'
                            : m.status === 'Partly aligned'
                            ? 'text-[#7D5700]'
                            : 'text-[#52607A]'
                        }`}
                      >
                        {m.status}
                      </td>
                      <td className="py-3 px-4">{m.c1View}</td>
                      <td className="py-3 px-4">{m.v1View}</td>
                      <td className="py-3 px-4">{m.implication}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 04. Codebook & Study Limitations */}
        <section id="codebook" className="pt-12 border-t border-[#DED8CA] space-y-7">
          <div>
            <p className="font-mono-data text-xs font-semibold text-[#B8830D]">04 · Appendix C &amp; Methodological Discipline</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] mt-1 text-balance">
              Thematic Codebook &amp; Study Limitations
            </h2>
            <p className="text-[15px] text-[#52607A] mt-2 max-w-3xl">
              All fourteen Braun &amp; Clarke analytical codes across Cases 1 and 2, followed by explicit methodological boundaries.
            </p>
          </div>

          <div className="grand-card rounded-xl overflow-x-auto p-0">
            <table className="w-full text-left border-collapse text-[13px]">
              <thead>
                <tr className="bg-[#102342] text-white text-xs">
                  <th className="py-3 px-4 font-semibold">Code</th>
                  <th className="py-3 px-4 font-semibold">Definition</th>
                  <th className="py-3 px-4 font-semibold">Case</th>
                  <th className="py-3 px-4 font-semibold">Theoretical Framework</th>
                </tr>
              </thead>
              <tbody>
                {CODEBOOK.map((entry) => (
                  <tr key={entry.code} className="border-t border-[#DED8CA]">
                    <td className="py-2.5 px-4 font-mono-data font-bold text-[#102342]">{entry.code}</td>
                    <td className="py-2.5 px-4">{entry.definition}</td>
                    <td className="py-2.5 px-4 font-mono-data whitespace-nowrap">Case {entry.caseNum}</td>
                    <td className="py-2.5 px-4">{entry.framework}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            id="limitations"
            className="bg-[#FBF4E2]/70 border-2 border-dashed border-[#C89214] rounded-xl p-6"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#7D5700]">
              Study Limitations Stamp
            </h3>
            <ul className="mt-3 pl-5 list-disc grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[13px] text-[#334155]">
              <li>One respondent per case (qualitative exploratory design).</li>
              <li>Case 2 is a conceptual dyad drawn from two different firms (Vendor V1 and Client C1).</li>
              <li>Figures such as 31–32%, $6–10 million, and the refinery statistics (99% / 8% / 40%) are self-reported and unverified.</li>
              <li>Question 7 (Indian LLMs) was not asked in the interview, so related insights are marked <strong>Inferred</strong>.</li>
            </ul>
          </div>
        </section>

        {/* 05. Research Team */}
        <section id="team" className="pt-12 border-t border-[#DED8CA] space-y-7">
          <div>
            <p className="font-mono-data text-xs font-semibold text-[#B8830D]">05 · Authors &amp; Protocol</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] mt-1 text-balance">
              Group 1 Authors · DMS, IIT Delhi
            </h2>
            <p className="text-[15px] text-[#52607A] mt-2 max-w-3xl">
              Emerging Technologies for Digital Transformation · MBA Section B, Group 1 · Department of Management Studies, IIT Delhi (November 2026).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.rollNo} className="grand-card rounded-xl p-4.5 flex items-center gap-4">
                <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 border-2 border-[#D9A21B] ring-2 ring-white shadow-sm bg-[#102342]">
                  <img
                    src={member.photo}
                    alt={`Portrait of ${member.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-110 block"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102342] leading-snug">{member.name}</h3>
                  <p className="font-mono-data text-xs font-semibold text-[#B8830D] mt-0.5">{member.rollNo}</p>
                  <p className="text-xs text-[#52607A] mt-1">{member.contribution}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#DED8CA] bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#52607A]">
          <span>The Trust Desk · Group 1, Section B, DMS IIT Delhi (November 2026)</span>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#case-1" className="hover:text-[#102342] hover:underline">Case 1</a>
            <a href="#case-2" className="hover:text-[#102342] hover:underline">Case 2</a>
            <a href="#playbook" className="hover:text-[#102342] hover:underline">Playbook</a>
            <a href="#codebook" className="hover:text-[#102342] hover:underline">Codebook</a>
            <a href="/trust-desk.html" className="hover:text-[#102342] hover:underline font-semibold text-[#102342]">
              Pure HTML/CSS File
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
