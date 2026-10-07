"use client";

import React, { useState } from "react";
import { MigrationStep } from "@/types";
import { RiskBadge } from "@/components/ui/RiskBadge";
import {
  Copy,
  Check,
  FileCode,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface MigrationPlanTabProps {
  steps: MigrationStep[];
}

export function MigrationPlanTab({ steps }: MigrationPlanTabProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const simpleSteps = [
    {
      stepNumber: "01",
      title: "Replace deprecated parameter usage",
      desc: "In src/api/users.py & src/api/payments.py, replace obsolete regex validation parameters.",
      time: "5 mins",
      risk: "HIGH",
      code: "# Update Query parameter validation\n# Replace: Query(regex=r'^[a-z]+$')\n# With:    Query(pattern=r'^[a-z]+$')",
    },
    {
      stepNumber: "02",
      title: "Update startup lifecycle handling",
      desc: "In src/main.py, replace @app.on_event('startup') with FastAPI's newer asynccontextmanager lifespan handler.",
      time: "10 mins",
      risk: "MEDIUM",
      code: "@asynccontextmanager\nasync def lifespan(app: FastAPI):\n    # Startup logic here\n    yield\n    # Shutdown logic here\n\napp = FastAPI(lifespan=lifespan)",
    },
    {
      stepNumber: "03",
      title: "Check affected API response models",
      desc: "In src/auth.py, ensure response_model_include passes a set of field names instead of a list.",
      time: "5 mins",
      risk: "HIGH",
      code: "# Replace list with set\n# Before: response_model_include=['id', 'username']\n# After:  response_model_include={'id', 'username'}",
    },
    {
      stepNumber: "04",
      title: "Run targeted validation tests",
      desc: "Execute targeted pytest commands on the 4 affected files to verify that authentication and payments pass.",
      time: "5 mins",
      risk: "LOW",
      code: "pytest tests/test_auth.py tests/test_users.py tests/test_payments.py -v",
    },
    {
      stepNumber: "05",
      title: "Review the upgrade before applying to production",
      desc: "Run full test suite and update pyproject.toml / poetry.lock with fastapi = '^0.120.0'.",
      time: "5 mins",
      risk: "LOW",
      code: "poetry add fastapi@^0.120.0",
    },
  ];

  return (
    <div className="space-y-6 font-sans text-sm max-w-4xl mx-auto">
      {/* Migration Plan Header */}
      <div className="p-6 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs uppercase font-mono tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>AI-Generated Playbook</span>
          </div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            Step-by-Step Migration Plan
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Follow these 5 ordered steps to upgrade your project safely without runtime errors.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-700 dark:text-indigo-300 font-medium">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Estimated Total Time: ~30 mins</span>
        </div>
      </div>

      {/* Visual Timeline / Progress Steps */}
      <div className="space-y-4">
        {simpleSteps.map((step, idx) => (
          <div
            key={step.stepNumber}
            className="p-5 rounded-2xl clay-card bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3 transition-all hover:border-indigo-300"
          >
            {/* Step Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm shadow-indigo-600/30 shrink-0">
                  {step.stepNumber}
                </span>
                <div>
                  <h4 className="text-base font-bold text-[var(--text-primary)]">
                    {step.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs pl-11 sm:pl-0">
                <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700">
                  Est. {step.time}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  step.risk === "HIGH" ? "bg-red-100 text-red-700" : step.risk === "MEDIUM" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"
                }`}>
                  {step.risk} PRIORITY
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--text-secondary)] pl-11 leading-relaxed">
              {step.desc}
            </p>

            {/* Code Snippet Box */}
            <div className="ml-11 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] overflow-hidden text-xs font-mono">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-subtle)] text-[11px] text-[var(--text-muted)]">
                <span>Code Transformation / Command</span>
                <button
                  onClick={() => handleCopy(step.code, idx)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 text-[var(--text-primary)] whitespace-pre-wrap overflow-x-auto">
                {step.code}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 text-xs text-green-900 dark:text-green-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <span>After completing these 5 steps, your application is fully compatible with FastAPI 0.120.0.</span>
        </div>
      </div>
    </div>
  );
}
