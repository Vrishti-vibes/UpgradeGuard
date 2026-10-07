"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedFilePath, setSelectedFilePath] = useState<string>("src/auth.py");
  const [isExported, setIsExported] = useState(false);
  const [isPrCreated, setIsPrCreated] = useState(false);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl && ["overview", "breaking", "impact", "dependencies", "security", "migration", "tests", "evidence"].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

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
    <div className="flex min-h-screen bg-[var(--bg-base)]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Analysis Report"
          subtitle="FastAPI: 0.110.0 → 0.120.0"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Clean Header Box */}
          <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    REPORT #ANA-8821
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] font-sans">
                    Repository: {DEMO_ANALYSIS_SUMMARY.repository}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    branch: {DEMO_ANALYSIS_SUMMARY.branch}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight flex items-center gap-3 font-sans">
                  <span>FastAPI Upgrade Impact</span>
                  <span className="text-sm font-mono font-normal text-[var(--text-muted)]">
                    {DEMO_ANALYSIS_SUMMARY.currentVersion}
                  </span>
                  <span className="text-indigo-500 font-bold text-sm">→</span>
                  <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {DEMO_ANALYSIS_SUMMARY.targetVersion}
                  </span>
                </h1>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 font-sans text-xs">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-base)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] transition-colors cursor-pointer"
                >
                  {isExported ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-green-600 font-medium">Exported</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>Export JSON</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCreatePr}
                  className="clay-btn flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all font-medium cursor-pointer shadow-md shadow-indigo-600/25"
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

            {/* Quick Summary Strip */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <RiskBadge
                  severity={DEMO_ANALYSIS_SUMMARY.riskLevel}
                  score={DEMO_ANALYSIS_SUMMARY.riskScore}
                  size="md"
                />
                <span className="text-[var(--text-secondary)] font-sans">
                  Analyzed by 4 specialized AI agents
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[var(--text-secondary)] font-sans">
                <span className="text-red-600 font-bold font-mono">2 breaking changes</span>
                <span>•</span>
                <span className="text-[var(--text-primary)] font-medium font-mono">4 affected files</span>
                <span>•</span>
                <span className="text-amber-600 font-semibold font-mono">1 lockfile conflict</span>
                <span>•</span>
                <span className="text-green-600 font-semibold font-mono">1 security fix</span>
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
