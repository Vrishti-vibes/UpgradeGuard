"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight, ShieldCheck, Activity, Cpu, GitFork, FileDiff, Code2, AlertTriangle, Terminal, Sparkles } from "lucide-react";
import { DEMO_AGENT_EVENTS } from "@/lib/demoData";
import { AgentTimeline } from "./AgentTimeline";

interface Step {
  id: string;
  agent: string;
  action: string;
  durationMs: number;
  icon: React.ReactNode;
}

const SEQUENCE_STEPS: Step[] = [
  {
    id: "step-1",
    agent: "Supervisor",
    action: "Analysis plan created and sub-tasks dispatched",
    durationMs: 450,
    icon: <Cpu className="w-3.5 h-3.5 text-violet-500" />,
  },
  {
    id: "step-2",
    agent: "Dependency Agent",
    action: "Dependency relationships & version bounds analyzed",
    durationMs: 550,
    icon: <GitFork className="w-3.5 h-3.5 text-blue-500" />,
  },
  {
    id: "step-3",
    agent: "Change Analysis Agent",
    action: "Release changes, deprecations & git diffs analyzed",
    durationMs: 650,
    icon: <FileDiff className="w-3.5 h-3.5 text-amber-500" />,
  },
  {
    id: "step-4",
    agent: "Code Impact Agent",
    action: "Repository call graph & 48 source files mapped",
    durationMs: 700,
    icon: <Code2 className="w-3.5 h-3.5 text-teal-500" />,
  },
  {
    id: "step-5",
    agent: "Security Agent",
    action: "Advisory information & CVE databases checked",
    durationMs: 500,
    icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />,
  },
  {
    id: "step-6",
    agent: "Verifier",
    action: "Critique loop triggered & important findings verified",
    durationMs: 750,
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />,
  },
  {
    id: "step-7",
    agent: "Risk Engine",
    action: "Composite risk score & driver breakdown calculated",
    durationMs: 400,
    icon: <Terminal className="w-3.5 h-3.5 text-orange-500" />,
  },
  {
    id: "step-8",
    agent: "Report Agent",
    action: "Migration plan, test suites & impact dashboard generated",
    durationMs: 450,
    icon: <Sparkles className="w-3.5 h-3.5 text-indigo-500" />,
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
  const [filesScanned, setFilesScanned] = useState<number>(0);
  const [findingsDiscovered, setFindingsDiscovered] = useState<number>(0);
  const [sourcesChecked, setSourcesChecked] = useState<number>(0);

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

    if (currentStepIndex === 1) {
      setSourcesChecked(3);
    } else if (currentStepIndex === 2) {
      setSourcesChecked(8);
      setFindingsDiscovered(2);
    } else if (currentStepIndex === 3) {
      setFilesScanned(48);
      setFindingsDiscovered(4);
    } else if (currentStepIndex === 4) {
      setSourcesChecked(14);
    } else if (currentStepIndex === 5) {
      setFindingsDiscovered(4);
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, step.durationMs);

    return () => clearTimeout(timer);
  }, [currentStepIndex, autoRedirect, onComplete, router, targetUrl]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="surface-card rounded-xl p-5 shadow-glass-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider uppercase">
                {isDone ? "Analysis Complete" : "Multi-Agent Pipeline Executing"}
              </span>
              {!isDone && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              )}
            </div>
            <h2 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
              FastAPI: 0.110.0 → 0.120.0
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
              Repository: <span className="text-zinc-800 dark:text-zinc-200 font-mono">FastAPI Commerce API</span> • Ecosystem: <span className="text-zinc-800 dark:text-zinc-200 font-mono">Python / Poetry</span>
            </p>
          </div>

          {isDone ? (
            <button
              onClick={() => router.push(targetUrl)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all font-sans cursor-pointer"
            >
              <span>View Full Impact Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08] text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
              <span>Step {Math.min(currentStepIndex + 1, SEQUENCE_STEPS.length)} of 8</span>
            </div>
          )}
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 font-mono text-xs">
          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04]">
            <span className="text-[10px] text-zinc-400 uppercase block">Files Scanned</span>
            <span className="text-lg font-bold text-zinc-900 dark:text-white">{filesScanned}</span>
            <span className="text-[10px] text-zinc-500 block">48 modules</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04]">
            <span className="text-[10px] text-zinc-400 uppercase block">Findings</span>
            <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{findingsDiscovered}</span>
            <span className="text-[10px] text-zinc-500 block">2 breaking, 2 warnings</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04]">
            <span className="text-[10px] text-zinc-400 uppercase block">Sources Checked</span>
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{sourcesChecked}</span>
            <span className="text-[10px] text-zinc-500 block">PyPI, OSV, AST, Git</span>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04]">
            <span className="text-[10px] text-zinc-400 uppercase block">Elapsed Time</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{elapsedTime}s</span>
            <span className="text-[10px] text-zinc-500 block">Deterministic run</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Step-by-step agent execution breakdown */}
        <div className="lg:col-span-7 surface-card rounded-xl p-5 shadow-glass-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-white/[0.06]">
            <Activity className="w-4 h-4 text-indigo-500" />
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider font-sans">
              Agent Execution Pipeline
            </h3>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {SEQUENCE_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStepIndex || isDone;
              const isCurrent = idx === currentStepIndex && !isDone;
              const isPending = idx > currentStepIndex && !isDone;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                    isCompleted
                      ? "bg-zinc-50 dark:bg-white/[0.02] border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300"
                      : isCurrent
                      ? "bg-indigo-50/70 dark:bg-indigo-500/10 border-indigo-300 dark:border-indigo-500/30 text-zinc-900 dark:text-white shadow-xs"
                      : "bg-transparent border-transparent text-zinc-400 dark:text-zinc-600"
                  }`}
                >
                  <div className="pt-0.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-zinc-300 dark:border-zinc-700 select-none" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {step.icon}
                        <span
                          className={`font-semibold text-xs ${
                            isCompleted
                              ? "text-zinc-900 dark:text-zinc-200"
                              : isCurrent
                              ? "text-indigo-700 dark:text-indigo-300"
                              : "text-zinc-400 dark:text-zinc-500"
                          }`}
                        >
                          {step.agent}
                        </span>
                      </div>
                      {isCompleted && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                          ✓ Done
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono animate-pulse">
                          Running...
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 font-sans ${
                        isPending ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {step.action}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live multi-agent activity stream */}
        <div className="lg:col-span-5">
          <AgentTimeline
            events={DEMO_AGENT_EVENTS.slice(
              0,
              Math.min(currentStepIndex + 3, DEMO_AGENT_EVENTS.length)
            )}
            maxEvents={8}
          />
        </div>
      </div>
    </div>
  );
}
