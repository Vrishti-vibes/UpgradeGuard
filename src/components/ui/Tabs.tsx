"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 border-b border-[var(--border-subtle)] overflow-x-auto no-scrollbar py-0.5 relative",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-xs font-sans rounded-t transition-colors whitespace-nowrap relative select-none cursor-pointer",
              isActive
                ? "text-[var(--text-primary)] font-medium bg-[var(--bg-subtle)] shadow-2xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]"
            )}
          >
            {tab.icon && (
              <span
                className={cn(
                  "transition-colors",
                  isActive ? "text-blue-500" : "text-[var(--text-muted)]"
                )}
              >
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded font-mono transition-colors",
                  isActive
                    ? "bg-blue-500/15 text-blue-500 border border-blue-500/25 font-semibold"
                    : "bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                )}
              >
                {tab.badge}
              </span>
            )}

            {isActive && (
              <motion.span
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 rounded-t-xs"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
