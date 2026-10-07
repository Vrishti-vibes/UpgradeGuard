"use client";

import React, { useState } from "react";
import { Finding } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import {
  FileCode,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Filter,
  Code2,
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
    <div className="space-y-4 font-sans text-sm">
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
        <div>
          <h3 className="font-bold text-sm text-[var(--text-primary)]">
            Discovered Breaking Changes ({findings.length})
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Changes between FastAPI 0.110.0 and 0.120.0 that affect this codebase
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[var(--text-muted)] mr-1">Filter:</span>
          {["ALL", "HIGH", "MEDIUM"].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterSeverity === sev
                  ? "bg-indigo-600 text-white font-semibold shadow-xs"
                  : "bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Findings Cards List */}
      <div className="space-y-3">
        {filteredFindings.map((finding) => {
          const isExpanded = expandedId === finding.id;

          return (
            <div
              key={finding.id}
              className="rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden transition-all"
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : finding.id)}
                className="p-5 cursor-pointer hover:bg-[var(--bg-subtle)]/50 flex items-start justify-between gap-4 transition-colors"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <RiskBadge severity={finding.severity} size="sm" />
                    <span className="text-xs font-mono font-bold text-indigo-600">
                      {finding.id}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      Category: {finding.category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {finding.title}
                  </h4>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {finding.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[var(--text-muted)]">API:</span>
                      <code className="text-indigo-600 font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md border border-indigo-100 dark:border-indigo-800/40">
                        {finding.affectedApi}
                      </code>
                    </div>

                    <div className="flex items-center gap-1.5 text-[var(--text-secondary)] font-mono text-[11px]">
                      <FileCode className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{finding.affectedFiles.join(", ")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-indigo-600 font-medium hidden sm:inline">
                    {isExpanded ? "Hide Solution" : "View Fix"}
                  </span>
                  <div className="p-1 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Solution & Code Fix */}
              {isExpanded && (
                <div className="p-5 pt-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]/50 space-y-4">
                  {(finding.diffBefore || finding.diffAfter) && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                        Before / After Code Solution
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40">
                          <span className="text-[10px] text-red-700 dark:text-red-400 font-bold uppercase block mb-1">
                            - Old Deprecated Code
                          </span>
                          <pre className="text-red-800 dark:text-red-300 whitespace-pre-wrap">{finding.diffBefore}</pre>
                        </div>
                        <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40">
                          <span className="text-[10px] text-green-700 dark:text-green-400 font-bold uppercase block mb-1">
                            + Updated Working Code
                          </span>
                          <pre className="text-green-800 dark:text-green-300 whitespace-pre-wrap">{finding.diffAfter}</pre>
                        </div>
                      </div>
                    </div>
                  )}

                  {onOpenFileInCodeTab && (
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => onOpenFileInCodeTab(finding.affectedFiles[0])}
                        className="px-4 py-2 rounded-xl text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Code2 className="w-4 h-4" />
                        <span>Inspect in Code Impact Tab →</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
