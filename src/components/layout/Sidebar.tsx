"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FileSearch,
  ShieldCheck,
  Network,
  Settings,
  X,
  ArrowRight,
  ClipboardList,
  Sparkles,
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
        { label: "New Analysis", href: "/new", icon: PlusCircle },
        { label: "Analyses", href: "/analyses", icon: History },
      ],
    },
    {
      group: "ANALYSIS",
      items: [
        { label: "Findings", href: "/findings", icon: FileSearch, badge: "4" },
        { label: "Migration Plan", href: "/analysis/fastapi-demo", icon: ClipboardList },
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
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-60 bg-[var(--bg-surface)] hairline-r flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-10 select-none text-xs",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-4 h-13 hairline-b">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-600/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm text-[var(--text-primary)] font-sans tracking-tight block leading-none">
                  UpgradeGuard
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-sans">
                  AI Upgrade Assistant
                </span>
              </div>
            </Link>

            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] lg:hidden cursor-pointer rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Grouped Navigation */}
          <nav className="p-3 space-y-4 font-sans">
            {sections.map((sec) => (
              <div key={sec.group} className="space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1 block">
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
                        key={item.label}
                        href={item.href}
                        onClick={onCloseMobile}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all",
                          isActive
                            ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 font-semibold shadow-2xs"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={cn(
                              "w-4 h-4 transition-colors",
                              isActive
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-[var(--text-muted)]"
                            )}
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold">
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

          {/* Simple Active Upgrade Box */}
          <div className="mx-3 mt-auto mb-3 p-3 rounded-xl clay-card text-xs">
            <div className="flex items-center justify-between text-[10px] uppercase font-semibold text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Demo Analysis
              </span>
              <span className="text-amber-600 font-bold font-mono">Risk 72</span>
            </div>
            <div className="font-semibold text-[var(--text-primary)] font-mono text-xs">
              FastAPI: 0.110.0 → 0.120.0
            </div>
            <Link
              href="/analysis/fastapi-demo"
              className="mt-2 inline-flex items-center justify-between w-full p-1.5 rounded-md bg-[var(--bg-subtle)] hover:bg-indigo-50 hover:text-indigo-600 text-[11px] font-medium text-[var(--text-secondary)] transition-colors"
            >
              <span>View Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Simple Project Info */}
        <div className="px-4 py-2.5 hairline-t text-[11px] font-sans text-[var(--text-muted)] flex items-center justify-between bg-[var(--bg-subtle)]">
          <span>Final Year Project</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">B.Tech Demo</span>
        </div>
      </aside>
    </>
  );
}
