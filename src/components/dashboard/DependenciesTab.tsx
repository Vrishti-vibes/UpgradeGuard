"use client";

import React from "react";
import { DependencyNode } from "@/types";
import {
  GitFork,
  AlertTriangle,
  ArrowRight,
  Package,
} from "lucide-react";

interface DependenciesTabProps {
  rootNode: DependencyNode;
}

export function DependenciesTab({ rootNode }: DependenciesTabProps) {
  return (
    <div className="space-y-6">
      {/* Dependency Conflict Alert Banner */}
      <div className="rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 mt-0.5 border border-rose-200 dark:border-rose-800/40">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-sans font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[11px]">
              Dependency Version Conflict Detected
            </span>
            <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 font-bold border border-rose-200 dark:border-rose-800/40">
              Blocks Direct Upgrade
            </span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 font-medium text-xs leading-relaxed font-sans">
            FastAPI 0.120.0 requires <code className="text-indigo-600 dark:text-indigo-400 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono border border-zinc-200 dark:border-zinc-700">starlette &gt;= 0.37.0, &lt; 0.38.0</code>. However, existing repository package <code className="text-indigo-600 dark:text-indigo-400 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono border border-zinc-200 dark:border-zinc-700">fastapi-limiter (0.1.5)</code> pins <code className="text-rose-600 dark:text-rose-400 bg-white dark:bg-zinc-800 px-1.5 py-0.5 rounded font-mono border border-zinc-200 dark:border-zinc-700">starlette &lt; 0.36.0</code>.
          </p>
          <div className="mt-3 flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-sans">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Recommended Fix:</span>
            <span>Update <code className="font-mono text-zinc-900 dark:text-white font-semibold">fastapi-limiter</code> to <code className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">&gt;=0.2.0</code> in pyproject.toml before upgrading.</span>
          </div>
        </div>
      </div>

      {/* Dependency Resolution Hierarchy */}
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 space-y-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-sans font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Dependency Tree & Conflict Resolution
            </span>
          </div>
          <span className="text-xs text-zinc-500 font-sans">
            Dependency Agent Analysis
          </span>
        </div>

        {/* Tree Visual Flow */}
        <div className="space-y-3 font-mono text-xs">
          {/* Level 1: FastAPI */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/40 dark:bg-indigo-950/20 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold font-mono">
                P
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white font-mono">fastapi</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 font-semibold font-sans">
                    Direct
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs mt-0.5">
                  <span>0.110.0</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">0.120.0</span>
                </div>
              </div>
            </div>

            <span className="text-xs text-zinc-500 font-sans">Target Upgrade</span>
          </div>

          {/* Connector Down */}
          <div className="pl-6 text-zinc-400 text-xs font-sans flex items-center gap-2">
            <span>│</span>
            <span className="text-[11px] text-zinc-500">Requires <code className="font-mono text-zinc-700 dark:text-zinc-300">starlette &gt;=0.37.0</code></span>
          </div>

          {/* Level 2: Starlette (CONFLICT) */}
          <div className="pl-4 border-l-2 border-rose-300 dark:border-rose-800 ml-3 space-y-3">
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold font-mono">
                  !
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white font-mono">starlette</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40 font-bold font-sans">
                      Conflict
                    </span>
                    <span className="text-[10px] text-zinc-500 font-sans">Transitive</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mt-0.5">
                    <span>0.27.0</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-rose-600 dark:text-rose-400 font-bold">0.37.2</span>
                  </div>
                </div>
              </div>

              <div className="text-right text-xs text-zinc-500 font-sans">
                <span className="text-rose-600 dark:text-rose-400 block font-semibold">Constraint collision</span>
                <span className="font-mono text-[11px]">fastapi-limiter: starlette &lt; 0.36.0</span>
              </div>
            </div>

            {/* Connector Down */}
            <div className="pl-6 text-zinc-400 text-xs font-sans flex items-center gap-2 py-0.5">
              <span>│</span>
              <span className="text-[11px] text-zinc-500">Requires <code className="font-mono text-zinc-700 dark:text-zinc-300">anyio &gt;=3.6.2,&lt;5</code></span>
            </div>

            {/* Level 3: AnyIO */}
            <div className="pl-4 border-l-2 border-[var(--border-subtle)] ml-3">
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold font-mono">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono">anyio</span>
                      <span className="text-[10px] text-zinc-400 font-sans">Transitive</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                      <span>3.7.1</span>
                      <ArrowRight className="w-3 h-3 text-zinc-400" />
                      <span className="text-zinc-800 dark:text-zinc-200">4.3.0</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-sans">Compatible</span>
              </div>
            </div>
          </div>

          {/* Level 1 parallel: Pydantic */}
          <div className="pt-2">
            <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold font-mono">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200 font-mono">pydantic</span>
                    <span className="text-[10px] text-zinc-400 font-sans">Direct</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                    <span>2.6.4</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400" />
                    <span className="text-zinc-800 dark:text-zinc-200">2.8.2</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-sans">Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
