"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight, GitFork, FileDiff, Code2, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import { DEMO_AGENT_EVENTS } from "@/lib/demoData";
import { AgentTimeline } from "./AgentTimeline";

interface Step {
  id: string;
  name: string;
  agent: string;
  action: string;
  durationMs: number;
  icon: React.ReactNode;
}

const SEQUENCE_STEPS: Step[] = [
  {
    id: "step-1",
    name: "Checking Dependencies",
    agent: "Dependency Agent",
    action: "Evaluating package versions and lockfile boundaries",
    durationMs: 600,
    icon: <GitFork className="w-4 h-4 text-indigo-500" />,
  },
  {
    id: "step-2",
    name: "Checking Version Changes",
    agent: "Change Analysis Agent",
    action: "Mining release notes, changelogs, and deprecated parameters",
    durationMs: 700,
    icon: <FileDiff className="w-4 h-4 text-amber-500" />,
  },
  {
    id: "step-3",
    name: "Checking Affected Code",
    agent: "Code Impact Agent",
    action: "Scanning 48 project source files for affected API call sites",
    durationMs: 800,
    icon: <Code2 className="w-4 h-4 text-cyan-500" />,
  },
  {
    id: "step-4",
    name: "Checking Security",
    agent: "Security Agent",
    action: "Cross-referencing known vulnerability and CVE advisory databases",
    durationMs: 600,
    icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
  },
  {
    id: "step-5",
    name: "AI Validation & Synthesis",
    agent: "AI Verification Step",
    action: "Eliminating false positives and generating migration plan",
    durationMs: 700,
    icon: <ShieldCheck className="w-4 h-4 text-green-500" />,
  },
];

interface AnalysisProgressProps {
  onComplete?: () => void;
  targetUrl?: string;
  autoRedirect?: boolean;
}

export function AnalysisProgress({
  onComplete,
  targetUrl = "/analysis/fastapi-demo",
  autoRedirect = false,
}: AnalysisProgressProps) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0.0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setElapsedTime((prev) => {
        if (isDone) return prev;
        return parseFloat((prev + 0.1).toFixed(1));
      });
    }, 100);

    return () => clearInterval(timerInterval);
  }, [isDone]);

  useEffect(() => {
    if (currentStepIndex >= SEQUENCE_STEPS.length) {
      setIsDone(true);
      if (onComplete) onComplete();
      if (autoRedirect) {
        const timeout = setTimeout(() => {
          router.push(targetUrl);
        }, 1200);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const step = SEQUENCE_STEPS[currentStepIndex];

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, step.durationMs);

    return () => clearTimeout(timer);
  }, [currentStepIndex, autoRedirect, onComplete, router, targetUrl]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {isDone ? "Analysis Complete" : "AI Multi-Agent Pipeline Running"}
              </span>
              {!isDone && (
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              )}
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)] font-sans">
              Analyzing FastAPI: <span className="font-mono text-base font-normal">0.110.0 → 0.120.0</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Repository: <strong className="text-[var(--text-primary)] font-mono">fastapi-commerce-api</strong> • Ecosystem: <strong className="text-[var(--text-primary)] font-mono">Python</strong>
            </p>
          </div>

          {isDone ? (
            <button
              onClick={() => router.push(targetUrl)}
              className="clay-btn inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer font-sans"
            >
              <span>View Results</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)]">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
              <span>Stage {Math.min(currentStepIndex + 1, SEQUENCE_STEPS.length)} of 5</span>
            </div>
          )}
        </div>

        {/* 4 Clean Metric Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Files Scanned</span>
            <span className="text-lg font-bold text-[var(--text-primary)] font-mono">48</span>
            <span className="text-[10px] text-[var(--text-secondary)] block">Source modules</span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Findings</span>
            <span className="text-lg font-bold text-red-600 font-mono">4</span>
            <span className="text-[10px] text-[var(--text-secondary)] block">2 breaking, 2 warnings</span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Sources Checked</span>
            <span className="text-lg font-bold text-cyan-600 font-mono">14</span>
            <span className="text-[10px] text-[var(--text-secondary)] block">PyPI, OSV, Code AST</span>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] text-xs">
            <span className="text-[10px] text-[var(--text-muted)] uppercase font-semibold block">Elapsed Time</span>
            <span className="text-lg font-bold text-green-600 font-mono">{elapsedTime}s</span>
            <span className="text-[10px] text-[var(--text-secondary)] block">Fast analysis</span>
          </div>
        </div>
      </div>

      {/* 5 Simple Sequential Pipeline Stages */}
      <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
        <h3 className="text-sm font-bold text-[var(--text-primary)] font-sans uppercase tracking-wider text-xs">
          AI Analysis Stages
        </h3>

        <div className="space-y-3 font-sans">
          {SEQUENCE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex || isDone;
            const isCurrent = idx === currentStepIndex && !isDone;
            const isPending = idx > currentStepIndex && !isDone;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isCompleted
                    ? "bg-green-50/60 dark:bg-green-950/20 border-green-200 dark:border-green-800/40 text-[var(--text-primary)]"
                    : isCurrent
                    ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800/60 shadow-xs"
                    : "bg-[var(--bg-subtle)]/50 border-transparent text-[var(--text-muted)]"
                }`}
              >
                <div className="pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--border-subtle)]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[var(--text-primary)]">
                        {step.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono text-[var(--text-muted)]">
                        {step.agent}
                      </span>
                    </div>

                    {isCompleted && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-semibold flex items-center gap-1">
                        Completed ✓
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                        Analyzing...
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {step.action}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
