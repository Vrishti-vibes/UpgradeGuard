"use client";

import React from "react";
import { EvidenceItem } from "@/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import {
  ShieldCheck,
  FileSearch,
  BookOpen,
  GitCommit,
  Code2,
  Database,
} from "lucide-react";

interface EvidenceTabProps {
  evidenceList: EvidenceItem[];
}

export function EvidenceTab({ evidenceList }: EvidenceTabProps) {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "PyPI Changelog":
        return <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />;
      case "AST Call Graph":
        return <Code2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />;
      case "GitHub Commit Diff":
        return <GitCommit className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />;
      case "OSV Advisory DB":
        return <Database className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />;
      default:
        return <FileSearch className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Evidence Store Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 font-sans">
            <span>Evidence Locker & Verifier Audit Trail</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/15 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-500/25">
              6 Verified Artifacts
            </span>
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-sans">
            Every claimed breaking change must be substantiated by AST call sites, release diffs, or vulnerability feeds before acceptance.
          </p>
        </div>

        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/[0.04] px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.06] flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Critic Floor: ≥ 90% Confidence</span>
        </span>
      </div>

      {/* Evidence Cards */}
      <div className="space-y-3">
        {evidenceList.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 p-4 sm:p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-white/[0.06] px-2 py-0.5 rounded border border-zinc-200 dark:border-white/[0.08]">
                  {item.id}
                </span>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  Target: {item.findingId}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-zinc-600 dark:text-zinc-300 bg-teal-50/60 dark:bg-teal-500/[0.08] px-2 py-0.5 rounded border border-teal-200 dark:border-teal-500/20 font-sans">
                  {getSourceIcon(item.sourceType)}
                  <span>{item.sourceType}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-500">
                  Confidence:{" "}
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.confidence}%</span>
                </span>
                <VerificationBadge status={item.verificationStatus} size="sm" />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                Source: {item.sourceName}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Raw Telemetry Block */}
            <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#06080C] p-3 text-xs font-mono text-zinc-800 dark:text-zinc-300 overflow-x-auto">
              <span className="text-[10px] text-zinc-400 uppercase block mb-1 font-semibold">
                Captured Ground-Truth Telemetry:
              </span>
              <pre className="whitespace-pre text-teal-700 dark:text-teal-400 text-xs">
                {item.rawExcerpt}
              </pre>
            </div>

            {/* Verifier Critique Verdict */}
            <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-500/[0.04] border border-emerald-200 dark:border-emerald-500/20 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono font-semibold text-emerald-800 dark:text-emerald-400 block">
                  Verifier Critic Verdict:
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 font-sans text-xs mt-0.5 leading-relaxed">
                  {item.verifierCritique}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
