"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AnalysisProgress } from "@/components/analysis/AnalysisProgress";
import {
  Play,
  Sparkles,
  Info,
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

  // Advanced toggles
  const [enableVerifier, setEnableVerifier] = useState(true);
  const [deepAstScan, setDeepAstScan] = useState(true);
  const [checkSecurityAdvisories, setCheckSecurityAdvisories] = useState(true);

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
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          title="New Analysis"
          subtitle="Configure Upgrade Intelligence"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
          {isAnalyzing ? (
            <AnalysisProgress
              targetUrl="/analysis/fastapi-demo"
              autoRedirect={false}
            />
          ) : (
            <div className="space-y-6">
              {/* Header card */}
              <div className="surface-card rounded-xl p-5 sm:p-6 shadow-glass-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        Configure Execution
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 font-semibold">
                        Multi-Agent Engine
                      </span>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
                      Start Pre-Upgrade Analysis
                    </h1>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl leading-relaxed font-sans">
                      Select your repository and target dependency version. Specialized agents will inspect changelogs, analyze your code's AST, and run adversarial verification.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseDemo}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Use Demo Analysis</span>
                  </button>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleStartAnalysis}
                className="surface-card rounded-xl p-6 sm:p-7 space-y-6 shadow-glass-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-mono">
                  {/* Dependency */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px] block font-sans">
                      Target Dependency Name
                    </label>
                    <input
                      type="text"
                      value={dependency}
                      onChange={(e) => setDependency(e.target.value)}
                      required
                      placeholder="e.g. FastAPI, Pydantic, next"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#07090D] border border-zinc-200 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none text-zinc-900 dark:text-zinc-100 text-xs font-mono shadow-xs"
                    />
                  </div>

                  {/* Ecosystem */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px] block font-sans">
                      Ecosystem / Package Manager
                    </label>
                    <select
                      value={ecosystem}
                      onChange={(e) => setEcosystem(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#07090D] border border-zinc-200 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none text-zinc-900 dark:text-zinc-100 text-xs font-mono shadow-xs"
                    >
                      <option value="Python">Python (Poetry / pip / pyproject.toml)</option>
                      <option value="Node.js">Node.js (npm / yarn / pnpm)</option>
                      <option value="Rust">Rust (Cargo.toml)</option>
                      <option value="Go">Go (go.mod)</option>
                    </select>
                  </div>

                  {/* Current Version */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px] block font-sans">
                      Current Installed Version
                    </label>
                    <input
                      type="text"
                      value={currentVersion}
                      onChange={(e) => setCurrentVersion(e.target.value)}
                      required
                      placeholder="e.g. 0.110.0"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#07090D] border border-zinc-200 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none text-zinc-900 dark:text-zinc-100 text-xs font-mono shadow-xs"
                    />
                  </div>

                  {/* Target Version */}
                  <div className="space-y-1.5">
                    <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px] block font-sans">
                      Target Upgrade Version
                    </label>
                    <input
                      type="text"
                      value={targetVersion}
                      onChange={(e) => setTargetVersion(e.target.value)}
                      required
                      placeholder="e.g. 0.120.0"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#07090D] border border-zinc-200 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none text-zinc-900 dark:text-zinc-100 text-xs font-mono shadow-xs"
                    />
                  </div>

                  {/* Repository */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-zinc-700 dark:text-zinc-300 font-semibold uppercase tracking-wider text-[11px] block font-sans">
                      Target Codebase / Repository
                    </label>
                    <select
                      value={repository}
                      onChange={(e) => setRepository(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-[#07090D] border border-zinc-200 dark:border-white/[0.08] focus:border-indigo-500 focus:outline-none text-zinc-900 dark:text-zinc-100 text-xs font-mono shadow-xs"
                    >
                      <option value="FastAPI Commerce API">
                        FastAPI Commerce API (org/fastapi-commerce-api:main)
                      </option>
                      <option value="Order Processing Engine">
                        Order Processing Engine (org/order-processing-engine:main)
                      </option>
                      <option value="Commerce Storefront Web">
                        Commerce Storefront Web (org/storefront-next:production)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Execution Controls */}
                <div className="pt-4 border-t border-zinc-200/80 dark:border-white/[0.06] space-y-3">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-500 block font-sans">
                    Execution Controls
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
                    <label className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] flex items-center gap-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.04]">
                      <input
                        type="checkbox"
                        checked={enableVerifier}
                        onChange={(e) => setEnableVerifier(e.target.checked)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-0"
                      />
                      <span className="text-zinc-800 dark:text-zinc-300 font-medium">Verifier Critic Loop</span>
                    </label>

                    <label className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] flex items-center gap-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.04]">
                      <input
                        type="checkbox"
                        checked={deepAstScan}
                        onChange={(e) => setDeepAstScan(e.target.checked)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-0"
                      />
                      <span className="text-zinc-800 dark:text-zinc-300 font-medium">Deep AST Call Graph</span>
                    </label>

                    <label className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/[0.06] flex items-center gap-2.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/[0.04]">
                      <input
                        type="checkbox"
                        checked={checkSecurityAdvisories}
                        onChange={(e) => setCheckSecurityAdvisories(e.target.checked)}
                        className="rounded border-zinc-300 dark:border-zinc-700 text-indigo-600 focus:ring-0"
                      />
                      <span className="text-zinc-800 dark:text-zinc-300 font-medium">OSV Advisory Check</span>
                    </label>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-200/80 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Info className="w-4 h-4 text-zinc-400" />
                    <span>Deterministic 8-stage multi-agent pipeline with ground-truth verification.</span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleUseDemo}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/[0.08] transition-colors cursor-pointer"
                    >
                      Use Demo Analysis
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer font-sans"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Analysis</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
