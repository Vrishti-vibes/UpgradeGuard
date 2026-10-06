"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { DEMO_PREVIOUS_ANALYSES } from "@/lib/demoData";
import { Plus, Search, ArrowUpRight } from "lucide-react";

export default function AnalysesListPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = DEMO_PREVIOUS_ANALYSES.filter(
    (a) =>
      a.dependency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.repository.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="Analyses"
          subtitle="Upgrade History"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl surface-card shadow-glass-sm">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
                Upgrade Impact Analyses
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
                Historical records of pre-upgrade scans, breaking change catalogs, and migration plans.
              </p>
            </div>

            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all self-start sm:self-auto font-sans"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by package, repository, or analysis ID..."
              className="w-full bg-transparent text-xs font-mono text-zinc-900 dark:text-zinc-200 focus:outline-none placeholder:text-zinc-400"
            />
          </div>

          {/* Table */}
          <div className="surface-card rounded-xl shadow-glass-sm overflow-hidden">
            <table className="w-full text-xs font-mono text-left">
              <thead>
                <tr className="text-zinc-400 dark:text-zinc-500 border-b border-zinc-200/80 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#0C0F17]">
                  <th className="py-3 px-4 font-normal">Analysis ID</th>
                  <th className="py-3 px-4 font-normal">Target Package</th>
                  <th className="py-3 px-4 font-normal">Version Hop</th>
                  <th className="py-3 px-4 font-normal font-sans">Target Repository</th>
                  <th className="py-3 px-4 font-normal">Risk Rating</th>
                  <th className="py-3 px-4 font-normal">Breaking APIs</th>
                  <th className="py-3 px-4 font-normal">Timestamp</th>
                  <th className="py-3 px-4 font-normal text-right font-sans">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.03]">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">
                      {row.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-zinc-900 dark:text-zinc-200">
                      {row.dependency}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-400">
                      {row.fromVersion} → {row.toVersion}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-700 dark:text-zinc-300 font-sans">{row.repository}</td>
                    <td className="py-3.5 px-4">
                      <RiskBadge level={row.riskLevel as any} score={row.riskScore} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-semibold">
                      {row.breakingChanges}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-500">{row.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/analysis/fastapi-demo"
                        className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium font-sans"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
