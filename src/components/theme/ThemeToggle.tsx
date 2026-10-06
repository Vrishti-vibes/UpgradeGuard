"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Monitor, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabels?: boolean;
}

export function ThemeToggle({ className, showLabels = false }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (showLabels) {
    return (
      <div className={cn("flex items-center gap-1 p-1 rounded-lg border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.04]", className)}>
        {(["dark", "light", "system"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize",
              theme === t
                ? "bg-white dark:bg-white/15 text-zinc-900 dark:text-white shadow-sm font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            {t === "dark" && <Moon className="w-3.5 h-3.5" />}
            {t === "light" && <Sun className="w-3.5 h-3.5" />}
            {t === "system" && <Monitor className="w-3.5 h-3.5" />}
            <span>{t}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block text-left", className)} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 rounded-md border border-zinc-200 dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-white/[0.16] transition-colors"
        aria-label="Toggle theme"
        title="Theme options"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-4 h-4 text-indigo-400" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#11141D] p-1.5 shadow-xl shadow-black/10 dark:shadow-black/50 z-50 animate-in fade-in zoom-in-95 duration-100">
          {(
            [
              { id: "dark", label: "Dark", icon: Moon },
              { id: "light", label: "Light", icon: Sun },
              { id: "system", label: "System", icon: Monitor },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTheme(item.id);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between w-full px-2.5 py-1.5 rounded-md text-xs transition-colors",
                  isSelected
                    ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white font-medium"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>{item.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
