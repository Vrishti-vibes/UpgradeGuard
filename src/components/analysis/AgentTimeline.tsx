"use client";

import React from "react";
import { AgentActivityEvent } from "@/types";
import { cn } from "@/lib/utils";
import {
  Cpu,
  ShieldCheck,
  Code2,
  FileDiff,
  AlertTriangle,
  GitFork,
  CheckCircle2,
  Terminal,
  FileCheck,
  RotateCcw,
} from "lucide-react";

interface AgentTimelineProps {
  events: AgentActivityEvent[];
  className?: string;
  maxEvents?: number;
}

export function AgentTimeline({
  events,
  className,
  maxEvents,
}: AgentTimelineProps) {
  const displayEvents = maxEvents ? events.slice(0, maxEvents) : events;

  // Semantic agent styling
  const getAgentConfig = (agent: string) => {
    switch (agent) {
      case "Supervisor":
        return {
          icon: <Cpu className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />,
          badge: "text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10",
        };
      case "Dependency Agent":
        return {
          icon: <GitFork className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />,
          badge: "text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10",
        };
      case "Change Analysis Agent":
        return {
          icon: <FileDiff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />,
          badge: "text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10",
        };
      case "Code Impact Agent":
        return {
          icon: <Code2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />,
          badge: "text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-500/30 bg-teal-50 dark:bg-teal-500/10",
        };
      case "Security Agent":
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />,
          badge: "text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10",
        };
      case "Verifier":
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
          badge: "text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10",
        };
      case "Risk Engine":
        return {
          icon: <Terminal className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />,
          badge: "text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10",
        };
      case "Report Agent":
      default:
        return {
          icon: <FileCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />,
          badge: "text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10",
        };
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 backdrop-blur-md p-4 text-xs font-mono shadow-sm",
        className
      )}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[11px] font-sans">
            Multi-Agent Activity Log
          </span>
        </div>
        <span className="text-[10px] text-zinc-400 font-mono">Live Telemetry Stream</span>
      </div>

      <div className="space-y-3">
        {displayEvents.map((event) => {
          const config = getAgentConfig(event.agent);
          const isCritique = event.type === "critique";

          return (
            <div
              key={event.id}
              className={cn(
                "flex items-start gap-2.5 p-2 rounded transition-colors",
                isCritique
                  ? "bg-amber-500/[0.06] border border-amber-500/20"
                  : "hover:bg-zinc-50 dark:hover:bg-white/[0.02]"
              )}
            >
              {/* Timestamp */}
              <span className="text-zinc-400 dark:text-zinc-500 select-none text-[10px] pt-0.5 whitespace-nowrap font-mono">
                {event.timestamp}
              </span>

              {/* Agent & Message */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={cn(
                      "flex items-center gap-1 px-1.5 py-0.5 rounded border text-[10px] font-medium font-mono",
                      config.badge
                    )}
                  >
                    {config.icon}
                    <span>{event.agent}</span>
                  </span>

                  {isCritique && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded border bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold font-mono flex items-center gap-1">
                      <RotateCcw className="w-2.5 h-2.5" />
                      CRITIC LOOPBACK
                    </span>
                  )}
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 text-xs font-sans leading-relaxed">
                  {event.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
