"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Sparkles, ShieldCheck, GitFork, FileDiff, Code2, AlertTriangle, ChevronRight } from "lucide-react";
import { AgentDetailData } from "@/components/ui/Modals";

interface AgentActivityProps {
  onSelectAgent?: (agent: AgentDetailData) => void;
}

export function AgentActivityFeed({ onSelectAgent }: AgentActivityProps) {
  const agents: Array<{
    name: string;
    status: "completed" | "running" | "waiting";
    role: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }> = [
    {
      name: "Dependency Agent",
      status: "completed",
      role: "Checking dependency relationships...",
      description: "Resolved transitive constraints and detected Starlette version conflict with fastapi-limiter.",
      icon: GitFork,
      color: "text-indigo-500",
    },
    {
      name: "Change Analysis Agent",
      status: "completed",
      role: "Comparing release changes...",
      description: "Identified 2 breaking API deprecations (regex -> pattern parameter in Query/Path).",
      icon: FileDiff,
      color: "text-amber-500",
    },
    {
      name: "Code Impact Agent",
      status: "completed",
      role: "Scanning project files...",
      description: "Located exact call sites across 4 affected repository files in src/auth.py and src/api/.",
      icon: Code2,
      color: "text-cyan-500",
    },
    {
      name: "Security Agent",
      status: "completed",
      role: "Checking vulnerability advisories...",
      description: "Cross-checked CVE-2024-24762; confirmed security patch included in 0.120.0.",
      icon: AlertTriangle,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-bold text-[var(--text-primary)] font-sans">
              Specialized AI Agents
            </h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            4 agents run in parallel to analyze every dimension of your upgrade
          </p>
        </div>
        <span className="text-[11px] font-sans font-semibold text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
          All 4 Agents Complete
        </span>
      </div>

      <div className="space-y-2.5">
        {agents.map((agent, i) => {
          const Icon = agent.icon;
          return (
            <div
              key={agent.name}
              onClick={() => {
                if (onSelectAgent) {
                  onSelectAgent({
                    name: agent.name,
                    purpose: agent.description,
                    inputs: ["Repository files", "Release notes", "Vulnerability database"],
                  });
                }
              }}
              className="p-3 rounded-xl bg-[var(--bg-subtle)]/70 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/30 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center shadow-xs shrink-0">
                  <Icon className={`w-4 h-4 ${agent.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--text-primary)] group-hover:text-indigo-600 font-sans">
                      {agent.name}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-1 font-sans">
                    {agent.role}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5 shrink-0" />
            </div>
          );
        })}
      </div>

      {/* AI Verification Callout */}
      <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <div className="text-xs font-sans">
          <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
            AI Verification Step
          </span>
          <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 leading-relaxed">
            UpgradeGuard cross-checks all agent findings against the project code to eliminate false alarms.
          </p>
        </div>
      </div>
    </div>
  );
}
