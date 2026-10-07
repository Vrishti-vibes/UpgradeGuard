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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight font-sans">
                Upgrade Impact Analyses
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                Historical records of dependency scans, breaking change reports, and migration steps.
              </p>
            </div>

            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm self-start sm:self-auto font-sans"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by package name, repository, or analysis ID..."
              className="w-full bg-transparent text-xs text-zinc-900 dark:text-zinc-200 focus:outline-none placeholder:text-zinc-400 font-sans"
            />
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="text-zinc-500 dark:text-zinc-400 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)] font-sans">
                    <th className="py-3 px-4 font-semibold">Analysis ID</th>
                    <th className="py-3 px-4 font-semibold">Target Package</th>
                    <th className="py-3 px-4 font-semibold">Version Change</th>
                    <th className="py-3 px-4 font-semibold">Repository</th>
                    <th className="py-3 px-4 font-semibold">Risk Rating</th>
                    <th className="py-3 px-4 font-semibold">Breaking Changes</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] font-sans">
                  {filtered.map((row) => (
                    <tr key={row.id} className="hover:bg-[var(--bg-subtle)] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {row.id}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                        {row.dependency}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                        {row.fromVersion} → {row.toVersion}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-700 dark:text-zinc-300">
                        {row.repository}
                      </td>
                      <td className="py-3.5 px-4">
                        <RiskBadge level={row.riskLevel as any} score={row.riskScore} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-semibold font-mono">
                        {row.breakingChanges}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 text-xs">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href="/analysis/fastapi-demo"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                        >
                          <span>Open Report</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
