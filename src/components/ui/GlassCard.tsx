"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "subtle" | "interactive";
  className?: string;
  glow?: boolean;
}

export function GlassCard({
  children,
  variant = "default",
  className,
  glow = false,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    default:
      "surface-card shadow-glass-sm rounded-lg",
    elevated:
      "surface-elevated shadow-glass-md rounded-xl",
    subtle:
      "surface-subtle rounded-md",
    interactive:
      "surface-card shadow-glass-sm hover:shadow-glass-md hover:border-black/20 dark:hover:border-white/20 transition-all duration-200 cursor-pointer rounded-lg",
  };

  return (
    <div
      className={cn(
        "p-5 relative overflow-hidden",
        variantStyles[variant],
        glow && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-indigo-500/5 before:to-transparent before:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
