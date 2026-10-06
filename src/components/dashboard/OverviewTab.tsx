"use client";

import React from "react";
import { AnalysisSummary, Finding } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import {
  AlertTriangle,
  ShieldAlert,
  FileCode2,
  GitBranch,
  ArrowRight,
  ShieldCheck,
  FileDiff,
  Terminal,
} from "lucide-react";

interface OverviewTabProps {
  summary: AnalysisSummary;
  findings: Finding[];
  onSelectTab: (tabId: string) => void;
}

export function OverviewTab({ summary, findings, onSelectTab }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Top Banner: Executive Recommendation */}
      <div className="rounded-xl border border-amber-300 dark:border-amber-500/20 bg-amber-50/70 dark:bg-amber-500/[0.04] p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 mt-0.5 border border-amber-300 dark:border-amber-500/20">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
              Executive Upgrade Advisory
            </span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-200/60 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono font-medium">
              Action Required
            </span>
          </div>
          <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium font-sans">
            "{summary.executiveRecommendation}"
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
            Upgrading directly without addressing the <code className="text-amber-700 dark:text-amber-300 font-mono">response_model_include</code> set format or resolving the transitive Starlette pin will cause application boot failure.
          </p>
        </div>
        <button
          onClick={() => onSelectTab("migration")}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-200 dark:bg-amber-500/15 dark:hover:bg-amber-500/25 border border-amber-300 dark:border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-sans font-medium transition-colors whitespace-nowrap self-center cursor-pointer"
        >
          <span>View Migration Plan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Grid: Risk Breakdown & Affected Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Breakdown Card (5 cols) */}
        <div className="lg:col-span-5 surface-card rounded-xl p-5 shadow-glass-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200/80 dark:border-white/[0.06]">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">
                Composite Risk Assessment
              </span>
              <RiskBadge level={summary.riskLevel} score={summary.riskScore} />
            </div>

            {/* Segmented Risk Score Block */}
            <div className="space-y-3 mb-6">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  72<span className="text-base text-zinc-400 font-normal">/100</span>
                </span>
                <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                  High Risk Threshold (≥70)
                </span>
              </div>

              {/* Segmented Progress Bar */}
              <div className="h-2 w-full bg-zinc-200 dark:bg-white/[0.06] rounded-full overflow-hidden flex gap-0.5 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${summary.riskScore}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                <span>0 Low</span>
                <span>40 Moderate</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold">▲ Current: 72</span>
                <span>100 Critical</span>
              </div>
            </div>

            {/* Primary Risk Drivers */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block mb-2 font-semibold">
                Primary Risk Drivers
              </span>
              {summary.summaryReasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 py-1.5 border-b border-zinc-100 dark:border-white/[0.03] last:border-none font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-zinc-200/80 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
            <span>Verified by Verifier Critic</span>
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Grounded
            </span>
          </div>
        </div>

        {/* Affected Surface & Metrics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div
              onClick={() => onSelectTab("breaking")}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 hover:border-amber-400 dark:hover:border-amber-400/50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[10px] uppercase">Breaking APIs</span>
                <FileDiff className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="text-xl font-bold text-amber-600 dark:text-amber-400">2</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">Parameters removed</span>
            </div>

            <div
              onClick={() => onSelectTab("impact")}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 hover:border-teal-400 dark:hover:border-teal-400/50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[10px] uppercase">Affected Files</span>
                <FileCode2 className="w-3.5 h-3.5 text-teal-500" />
              </div>
              <span className="text-xl font-bold text-zinc-900 dark:text-white">4</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">48 scanned</span>
            </div>

            <div
              onClick={() => onSelectTab("dependencies")}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 hover:border-rose-400 dark:hover:border-rose-400/50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[10px] uppercase">Lockfile Conflict</span>
                <GitBranch className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <span className="text-xl font-bold text-rose-600 dark:text-rose-400">1</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">Starlette upper bound</span>
            </div>

            <div
              onClick={() => onSelectTab("security")}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 hover:border-emerald-400 dark:hover:border-emerald-400/50 transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between text-zinc-400 mb-1">
                <span className="text-[10px] uppercase">CVE Fixed</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">1</span>
              <span className="text-[10px] text-zinc-500 block mt-0.5">DoS bug resolved</span>
            </div>
          </div>

          {/* Impact Distribution Matrix */}
          <div className="surface-card rounded-xl p-5 shadow-glass-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
              <span className="text-xs font-mono text-zinc-900 dark:text-zinc-200 font-semibold uppercase tracking-wider">
                Impact Surface Distribution
              </span>
              <span className="text-xs text-zinc-500 font-mono">4 Modules Impacted</span>
            </div>

            <div className="space-y-2.5 font-sans">
              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                      src/auth.py & src/api/users.py
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono font-semibold">
                      F-04 High
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Route decorators passing lists to <code className="text-zinc-800 dark:text-zinc-300 font-mono">response_model_include</code>
                  </p>
                </div>
                <button
                  onClick={() => onSelectTab("impact")}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline ml-4 whitespace-nowrap"
                >
                  View Code →
                </button>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                      src/api/payments.py & src/api/users.py
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 font-mono font-semibold">
                      F-01 High
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Parameter validation using obsolete <code className="text-zinc-800 dark:text-zinc-300 font-mono">Query(regex=...)</code>
                  </p>
                </div>
                <button
                  onClick={() => onSelectTab("impact")}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline ml-4 whitespace-nowrap"
                >
                  View Code →
                </button>
              </div>

              <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-200">
                      src/main.py
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono font-semibold">
                      F-06 Medium
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Lifecycle handlers using <code className="text-zinc-800 dark:text-zinc-300 font-mono">@app.on_event("startup")</code>
                  </p>
                </div>
                <button
                  onClick={() => onSelectTab("impact")}
                  className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline ml-4 whitespace-nowrap"
                >
                  View Code →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Findings Preview */}
      <div className="surface-card rounded-xl p-5 shadow-glass-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
          <div className="flex items-center gap-2 font-sans">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              Critical Findings (Preview)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
              {findings.length} Total
            </span>
          </div>
          <button
            onClick={() => onSelectTab("breaking")}
            className="text-xs font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore All Findings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {findings.slice(0, 2).map((finding) => (
            <div
              key={finding.id}
              className="p-4 rounded-lg border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#0E1118] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {finding.id}
                  </span>
                  <RiskBadge level={finding.severity} size="sm" />
                </div>
                <VerificationBadge status={finding.status} size="sm" />
              </div>

              <div>
                <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
                  {finding.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2 font-sans">
                  {finding.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-200/60 dark:border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{finding.affectedFiles.length} files affected</span>
                <span>Confidence: {finding.confidence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
