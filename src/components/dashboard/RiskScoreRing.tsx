"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, ChevronRight, ShieldAlert } from "lucide-react";

interface RiskScoreRingProps {
  score?: number;
  maxScore?: number;
  level?: "HIGH" | "MEDIUM" | "LOW" | "CRITICAL";
  onClick?: () => void;
}

export function RiskScoreRing({
  score = 72,
  maxScore = 100,
  level = "HIGH",
  onClick,
}: RiskScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 30;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += score / steps;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // SVG ring calculations
  const size = 130;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / maxScore) * circumference;

  return (
    <div
      onClick={onClick}
      className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-red-300 dark:hover:border-red-800 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
    >
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] font-sans">
            Upgrade Risk
          </span>
        </div>
        <span className="text-[11px] font-sans font-semibold text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/40">
          HIGH RISK
        </span>
      </div>

      <div className="py-4 flex items-center justify-around gap-4">
        {/* Animated Circular Ring */}
        <div className="relative w-[130px] h-[130px] flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="currentColor"
              strokeWidth={strokeWidth}
              className="text-zinc-100 dark:text-zinc-800/80"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#EF4444"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
              fill="transparent"
            />
          </svg>

          {/* Centered Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold font-mono text-zinc-900 dark:text-white tracking-tight leading-none">
              {animatedScore}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
              / 100
            </span>
          </div>
        </div>

        {/* Breakdown summary */}
        <div className="space-y-1.5 text-xs text-[var(--text-secondary)] font-sans">
          <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span>2 Breaking Changes</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>4 Affected Files</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
            <span>1 Dependency Conflict</span>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium group-hover:underline">
        <span>Why this score? Click for breakdown</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
