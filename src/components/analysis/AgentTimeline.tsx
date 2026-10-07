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
          icon: <Cpu className="w-3.5 h-3.5 text-blue-500" />,
          badge: "text-blue-500 border-blue-500/30 bg-blue-500/10",
        };
      case "Dependency Agent":
        return {
          icon: <GitFork className="w-3.5 h-3.5 text-blue-400" />,
          badge: "text-blue-400 border-blue-400/30 bg-blue-400/10",
        };
      case "Change Analysis Agent":
        return {
          icon: <FileDiff className="w-3.5 h-3.5 text-amber-500" />,
          badge: "text-amber-500 border-amber-500/30 bg-amber-500/10",
        };
      case "Code Impact Agent":
        return {
          icon: <Code2 className="w-3.5 h-3.5 text-cyan-500" />,
          badge: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10",
        };
      case "Security Agent":
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />,
          badge: "text-red-500 border-red-500/30 bg-red-500/10",
        };
      case "Verifier":
        return {
          icon: <ShieldCheck className="w-3.5 h-3.5 text-green-500" />,
          badge: "text-green-500 border-green-500/30 bg-green-500/10",
        };
      case "Risk Engine":
        return {
          icon: <Terminal className="w-3.5 h-3.5 text-amber-500" />,
          badge: "text-amber-500 border-amber-500/30 bg-amber-500/10",
        };
      case "Report Agent":
      default:
        return {
          icon: <FileCheck className="w-3.5 h-3.5 text-cyan-500" />,
          badge: "text-cyan-500 border-cyan-500/30 bg-cyan-500/10",
        };
    }
  };

  return (
    <div
      className={cn(
        "rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 text-xs font-mono shadow-xs",
        className
      )}
    >
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[11px] font-sans">
            Multi-Agent Activity Log
          </span>
        </div>
        <span className="text-[10px] text-[var(--text-muted)] font-mono">Live Telemetry Stream</span>
      </div>

      <div className="space-y-2">
        {displayEvents.map((event) => {
          const config = getAgentConfig(event.agent);
          const isCritique = event.type === "critique";

          return (
            <div
              key={event.id}
              className={cn(
                "flex items-start gap-2.5 p-2 rounded-md transition-colors",
                isCritique
                  ? "bg-amber-500/10 border border-amber-500/20"
                  : "hover:bg-[var(--bg-subtle)]"
              )}
            >
              {/* Timestamp */}
              <span className="text-[var(--text-muted)] select-none text-[10px] pt-0.5 whitespace-nowrap font-mono">
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
                    <span className="text-[9px] px-1.5 py-0.2 rounded border bg-amber-500/15 border-amber-500/30 text-amber-500 font-bold font-mono flex items-center gap-1">
                      <RotateCcw className="w-2.5 h-2.5" />
                      CRITIC LOOPBACK
                    </span>
                  )}
                </div>

                <p className="text-[var(--text-secondary)] text-xs font-sans leading-relaxed">
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
