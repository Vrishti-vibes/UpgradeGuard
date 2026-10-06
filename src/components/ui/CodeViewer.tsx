"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, FileCode, AlertTriangle } from "lucide-react";

interface CodeViewerProps {
  filename?: string;
  code: string;
  highlightedLines?: number[];
  language?: string;
  annotation?: string;
  className?: string;
}

export function CodeViewer({
  filename,
  code,
  highlightedLines = [],
  annotation,
  className,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (line: string) => {
    if (line.trim().startsWith("#") || line.trim().startsWith("//")) {
      return <span className="text-zinc-500 dark:text-zinc-500 italic">{line}</span>;
    }

    const parts = line.split(
      /(\b(?:import|from|def|async|await|return|class|yield|if|elif|else|for|in|as|while|try|except|None|True|False)\b|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|@[a-zA-Z0-9_.]+|\bQuery\b|\bPath\b|\bHeader\b|\bAPIRouter\b|\bFastAPI\b|\bBaseModel\b|\bDepends\b|\bHTTPException\b)/g
    );

    return parts.map((part, i) => {
      if (!part) return null;
      if (
        [
          "import",
          "from",
          "def",
          "async",
          "await",
          "return",
          "class",
          "yield",
          "if",
          "elif",
          "else",
          "for",
          "in",
          "as",
          "while",
          "try",
          "except",
          "None",
          "True",
          "False",
        ].includes(part)
      ) {
        return (
          <span key={i} className="text-indigo-600 dark:text-indigo-400 font-medium">
            {part}
          </span>
        );
      }
      if (part.startsWith("@")) {
        return (
          <span key={i} className="text-violet-600 dark:text-violet-400">
            {part}
          </span>
        );
      }
      if (
        (part.startsWith('"') && part.endsWith('"')) ||
        (part.startsWith("'") && part.endsWith("'"))
      ) {
        return (
          <span key={i} className="text-emerald-600 dark:text-emerald-300">
            {part}
          </span>
        );
      }
      if (
        [
          "Query",
          "Path",
          "Header",
          "APIRouter",
          "FastAPI",
          "BaseModel",
          "Depends",
          "HTTPException",
        ].includes(part)
      ) {
        return (
          <span key={i} className="text-teal-600 dark:text-teal-400 font-medium">
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-[#07090D] overflow-hidden font-mono text-xs shadow-sm",
        className
      )}
    >
      {/* IDE Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-white dark:bg-[#0E1118] border-b border-zinc-200 dark:border-white/[0.06]">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <FileCode className="w-3.5 h-3.5 text-indigo-500" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-200 text-xs">
            {filename || "source.py"}
          </span>
          {annotation && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-sans ml-1">
              <AlertTriangle className="w-3 h-3" />
              {annotation}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors text-[11px]"
          title="Copy file code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400 font-sans">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-sans">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="overflow-x-auto py-2.5 leading-relaxed text-zinc-800 dark:text-zinc-300">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNumber = idx + 1;
              const isHighlighted = highlightedLines.includes(lineNumber);

              return (
                <tr
                  key={lineNumber}
                  className={cn(
                    "transition-colors",
                    isHighlighted
                      ? "bg-amber-500/15 dark:bg-amber-500/10 border-l-2 border-amber-500"
                      : "hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                  )}
                >
                  <td className="w-12 select-none text-right pr-4 text-zinc-400 dark:text-zinc-600 text-[11px]">
                    {lineNumber}
                  </td>
                  <td className="pl-2 pr-4 whitespace-pre">
                    {highlightSyntax(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
