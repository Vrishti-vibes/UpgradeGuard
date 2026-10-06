"use client";

import React from "react";
import { SeverityLevel } from "@/types";
import { cn } from "@/lib/utils";
import { AlertCircle, AlertTriangle, CheckCircle, ShieldAlert, Info } from "lucide-react";

interface RiskBadgeProps {
  level: SeverityLevel;
  score?: number;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function RiskBadge({
  level,
  score,
  size = "md",
  showIcon = true,
  className,
}: RiskBadgeProps) {
  const styles: Record<
    SeverityLevel,
    { bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    CRITICAL: {
      bg: "bg-rose-500/10 dark:bg-rose-500/15",
      text: "text-rose-700 dark:text-rose-400 font-semibold",
      border: "border-rose-300 dark:border-rose-500/30",
      icon: <ShieldAlert className="w-3.5 h-3.5" />,
    },
    HIGH: {
      bg: "bg-rose-500/10 dark:bg-rose-500/15",
      text: "text-rose-700 dark:text-rose-400 font-semibold",
      border: "border-rose-300 dark:border-rose-500/30",
      icon: <AlertCircle className="w-3.5 h-3.5" />,
    },
    MEDIUM: {
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-400 font-semibold",
      border: "border-amber-300 dark:border-amber-500/30",
      icon: <AlertTriangle className="w-3.5 h-3.5" />,
    },
    LOW: {
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-400 font-semibold",
      border: "border-emerald-300 dark:border-emerald-500/30",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
    },
    INFO: {
      bg: "bg-sky-500/10 dark:bg-sky-500/15",
      text: "text-sky-700 dark:text-sky-400 font-semibold",
      border: "border-sky-300 dark:border-sky-500/30",
      icon: <Info className="w-3.5 h-3.5" />,
    },
  };

  const current = styles[level] || styles.INFO;

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1.5",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border tracking-wider uppercase select-none transition-colors",
        current.bg,
        current.text,
        current.border,
        sizeStyles[size],
        className
      )}
    >
      {showIcon && current.icon}
      <span>{level}</span>
      {score !== undefined && (
        <span className="font-mono font-bold opacity-90 pl-1 border-l border-current/25 ml-0.5">
          {score}/100
        </span>
      )}
    </span>
  );
}
