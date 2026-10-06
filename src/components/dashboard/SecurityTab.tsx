"use client";

import React from "react";
import { SecurityAdvisory } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ShieldCheck, ShieldAlert } from "lucide-react";

interface SecurityTabProps {
  advisories: SecurityAdvisory[];
}

export function SecurityTab({ advisories }: SecurityTabProps) {
  return (
    <div className="space-y-4">
      {/* Top Advisory Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-semibold text-zinc-900 dark:text-white">Security Vulnerability Assessment</span>
          <span className="text-zinc-400">•</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">1 CVE Remediated via Upgrade</span>
        </div>

        <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 dark:bg-white/[0.04] px-2.5 py-1 rounded border border-zinc-200 dark:border-white/[0.06]">
          Feed: OSV / GHSA / PyPI Advisory DB
        </span>
      </div>

      {/* Advisory Cards */}
      <div className="space-y-3">
        {advisories.map((advisory) => (
          <div
            key={advisory.id}
            className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 p-4 sm:p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-white/[0.06] px-2 py-0.5 rounded border border-zinc-200 dark:border-white/[0.08]">
                  {advisory.id}
                </span>
                {advisory.cve && (
                  <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
                    {advisory.cve}
                  </span>
                )}
                <RiskBadge level={advisory.severity} size="sm" />
                {advisory.isDemo && (
                  <span className="text-[10px] text-zinc-500 bg-zinc-100 dark:bg-zinc-800/40 px-1.5 py-0.2 rounded font-mono">
                    Demo Advisory
                  </span>
                )}
              </div>

              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Fixed in {advisory.fixedIn}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-mono text-zinc-500 mb-1">
                Package: <span className="text-zinc-900 dark:text-zinc-200 font-bold">{advisory.affectedPackage}</span> (Versions: {advisory.affectedVersions})
              </h4>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                {advisory.summary}
              </p>
            </div>

            {/* Resolution Box */}
            <div className="rounded-lg p-3 bg-emerald-50/70 dark:bg-emerald-500/[0.04] border border-emerald-200 dark:border-emerald-500/20 text-xs font-sans">
              <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-semibold block mb-0.5">
                Resolution Impact:
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs">
                {advisory.recommendation}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
              <span>Source: {advisory.source}</span>
              <span>Automated triage: Clean</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
