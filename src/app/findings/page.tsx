"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { FindingDetailsModal } from "@/components/ui/Modals";
import { DEMO_FINDINGS } from "@/lib/demoData";
import { Finding } from "@/types";
import { ArrowRight, Code2, FileCode, CheckCircle2 } from "lucide-react";

export default function FindingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);

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
          subtitle="Findings Catalog"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
                Discovered Findings ({DEMO_FINDINGS.length})
              </h1>
              <p className="text-xs text-[var(--text-secondary)] mt-1 font-sans">
                Issues identified in your project files that need to be resolved before upgrading FastAPI.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-xl border border-green-200 dark:border-green-800/40 font-semibold font-sans">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Verified by AI Analysis</span>
            </div>
          </div>

          <div className="space-y-3 font-sans">
            {DEMO_FINDINGS.map((finding) => (
              <div
                key={finding.id}
                className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 hover:border-indigo-300 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <RiskBadge severity={finding.severity} size="sm" />
                    <span className="text-xs font-mono font-bold text-indigo-600">
                      {finding.id}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {finding.category}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedFinding(finding)}
                    className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
                  >
                    View Code Solution →
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {finding.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                    {finding.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--text-muted)]">Target API:</span>
                    <code className="text-indigo-600 font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                      {finding.affectedApi}
                    </code>
                  </div>
                  <div className="text-[var(--text-secondary)] font-mono text-[11px] flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>{finding.affectedFiles.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <FindingDetailsModal
        finding={selectedFinding}
        isOpen={Boolean(selectedFinding)}
        onClose={() => setSelectedFinding(null)}
      />
    </div>
  );
}
