"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Menu, GitBranch, Plus, ArrowUpRight, Search } from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";

interface HeaderProps {
  onToggleMobileMenu?: () => void;
  title?: string;
  subtitle?: string;
}

export function Header({
  onToggleMobileMenu,
  title = "UpgradeGuard",
  subtitle,
}: HeaderProps) {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-13 px-4 sm:px-6 bg-[var(--bg-surface)] hairline-b text-xs select-none">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] lg:hidden cursor-pointer rounded-md hover:bg-[var(--bg-subtle)]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-[var(--text-primary)] tracking-tight font-sans">
              {title}
            </span>
            {subtitle && (
              <>
                <span className="text-[var(--text-muted)] font-mono">/</span>
                <span className="text-xs text-[var(--text-secondary)] font-sans">
                  {subtitle}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center/Right Repository Context & Quick Action */}
        <div className="flex items-center gap-3 font-sans">
          {/* Quick Search */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-subtle)] hover:bg-[var(--bg-base)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Search project...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-muted)]">
              ⌘K
            </kbd>
          </button>

          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)]">
            <GitBranch className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-mono text-[11px]">fastapi-commerce-api</span>
            <span className="text-green-600 font-medium flex items-center gap-1 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Connected
            </span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          <Link
            href="/new"
            className="clay-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </Link>
        </div>
      </header>

      {/* Global Search Palette */}
      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
    </>
  );
}
