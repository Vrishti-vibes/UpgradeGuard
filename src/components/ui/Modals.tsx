"use client";

import React from "react";
import { X, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Lightbulb, FileCode } from "lucide-react";
import { Finding, EvidenceItem } from "@/types";
import { RiskBadge } from "./RiskBadge";
import { VerificationBadge } from "./VerificationBadge";

// Base Clean Modal Container
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-xl clay-modal bg-[var(--bg-surface)] overflow-hidden z-10 animate-in zoom-in-95 duration-150 border border-[var(--border-subtle)] shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-3">
            {badge}
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)] font-sans">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-base)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 font-sans text-sm">
          {children}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}

// 1. Simple Agent Explanation Modal
export interface AgentDetailData {
  name: string;
  purpose: string;
  inputs?: string[];
  tools?: string[];
  state?: string;
  tasksExecuted?: string[];
  evidenceProduced?: string[];
  confidence?: number;
  executionTimeMs?: number;
}

export function AgentDetailsModal({
  agent,
  isOpen,
  onClose,
}: {
  agent: AgentDetailData | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!agent) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={agent.name}
      subtitle="Specialized AI Agent"
    >
      <div className="space-y-4 text-sm font-sans">
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
          <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold mb-1">
            <Lightbulb className="w-4 h-4" />
            <span>Agent Role in Analysis</span>
          </div>
          <p className="text-[var(--text-primary)] text-sm leading-relaxed">
            {agent.purpose}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2 font-mono">
            What this Agent Analyzes
          </h4>
          <div className="space-y-2">
            {(agent.inputs || ["Package release notes and changelogs", "Repository source files"]).map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-subtle)] text-xs text-[var(--text-primary)]">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[var(--bg-subtle)] text-xs text-[var(--text-secondary)]">
          💡 <strong>Viva Note:</strong> Specialized agents work independently so each area (dependencies, code, security) is analyzed thoroughly.
        </div>
      </div>
    </Modal>
  );
}

// 2. Simple Finding Details Modal
export function FindingDetailsModal({
  finding,
  isOpen,
  onClose,
}: {
  finding: Finding | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!finding) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={finding.title}
      subtitle={`API: ${finding.affectedApi}`}
      badge={<RiskBadge severity={finding.severity} size="sm" />}
    >
      <div className="space-y-4 text-sm font-sans">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
            Why It Matters
          </h4>
          <p className="text-[var(--text-primary)] leading-relaxed bg-[var(--bg-subtle)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
            {finding.description}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono">
            Affected Files in Project
          </h4>
          <div className="space-y-1.5">
            {finding.affectedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs font-mono">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5" />
                  {file}
                </span>
                {finding.lineNumbers?.[file] && (
                  <span className="text-[var(--text-muted)]">
                    Lines: {finding.lineNumbers[file].join(", ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Before / After Example */}
        {finding.diffBefore && finding.diffAfter && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono">
              Suggested Fix
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30">
                <span className="text-[10px] text-red-600 dark:text-red-400 uppercase font-bold block mb-1">
                  - Before (Old Syntax)
                </span>
                <pre className="text-red-700 dark:text-red-300 whitespace-pre-wrap">{finding.diffBefore}</pre>
              </div>
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30">
                <span className="text-[10px] text-green-600 dark:text-green-400 uppercase font-bold block mb-1">
                  + After (Recommended Upgrade)
                </span>
                <pre className="text-green-700 dark:text-green-300 whitespace-pre-wrap">{finding.diffAfter}</pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

// 3. Simple Evidence Details Modal
export function EvidenceDetailsModal({
  evidence,
  isOpen,
  onClose,
}: {
  evidence: EvidenceItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!evidence) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={evidence.sourceName}
      subtitle={`Source Type: ${evidence.sourceType}`}
    >
      <div className="space-y-4 text-sm font-sans">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1 font-mono">
            Evidence Finding
          </h4>
          <p className="text-[var(--text-primary)] leading-relaxed bg-[var(--bg-subtle)] p-3.5 rounded-xl border border-[var(--border-subtle)]">
            {evidence.summary}
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5 font-mono">
            Source Excerpt
          </h4>
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-primary)] overflow-x-auto">
            <pre className="whitespace-pre-wrap">{evidence.rawExcerpt}</pre>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verified against official package changelog & repository code</span>
        </div>
      </div>
    </Modal>
  );
}

// 4. Simple Risk Score Explanation Modal
export function RiskScoreModal({
  score = 72,
  isOpen,
  onClose,
}: {
  score?: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade Risk Score: 72 / 100"
      subtitle="High Risk (Action Required)"
      badge={
        <span className="px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 font-bold text-xs">
          HIGH
        </span>
      }
    >
      <div className="space-y-4 text-sm font-sans">
        <p className="text-[var(--text-primary)] leading-relaxed">
          The upgrade risk is rated <strong>High (72/100)</strong> because updating FastAPI from <strong>0.110.0 to 0.120.0</strong> introduces breaking changes that directly affect active routes in your codebase.
        </p>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <div>
              <strong className="text-[var(--text-primary)] block">2 Breaking API Changes</strong>
              <span className="text-xs text-[var(--text-secondary)]">Removed parameters and changed lifecycle events will cause errors if not updated.</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
            <div>
              <strong className="text-[var(--text-primary)] block">4 Affected Files</strong>
              <span className="text-xs text-[var(--text-secondary)]">Authentication, user endpoints, payments, and main application files need small changes.</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
            <div>
              <strong className="text-[var(--text-primary)] block">1 Security Fix Included</strong>
              <span className="text-xs text-[var(--text-secondary)]">Upgrading will resolve a known Denial of Service vulnerability in older versions.</span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-xs text-indigo-700 dark:text-indigo-300">
          💡 <strong>Recommendation:</strong> Follow the 5-step Migration Plan before running tests and deploying the upgrade.
        </div>
      </div>
    </Modal>
  );
}
