"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FolderGit2,
  FileSearch,
  ShieldCheck,
  Network,
  Settings,
  X,
  Shield,
  ArrowUpRight,
} from "lucide-react";

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();

  const sections = [
    {
      group: "WORKSPACE",
      items: [
        { label: "Overview", href: "/", icon: LayoutDashboard },
        { label: "New Analysis", href: "/new", icon: PlusCircle, badge: "Launch" },
        { label: "Analyses", href: "/analyses", icon: History },
      ],
    },
    {
      group: "CODEBASE",
      items: [
        { label: "Repositories", href: "/repositories", icon: FolderGit2 },
        { label: "Findings", href: "/findings", icon: FileSearch },
        { label: "Evidence", href: "/evidence", icon: ShieldCheck },
      ],
    },
    {
      group: "SYSTEM",
      items: [
        { label: "Architecture", href: "/architecture", icon: Network },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-zinc-50/95 dark:bg-[#0A0C11]/95 backdrop-blur-xl border-r border-zinc-200/80 dark:border-white/[0.08] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-10",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Top: Logo & Grouped Navigation */}
        <div className="flex flex-col flex-1 p-4 overflow-y-auto">
          {/* Logo & Mobile Close */}
          <div className="flex items-center justify-between pb-5 pt-1 px-2 border-b border-zinc-200/80 dark:border-white/[0.06]">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-tight text-sm text-zinc-900 dark:text-white flex items-center gap-1.5 font-sans">
                  UpgradeGuard
                  <span className="text-[9px] font-mono font-medium px-1 py-0.2 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300">
                    v1.2
                  </span>
                </span>
                <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                  PRE-UPGRADE INTELLIGENCE
                </span>
              </div>
            </Link>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-white/[0.08] lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Grouped Navigation */}
          <nav className="mt-5 space-y-6">
            {sections.map((sec) => (
              <div key={sec.group} className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 block mb-1.5 font-semibold">
                  {sec.group}
                </span>

                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group select-none relative font-sans",
                          isActive
                            ? "text-zinc-950 dark:text-white bg-zinc-200/70 dark:bg-white/[0.08] font-semibold shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-200/40 dark:hover:bg-white/[0.04]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-indigo-600 dark:bg-indigo-400 rounded-r" />
                          )}
                          <Icon
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isActive
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300"
                            )}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 px-1.5 py-0.2 rounded font-semibold">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Active Benchmark Mini Card in Sidebar */}
          <div className="mt-6 p-3 rounded-lg border border-zinc-200 dark:border-white/[0.06] bg-white/70 dark:bg-[#0E1118]/80 text-xs shadow-xs">
            <div className="flex items-center justify-between text-zinc-500 mb-1">
              <span className="font-mono text-[10px] uppercase font-semibold text-zinc-600 dark:text-zinc-400">
                ACTIVE BENCHMARK
              </span>
              <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                HIGH 72
              </span>
            </div>
            <p className="text-xs font-mono font-medium text-zinc-900 dark:text-zinc-200">
              FastAPI: 0.110.0 → 0.120.0
            </p>
            <div className="mt-2 flex items-center justify-between pt-1.5 border-t border-zinc-200/60 dark:border-white/[0.06]">
              <span className="text-[11px] text-zinc-500 font-sans truncate mr-1">
                FastAPI Commerce API
              </span>
              <Link
                href="/analysis/fastapi-demo"
                className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5 flex-shrink-0"
              >
                <span>Inspect</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: System status and version */}
        <div className="p-3.5 border-t border-zinc-200/80 dark:border-white/[0.06] bg-zinc-100/50 dark:bg-[#08090D] space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500">Engine v1.4</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Critic Loop Online
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
