"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info } from "lucide-react";

interface RiskScoreRingProps {
  score: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  onClick?: () => void;
  className?: string;
}

export function RiskScoreRing({
  score,
  size = 72,
  strokeWidth = 6,
  label,
  onClick,
  className,
}: RiskScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 600;
    const startTime = performance.now();

    const updateScore = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (score - start) * easeProgress);
      setAnimatedScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateScore);
      }
    };

    requestAnimationFrame(updateScore);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 75) return { stroke: "#EF4444", text: "text-red-500", label: "HIGH RISK" };
    if (s >= 50) return { stroke: "#F59E0B", text: "text-amber-500", label: "MED-HIGH" };
    if (s >= 25) return { stroke: "#3B82F6", text: "text-blue-500", label: "MODERATE" };
    return { stroke: "#22C55E", text: "text-green-500", label: "LOW RISK" };
  };

  const colorConfig = getColor(score);

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cn(
        "inline-flex items-center gap-3 select-none",
        onClick && "cursor-pointer group hover:opacity-95 transition-opacity",
        className
      )}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          {/* Animated Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorConfig.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 400ms ease, stroke 300ms ease",
            }}
          />
        </svg>

        {/* Center Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={cn("text-lg font-bold font-mono leading-none", colorConfig.text)}>
            {animatedScore}
          </span>
          <span className="text-[9px] text-[var(--text-muted)] font-mono">/100</span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-xs font-bold font-mono tracking-wider", colorConfig.text)}>
            {label || colorConfig.label}
          </span>
          {onClick && (
            <Info className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors" />
          )}
        </div>
        <p className="text-[11px] text-[var(--text-secondary)] font-sans">
          Composite risk score
        </p>
      </div>
    </div>
  );
}
