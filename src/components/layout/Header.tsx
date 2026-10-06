"use client";

import React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Menu, GitBranch, ArrowUpRight, Terminal } from "lucide-react";

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
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 sm:px-6 bg-white/80 dark:bg-[#08090C]/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-white/[0.06] transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/[0.08] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-sans">
          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{title}</span>
          {subtitle && (
            <>
              <span className="text-zinc-400 dark:text-zinc-600 text-xs">/</span>
              <span className="text-xs text-zinc-600 dark:text-zinc-400 font-mono hidden sm:inline-block">
                {subtitle}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-100/70 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          <GitBranch className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
          <span>fastapi-commerce-api:main</span>
        </div>

        <Link
          href="/architecture"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-sans font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-300 bg-zinc-100/80 dark:bg-white/[0.04] hover:bg-zinc-200/80 dark:hover:bg-white/[0.08] border border-zinc-200/80 dark:border-white/[0.08] transition-all"
        >
          <span>Architecture DAG</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
        </Link>

        {/* Theme Toggle Button */}
        <ThemeToggle />

        <Link
          href="/new"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/20 transition-all font-sans"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>New Analysis</span>
        </Link>
      </div>
    </header>
  );
}
