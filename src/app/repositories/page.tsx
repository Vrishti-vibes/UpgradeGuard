"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DEMO_REPOSITORIES } from "@/lib/demoData";
import { ArrowRight, Plus, Star } from "lucide-react";

export default function RepositoriesPage() {
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
          title="Repositories"
          subtitle="Connected Codebases"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl surface-card shadow-glass-sm">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
                Connected Repositories
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
                Monitored codebases available for AST call graph extraction and pre-upgrade impact checks.
              </p>
            </div>

            <Link
              href="/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all self-start sm:self-auto font-sans"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Connect Repository</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DEMO_REPOSITORIES.map((repo) => (
              <div
                key={repo.id}
                className="p-5 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-zinc-300 dark:hover:border-white/[0.16] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-zinc-400 mb-2">
                    <span className="text-[11px] font-mono text-zinc-500">
                      {repo.ecosystem}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                      {repo.stars}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight font-sans">
                    {repo.name}
                  </h3>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">
                    {repo.slug}
                  </p>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.04] space-y-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 font-sans">Default branch:</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{repo.branch}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 font-sans">Dependencies:</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{repo.dependenciesCount} packages</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 font-sans">Last scan:</span>
                      <span className="text-zinc-800 dark:text-zinc-200">{repo.lastAnalyzed}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      repo.healthStatus === "ATTENTION_REQUIRED"
                        ? "bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-400"
                        : "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400"
                    }`}
                  >
                    {repo.healthStatus}
                  </span>

                  <Link
                    href="/analysis/fastapi-demo"
                    className="inline-flex items-center gap-1 text-xs font-sans text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                  >
                    <span>Analyze</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
