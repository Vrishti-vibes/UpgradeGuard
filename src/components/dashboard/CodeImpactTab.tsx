"use client";

import React, { useState } from "react";
import { CodeImpactFile, Finding } from "@/types";
import { CodeViewer } from "@/components/ui/CodeViewer";
import {
  Folder,
  FolderOpen,
  FileCode,
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
} from "lucide-react";

interface CodeImpactTabProps {
  files: CodeImpactFile[];
  findings: Finding[];
  initialSelectedPath?: string;
}

export function CodeImpactTab({
  files,
  findings,
  initialSelectedPath = "src/auth.py",
}: CodeImpactTabProps) {
  const [selectedFilePath, setSelectedFilePath] = useState<string>(
    initialSelectedPath
  );
  const [isApiFolderOpen, setIsApiFolderOpen] = useState<boolean>(true);

  const selectedFile =
    files.find((f) => f.path === selectedFilePath) || files[1];

  const associatedFindings = findings.filter((f) =>
    selectedFile.findingIds.includes(f.id)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* File Tree Explorer (4 cols) */}
      <div className="lg:col-span-4 surface-card rounded-xl p-4 text-xs font-mono shadow-glass-sm">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200/80 dark:border-white/[0.06]">
          <span className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[11px] font-sans">
            Repository Tree
          </span>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-500/20 font-bold">
            4 / 6 Impacted
          </span>
        </div>

        {/* Tree Root */}
        <div className="space-y-1">
          {/* src folder */}
          <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200 py-1 font-semibold">
            <FolderOpen className="w-4 h-4 text-indigo-500" />
            <span>src/</span>
          </div>

          <div className="pl-3.5 space-y-0.5 border-l border-zinc-200 dark:border-white/[0.08] ml-2">
            {/* main.py */}
            <button
              onClick={() => setSelectedFilePath("src/main.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                selectedFilePath === "src/main.py"
                  ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                <span>main.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500" title="1 warning" />
            </button>

            {/* auth.py */}
            <button
              onClick={() => setSelectedFilePath("src/auth.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                selectedFilePath === "src/auth.py"
                  ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                <span>auth.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-rose-500" title="F-04 High Impact" />
            </button>

            {/* database.py */}
            <button
              onClick={() => setSelectedFilePath("src/database.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                selectedFilePath === "src/database.py"
                  ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                <span>database.py</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-sans">Clean</span>
            </button>

            {/* api folder */}
            <div className="pt-1">
              <button
                onClick={() => setIsApiFolderOpen(!isApiFolderOpen)}
                className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 py-1 hover:text-zinc-950 dark:hover:text-white cursor-pointer w-full text-left"
              >
                {isApiFolderOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                )}
                <Folder className="w-3.5 h-3.5 text-indigo-500" />
                <span>api/</span>
              </button>

              {isApiFolderOpen && (
                <div className="pl-3.5 space-y-0.5 border-l border-zinc-200 dark:border-white/[0.08] ml-2 mt-0.5">
                  {/* users.py */}
                  <button
                    onClick={() => setSelectedFilePath("src/api/users.py")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                      selectedFilePath === "src/api/users.py"
                        ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                      <span>users.py</span>
                    </div>
                    <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold bg-rose-500/10 px-1 rounded">
                      2 diffs
                    </span>
                  </button>

                  {/* payments.py */}
                  <button
                    onClick={() => setSelectedFilePath("src/api/payments.py")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                      selectedFilePath === "src/api/payments.py"
                        ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                      <span>payments.py</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </button>
                </div>
              )}
            </div>

            {/* utils.py */}
            <button
              onClick={() => setSelectedFilePath("src/utils.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md transition-all text-left cursor-pointer ${
                selectedFilePath === "src/utils.py"
                  ? "bg-zinc-200 dark:bg-white/[0.1] text-zinc-950 dark:text-white font-semibold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-zinc-400" />
                <span>utils.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 pt-3 border-t border-zinc-200/80 dark:border-white/[0.06] text-[11px] text-zinc-500 space-y-1 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>High Severity Breaking Change</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Moderate / Behavioral Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            <span>Zero Impact Detected</span>
          </div>
        </div>
      </div>

      {/* Code Viewer Panel (8 cols) */}
      <div className="lg:col-span-8 space-y-4">
        {/* Active File Banner */}
        <div className="flex items-center justify-between p-3 rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#0A0C11]/90 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200">
              {selectedFile.path}
            </span>
            {selectedFile.isAffected ? (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 font-semibold">
                {selectedFile.changesCount} Line-level Conflict{selectedFile.changesCount > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                No Impact
              </span>
            )}
          </div>

          <span className="text-xs font-mono text-zinc-500">
            Highlighted lines: {selectedFile.highlightedLines.join(", ") || "None"}
          </span>
        </div>

        {/* Syntax Highlighted Code Viewer */}
        <CodeViewer
          filename={selectedFile.path}
          code={selectedFile.content}
          highlightedLines={selectedFile.highlightedLines}
          annotation={selectedFile.annotation}
        />

        {/* Associated Findings on this File */}
        {associatedFindings.length > 0 && (
          <div className="surface-card rounded-xl p-4 shadow-glass-sm space-y-2.5">
            <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider block">
              Associated Findings in this File
            </span>
            <div className="space-y-2">
              {associatedFindings.map((finding) => (
                <div
                  key={finding.id}
                  className="p-3 rounded-lg border border-zinc-200/80 dark:border-white/[0.06] bg-zinc-50 dark:bg-[#0E1118] flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 font-mono mb-0.5">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{finding.id}</span>
                      <span className="text-zinc-900 dark:text-zinc-200 font-semibold font-sans">{finding.title}</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs font-sans">{finding.description}</p>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 whitespace-nowrap">
                    {finding.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
