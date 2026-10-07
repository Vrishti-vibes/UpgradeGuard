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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-2 font-sans">
            <span>Targeted Test Suite</span>
            <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40">
              5 Test Plans
            </span>
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
            Targeted tests generated specifically for the 4 impacted files to verify the upgrade safely.
          </p>
        </div>

        <button
          onClick={handleRunAll}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto cursor-pointer font-sans"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Simulate All Tests</span>
        </button>
      </div>

      {/* Test Cards List */}
      <div className="space-y-4">
        {tests.map((test) => {
          const result = testResults[test.id];
          const isRunning = runningTestId === test.id;

          return (
            <div
              key={test.id}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-3.5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/40">
                    {test.id}
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                    {test.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 bg-[var(--bg-subtle)] px-2.5 py-0.5 rounded-full border border-[var(--border-subtle)] font-sans font-medium">
                    {test.area}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {result === "PASSED" ? (
                    <span className="flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Passed Simulation
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRunTest(test.id)}
                      disabled={isRunning}
                      className="flex items-center gap-1.5 text-xs font-sans font-semibold px-3 py-1.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-[var(--border-subtle)] transition-colors cursor-pointer"
                    >
                      {isRunning ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                          <span>Running...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current text-indigo-500" />
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
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-3 flex items-center justify-between gap-3 font-mono text-xs text-zinc-800 dark:text-zinc-200 overflow-x-auto">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                  <code className="text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">{test.command}</code>
                </div>

                <button
                  onClick={() => handleCopy(test.command, test.id)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-[var(--bg-subtle)] transition-colors flex-shrink-0 cursor-pointer"
                  title="Copy command"
                >
                  {copiedId === test.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1 font-sans">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Target files: <span className="font-mono text-zinc-600 dark:text-zinc-300">{test.targetFiles.join(", ")}</span></span>
                </div>
                <span>Status: <span className="font-semibold text-zinc-600 dark:text-zinc-300">{result || test.status}</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
