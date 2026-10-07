"use client";

import React, { useState } from "react";
import { AgentDetailsModal, AgentDetailData } from "@/components/ui/Modals";
import {
  User,
  Sparkles,
  GitFork,
  FileDiff,
  Code2,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
  Layers,
  FileText,
  ChevronRight,
  Info,
} from "lucide-react";

export function ArchitectureViewer() {
  const [modalAgent, setModalAgent] = useState<AgentDetailData | null>(null);

  const agents = [
    {
      id: "dependency_agent",
      name: "Dependency Agent",
      role: "Version & Dependency Solver",
      desc: "Checks package version numbers and flags conflicts with other packages in your project.",
      icon: <GitFork className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40",
      textColor: "text-indigo-600 dark:text-indigo-400",
      inputs: ["pyproject.toml and lockfiles", "Dependency version bounds"],
    },
    {
      id: "change_agent",
      name: "Change Analysis Agent",
      role: "Changelog & Release Notes Miner",
      desc: "Analyzes what changed between versions by reading release notes, changelogs, and Git diffs.",
      icon: <FileDiff className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40",
      textColor: "text-amber-600 dark:text-amber-400",
      inputs: ["Official GitHub Release notes", "Code syntax deprecation entries"],
    },
    {
      id: "code_impact_agent",
      name: "Code Impact Agent",
      role: "Repository Code Scanner",
      desc: "Scans your repository files to find the exact lines of code that use deprecated or altered APIs.",
      icon: <Code2 className="w-5 h-5 text-cyan-600" />,
      color: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40",
      textColor: "text-cyan-600 dark:text-cyan-400",
      inputs: ["48 source code files in repository", "Function calls and imports"],
    },
    {
      id: "security_agent",
      name: "Security Agent",
      role: "Vulnerability Checker",
      desc: "Cross-references known vulnerability databases to verify if the upgrade resolves security bugs.",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      color: "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40",
      textColor: "text-red-600 dark:text-red-400",
      inputs: ["OSV.dev vulnerability database", "GitHub security advisories"],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Description Banner */}
      <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase font-mono tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>System Design</span>
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] font-sans">
          How UpgradeGuard Works
        </h2>
        <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
          Multiple specialized AI agents work together to analyze different aspects of a dependency upgrade. Their individual findings are then validated and synthesized into one clear migration plan.
        </p>
      </div>

      {/* Visual Flow Architecture */}
      <div className="space-y-4">
        {/* Step 1: User Input */}
        <div className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--text-primary)] flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">Step 1</span>
              <h4 className="text-sm font-bold text-[var(--text-primary)] font-sans">
                Developer Specifies Upgrade (FastAPI 0.110.0 → 0.120.0)
              </h4>
            </div>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">User Trigger</span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-indigo-500">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* Step 2: Supervisor / UpgradeGuard Controller */}
        <div className="p-4 rounded-xl clay-card bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-600 uppercase font-semibold">Step 2: Orchestration</span>
              <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-100 font-sans">
                UpgradeGuard AI Dispatches Tasks to 4 Specialized Agents
              </h4>
            </div>
          </div>
          <span className="text-xs text-indigo-600 font-medium">Parallel Analysis</span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-indigo-500">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Step 3: 4 Specialized AI Agents Grid */}
        <div>
          <div className="text-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] font-mono">
              Step 3: 4 Specialized AI Agents
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setModalAgent({ name: agent.name, purpose: agent.desc, inputs: agent.inputs })}
                className={`p-4 rounded-xl clay-card border ${agent.color} cursor-pointer hover:scale-[1.01] transition-all space-y-2 group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[var(--bg-surface)] shadow-2xs">
                      {agent.icon}
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold font-sans ${agent.textColor}`}>
                        {agent.name}
                      </h4>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-indigo-600" />
                </div>

                <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                  {agent.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-indigo-500">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Step 4: Final Validation Step */}
        <div className="p-4 rounded-xl clay-card bg-green-50/70 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-md shadow-green-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-green-600 uppercase font-semibold">Step 4: Verification</span>
              <h4 className="text-sm font-bold text-green-950 dark:text-green-100 font-sans">
                AI Validation Step (Eliminates False Alarms)
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Cross-checks findings against source files before presenting final results.
              </p>
            </div>
          </div>
          <span className="text-xs text-green-600 font-bold font-mono">100% Verified</span>
        </div>

        {/* Down Arrow */}
        <div className="flex justify-center text-indigo-500">
          <ArrowDown className="w-5 h-5" />
        </div>

        {/* Step 5: Final Synthesized Report */}
        <div className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">Step 5: Output</span>
              <h4 className="text-sm font-bold text-[var(--text-primary)] font-sans">
                Synthesized Risk Score + 5-Step Migration Playbook + Targeted Tests
              </h4>
            </div>
          </div>
          <span className="text-xs text-indigo-600 font-medium font-sans">Final Output</span>
        </div>
      </div>

      {/* Simple Agent Details Modal */}
      <AgentDetailsModal
        agent={modalAgent}
        isOpen={Boolean(modalAgent)}
        onClose={() => setModalAgent(null)}
      />
    </div>
  );
}
