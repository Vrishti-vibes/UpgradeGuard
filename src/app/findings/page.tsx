"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { DEMO_FINDINGS } from "@/lib/demoData";
import { ShieldCheck, ArrowRight, Code2 } from "lucide-react";

export default function FindingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Findings"
          subtitle="Grounded Deprecations"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="p-5 sm:p-6 rounded-xl surface-card shadow-glass-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
                Global Findings Catalog
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
                Catalog of breaking changes, signature modifications, and deprecation patterns extracted by Change & Code Impact Agents.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-500/20 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Grounded with AST Call Sites</span>
            </div>
          </div>

          <div className="space-y-3">
            {DEMO_FINDINGS.map((finding) => (
              <div
                key={finding.id}
                className="p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs space-y-3 hover:border-zinc-300 dark:hover:border-white/[0.14] transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
                      {finding.id}
                    </span>
                    <RiskBadge level={finding.severity} size="sm" />
                    <VerificationBadge status={finding.status} size="sm" />
                    <span className="text-[11px] text-zinc-500 font-sans">
                      {finding.category}
                    </span>
                  </div>

                  <Link
                    href="/analysis/fastapi-demo"
                    className="inline-flex items-center gap-1 text-xs font-sans text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    <span>View in Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 font-sans">
                    {finding.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans leading-relaxed">
                    {finding.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-zinc-400">Affected API:</span>
                    <code className="text-indigo-700 dark:text-indigo-300 font-semibold">{finding.affectedApi}</code>
                  </div>
                  <div className="text-zinc-500">
                    Files: <span className="text-zinc-900 dark:text-zinc-200">{finding.affectedFiles.join(", ")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
