"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { BreakingChangesTab } from "@/components/dashboard/BreakingChangesTab";
import { CodeImpactTab } from "@/components/dashboard/CodeImpactTab";
import { DependenciesTab } from "@/components/dashboard/DependenciesTab";
import { SecurityTab } from "@/components/dashboard/SecurityTab";
import { MigrationPlanTab } from "@/components/dashboard/MigrationPlanTab";
import { TestsTab } from "@/components/dashboard/TestsTab";
import { EvidenceTab } from "@/components/dashboard/EvidenceTab";
import {
  DEMO_ANALYSIS_SUMMARY,
  DEMO_FINDINGS,
  DEMO_CODE_FILES,
  DEMO_DEPENDENCY_TREE,
  DEMO_SECURITY_ADVISORIES,
  DEMO_MIGRATION_STEPS,
  DEMO_TEST_CASES,
  DEMO_EVIDENCE,
} from "@/lib/demoData";
import {
  LayoutDashboard,
  FileDiff,
  Code2,
  GitFork,
  ShieldAlert,
  ClipboardList,
  CheckSquare,
  ShieldCheck,
  Download,
  GitPullRequest,
  Check,
} from "lucide-react";

export default function AnalysisResultsPage() {
  const params = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedFilePath, setSelectedFilePath] = useState<string>("src/auth.py");
  const [isExported, setIsExported] = useState(false);
  const [isPrCreated, setIsPrCreated] = useState(false);

  const tabs: TabItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="w-3.5 h-3.5" />,
    },
    {
      id: "breaking",
      label: "Breaking Changes",
      badge: DEMO_FINDINGS.length,
      icon: <FileDiff className="w-3.5 h-3.5" />,
    },
    {
      id: "impact",
      label: "Code Impact",
      badge: "4 files",
      icon: <Code2 className="w-3.5 h-3.5" />,
    },
    {
      id: "dependencies",
      label: "Dependencies",
      badge: "1 conflict",
      icon: <GitFork className="w-3.5 h-3.5" />,
    },
    {
      id: "security",
      label: "Security",
      badge: "1 patched",
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
    },
    {
      id: "migration",
      label: "Migration Plan",
      badge: "5 steps",
      icon: <ClipboardList className="w-3.5 h-3.5" />,
    },
    {
      id: "tests",
      label: "Tests",
      badge: "5 suites",
      icon: <CheckSquare className="w-3.5 h-3.5" />,
    },
    {
      id: "evidence",
      label: "Evidence",
      badge: "6 items",
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
  ];

  const handleOpenFileInCodeTab = (filename: string) => {
    setSelectedFilePath(filename);
    setActiveTab("impact");
  };

  const handleExport = () => {
    setIsExported(true);
    const blob = new Blob(
      [JSON.stringify({ summary: DEMO_ANALYSIS_SUMMARY, findings: DEMO_FINDINGS }, null, 2)],
      { type: "application/json" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `upgradeguard-fastapi-0.120.0-report.json`;
    a.click();
    setTimeout(() => setIsExported(false), 2500);
  };

  const handleCreatePr = () => {
    setIsPrCreated(true);
    setTimeout(() => setIsPrCreated(false), 3000);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Analysis Report"
          subtitle="FastAPI 0.110.0 → 0.120.0"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* HEADER STRIP */}
          <div className="surface-card rounded-xl p-5 sm:p-6 space-y-4 shadow-glass-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    REPORT #ANA-8821
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-400 font-sans">
                    Repository: {DEMO_ANALYSIS_SUMMARY.repository}
                  </span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">
                    Branch: {DEMO_ANALYSIS_SUMMARY.branch} ({DEMO_ANALYSIS_SUMMARY.commitHash})
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 dark:text-white tracking-tight flex items-center gap-3 font-sans">
                  <span>FastAPI</span>
                  <span className="text-sm font-mono font-normal text-zinc-400">
                    {DEMO_ANALYSIS_SUMMARY.currentVersion}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-600">→</span>
                  <span className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                    {DEMO_ANALYSIS_SUMMARY.targetVersion}
                  </span>
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-white/[0.08] transition-colors cursor-pointer"
                >
                  {isExported ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-sans">Exported</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="font-sans">Export JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCreatePr}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/20 transition-all font-semibold font-sans cursor-pointer"
                >
                  {isPrCreated ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-white" />
                      <span>Draft PR Ready #42</span>
                    </>
                  ) : (
                    <>
                      <GitPullRequest className="w-3.5 h-3.5" />
                      <span>Create Migration PR</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Compact Risk & Reasons Strip */}
            <div className="pt-3 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-3">
                <RiskBadge
                  level={DEMO_ANALYSIS_SUMMARY.riskLevel}
                  score={DEMO_ANALYSIS_SUMMARY.riskScore}
                  size="md"
                />
                <span className="text-zinc-500 font-sans text-xs">
                  Synthesized by Risk Engine & Verified by Critic Loop
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-zinc-600 dark:text-zinc-400 font-sans">
                <span className="text-rose-600 dark:text-rose-400 font-semibold font-mono">2 breaking changes</span>
                <span>•</span>
                <span className="text-zinc-900 dark:text-zinc-200 font-medium font-mono">4 affected files</span>
                <span>•</span>
                <span className="text-rose-600 dark:text-rose-400 font-semibold font-mono">1 dependency conflict</span>
                <span>•</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold font-mono">1 migration requirement</span>
              </div>
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id)}
          />

          {/* ACTIVE TAB CONTENT */}
          <div className="pt-1">
            {activeTab === "overview" && (
              <OverviewTab
                summary={DEMO_ANALYSIS_SUMMARY}
                findings={DEMO_FINDINGS}
                onSelectTab={(tabId) => setActiveTab(tabId)}
              />
            )}

            {activeTab === "breaking" && (
              <BreakingChangesTab
                findings={DEMO_FINDINGS}
                onOpenFileInCodeTab={handleOpenFileInCodeTab}
              />
            )}

            {activeTab === "impact" && (
              <CodeImpactTab
                files={DEMO_CODE_FILES}
                findings={DEMO_FINDINGS}
                initialSelectedPath={selectedFilePath}
              />
            )}

            {activeTab === "dependencies" && (
              <DependenciesTab rootNode={DEMO_DEPENDENCY_TREE} />
            )}

            {activeTab === "security" && (
              <SecurityTab advisories={DEMO_SECURITY_ADVISORIES} />
            )}

            {activeTab === "migration" && (
              <MigrationPlanTab steps={DEMO_MIGRATION_STEPS} />
            )}

            {activeTab === "tests" && <TestsTab tests={DEMO_TEST_CASES} />}

            {activeTab === "evidence" && (
              <EvidenceTab evidenceList={DEMO_EVIDENCE} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
