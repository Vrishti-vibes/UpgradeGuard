"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShieldCheck, Database, Terminal, Check, SunMoon } from "lucide-react";

export default function SettingsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [criticConfidence, setCriticConfidence] = useState(90);
  const [maxAstDepth, setMaxAstDepth] = useState(5);
  const [osvTimeout, setOsvTimeout] = useState(10);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
          title="Settings"
          subtitle="Agent Engine Parameters"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          <div className="p-5 sm:p-6 rounded-xl surface-card shadow-glass-sm">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
              System Configuration
            </h1>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 font-sans">
              Fine-tune theme preferences, adversarial critic thresholds, AST parser depth, and vulnerability scanner parameters.
            </p>
          </div>

          <div className="surface-card rounded-xl p-6 sm:p-7 space-y-6 shadow-glass-sm font-mono text-xs">
            {/* Theme Preference Setting */}
            <div className="space-y-3 pb-6 border-b border-zinc-200/80 dark:border-white/[0.06]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-zinc-900 dark:text-zinc-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                    <SunMoon className="w-4 h-4 text-indigo-500" />
                    <span>Theme Appearance</span>
                  </label>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5">
                    Select your preferred interface theme or synchronize with system settings.
                  </p>
                </div>

                <ThemeToggle showLabels />
              </div>
            </div>

            {/* Critic threshold slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Verifier / Critic Confidence Floor</span>
                </label>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-sm">{criticConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={criticConfidence}
                onChange={(e) => setCriticConfidence(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-500 font-sans">
                Candidate findings below this threshold trigger an automatic critique loop and are not surfaced as VERIFIED.
              </p>
            </div>

            {/* AST call graph depth */}
            <div className="pt-4 border-t border-zinc-200/80 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span>Max AST Static Call Traversal Depth</span>
                </label>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold font-mono text-sm">{maxAstDepth} Levels</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={maxAstDepth}
                onChange={(e) => setMaxAstDepth(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-500 font-sans">
                Controls recursive traversal through wrapper functions and dependency injection dependencies.
              </p>
            </div>

            {/* OSV Advisory query timeout */}
            <div className="pt-4 border-t border-zinc-200/80 dark:border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-200 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <Database className="w-4 h-4 text-rose-500" />
                  <span>OSV / CVE Query Timeout</span>
                </label>
                <span className="text-rose-700 dark:text-rose-400 font-bold font-mono text-sm">{osvTimeout}s</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                value={osvTimeout}
                onChange={(e) => setOsvTimeout(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-zinc-200/80 dark:border-white/[0.06] flex justify-end font-sans">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Configuration Saved</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
