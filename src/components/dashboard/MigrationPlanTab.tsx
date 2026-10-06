"use client";

import React, { useState } from "react";
import { MigrationStep } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import {
  Copy,
  Check,
  FileCode,
  Clock,
} from "lucide-react";

interface MigrationPlanTabProps {
  steps: MigrationStep[];
}

export function MigrationPlanTab({ steps }: MigrationPlanTabProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const totalMinutes = steps.reduce((acc, step) => acc + step.estimatedMinutes, 0);

  return (
    <div className="space-y-6">
      {/* Migration Plan Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 font-sans">
            <span>Sequenced Migration Plan</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              5 Steps
            </span>
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-sans">
            Follow this ordered playbook to eliminate runtime 422 errors and satisfy dependency constraints.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-white/[0.04] px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/[0.06]">
          <Clock className="w-3.5 h-3.5 text-indigo-500" />
          <span>Estimated Migration Time: ~{totalMinutes} mins</span>
        </div>
      </div>

      {/* Numbered Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div
            key={step.stepNumber}
            className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 p-5 space-y-4 shadow-xs"
          >
            {/* Step header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                  {step.stepNumber}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                      {step.title}
                    </h4>
                    {step.findingRef && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/20 font-semibold">
                        {step.findingRef}
                      </span>
                    )}
                  </div>

                  {step.filePath && (
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1 mt-0.5">
                      <FileCode className="w-3 h-3 text-zinc-400" />
                      {step.filePath}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <RiskBadge level={step.risk} size="sm" />
                <span className="text-zinc-400">~{step.estimatedMinutes} min</span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
              {step.description}
            </p>

            {/* Code Transformation Box */}
            {(step.snippetBefore || step.snippetAfter) && (
              <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#07090D] overflow-hidden text-xs font-mono">
                <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100 dark:bg-[#0C0F17] border-b border-zinc-200 dark:border-white/[0.06] text-zinc-500 text-[11px]">
                  <span className="font-sans">Code Transformation</span>
                  <button
                    onClick={() =>
                      handleCopy(
                        step.snippetAfter || step.snippetBefore || "",
                        idx
                      )
                    }
                    className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-sans">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="font-sans">Copy Target</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 space-y-2">
                  {step.snippetBefore && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-400 uppercase block font-semibold">
                        Before (0.110.0):
                      </span>
                      <pre className="p-2 rounded bg-rose-50 dark:bg-rose-500/[0.05] border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 whitespace-pre overflow-x-auto">
                        {step.snippetBefore}
                      </pre>
                    </div>
                  )}

                  {step.snippetAfter && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-zinc-400 uppercase block font-semibold">
                        After (0.120.0 Migration):
                      </span>
                      <pre className="p-2 rounded bg-emerald-50 dark:bg-emerald-500/[0.05] border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 whitespace-pre overflow-x-auto">
                        {step.snippetAfter}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
