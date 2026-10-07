"use client";

import React, { useState } from "react";
import { EvidenceItem } from "@/types";
import {
  ShieldCheck,
  FileSearch,
  BookOpen,
  GitCommit,
  Code2,
  Database,
  CheckCircle2,
} from "lucide-react";

interface EvidenceTabProps {
  evidenceList: EvidenceItem[];
}

export function EvidenceTab({ evidenceList }: EvidenceTabProps) {
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>("EV-01");

  const selectedEvidence =
    evidenceList.find((e) => e.id === selectedEvidenceId) || evidenceList[0];

  const getSourceIcon = (type: string) => {
    switch (type) {
      case "PyPI Changelog":
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case "AST Call Graph":
        return <Code2 className="w-4 h-4 text-cyan-600" />;
      case "GitHub Commit Diff":
        return <GitCommit className="w-4 h-4 text-indigo-500" />;
      case "OSV Advisory DB":
        return <Database className="w-4 h-4 text-red-500" />;
      default:
        return <FileSearch className="w-4 h-4 text-[var(--text-muted)]" />;
    }
  };

  return (
    <div className="space-y-4 font-sans text-sm">
      {/* Evidence Store Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
        <div>
          <h3 className="font-bold text-base text-[var(--text-primary)]">
            Verified Evidence & Sources ({evidenceList.length})
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Every finding is backed by official changelogs, commit diffs, or project code references.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-800/40 font-semibold font-sans">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>100% Grounded Sources</span>
        </div>
      </div>

      {/* 2-Pane Layout: Table (Left) + Clean Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left: Sources List */}
        <div className="lg:col-span-6 space-y-2">
          {evidenceList.map((item) => {
            const isSelected = selectedEvidenceId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedEvidenceId(item.id)}
                className={`p-4 rounded-xl clay-card border cursor-pointer transition-all space-y-1 ${
                  isSelected
                    ? "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800/50 shadow-xs"
                    : "bg-[var(--bg-surface)] border-[var(--border-subtle)] hover:border-indigo-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600">
                      {item.id}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      for {item.findingId}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 font-semibold">
                    Verified
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-0.5">
                  {getSourceIcon(item.sourceType)}
                  <span className="font-bold text-xs text-[var(--text-primary)]">
                    {item.sourceName}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Evidence Inspector */}
        <div className="lg:col-span-6 p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
          <div className="pb-3 border-b border-[var(--border-subtle)]">
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold block">
              Source Details: {selectedEvidence.id}
            </span>
            <h4 className="text-base font-bold text-[var(--text-primary)] mt-0.5">
              {selectedEvidence.sourceName}
            </h4>
            <span className="text-xs text-indigo-600 font-mono">
              Type: {selectedEvidence.sourceType} • Finding: {selectedEvidence.findingId}
            </span>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase font-mono mb-1">
              Summary of Finding
            </h5>
            <p className="text-xs text-[var(--text-primary)] leading-relaxed bg-[var(--bg-subtle)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
              {selectedEvidence.summary}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[var(--text-muted)] uppercase font-mono mb-1">
              Official Excerpt / Code Evidence
            </h5>
            <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-primary)] overflow-x-auto">
              <pre className="whitespace-pre-wrap">{selectedEvidence.rawExcerpt}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
