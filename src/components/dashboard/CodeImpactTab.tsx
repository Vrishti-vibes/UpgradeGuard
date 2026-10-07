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
  ShieldCheck,
  Code2,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)] text-xs overflow-hidden shadow-sm">
      {/* Pane 1 (Left): Repository Tree (3 cols) */}
      <div className="lg:col-span-3 hairline-r p-4 space-y-3 bg-[var(--bg-base)]">
        <div className="flex items-center justify-between pb-2 hairline-b">
          <span className="font-semibold text-zinc-900 dark:text-zinc-200 uppercase tracking-wider text-[10px] font-sans">
            Project Files
          </span>
          <span className="text-[10px] font-sans text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
            4 / 6 Impacted
          </span>
        </div>

        {/* Tree Root */}
        <div className="space-y-1 font-mono">
          <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-200 py-1 font-semibold">
            <FolderOpen className="w-4 h-4 text-indigo-500" />
            <span>src/</span>
          </div>

          <div className="pl-3 space-y-0.5 border-l-2 border-[var(--border-subtle)] ml-2">
            {/* main.py */}
            <button
              onClick={() => setSelectedFilePath("src/main.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                selectedFilePath === "src/main.py"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-[var(--bg-subtle)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">main.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" title="1 finding" />
            </button>

            {/* auth.py */}
            <button
              onClick={() => setSelectedFilePath("src/auth.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                selectedFilePath === "src/auth.py"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-[var(--bg-subtle)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">auth.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" title="F-04 High Impact" />
            </button>

            {/* database.py */}
            <button
              onClick={() => setSelectedFilePath("src/database.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                selectedFilePath === "src/database.py"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                  : "text-zinc-400 dark:text-zinc-500 hover:bg-[var(--bg-subtle)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">database.py</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-sans">Clean</span>
            </button>

            {/* api folder */}
            <div className="pt-1">
              <button
                onClick={() => setIsApiFolderOpen(!isApiFolderOpen)}
                className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 py-1 hover:text-zinc-950 dark:hover:text-white cursor-pointer w-full text-left font-mono"
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
                <div className="pl-3 space-y-0.5 border-l-2 border-[var(--border-subtle)] ml-2 mt-1">
                  <button
                    onClick={() => setSelectedFilePath("src/api/users.py")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedFilePath === "src/api/users.py"
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-[var(--bg-subtle)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span className="truncate">users.py</span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold px-1.5 py-0.2 rounded bg-rose-50 dark:bg-rose-500/10">2</span>
                  </button>

                  <button
                    onClick={() => setSelectedFilePath("src/api/payments.py")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedFilePath === "src/api/payments.py"
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-[var(--bg-subtle)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span className="truncate">payments.py</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </button>
                </div>
              )}
            </div>

            {/* utils.py */}
            <button
              onClick={() => setSelectedFilePath("src/utils.py")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                selectedFilePath === "src/utils.py"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-[var(--bg-subtle)]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FileCode className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                <span className="truncate">utils.py</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Pane 2 (Center): Code Viewer (6 cols) */}
      <div className="lg:col-span-6 hairline-r flex flex-col bg-[var(--bg-base)]">
        <div className="p-3 hairline-b flex items-center justify-between bg-[var(--bg-surface)]">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{selectedFile.path}</span>
            {selectedFile.isAffected ? (
              <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 font-bold border border-rose-200 dark:border-rose-500/20">
                {selectedFile.changesCount} Breaking Call{selectedFile.changesCount > 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-[10px] text-zinc-500 font-sans">No conflicts</span>
            )}
          </div>

          <span className="text-[11px] text-zinc-500 font-sans">
            Affected lines: <span className="font-mono text-zinc-700 dark:text-zinc-300 font-semibold">{selectedFile.highlightedLines.join(", ") || "None"}</span>
          </span>
        </div>

        <CodeViewer
          filename={selectedFile.path}
          code={selectedFile.content}
          highlightedLines={selectedFile.highlightedLines}
          annotation={selectedFile.annotation}
        />
      </div>

      {/* Pane 3 (Right): Impact Inspector (3 cols) */}
      <div className="lg:col-span-3 p-4 space-y-4 bg-[var(--bg-surface)]">
        <div className="pb-2 hairline-b">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-[10px] font-sans block">
            Impact Analysis
          </span>
          <span className="text-[11px] text-zinc-500 font-sans">Detected code conflicts in this file</span>
        </div>

        {associatedFindings.length > 0 ? (
          <div className="space-y-3">
            {associatedFindings.map((finding) => (
              <div key={finding.id} className="space-y-2.5 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)] shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{finding.id}</span>
                  <span className="text-[10px] font-sans font-bold text-rose-600 dark:text-rose-400 uppercase px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                    {finding.severity}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-400 uppercase block font-sans font-semibold">Target API Call</span>
                  <code className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-bold block break-all bg-indigo-50/50 dark:bg-indigo-950/30 p-1.5 rounded-md border border-indigo-100 dark:border-indigo-900/30">
                    {finding.affectedApi}
                  </code>
                </div>

                <div className="space-y-1 font-sans">
                  <span className="text-[10px] text-zinc-400 uppercase block font-semibold">Reason</span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {finding.description}
                  </p>
                </div>

                <div className="pt-2 hairline-t text-xs font-sans text-emerald-600 dark:text-emerald-400 flex items-start gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>Verified by Code Impact Agent</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-zinc-500 text-xs font-sans text-center rounded-xl bg-[var(--bg-base)] border border-[var(--border-subtle)]">
            No breaking symbols detected in this file.
          </div>
        )}
      </div>
    </div>
  );
}
