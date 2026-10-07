"use client";

import React from "react";
import { AnalysisSummary, Finding } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  FileDiff,
  FileCode,
  GitFork,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface OverviewTabProps {
  summary: AnalysisSummary;
  findings: Finding[];
  onSelectTab: (tabId: string) => void;
}

export function OverviewTab({ summary, findings, onSelectTab }: OverviewTabProps) {
  return (
    <div className="space-y-6 text-sm font-sans">
      {/* Top Banner: Executive Recommendation */}
      <div className="p-5 rounded-2xl clay-card bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase font-mono">
                Upgrade Recommendation
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-800/50 text-amber-900 dark:text-amber-200 font-bold">
                Action Required
              </span>
            </div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              "{summary.executiveRecommendation}"
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Applying the upgrade directly without code changes will cause API parameter errors in 4 routes.
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectTab("migration")}
          className="clay-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-sm shadow-indigo-600/30"
        >
          <span>See Migration Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid: Left Findings & Surface (~65%) + Right Risk (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (~8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* 4 Quick Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div onClick={() => onSelectTab("breaking")} className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-amber-300 transition-all">
              <span className="text-xs text-[var(--text-muted)] font-medium block">Breaking Changes</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono mt-1 block">2</span>
              <span className="text-[11px] text-[var(--text-secondary)] block">Removed parameters</span>
            </div>

            <div onClick={() => onSelectTab("impact")} className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-indigo-300 transition-all">
              <span className="text-xs text-[var(--text-muted)] font-medium block">Affected Files</span>
              <span className="text-2xl font-bold text-[var(--text-primary)] font-mono mt-1 block">4</span>
              <span className="text-[11px] text-[var(--text-secondary)] block">Out of 48 total</span>
            </div>

            <div onClick={() => onSelectTab("dependencies")} className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-red-300 transition-all">
              <span className="text-xs text-[var(--text-muted)] font-medium block">Lockfile Conflict</span>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono mt-1 block">1</span>
              <span className="text-[11px] text-[var(--text-secondary)] block">Starlette version</span>
            </div>

            <div onClick={() => onSelectTab("security")} className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-green-300 transition-all">
              <span className="text-xs text-[var(--text-muted)] font-medium block">Security Fix</span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono mt-1 block">1</span>
              <span className="text-[11px] text-[var(--text-secondary)] block">Patched bug</span>
            </div>
          </div>

          {/* Impacted Files Breakdown */}
          <div className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  Affected Code Areas
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Source files requiring updates before deploying FastAPI 0.120.0
                </p>
              </div>
              <button
                onClick={() => onSelectTab("impact")}
                className="text-xs text-indigo-600 hover:underline font-semibold"
              >
                Inspect Code →
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[var(--text-primary)] font-mono">src/auth.py & src/api/users.py</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">High</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Route decorators passing list instead of set to <code className="text-indigo-600 font-mono">response_model_include</code>
                  </p>
                </div>
                <button onClick={() => onSelectTab("impact")} className="text-xs text-indigo-600 hover:underline font-medium">
                  View Code
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[var(--text-primary)] font-mono">src/api/payments.py & src/api/users.py</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">High</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Parameter validation using obsolete <code className="text-indigo-600 font-mono">Query(regex=...)</code> parameter
                  </p>
                </div>
                <button onClick={() => onSelectTab("impact")} className="text-xs text-indigo-600 hover:underline font-medium">
                  View Code
                </button>
              </div>

              <div className="p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-[var(--text-primary)] font-mono">src/main.py</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-bold">Medium</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Application lifecycle using deprecated <code className="text-indigo-600 font-mono">@app.on_event("startup")</code>
                  </p>
                </div>
                <button onClick={() => onSelectTab("impact")} className="text-xs text-indigo-600 hover:underline font-medium">
                  View Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Rail: Risk Score Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-muted)] uppercase font-semibold font-mono">
                Upgrade Risk
              </span>
              <RiskBadge severity={summary.riskLevel} score={summary.riskScore} size="sm" />
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-red-600 font-mono">72 <span className="text-sm text-[var(--text-muted)] font-normal">/ 100</span></span>
                <span className="text-red-600 font-bold text-xs uppercase font-mono">High Risk</span>
              </div>

              {/* Clean Bar */}
              <div className="h-2 w-full bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: "72%" }} />
              </div>
            </div>

            <div className="space-y-2 text-xs text-[var(--text-secondary)] pt-1">
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] font-mono block">Why is this score High?</span>
              {summary.summaryReasons.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span>{r}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>Validation status:</span>
              <span className="text-green-600 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Verified by AI
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/30 text-xs text-indigo-900 dark:text-indigo-200">
            💡 <strong>Presentation Tip:</strong> Mention how UpgradeGuard pinpoints the exact 4 files that need changes instead of having to test the entire application manually.
          </div>
        </div>
      </div>
    </div>
  );
}
