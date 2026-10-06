"use client";

import React, { useState } from "react";
import { ArchitectureNode } from "@/types";
import { DEMO_ARCHITECTURE_NODES } from "@/lib/demoData";
import {
  Cpu,
  Layers,
  ShieldCheck,
  Code2,
  FileDiff,
  AlertTriangle,
  GitFork,
  Terminal,
  FileCheck,
  ArrowDown,
  RotateCcw,
  Sparkles,
  User,
  Monitor,
} from "lucide-react";

export function ArchitectureViewer() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("supervisor");

  const selectedNode =
    DEMO_ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) ||
    DEMO_ARCHITECTURE_NODES[0];

  const getNodeIcon = (id: string) => {
    switch (id) {
      case "supervisor":
        return <Cpu className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case "dependency_agent":
        return <GitFork className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "change_agent":
        return <FileDiff className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case "code_impact_agent":
        return <Code2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case "security_agent":
        return <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case "verifier":
        return <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case "risk_engine":
        return <Terminal className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case "test_planner":
        return <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case "report_agent":
        return <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      default:
        return <Layers className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="surface-card rounded-xl p-5 sm:p-6 shadow-glass-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Multi-Agent System Blueprint
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-semibold">
                Interactive DAG
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight font-sans">
              UpgradeGuard Architecture & Verification Loop
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed font-sans">
              A peer-reviewed multi-agent design where specialized agents mine release diffs, dependency trees, and AST call graphs, while an adversarial Verifier critic eliminates false positives before synthesis.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] text-xs font-mono text-zinc-600 dark:text-zinc-400 self-start sm:self-auto">
            <span className="text-zinc-400 dark:text-zinc-500 block text-[10px] uppercase font-sans">Instruction</span>
            <span className="text-zinc-800 dark:text-zinc-200">Click any agent node to inspect specs</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive DAG Pipeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Layer 0: User & Web Client */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-[#0C0E14] text-xs font-mono flex items-center gap-2.5 shadow-xs">
              <User className="w-4 h-4 text-zinc-500" />
              <div>
                <span className="text-zinc-900 dark:text-zinc-200 font-semibold block font-sans">Developer / CI Trigger</span>
                <span className="text-[10px] text-zinc-500">Initiates upgrade intent</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-[#0C0E14] text-xs font-mono flex items-center gap-2.5 shadow-xs">
              <Monitor className="w-4 h-4 text-indigo-500" />
              <div>
                <span className="text-zinc-900 dark:text-zinc-200 font-semibold block font-sans">Next.js Web UI</span>
                <span className="text-[10px] text-zinc-500">Interactive dashboard shell</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-zinc-400 dark:text-zinc-600">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>

          {/* Layer 1: Supervisor */}
          <div
            onClick={() => setSelectedNodeId("supervisor")}
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 font-mono shadow-xs ${
              selectedNodeId === "supervisor"
                ? "bg-violet-50 dark:bg-violet-500/15 border-violet-400 dark:border-violet-500/50 shadow-md scale-[1.01]"
                : "bg-white dark:bg-[#0A0C11]/90 border-zinc-200 dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-white/[0.16]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans">Supervisor Agent</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-500/20 text-violet-800 dark:text-violet-300 font-mono font-semibold">
                      Controller
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-0.5">
                    Decomposes target dependency upgrade, schedules parallel workers, coordinates verifier loop.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-zinc-400 dark:text-zinc-600">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Layer 2: Specialized Parallel Workers */}
          <div className="surface-card rounded-xl p-4 shadow-glass-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-zinc-100 dark:border-white/[0.06]">
              <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px] font-sans font-semibold">
                Parallel Investigation Layer (Async Fan-out)
              </span>
              <span className="text-zinc-400 text-[10px]">4 Domain Workers</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  id: "dependency_agent",
                  name: "Dependency Agent",
                  sub: "Lockfiles & SAT Tree",
                  icon: GitFork,
                  color: "text-blue-600 dark:text-blue-400",
                },
                {
                  id: "change_agent",
                  name: "Change Analysis Agent",
                  sub: "Releases & Git Diffs",
                  icon: FileDiff,
                  color: "text-amber-600 dark:text-amber-400",
                },
                {
                  id: "code_impact_agent",
                  name: "Code Impact Agent",
                  sub: "AST & Call Graph",
                  icon: Code2,
                  color: "text-teal-600 dark:text-teal-400",
                },
                {
                  id: "security_agent",
                  name: "Security Agent",
                  sub: "OSV & Advisory DB",
                  icon: AlertTriangle,
                  color: "text-rose-600 dark:text-rose-400",
                },
              ].map((worker) => {
                const isSelected = selectedNodeId === worker.id;
                const Icon = worker.icon;

                return (
                  <div
                    key={worker.id}
                    onClick={() => setSelectedNodeId(worker.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? "bg-zinc-100 dark:bg-white/[0.1] border-zinc-400 dark:border-indigo-400 text-zinc-950 dark:text-white shadow-sm scale-[1.02]"
                        : "bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/[0.06] hover:border-zinc-300 dark:hover:border-white/[0.12] text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${worker.color}`} />
                      <div className="min-w-0 flex-1">
                        <span className="font-mono text-xs font-semibold block truncate">
                          {worker.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-sans block">
                          {worker.sub}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-center text-zinc-400 dark:text-zinc-600">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Layer 3: Verifier Critic Loop */}
          <div className="relative p-4 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/[0.03] space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-emerald-200 dark:border-emerald-500/20">
              <span className="text-emerald-800 dark:text-emerald-400 uppercase tracking-wider text-[10px] font-bold font-sans">
                Verification & Adversarial Critic Stage
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-mono flex items-center gap-1 font-semibold">
                <RotateCcw className="w-3 h-3 animate-spin" />
                Targeted Re-analysis Loop Active
              </span>
            </div>

            <div
              onClick={() => setSelectedNodeId("verifier")}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedNodeId === "verifier"
                  ? "bg-emerald-100/70 dark:bg-emerald-500/15 border-emerald-400 dark:border-emerald-500/50 shadow-md scale-[1.01]"
                  : "bg-white dark:bg-white/[0.02] border-zinc-200 dark:border-white/[0.06] hover:border-emerald-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white font-sans">
                        Verifier / Critic Agent
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-200/70 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono font-semibold">
                        Critic Loop
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-0.5">
                      Grounds findings against raw evidence. Rejects unverified candidate warnings back to Code Impact Agent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center text-zinc-400 dark:text-zinc-600">
            <ArrowDown className="w-4 h-4" />
          </div>

          {/* Layer 4: Synthesis & Output */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: "risk_engine",
                name: "Risk Engine",
                desc: "0-100 Score Matrix",
                icon: Terminal,
                color: "text-orange-600 dark:text-orange-400",
              },
              {
                id: "test_planner",
                name: "Test Planner",
                desc: "Targeted pytest Suites",
                icon: FileCheck,
                color: "text-blue-600 dark:text-blue-400",
              },
              {
                id: "report_agent",
                name: "Report Agent",
                desc: "Actionable Migration",
                icon: Sparkles,
                color: "text-indigo-600 dark:text-indigo-400",
              },
            ].map((node) => {
              const isSelected = selectedNodeId === node.id;
              const Icon = node.icon;

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-3 rounded-xl border cursor-pointer font-mono transition-all ${
                    isSelected
                      ? "bg-zinc-100 dark:bg-white/[0.1] border-zinc-400 dark:border-indigo-400 text-zinc-950 dark:text-white shadow-sm scale-[1.02]"
                      : "bg-white dark:bg-[#0A0C11]/90 border-zinc-200 dark:border-white/[0.08] hover:border-zinc-300 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${node.color} mb-1.5`} />
                  <span className="text-xs font-bold block font-sans">{node.name}</span>
                  <span className="text-[10px] text-zinc-500 font-sans block mt-0.5">
                    {node.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Drawer / Detail Panel (5 cols) */}
        <div className="lg:col-span-5 surface-card rounded-xl p-5 shadow-glass-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
              Agent Specification Inspector
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] text-zinc-600 dark:text-zinc-400 uppercase">
              {selectedNode.category}
            </span>
          </div>

          {/* Node Identity */}
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.08]">
              {getNodeIcon(selectedNode.id)}
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white font-sans">
                {selectedNode.name}
              </h3>
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                {selectedNode.role}
              </p>
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold block">
              Core Purpose & Responsibility
            </span>
            <p className="text-xs text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04]">
              {selectedNode.purpose}
            </p>
          </div>

          {/* Inputs & Outputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase block font-semibold font-sans">
                Inputs:
              </span>
              <ul className="space-y-1">
                {selectedNode.inputs.map((inp, i) => (
                  <li
                    key={i}
                    className="p-1.5 rounded bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04] text-zinc-700 dark:text-zinc-300 text-[11px]"
                  >
                    • {inp}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase block font-semibold font-sans">
                Outputs:
              </span>
              <ul className="space-y-1">
                {selectedNode.outputs.map((out, i) => (
                  <li
                    key={i}
                    className="p-1.5 rounded bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200/80 dark:border-white/[0.04] text-indigo-700 dark:text-indigo-300 text-[11px]"
                  >
                    ✓ {out}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Context & Capabilities */}
          <div className="pt-2 border-t border-zinc-200/80 dark:border-white/[0.06] space-y-2 text-xs font-mono">
            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase block mb-1 font-sans font-semibold">
                Prompt Persona & LLM Context:
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 font-sans text-xs bg-zinc-50 dark:bg-white/[0.02] p-2.5 rounded-lg border border-zinc-200/80 dark:border-white/[0.04]">
                {selectedNode.modelContext}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase block mb-1 font-sans font-semibold">
                Equipped Tool Capabilities:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[11px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/[0.06] text-zinc-700 dark:text-zinc-300 font-mono"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
