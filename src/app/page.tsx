"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import {
  FindingDetailsModal,
  RiskScoreModal,
  AgentDetailsModal,
  AgentDetailData,
} from "@/components/ui/Modals";
import { RiskScoreRing } from "@/components/dashboard/RiskScoreRing";
import { AgentActivityFeed } from "@/components/dashboard/AgentActivityFeed";
import { DEMO_FINDINGS } from "@/lib/demoData";
import { Finding } from "@/types";
import {
  ArrowRight,
  ShieldAlert,
  FileCode,
  CheckCircle2,
  FileDiff,
  Sparkles,
  ChevronRight,
  AlertTriangle,
  GitFork,
  ArrowUpRight,
  ShieldCheck,
  Package,
} from "lucide-react";

export default function OverviewPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentDetailData | null>(null);

  const migrationSteps = [
    { num: "01", title: "Fix Deprecated Query Parameter", file: "src/api/users.py", desc: "Replace regex= with pattern= in Query and Path parameter declarations." },
    { num: "02", title: "Migrate Startup/Shutdown Handlers", file: "src/main.py", desc: "Convert legacy on_event('startup') handlers to asynccontextmanager lifespan." },
    { num: "03", title: "Update Response Model Serialization", file: "src/api/payments.py", desc: "Update dict() serialization to model_dump() for Pydantic v2 compatibility." },
    { num: "04", title: "Run Targeted Test Suite", file: "tests/test_auth.py", desc: "Execute 5 focused validation tests verifying impacted route behavior." },
    { num: "05", title: "Production Review & Deployment", file: "pyproject.toml", desc: "Update lockfile and deploy safely to production with verified compatibility." },
  ];

  return (
    <div className="relative min-h-screen bg-[var(--bg-base)] flex overflow-x-hidden">
      {/* Subtle Background Glow Orbs for 3D Depth */}
      <div className="ambient-glow w-96 h-96 bg-indigo-500/20 top-0 left-1/4 -translate-y-1/2" />
      <div className="ambient-glow w-80 h-80 bg-cyan-500/15 top-1/3 right-10" />
      <div className="ambient-glow w-96 h-96 bg-violet-500/15 bottom-10 left-10" />

      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 z-10">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="UpgradeGuard"
          subtitle="Dashboard"
        />

        {/* Main Workspace Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-7">
          {/* Top Hero Section */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 font-sans">
                Dependency Upgrade Intelligence
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight font-sans">
              Know what can break <span className="text-indigo-600 dark:text-indigo-400">before</span> you upgrade.
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans max-w-2xl leading-relaxed">
              Analyze dependency changes, find affected code across your repository, and get a safe step-by-step migration plan.
            </p>
          </div>

          {/* Large Upgrade Analysis Card */}
          <div className="p-6 sm:p-7 rounded-2xl clay-card-lift bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30 shrink-0">
                  <Package className="w-6 h-6" />
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] block font-sans mb-1">
                    Target Package
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] font-mono">
                      FastAPI
                    </span>
                    <span className="text-xs font-mono text-zinc-500 px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
                      Python
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pl-2 sm:pl-6 border-l border-[var(--border-subtle)]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block font-sans">Current</span>
                    <span className="text-base sm:text-lg font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      0.110.0
                    </span>
                  </div>

                  <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg px-1 animate-pulse">
                    →
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 block font-sans">Target</span>
                    <span className="text-base sm:text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      0.120.0
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto">
                <Link
                  href="/analysis/fastapi-demo"
                  className="clay-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 transition-all cursor-pointer font-sans"
                >
                  <span>View Demo Report</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/new"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-subtle)] transition-colors font-sans"
                >
                  <span>Analyze Upgrade</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4 BIG Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Card 1: Risk */}
            <div
              onClick={() => setIsRiskModalOpen(true)}
              className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] cursor-pointer hover:border-red-300 dark:hover:border-red-800 transition-all group shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold font-sans mb-2">
                <span>Upgrade Risk</span>
                <span className="text-[10px] text-red-600 dark:text-red-400 font-bold group-hover:underline">Details</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-400 font-mono">72</span>
                  <span className="text-xs text-[var(--text-muted)] font-mono">/ 100</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 ml-auto font-sans">
                    HIGH
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-sans">
                  Action required before deploy
                </p>
              </div>
            </div>

            {/* Card 2: Affected Files */}
            <Link
              href="/analysis/fastapi-demo?tab=impact"
              className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-indigo-300 dark:hover:border-indigo-800 transition-all block shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold font-sans mb-2">
                <span>Affected Files</span>
                <FileCode className="w-4 h-4 text-indigo-500" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono">4</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-sans">
                  Out of 48 total project files
                </p>
              </div>
            </Link>

            {/* Card 3: Breaking Changes */}
            <Link
              href="/analysis/fastapi-demo?tab=breaking"
              className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-amber-300 dark:hover:border-amber-800 transition-all block shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold font-sans mb-2">
                <span>Breaking Changes</span>
                <FileDiff className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">2</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-sans">
                  Removed APIs & parameter changes
                </p>
              </div>
            </Link>

            {/* Card 4: Security Fixes */}
            <Link
              href="/analysis/fastapi-demo?tab=security"
              className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-emerald-300 dark:hover:border-emerald-800 transition-all block shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold font-sans mb-2">
                <span>Security Fixes</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">1</div>
                <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-sans">
                  Fixes DoS header bug (CVE-2024)
                </p>
              </div>
            </Link>
          </div>

          {/* Section: Why This Upgrade Is Risky */}
          <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-[var(--text-primary)] font-sans">
                Why this upgrade is risky
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
              <div className="p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 space-y-1">
                <span className="font-bold text-red-700 dark:text-red-400 uppercase text-[11px] block">
                  1. Breaking API Changes
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  FastAPI replaced the <code className="font-mono font-bold text-red-600 dark:text-red-400">regex</code> parameter with <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400">pattern</code> in Query/Path declarations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 space-y-1">
                <span className="font-bold text-amber-700 dark:text-amber-400 uppercase text-[11px] block">
                  2. 4 Affected Project Files
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Active routes in <code className="font-mono text-zinc-900 dark:text-white">auth.py</code>, <code className="font-mono text-zinc-900 dark:text-white">users.py</code>, and <code className="font-mono text-zinc-900 dark:text-white">payments.py</code> will fail at runtime without code adjustments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/30 space-y-1">
                <span className="font-bold text-indigo-700 dark:text-indigo-400 uppercase text-[11px] block">
                  3. Transitive Dependency Conflict
                </span>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Package <code className="font-mono text-zinc-900 dark:text-white">fastapi-limiter (0.1.5)</code> pins Starlette &lt; 0.36.0, colliding with FastAPI 0.120 requirement.
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column Section: Findings & Agent Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Key Findings (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
                    Key Findings
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-sans">
                    Actionable breaking points discovered by the AI agents
                  </p>
                </div>
                <Link
                  href="/findings"
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-sans"
                >
                  <span>View All 4</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3 font-sans">
                {DEMO_FINDINGS.map((finding) => (
                  <div
                    key={finding.id}
                    className="p-4 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2.5 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <RiskBadge severity={finding.severity} size="sm" />
                        <span className="text-sm font-bold text-[var(--text-primary)]">
                          {finding.title}
                        </span>
                      </div>
                      <button
                        onClick={() => setSelectedFinding(finding)}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer shrink-0"
                      >
                        View Details
                      </button>
                    </div>

                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                      {finding.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                      <span className="text-[11px] font-mono">
                        Files: <strong className="text-[var(--text-primary)]">{finding.affectedFiles.join(", ")}</strong>
                      </span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-semibold">
                        {finding.affectedApi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Circular Risk Gauge & 4 AI Agents (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Circular Animated Risk Score Ring */}
              <RiskScoreRing
                score={72}
                level="HIGH"
                onClick={() => setIsRiskModalOpen(true)}
              />

              {/* 4 Specialized AI Agents Component */}
              <AgentActivityFeed onSelectAgent={(agent) => setSelectedAgent(agent)} />
            </div>
          </div>

          {/* Recommended Migration Plan (5-step timeline) */}
          <div className="p-6 sm:p-7 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] font-sans">
                  Recommended Migration Plan
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-sans">
                  Follow this 5-step sequence to complete the FastAPI 0.120.0 upgrade safely
                </p>
              </div>

              <Link
                href="/analysis/fastapi-demo"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 font-sans"
              >
                <span>Interactive Migration View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-sans text-xs">
              {migrationSteps.map((step) => (
                <div
                  key={step.num}
                  className="p-4 rounded-xl bg-[var(--bg-subtle)]/70 border border-[var(--border-subtle)] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                      {step.num}
                    </span>
                    <h4 className="font-bold text-[var(--text-primary)] text-xs">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold truncate pt-1 border-t border-[var(--border-subtle)]">
                    {step.file}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Clean Presentation Modals */}
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

