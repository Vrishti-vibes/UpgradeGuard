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
          subtitle="System Preferences"
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
          <div className="p-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-sm">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight font-sans">
              System Settings
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
              Configure appearance, AI verification confidence thresholds, and vulnerability scanner parameters.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 space-y-6 shadow-sm">
            {/* Theme Preference Setting */}
            <div className="space-y-3 pb-6 border-b border-[var(--border-subtle)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
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

            {/* Verification confidence slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>AI Verification Confidence Threshold</span>
                </label>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono text-sm px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">{criticConfidence}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="99"
                value={criticConfidence}
                onChange={(e) => setCriticConfidence(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-xs text-zinc-500 font-sans">
                Findings with confidence below this threshold require additional validation before being reported as verified.
              </p>
            </div>

            {/* Code analysis depth */}
            <div className="pt-5 border-t border-[var(--border-subtle)] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <Terminal className="w-4 h-4 text-indigo-500" />
                  <span>Code Impact Search Depth</span>
                </label>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold font-mono text-sm px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20">{maxAstDepth} Levels</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={maxAstDepth}
                onChange={(e) => setMaxAstDepth(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-xs text-zinc-500 font-sans">
                Controls how deeply the Code Impact Agent traverses function calls and repository dependencies.
              </p>
            </div>

            {/* Advisory query timeout */}
            <div className="pt-5 border-t border-[var(--border-subtle)] space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-900 dark:text-zinc-100 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2 font-sans">
                  <Database className="w-4 h-4 text-rose-500" />
                  <span>Security Advisory Timeout</span>
                </label>
                <span className="text-rose-700 dark:text-rose-400 font-bold font-mono text-sm px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">{osvTimeout}s</span>
              </div>
              <input
                type="range"
                min="3"
                max="30"
                value={osvTimeout}
                onChange={(e) => setOsvTimeout(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <p className="text-xs text-zinc-500 font-sans">
                Maximum time allotted for querying vulnerability databases and security feeds.
              </p>
            </div>

            {/* Save Button */}
            <div className="pt-5 border-t border-[var(--border-subtle)] flex justify-end font-sans">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Configuration Saved</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
