"use client";

import React, { useState } from "react";
import { Finding } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import {
  FileCode2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Code2,
  Filter,
} from "lucide-react";

interface BreakingChangesTabProps {
  findings: Finding[];
  onOpenFileInCodeTab?: (filename: string) => void;
}

export function BreakingChangesTab({
  findings,
  onOpenFileInCodeTab,
}: BreakingChangesTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>("F-04");
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");

  const filteredFindings = findings.filter((f) => {
    if (filterSeverity === "ALL") return true;
    return f.severity === filterSeverity;
  });

  return (
    <div className="space-y-4">
      {/* Filter and summary bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300">
          <span className="font-semibold text-zinc-900 dark:text-white">Grounded Findings</span>
          <span className="text-zinc-400">•</span>
          <span>{findings.length} Discovered</span>
          <span className="text-zinc-400">•</span>
          <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified against AST & Release Tag Diffs
          </span>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <Filter className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-zinc-500 mr-1">Filter:</span>
          {["ALL", "HIGH", "MEDIUM"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                filterSeverity === sev
                  ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Findings List */}
      <div className="space-y-3">
        {filteredFindings.map((finding) => {
          const isExpanded = expandedId === finding.id;

          return (
            <div
              key={finding.id}
              className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 overflow-hidden shadow-xs transition-all"
            >
              {/* Finding Summary Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : finding.id)}
                className="p-4 sm:p-5 cursor-pointer hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] flex items-start justify-between gap-4 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
                      {finding.id}
                    </span>
                    <RiskBadge level={finding.severity} size="sm" />
                    <VerificationBadge status={finding.status} size="sm" />
                    <span className="text-[11px] text-zinc-500 font-sans">
                      Category: {finding.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
                    {finding.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans leading-relaxed">
                    {finding.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-zinc-400">Target API:</span>
                      <code className="text-indigo-700 dark:text-indigo-300 font-semibold bg-zinc-100 dark:bg-white/[0.04] px-1.5 py-0.5 rounded">
                        {finding.affectedApi}
                      </code>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <FileCode2 className="w-3.5 h-3.5 text-zinc-400" />
                      <span className="text-zinc-400">Affected files:</span>
                      <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                        {finding.affectedFiles.join(", ")}
                      </span>
                    </div>

                    <div className="text-[11px]">
                      Confidence:{" "}
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        {finding.confidence}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="p-1.5 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  aria-label="Toggle details"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-zinc-100 dark:border-white/[0.06] bg-zinc-50/60 dark:bg-[#07090D]/80 space-y-4">
                  {/* Code Diff Box */}
                  {(finding.diffBefore || finding.diffAfter) && (
                    <div>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2 font-semibold">
                        Semantic Syntax Transformation
                      </span>
                      <div className="rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#050608] p-3 font-mono text-xs overflow-x-auto space-y-1 shadow-inner">
                        {finding.diffBefore && (
                          <div className="text-rose-700 dark:text-rose-400 whitespace-pre">
                            {finding.diffBefore}
                          </div>
                        )}
                        {finding.diffAfter && (
                          <div className="text-emerald-700 dark:text-emerald-400 whitespace-pre">
                            {finding.diffAfter}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Verifier Note */}
                  {finding.verifierNote && (
                    <div className="rounded-lg p-3 bg-emerald-50/80 dark:bg-emerald-500/[0.04] border border-emerald-200 dark:border-emerald-500/20 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-mono font-semibold mb-1 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verifier Critic Grounding Audit</span>
                      </div>
                      <p className="text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                        {finding.verifierNote}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      {finding.affectedFiles.map((f) => (
                        <button
                          key={f}
                          onClick={() => onOpenFileInCodeTab && onOpenFileInCodeTab(f)}
                          className="text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-200/70 hover:bg-zinc-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <FileCode2 className="w-3 h-3 text-indigo-500" />
                          <span>Open in Code Viewer ({f})</span>
                        </button>
                      ))}
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400">
                      ID: {finding.id} • Status: {finding.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
