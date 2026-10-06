"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { DEMO_ANALYSIS_SUMMARY, DEMO_PREVIOUS_ANALYSES } from "@/lib/demoData";
import {
  ArrowRight,
  ShieldCheck,
  Terminal,
  Cpu,
  GitFork,
  Code2,
  FileDiff,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  Clock,
  CheckCircle2,
  FileSearch,
} from "lucide-react";

export default function OverviewPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Overview"
          subtitle="Pre-Upgrade Intelligence"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* EDITORIAL ASYMMETRIC HERO SECTION */}
          <div className="surface-card rounded-xl p-6 sm:p-8 lg:p-10 shadow-glass-md relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* LEFT: Headline & Narrative (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.08] text-zinc-700 dark:text-zinc-300 font-mono text-[11px] font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span>PRE-UPGRADE INTELLIGENCE</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.15] font-sans">
                  Know what your dependency upgrade could break —{" "}
                  <span className="text-indigo-600 dark:text-indigo-400">
                    before you upgrade.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-xl">
                  UpgradeGuard connects package releases with repository-specific AST call sites, verifiable ground-truth evidence, and automated validation planning.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2 font-sans">
                  <Link
                    href="/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/30 transition-all hover:-translate-y-0.5"
                  >
                    <Terminal className="w-4 h-4" />
                    <span>Analyze an Upgrade</span>
                  </Link>

                  <Link
                    href="/architecture"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-white/[0.05] hover:bg-zinc-200/70 dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.08] transition-all"
                  >
                    <span>View Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
                  </Link>

                  <Link
                    href="/analysis/fastapi-demo"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <span>Inspect FastAPI Demo →</span>
                  </Link>
                </div>
              </div>

              {/* RIGHT: Interactive Upgrade Intelligence Preview Card (5 cols) */}
              <div className="lg:col-span-5 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#0B0E15] p-5 shadow-lg space-y-4">
                {/* Package Spec Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.06]">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      TARGET UPGRADE HOP
                    </div>
                    <div className="text-base font-bold text-zinc-900 dark:text-white font-mono flex items-center gap-2">
                      <span>FastAPI</span>
                      <span className="text-xs font-normal text-zinc-500">0.110.0</span>
                      <span className="text-zinc-400">→</span>
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">0.120.0</span>
                    </div>
                  </div>
                  <RiskBadge level="HIGH" score={72} size="sm" />
                </div>

                {/* Staged Specialized Agents with Semantic Colors */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    SPECIALIZED MULTI-AGENT CORRELATION
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {/* Dependency Agent - Blue */}
                    <div className="p-2.5 rounded-md border border-blue-200 dark:border-blue-500/20 bg-blue-50/50 dark:bg-blue-500/[0.04]">
                      <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-400 font-semibold mb-0.5">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>Dependency</span>
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        1 conflict flagged
                      </span>
                    </div>

                    {/* Change Analysis Agent - Amber */}
                    <div className="p-2.5 rounded-md border border-amber-200 dark:border-amber-500/20 bg-amber-50/50 dark:bg-amber-500/[0.04]">
                      <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold mb-0.5">
                        <FileDiff className="w-3.5 h-3.5" />
                        <span>Change Agent</span>
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        2 breaking APIs
                      </span>
                    </div>

                    {/* Code Impact Agent - Teal */}
                    <div className="p-2.5 rounded-md border border-teal-200 dark:border-teal-500/20 bg-teal-50/50 dark:bg-teal-500/[0.04]">
                      <div className="flex items-center gap-1.5 text-teal-700 dark:text-teal-400 font-semibold mb-0.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Code Impact</span>
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        4 files, 7 call sites
                      </span>
                    </div>

                    {/* Security Agent - Coral */}
                    <div className="p-2.5 rounded-md border border-rose-200 dark:border-rose-500/20 bg-rose-50/50 dark:bg-rose-500/[0.04]">
                      <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold mb-0.5">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Security</span>
                      </div>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        1 CVE remediated
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grounding & Critic Loop Highlight - Emerald & Teal */}
                <div className="p-3 rounded-md border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/60 dark:bg-emerald-500/[0.04] text-xs">
                  <div className="flex items-center justify-between font-mono mb-1">
                    <span className="flex items-center gap-1.5 font-semibold text-emerald-800 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verifier Critic Loop</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-500/20 px-1.5 py-0.2 rounded">
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-sans">
                    F-04 signature change grounded by AST match in <code className="text-zinc-800 dark:text-zinc-200">src/auth.py:35</code>. Zero hallucinations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE BENCHMARK SPOTLIGHT */}
          <div className="surface-card rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                FA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white font-sans">
                    FastAPI Commerce API Benchmark
                  </span>
                  <RiskBadge level={DEMO_ANALYSIS_SUMMARY.riskLevel} score={DEMO_ANALYSIS_SUMMARY.riskScore} size="sm" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
                  Spec: <code className="font-mono text-zinc-700 dark:text-zinc-300">FastAPI 0.110.0 → 0.120.0</code> • 4 affected modules, 1 dependency conflict, 5 targeted tests.
                </p>
              </div>
            </div>

            <Link
              href="/analysis/fastapi-demo"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all self-start md:self-auto font-sans"
            >
              <span>Inspect Full Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* RECENT ANALYSES TABLE */}
          <div className="surface-card rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
              <div className="flex items-center gap-2 font-sans">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                  Recent Upgrade Analyses
                </span>
              </div>
              <Link
                href="/analyses"
                className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all ({DEMO_PREVIOUS_ANALYSES.length}) →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-white/[0.04]">
                    <th className="pb-2.5 font-medium">Analysis ID</th>
                    <th className="pb-2.5 font-medium">Dependency</th>
                    <th className="pb-2.5 font-medium">Version Hop</th>
                    <th className="pb-2.5 font-medium">Repository</th>
                    <th className="pb-2.5 font-medium">Risk Rating</th>
                    <th className="pb-2.5 font-medium">Breaking APIs</th>
                    <th className="pb-2.5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.03]">
                  {DEMO_PREVIOUS_ANALYSES.map((row) => (
                    <tr key={row.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-bold text-indigo-600 dark:text-indigo-400">{row.id}</td>
                      <td className="py-3 font-semibold text-zinc-900 dark:text-zinc-200">{row.dependency}</td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">
                        {row.fromVersion} → {row.toVersion}
                      </td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-300 font-sans">{row.repository}</td>
                      <td className="py-3">
                        <RiskBadge level={row.riskLevel as any} score={row.riskScore} size="sm" />
                      </td>
                      <td className="py-3 text-rose-600 dark:text-rose-400 font-semibold font-mono">
                        {row.breakingChanges}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href="/analysis/fastapi-demo"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                        >
                          View Report
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
