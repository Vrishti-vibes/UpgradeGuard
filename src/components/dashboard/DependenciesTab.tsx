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
      <div className="rounded-xl border border-rose-300 dark:border-rose-500/30 bg-rose-50/70 dark:bg-rose-500/[0.04] p-4 sm:p-5 flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 mt-0.5 border border-rose-300 dark:border-rose-500/20">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider text-[11px]">
              Transitive Lockfile Conflict Detected
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-200/70 dark:bg-rose-500/15 text-rose-800 dark:text-rose-300 font-bold">
              Blocks Direct Upgrade
            </span>
          </div>
          <p className="text-zinc-800 dark:text-zinc-200 font-medium text-xs leading-relaxed font-sans">
            FastAPI 0.120.0 requires <code className="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/[0.08] px-1 py-0.5 rounded font-mono">starlette &gt;= 0.37.0, &lt; 0.38.0</code>. However, existing repository package <code className="text-zinc-900 dark:text-white bg-zinc-200/70 dark:bg-white/[0.08] px-1 py-0.5 rounded font-mono">fastapi-limiter (0.1.5)</code> pins <code className="text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-white/[0.08] px-1 py-0.5 rounded font-mono">starlette &lt; 0.36.0</code>.
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-zinc-600 dark:text-zinc-400 font-mono">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Recommended Fix:</span>
            <span>Bump <code className="text-zinc-900 dark:text-zinc-200 font-semibold">fastapi-limiter</code> to <code className="text-zinc-900 dark:text-zinc-200 font-semibold">&gt;=0.2.0</code> in pyproject.toml before upgrading.</span>
          </div>
        </div>
      </div>

      {/* Dependency Resolution Hierarchy */}
      <div className="surface-card rounded-xl p-5 shadow-glass-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider">
              Transitive Dependency Chain & Conflict Graph
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            SAT Solver Resolution
          </span>
        </div>

        {/* Tree Visual Flow */}
        <div className="space-y-3 font-mono text-xs">
          {/* Level 1: FastAPI */}
          <div className="p-3.5 rounded-lg border border-blue-200 dark:border-blue-500/30 bg-blue-50/50 dark:bg-blue-500/[0.03] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold">
                P
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-zinc-900 dark:text-white">fastapi</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-semibold">
                    Direct
                  </span>
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs mt-0.5">
                  <span>0.110.0</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-blue-700 dark:text-blue-400 font-bold">0.120.0</span>
                </div>
              </div>
            </div>

            <span className="text-[11px] text-zinc-500 font-sans">Target Upgrade Spec</span>
          </div>

          {/* Connector Down */}
          <div className="pl-7 text-zinc-400 dark:text-zinc-600 text-xs font-mono flex items-center gap-2">
            <span>│</span>
            <span className="text-[11px] text-zinc-500 font-sans">Requires starlette &gt;=0.37.0</span>
          </div>

          {/* Level 2: Starlette (CONFLICT) */}
          <div className="pl-5 border-l-2 border-rose-300 dark:border-rose-500/30 ml-3.5 space-y-2">
            <div className="p-3.5 rounded-lg border border-rose-300 dark:border-rose-500/30 bg-rose-50/60 dark:bg-rose-500/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold">
                  !
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">starlette</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-200 dark:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30 font-bold">
                      CONFLICT
                    </span>
                    <span className="text-[10px] text-zinc-500">Transitive</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs mt-0.5">
                    <span>0.27.0</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-500" />
                    <span className="text-rose-700 dark:text-rose-400 font-bold">0.37.2</span>
                  </div>
                </div>
              </div>

              <div className="text-right text-[11px] text-zinc-500 font-sans">
                <span className="text-rose-700 dark:text-rose-400 block font-semibold font-mono">Constraint collision</span>
                <span>fastapi-limiter: starlette &lt; 0.36.0</span>
              </div>
            </div>

            {/* Connector Down */}
            <div className="pl-7 text-zinc-400 dark:text-zinc-600 text-xs font-mono flex items-center gap-2 py-0.5">
              <span>│</span>
              <span className="text-[11px] text-zinc-500 font-sans">Requires anyio &gt;=3.6.2,&lt;5</span>
            </div>

            {/* Level 3: AnyIO */}
            <div className="pl-5 border-l-2 border-zinc-200 dark:border-white/[0.08] ml-3.5">
              <div className="p-3 rounded-lg border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-teal-100 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 flex items-center justify-center text-xs font-bold">
                    T
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-200">anyio</span>
                      <span className="text-[10px] text-zinc-400">Transitive</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                      <span>3.7.1</span>
                      <ArrowRight className="w-3 h-3 text-zinc-400" />
                      <span className="text-zinc-800 dark:text-zinc-200">4.3.0</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold font-sans">Resolvable</span>
              </div>
            </div>
          </div>

          {/* Level 1 parallel: Pydantic */}
          <div className="pt-2">
            <div className="p-3 rounded-lg border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded bg-zinc-200 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">pydantic</span>
                    <span className="text-[10px] text-zinc-400">Direct</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                    <span>2.6.4</span>
                    <ArrowRight className="w-3 h-3 text-zinc-400" />
                    <span className="text-zinc-800 dark:text-zinc-200">2.8.2</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold font-sans">Compatible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
