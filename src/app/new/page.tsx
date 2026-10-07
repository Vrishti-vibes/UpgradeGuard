"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AnalysisProgress } from "@/components/analysis/AnalysisProgress";
import {
  Play,
  Sparkles,
  CheckCircle2,
  Package,
} from "lucide-react";

export default function NewAnalysisPage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form State
  const [dependency, setDependency] = useState("FastAPI");
  const [currentVersion, setCurrentVersion] = useState("0.110.0");
  const [targetVersion, setTargetVersion] = useState("0.120.0");
  const [ecosystem, setEcosystem] = useState("Python");
  const [repository, setRepository] = useState("FastAPI Commerce API");

  // Progress Mode
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
  };

  const handleUseDemo = () => {
    setDependency("FastAPI");
    setCurrentVersion("0.110.0");
    setTargetVersion("0.120.0");
    setEcosystem("Python");
    setRepository("FastAPI Commerce API");
    setIsAnalyzing(true);
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
          title="New Analysis"
          subtitle="Configure Package Upgrade"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          {isAnalyzing ? (
            <AnalysisProgress
              targetUrl="/analysis/fastapi-demo"
              autoRedirect={false}
            />
          ) : (
            <div className="space-y-6">
              {/* Header card */}
              <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 font-mono">
                      New Investigation
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight font-sans">
                    Start Pre-Upgrade Analysis
                  </h1>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-xl leading-relaxed font-sans">
                    Select a repository and the target package version. 4 specialized AI agents will analyze potential breaking changes and risks.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleUseDemo}
                  className="clay-btn flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-200 dark:border-indigo-800/50 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Use Demo Data</span>
                </button>
              </div>

              {/* Form */}
              <form
                onSubmit={handleStartAnalysis}
                className="p-6 sm:p-8 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6 font-sans"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                  {/* Dependency */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                      Target Package / Dependency
                    </label>
                    <input
                      type="text"
                      value={dependency}
                      onChange={(e) => setDependency(e.target.value)}
                      required
                      placeholder="e.g. FastAPI, Pydantic, next"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-indigo-500 focus:outline-none text-[var(--text-primary)] text-sm font-mono"
                    />
                  </div>

                  {/* Ecosystem */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                      Ecosystem / Language
                    </label>
                    <select
                      value={ecosystem}
                      onChange={(e) => setEcosystem(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-indigo-500 focus:outline-none text-[var(--text-primary)] text-sm font-mono"
                    >
                      <option value="Python">Python (Poetry / pip)</option>
                      <option value="Node.js">Node.js (npm / yarn)</option>
                      <option value="Rust">Rust (Cargo)</option>
                      <option value="Go">Go (go.mod)</option>
                    </select>
                  </div>

                  {/* Current Version */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                      Current Installed Version
                    </label>
                    <input
                      type="text"
                      value={currentVersion}
                      onChange={(e) => setCurrentVersion(e.target.value)}
                      required
                      placeholder="e.g. 0.110.0"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-indigo-500 focus:outline-none text-[var(--text-primary)] text-sm font-mono"
                    />
                  </div>

                  {/* Target Version */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-indigo-600 uppercase tracking-wider font-mono">
                      Target Upgrade Version
                    </label>
                    <input
                      type="text"
                      value={targetVersion}
                      onChange={(e) => setTargetVersion(e.target.value)}
                      required
                      placeholder="e.g. 0.120.0"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 focus:border-indigo-500 focus:outline-none text-indigo-700 dark:text-indigo-300 font-bold text-sm font-mono"
                    />
                  </div>

                  {/* Repository */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider font-mono">
                      Target Repository
                    </label>
                    <input
                      type="text"
                      value={repository}
                      onChange={(e) => setRepository(e.target.value)}
                      required
                      placeholder="e.g. fastapi-commerce-api"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] focus:border-indigo-500 focus:outline-none text-[var(--text-primary)] text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted)]">
                    Takes approx. 3-5 seconds for full multi-agent analysis.
                  </span>

                  <button
                    type="submit"
                    className="clay-btn inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Multi-Agent Analysis</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
