"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  PlusCircle,
  GitBranch,
  ShieldCheck,
  FileCode2,
  FileCheck2,
  Network,
  Settings,
  History,
  ArrowRight,
  Command,
  CornerDownLeft,
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Actions" | "Investigations" | "Navigation" | "Views";
  shortcut?: string;
  icon: React.ReactNode;
  url: string;
}

const COMMANDS: CommandItem[] = [
  {
    id: "new-analysis",
    title: "New Investigation",
    subtitle: "Launch multi-agent analysis for package bump",
    category: "Actions",
    shortcut: "N",
    icon: <PlusCircle className="w-4 h-4 text-blue-500" />,
    url: "/new",
  },
  {
    id: "fastapi-demo",
    title: "FastAPI 0.110.0 → 0.120.0 Analysis",
    subtitle: "fastapi-commerce-api : main • Complete impact dashboard",
    category: "Investigations",
    shortcut: "D",
    icon: <FileCode2 className="w-4 h-4 text-cyan-500" />,
    url: "/analysis/fastapi-demo",
  },
  {
    id: "architecture-dag",
    title: "Multi-Agent Systems DAG",
    subtitle: "Interactive agent pipeline & Verifier critique loop",
    category: "Views",
    shortcut: "A",
    icon: <Network className="w-4 h-4 text-blue-400" />,
    url: "/architecture",
  },
  {
    id: "findings-register",
    title: "Verified Findings Register",
    subtitle: "Review breaking changes, deprecations & CVEs",
    category: "Views",
    shortcut: "F",
    icon: <ShieldCheck className="w-4 h-4 text-green-500" />,
    url: "/findings",
  },
  {
    id: "evidence-ledger",
    title: "Evidence Audit Ledger",
    subtitle: "Inspect grounded AST, PyPI, Git & OSV sources",
    category: "Views",
    shortcut: "E",
    icon: <FileCheck2 className="w-4 h-4 text-cyan-500" />,
    url: "/evidence",
  },
  {
    id: "analyses-history",
    title: "Investigation History",
    subtitle: "All completed repository upgrade reports",
    category: "Navigation",
    shortcut: "H",
    icon: <History className="w-4 h-4 text-[var(--text-secondary)]" />,
    url: "/analyses",
  },
  {
    id: "repositories",
    title: "Repositories",
    subtitle: "Connected repositories & lockfiles",
    category: "Navigation",
    shortcut: "R",
    icon: <GitBranch className="w-4 h-4 text-[var(--text-secondary)]" />,
    url: "/repositories",
  },
  {
    id: "settings",
    title: "System Settings",
    subtitle: "Agent thresholds, critic intensity & API keys",
    category: "Navigation",
    shortcut: "S",
    icon: <Settings className="w-4 h-4 text-[var(--text-secondary)]" />,
    url: "/settings",
  },
];

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCommands = COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected) {
          router.push(selected.url);
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 animate-in fade-in duration-100">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl clay-modal rounded-lg overflow-hidden border border-[var(--border-strong)] z-10 shadow-2xl animate-in zoom-in-95 duration-100">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
          <Search className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search investigations..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-sans"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--text-muted)] font-mono">
              No commands matching &quot;{query}&quot;
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => {
                    router.push(cmd.url);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-600/15 border border-blue-500/30 text-[var(--text-primary)]"
                      : "hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0 p-1 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold font-sans truncate text-[var(--text-primary)]">
                          {cmd.title}
                        </span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)] px-1.5 py-0.2 rounded bg-[var(--bg-subtle)]">
                          {cmd.category}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <p className="text-[11px] text-[var(--text-secondary)] truncate font-sans mt-0.5">
                          {cmd.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    {cmd.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-blue-500 animate-in fade-in duration-75" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>UpgradeGuard Intelligence Console</span>
        </div>
      </div>
    </div>
  );
}
