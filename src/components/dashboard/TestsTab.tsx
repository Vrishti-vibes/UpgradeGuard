"use client";

import React, { useState } from "react";
import { TestCase } from "@/types";
import {
  Terminal,
  Play,
  CheckCircle2,
  Copy,
  Check,
  FileCode,
  RotateCw,
} from "lucide-react";

interface TestsTabProps {
  tests: TestCase[];
}

export function TestsTab({ tests }: TestsTabProps) {
  const [runningTestId, setRunningTestId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{ [id: string]: "PASSED" | "FAILED" }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleRunTest = (testId: string) => {
    setRunningTestId(testId);
    setTimeout(() => {
      setRunningTestId(null);
      setTestResults((prev) => ({ ...prev, [testId]: "PASSED" }));
    }, 900);
  };

  const handleRunAll = () => {
    tests.forEach((t, i) => {
      setTimeout(() => {
        setTestResults((prev) => ({ ...prev, [t.id]: "PASSED" }));
      }, (i + 1) * 350);
    });
  };

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Test Strategy Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 font-sans">
            <span>Targeted Validation Suite</span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30">
              5 Test Plans
            </span>
          </h3>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 font-sans">
            Test Planner Agent synthesized these targeted suites rather than executing non-impacted integration runs.
          </p>
        </div>

        <button
          onClick={handleRunAll}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all self-start sm:self-auto cursor-pointer font-sans"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Simulate All 5 Tests</span>
        </button>
      </div>

      {/* Test Cards List */}
      <div className="space-y-3">
        {tests.map((test) => {
          const result = testResults[test.id];
          const isRunning = runningTestId === test.id;

          return (
            <div
              key={test.id}
              className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 p-4 sm:p-5 space-y-3 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
                    {test.id}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-200 font-sans">
                    {test.name}
                  </span>
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 rounded border border-zinc-200 dark:border-white/[0.06] font-sans">
                    {test.area}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {result === "PASSED" ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      PASSED (Simulation)
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRunTest(test.id)}
                      disabled={isRunning}
                      className="flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-white/[0.08] transition-colors cursor-pointer"
                    >
                      {isRunning ? (
                        <>
                          <RotateCw className="w-3 h-3 animate-spin text-indigo-500" />
                          <span>Executing...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current text-indigo-500" />
                          <span>Run Test</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Rationale */}
              <p className="text-xs text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                {test.rationale}
              </p>

              {/* Command Box */}
              <div className="rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#07090D] p-2.5 flex items-center justify-between gap-3 font-mono text-xs text-zinc-800 dark:text-zinc-300 overflow-x-auto">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                  <code className="text-indigo-700 dark:text-indigo-300 whitespace-nowrap">{test.command}</code>
                </div>

                <button
                  onClick={() => handleCopy(test.command, test.id)}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy command"
                >
                  {copiedId === test.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-3 h-3 text-zinc-400" />
                  <span>Target modules: {test.targetFiles.join(", ")}</span>
                </div>
                <span>Status: {result || test.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
