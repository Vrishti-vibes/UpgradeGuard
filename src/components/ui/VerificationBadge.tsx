"use client";

import React from "react";
import { VerificationStatus } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, HelpCircle, XCircle } from "lucide-react";

interface VerificationBadgeProps {
  status: VerificationStatus;
  size?: "sm" | "md";
  className?: string;
}

export function VerificationBadge({
  status,
  size = "md",
  className,
}: VerificationBadgeProps) {
  const map: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    VERIFIED: {
      label: "VERIFIED",
      bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      text: "text-emerald-700 dark:text-emerald-400 font-semibold",
      border: "border-emerald-300 dark:border-emerald-500/30",
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
    },
    PARTIALLY_VERIFIED: {
      label: "PARTIALLY VERIFIED",
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
      text: "text-amber-700 dark:text-amber-400 font-semibold",
      border: "border-amber-300 dark:border-amber-500/30",
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
    },
    NEEDS_REVIEW: {
      label: "NEEDS REVIEW",
      bg: "bg-teal-500/10 dark:bg-teal-500/15",
      text: "text-teal-700 dark:text-teal-400 font-semibold",
      border: "border-teal-300 dark:border-teal-500/30",
      icon: <HelpCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />,
    },
    REJECTED: {
      label: "REJECTED (CRITIC)",
      bg: "bg-rose-500/10 dark:bg-rose-500/15",
      text: "text-rose-700 dark:text-rose-400 font-semibold",
      border: "border-rose-300 dark:border-rose-500/30",
      icon: <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
    },
  };

  const current = map[status] || map.NEEDS_REVIEW;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded border tracking-wider select-none transition-colors",
        current.bg,
        current.text,
        current.border,
        sizeClasses[size],
        className
      )}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
}
