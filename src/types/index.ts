export type SeverityLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
export type VerificationStatus = "VERIFIED" | "PARTIALLY_VERIFIED" | "NEEDS_REVIEW" | "REJECTED";
export type AgentName = 
  | "Supervisor"
  | "Dependency Agent"
  | "Change Analysis Agent"
  | "Code Impact Agent"
  | "Security Agent"
  | "Verifier"
  | "Risk Engine"
  | "Test Planner"
  | "Report Agent";

export interface Finding {
  id: string;
  severity: SeverityLevel;
  title: string;
  description: string;
  affectedApi: string;
  affectedFiles: string[];
  lineNumbers?: { [filePath: string]: number[] };
  confidence: "High" | "Medium" | "Low";
  status: VerificationStatus;
  category: "API Deprecation" | "Signature Change" | "Behavioral Change" | "Dependency Conflict" | "Security Advisory";
  diffBefore?: string;
  diffAfter?: string;
  verifierNote?: string;
}

export interface CodeImpactFile {
  path: string;
  name: string;
  isAffected: boolean;
  findingIds: string[];
  changesCount: number;
  content: string;
  highlightedLines: number[];
  annotation?: string;
}

export interface DependencyNode {
  name: string;
  currentVersion: string;
  targetVersion: string;
  isDirect: boolean;
  status: "OK" | "CONFLICT" | "UPGRADED" | "UNCHANGED";
  conflictReason?: string;
  children?: DependencyNode[];
}

export interface SecurityAdvisory {
  id: string;
  cve?: string;
  severity: SeverityLevel;
  affectedPackage: string;
  affectedVersions: string;
  fixedIn: string;
  summary: string;
  recommendation: string;
  source: string;
  isDemo: boolean;
}

export interface MigrationStep {
  stepNumber: string;
  title: string;
  findingRef?: string;
  description: string;
  estimatedMinutes: number;
  risk: SeverityLevel;
  snippetBefore?: string;
  snippetAfter?: string;
  filePath?: string;
}

export interface TestCase {
  id: string;
  name: string;
  area: "Authentication flow" | "Token validation" | "API response validation" | "Middleware behavior" | "Error handling";
  command: string;
  targetFiles: string[];
  rationale: string;
  status: "PASSED" | "FAILED" | "PENDING" | "RECOMMENDED";
}

export interface EvidenceItem {
  id: string;
  findingId: string;
  sourceName: string;
  sourceType: "PyPI Changelog" | "AST Call Graph" | "GitHub Commit Diff" | "OSV Advisory DB" | "Runtime Test Trace";
  summary: string;
  rawExcerpt: string;
  confidence: number; // 0 - 100
  verificationStatus: VerificationStatus;
  verifierCritique: string;
  timestamp: string;
}

export interface AgentActivityEvent {
  id: string;
  timestamp: string;
  agent: AgentName;
  message: string;
  type: "info" | "success" | "warning" | "critique" | "action";
  metadata?: {
    findingId?: string;
    fileCount?: number;
    durationMs?: number;
  };
}

export interface AnalysisSummary {
  dependency: string;
  currentVersion: string;
  targetVersion: string;
  ecosystem: string;
  repository: string;
  branch: string;
  commitHash: string;
  analyzedAt: string;
  riskScore: number; // 0 - 100
  riskLevel: SeverityLevel;
  summaryReasons: string[];
  executiveRecommendation: string;
  stats: {
    breakingChangesCount: number;
    affectedFilesCount: number;
    dependencyConflictsCount: number;
    securityAdvisoriesCount: number;
    testsPlannedCount: number;
    evidenceVerifiedCount: number;
    filesScanned: number;
    durationSeconds: number;
  };
}

export interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  category: "controller" | "worker" | "critic" | "evaluator" | "output";
  purpose: string;
  inputs: string[];
  outputs: string[];
  modelContext: string;
  tools: string[];
}
