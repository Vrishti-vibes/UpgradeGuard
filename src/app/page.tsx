"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import {
  FindingDetailsModal,
  RiskScoreModal,
  AgentDetailsModal,
  AgentDetailData,
} from "@/components/ui/Modals";
import {
  DEMO_FINDINGS,
} from "@/lib/demoData";
import { Finding } from "@/types";
import {
  ArrowRight,
  ShieldAlert,
  FileCode,
  CheckCircle2,
  FileDiff,
  Lock,
  GitFork,
  Code2,
  Cpu,
  Sparkles,
  Info,
  ChevronRight,
  Play,
} from "lucide-react";

export default function OverviewPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentDetailData | null>(null);

  const agentsList: AgentDetailData[] = [
    {
      name: "Dependency Agent",
      purpose: "Checks package version numbers and looks for conflicts with other packages in your project.",
      inputs: ["pyproject.toml and lockfiles", "Package version compatibility rules"],
    },
    {
      name: "Change Analysis Agent",
      purpose: "Inspects what changed between versions by reading release notes, changelogs, and code differences.",
      inputs: ["FastAPI official release changelogs", "Version 0.110.0 to 0.120.0 code changes"],
    },
    {
      name: "Code Impact Agent",
      purpose: "Scans your repository files to find the exact lines of code that use deprecated or changed APIs.",
      inputs: ["All 48 source code files in repository", "Function calls and imports"],
    },
    {
      name: "Security Agent",
      purpose: "Checks known vulnerability databases to verify if this upgrade fixes security issues.",
      inputs: ["OSV & GitHub Advisory vulnerability records", "Security patch information"],
    },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="UpgradeGuard"
          subtitle="Dashboard"
        />

        {/* Main Clean Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {/* Hero Welcome & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
                AI Upgrade Assistant
              </span>
              <span className="text-xs text-[var(--text-muted)]">•</span>
              <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Analysis Ready
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
              UpgradeGuard
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-sans max-w-2xl">
              Understand what could break before you upgrade. Analyze dependency changes, repo impact, and get step-by-step migration guidance.
            </p>
          </div>

          {/* Prominent Analysis Panel */}
          <div className="p-5 sm:p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <div>
                  <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                    Current Version
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-[var(--text-primary)] px-3 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] inline-block">
                    0.110.0
                  </span>
                </div>

                <div className="text-indigo-500 font-bold text-xl pt-4">
                  →
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-indigo-600 uppercase tracking-wider block mb-1">
                    Target Upgrade
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/50 inline-block">
                    0.120.0
                  </span>
                </div>

                <div className="hidden lg:block pl-4 border-l border-[var(--border-subtle)]">
                  <span className="text-[11px] font-medium text-[var(--text-muted)] block">Package</span>
                  <span className="font-semibold text-sm text-[var(--text-primary)] font-mono">FastAPI</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/analysis/fastapi-demo"
                  className="clay-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/25 cursor-pointer font-sans"
                >
                  <span>View Impact Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/new"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] transition-colors font-sans"
                >
                  <span>New Analysis</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 Clean Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Risk */}
            <div
              onClick={() => setIsRiskModalOpen(true)}
              className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-red-300 transition-all group"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1">
                <span>Upgrade Risk</span>
                <span className="text-[10px] text-red-500 font-bold group-hover:underline">Details</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400 font-mono">72</span>
                <span className="text-xs text-[var(--text-muted)] font-mono">/ 100</span>
                <span className="text-xs px-2 py-0.5 rounded font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 ml-auto">
                  HIGH
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Breaking changes require review
              </p>
            </div>

            {/* Card 2: Affected Files */}
            <Link
              href="/analysis/fastapi-demo?tab=impact"
              className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-indigo-300 transition-all block"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1">
                <span>Affected Files</span>
                <FileCode className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)] font-mono">4</div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Out of 48 total project files
              </p>
            </Link>

            {/* Card 3: Breaking Changes */}
            <Link
              href="/analysis/fastapi-demo?tab=breaking"
              className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-amber-300 transition-all block"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1">
                <span>Breaking Changes</span>
                <FileDiff className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-mono">2</div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Removed APIs & syntax changes
              </p>
            </Link>

            {/* Card 4: Security Issues */}
            <Link
              href="/analysis/fastapi-demo?tab=security"
              className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-green-300 transition-all block"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-medium mb-1">
                <span>Security Fixes</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 font-mono">1 Patched</div>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Resolves DoS header bug
              </p>
            </Link>
          </div>

          {/* 2-Column Section: Findings (Left 60%) + Risk & Agent Status (Right 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Simple Findings List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
                    Key Findings
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Identified problems that need attention before upgrading
                  </p>
                </div>
                <Link
                  href="/findings"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>View All Findings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {DEMO_FINDINGS.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 rounded-xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 hover:border-indigo-200 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <RiskBadge severity={finding.severity} size="sm" />
                        <span className="text-sm font-semibold text-[var(--text-primary)] font-sans">
                          {finding.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedFinding(finding)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer hover:underline"
                      >
                        View Details
                      </button>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                      {finding.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-1 border-t border-[var(--border-subtle)]">
                      <span className="font-mono text-[11px]">
                        Affected: <strong className="text-[var(--text-primary)]">{finding.affectedFiles.join(", ")}</strong>
                      </span>
                      <span className="text-indigo-600 font-mono text-[11px]">
                        API: {finding.affectedApi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Simplified Risk Card & 4 AI Agents */}
            <div className="lg:col-span-5 space-y-5">
              {/* Simple Upgrade Risk Card */}
              <div className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                    Upgrade Risk Summary
                  </h3>
                  <span className="px-2 py-0.5 rounded font-bold text-xs bg-red-100 text-red-700">
                    HIGH
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-extrabold text-red-600 font-mono">72</span>
                    <span className="text-sm text-[var(--text-muted)] font-mono"> / 100</span>
                    <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                      Composite Risk Score
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRiskModalOpen(true)}
                    className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    Why this score?
                  </button>
                </div>

                <div className="space-y-2 text-xs text-[var(--text-secondary)] font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span><strong>2 Breaking Changes</strong> in API parameters</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span><strong>4 Project Files</strong> require code edits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span><strong>1 Transitive Conflict</strong> in Starlette pin</span>
                  </div>
                </div>

                <Link
                  href="/analysis/fastapi-demo"
                  className="block w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-center font-medium text-xs transition-colors"
                >
                  Follow 5-Step Migration Plan →
                </Link>
              </div>

              {/* 4 Simple AI Agents */}
              <div className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-mono">
                      Specialized AI Agents
                    </h3>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      4 agents analyze different aspects of the upgrade
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {agentsList.map((agent, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedAgent(agent)}
                      className="p-2.5 rounded-xl bg-[var(--bg-subtle)] hover:bg-indigo-50/70 border border-transparent hover:border-indigo-200 transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-indigo-600 font-sans">
                            {agent.name}
                          </h4>
                          <p className="text-[11px] text-[var(--text-secondary)] line-clamp-1 font-sans">
                            {agent.purpose}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-indigo-600 shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-green-600 font-medium inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified by AI Final Validation Step
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Simple Modals */}
      <FindingDetailsModal
        finding={selectedFinding}
        isOpen={Boolean(selectedFinding)}
        onClose={() => setSelectedFinding(null)}
      />

      <RiskScoreModal
        score={72}
        isOpen={isRiskModalOpen}
        onClose={() => setIsRiskModalOpen(false)}
      />

      <AgentDetailsModal
        agent={selectedAgent}
        isOpen={Boolean(selectedAgent)}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  );
}
