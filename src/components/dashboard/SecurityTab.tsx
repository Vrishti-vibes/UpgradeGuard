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
    <div className="space-y-5">
      {/* Top Advisory Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
        <div className="flex items-center gap-2.5 text-xs font-sans text-zinc-700 dark:text-zinc-300">
          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span className="font-bold text-zinc-900 dark:text-white">Security Vulnerability Check</span>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1 Vulnerability Resolved via Upgrade</span>
        </div>

        <span className="text-[11px] font-sans text-zinc-500 bg-[var(--bg-subtle)] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
          Security Agent Advisory Feed
        </span>
      </div>

      {/* Advisory Cards */}
      <div className="space-y-4">
        {advisories.map((advisory) => (
          <div
            key={advisory.id}
            className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-4 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-[var(--bg-subtle)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)]">
                  {advisory.id}
                </span>
                {advisory.cve && (
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800/40">
                    {advisory.cve}
                  </span>
                )}
                <RiskBadge level={advisory.severity} size="sm" />
                {advisory.isDemo && (
                  <span className="text-[10px] text-zinc-500 bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full font-sans border border-[var(--border-subtle)]">
                    Demo Advisory
                  </span>
                )}
              </div>

              <span className="text-xs font-sans text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Fixed in {advisory.fixedIn}
              </span>
            </div>

            <div>
              <h4 className="text-xs text-zinc-500 mb-1.5 font-sans">
                Package: <span className="font-mono text-zinc-900 dark:text-zinc-200 font-bold">{advisory.affectedPackage}</span> (Versions: <span className="font-mono">{advisory.affectedVersions}</span>)
              </h4>
              <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                {advisory.summary}
              </p>
            </div>

            {/* Resolution Box */}
            <div className="rounded-xl p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/30 text-xs font-sans">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">
                Resolution Impact:
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 text-xs leading-relaxed">
                {advisory.recommendation}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 font-sans">
              <span>Source: <span className="font-mono">{advisory.source}</span></span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Verified by Security Agent</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
