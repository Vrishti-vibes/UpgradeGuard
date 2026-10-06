import {
  AnalysisSummary,
  Finding,
  CodeImpactFile,
  DependencyNode,
  SecurityAdvisory,
  MigrationStep,
  TestCase,
  EvidenceItem,
  AgentActivityEvent,
  ArchitectureNode,
} from "@/types";

export const DEMO_ANALYSIS_SUMMARY: AnalysisSummary = {
  dependency: "FastAPI",
  currentVersion: "0.110.0",
  targetVersion: "0.120.0",
  ecosystem: "Python / Poetry",
  repository: "FastAPI Commerce API",
  branch: "main",
  commitHash: "a48f91c9",
  analyzedAt: "2026-10-06T11:04:22Z",
  riskScore: 72,
  riskLevel: "HIGH",
  summaryReasons: [
    "2 breaking changes in core parameter routing APIs",
    "4 affected files across authentication and endpoints",
    "1 transitive dependency conflict with starlette-limiter",
    "1 migration requirement for ASGI lifespan handler",
  ],
  executiveRecommendation:
    "Review the authentication response-model filtering and regex query parameters before upgrading. Resolve the starlette pin conflict in pyproject.toml.",
  stats: {
    breakingChangesCount: 2,
    affectedFilesCount: 4,
    dependencyConflictsCount: 1,
    securityAdvisoriesCount: 1,
    testsPlannedCount: 5,
    evidenceVerifiedCount: 6,
    filesScanned: 48,
    durationSeconds: 3.8,
  },
};

export const DEMO_FINDINGS: Finding[] = [
  {
    id: "F-04",
    severity: "HIGH",
    title: "Deprecated response_model filtering signature",
    description:
      "In FastAPI 0.120.0, passing tuples or lists directly to 'response_model_include' or 'response_model_exclude' raises a PydanticUserError. Sets of strings or dict field mappings must be used explicitly.",
    affectedApi: "fastapi.routing.APIRoute(response_model_include=...)",
    affectedFiles: ["src/auth.py", "src/api/users.py"],
    lineNumbers: {
      "src/auth.py": [34, 35],
      "src/api/users.py": [42],
    },
    confidence: "High",
    status: "VERIFIED",
    category: "Signature Change",
    diffBefore: `- @router.post("/login", response_model_include=["id", "token", "roles"])`,
    diffAfter: `+ @router.post("/login", response_model_include={"id", "token", "roles"})`,
    verifierNote:
      "Confirmed via AST Call Graph. Repo passes Python tuple literals. Starlette/Pydantic serialization enforces set validation in v0.120.",
  },
  {
    id: "F-01",
    severity: "HIGH",
    title: "Removed 'regex' parameter in Query and Path validation",
    description:
      "The 'regex' parameter in Query, Path, and Header parameter definitions has been removed in favor of 'pattern' to match JSON Schema and Pydantic v2 specification.",
    affectedApi: "fastapi.params.Query(regex=...)",
    affectedFiles: ["src/api/users.py", "src/api/payments.py"],
    lineNumbers: {
      "src/api/users.py": [18],
      "src/api/payments.py": [27],
    },
    confidence: "High",
    status: "VERIFIED",
    category: "API Deprecation",
    diffBefore: `- user_id: str = Query(..., regex=r"^usr_[a-zA-Z0-9]{12}$")`,
    diffAfter: `+ user_id: str = Query(..., pattern=r"^usr_[a-zA-Z0-9]{12}$")`,
    verifierNote:
      "Verified against FastAPI release commit diff c8921f. Passing 'regex' raises TypeError at startup during route compilation.",
  },
  {
    id: "F-06",
    severity: "MEDIUM",
    title: "Deprecated on_event('startup') lifecycle handler",
    description:
      "FastAPI deprecates app.on_event('startup') and app.on_event('shutdown') in favor of standard ASGI lifespan context managers. Existing handlers generate RuntimeWarning and will be dropped in 1.0.",
    affectedApi: "fastapi.FastAPI.on_event",
    affectedFiles: ["src/main.py"],
    lineNumbers: {
      "src/main.py": [22, 23, 24, 25],
    },
    confidence: "High",
    status: "VERIFIED",
    category: "Behavioral Change",
    diffBefore: `- @app.on_event("startup")
- async def startup_event():
-     await database.connect()`,
    diffAfter: `+ @asynccontextmanager
+ async def lifespan(app: FastAPI):
+     await database.connect()
+     yield
+     await database.disconnect()`,
    verifierNote:
      "Verified against FastAPI documentation and Starlette lifespan protocol. Database pooling should cleanly migrate to asynccontextmanager.",
  },
  {
    id: "F-09",
    severity: "MEDIUM",
    title: "Strict boundary parsing in Starlette multipart form data",
    description:
      "Transitive Starlette upgrade (0.27.0 -> 0.37.2) applies strict RFC 7578 multipart boundary parsing. Any webhook clients submitting raw non-standard form data boundaries will trigger HTTP 422 Unprocessable Entity.",
    affectedApi: "starlette.formparsers.MultiPartParser",
    affectedFiles: ["src/utils.py"],
    lineNumbers: {
      "src/utils.py": [61, 62],
    },
    confidence: "Medium",
    status: "PARTIALLY_VERIFIED",
    category: "Behavioral Change",
    verifierNote:
      "Flagged from Starlette GHSA-74m5 security patch notes. Repository uses custom multipart payload normalization in utils.py. Tests needed.",
  },
];

export const DEMO_CODE_FILES: CodeImpactFile[] = [
  {
    path: "src/main.py",
    name: "main.py",
    isAffected: true,
    findingIds: ["F-06"],
    changesCount: 1,
    highlightedLines: [22, 23, 24, 25],
    annotation: "Legacy @app.on_event('startup') handler requires lifespan migration",
    content: `import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import users, payments
from src.auth import auth_router
from src.database import init_db, close_db

app = FastAPI(
    title="Commerce Core API",
    version="2.4.0",
    docs_url="/api/docs"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://admin.commerce.io"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# [AFFECTED BY F-06]: Deprecated in FastAPI 0.120.0
@app.on_event("startup")
async def startup_db_client():
    await init_db()
    print("[SYSTEM] Database connected and cache initialized")

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_db()

app.include_router(auth_router, prefix="/v1/auth", tags=["auth"])
app.include_router(users.router, prefix="/v1/users", tags=["users"])
app.include_router(payments.router, prefix="/v1/payments", tags=["payments"])`,
  },
  {
    path: "src/auth.py",
    name: "auth.py",
    isAffected: true,
    findingIds: ["F-04"],
    changesCount: 1,
    highlightedLines: [34, 35],
    annotation: "response_model_include requires Set[str], currently passes list",
    content: `from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import Optional, List

auth_router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v1/auth/token")

class TokenResponse(BaseModel):
    id: str
    token: str
    roles: List[str]
    refresh_token: Optional[str] = None
    created_at: datetime

@auth_router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Validation logic
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    return {"id": user.id, "token": "jwt_demo_token", "roles": ["admin"]}

# [AFFECTED BY F-04]: List format in response_model_include raises error in 0.120.0
@auth_router.post(
    "/login",
    response_model=TokenResponse,
    response_model_include=["id", "token", "roles"]  # <-- BREAKING: Must be set or dict
)
async def quick_login(payload: dict):
    return {
        "id": "usr_991823",
        "token": "tok_live_449281a",
        "roles": ["customer"],
        "refresh_token": "re_9921",
        "created_at": datetime.utcnow()
    }`,
  },
  {
    path: "src/api/users.py",
    name: "users.py",
    isAffected: true,
    findingIds: ["F-01", "F-04"],
    changesCount: 2,
    highlightedLines: [18, 42],
    annotation: "2 breaking changes: regex parameter removed and response_model_include format",
    content: `from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from src.auth import oauth2_scheme

router = APIRouter()

class UserProfile(BaseModel):
    id: str
    username: str
    email: str
    tier: str

@router.get("/lookup")
async def lookup_user(
    # [AFFECTED BY F-01]: 'regex' argument deprecated & removed in 0.120.0
    user_id: str = Query(..., regex=r"^usr_[a-zA-Z0-9]{12}$", description="Customer Public ID"),
    include_meta: bool = Query(False)
):
    """Fetches user account metadata by validated customer public ID."""
    return {"id": user_id, "username": "alex_developer", "email": "alex@dev.co"}

@router.get("/profile/{user_id}")
async def get_profile(
    user_id: str,
    token: str = Depends(oauth2_scheme)
):
    return {"id": user_id, "status": "active"}

# [AFFECTED BY F-04]: List formatting triggers schema validation error
@router.get(
    "/summary",
    response_model=UserProfile,
    response_model_include=["id", "username", "email"]
)
async def get_summary():
    return {"id": "usr_102", "username": "sarah", "email": "sarah@commerce.io", "tier": "gold"}`,
  },
  {
    path: "src/api/payments.py",
    name: "payments.py",
    isAffected: true,
    findingIds: ["F-01"],
    changesCount: 1,
    highlightedLines: [27],
    annotation: "regex parameter removed in Path/Query argument",
    content: `from fastapi import APIRouter, Query, Header, HTTPException
from pydantic import BaseModel
from decimal import Decimal

router = APIRouter()

class PaymentIntent(BaseModel):
    amount: Decimal
    currency: str
    idempotency_key: str

@router.post("/intents")
async def create_payment_intent(
    payload: PaymentIntent,
    stripe_account: str = Header(None)
):
    return {"status": "created", "intent_id": "pi_30018921a"}

@router.get("/transactions")
async def list_transactions(
    # [AFFECTED BY F-01]: 'regex' argument removed in FastAPI 0.120.0
    cursor: str = Query(None, regex=r"^txn_[0-9a-f]{24}$"),
    limit: int = Query(50, ge=1, le=100)
):
    """Paginated transaction query with strict transaction ID format."""
    return {"items": [], "next_cursor": None}`,
  },
  {
    path: "src/database.py",
    name: "database.py",
    isAffected: false,
    findingIds: [],
    changesCount: 0,
    highlightedLines: [],
    annotation: "No breaking FastAPI imports or deprecated interfaces detected",
    content: `import os
from typing import AsyncGenerator

# Clean file: Database connection layer does not directly interface with FastAPI routing
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:secret@localhost:5432/commerce")

async def init_db() -> None:
    # Initialize connection pooling and run pending migrations
    print(f"Connecting to database pool at {DATABASE_URL}...")

async def close_db() -> None:
    print("Closing active database pool connections...")

async def get_db_session() -> AsyncGenerator:
    yield {"session": "active"}`,
  },
  {
    path: "src/utils.py",
    name: "utils.py",
    isAffected: true,
    findingIds: ["F-09"],
    changesCount: 1,
    highlightedLines: [61, 62],
    annotation: "Multipart parsing utility affected by Starlette 0.37 strict boundary checks",
    content: `import hashlib
import hmac
import json
from typing import Dict, Any

def verify_webhook_signature(payload: bytes, signature: str, secret: str) -> bool:
    computed = hmac.new(secret.encode(), payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={computed}", signature)

# [AFFECTED BY F-09]: Multipart header parsing may reject malformed boundaries
def extract_boundary_metadata(content_type: str) -> Dict[str, str]:
    parts = content_type.split(";")
    res = {}
    for part in parts:
        if "=" in part:
            k, v = part.strip().split("=", 1)
            res[k.strip()] = v.strip('"')
    return res`,
  },
];

export const DEMO_DEPENDENCY_TREE: DependencyNode = {
  name: "FastAPI",
  currentVersion: "0.110.0",
  targetVersion: "0.120.0",
  isDirect: true,
  status: "UPGRADED",
  children: [
    {
      name: "Starlette",
      currentVersion: "0.27.0",
      targetVersion: "0.37.2",
      isDirect: false,
      status: "CONFLICT",
      conflictReason:
        "FastAPI 0.120 requires starlette>=0.37.0, but repo dependency 'fastapi-limiter' (v0.1.5) restricts starlette<0.36.0",
      children: [
        {
          name: "AnyIO",
          currentVersion: "3.7.1",
          targetVersion: "4.3.0",
          isDirect: false,
          status: "UPGRADED",
          children: [
            {
              name: "idna",
              currentVersion: "3.6",
              targetVersion: "3.6",
              isDirect: false,
              status: "UNCHANGED",
            },
            {
              name: "sniffio",
              currentVersion: "1.3.1",
              targetVersion: "1.3.1",
              isDirect: false,
              status: "UNCHANGED",
            },
          ],
        },
      ],
    },
    {
      name: "Pydantic",
      currentVersion: "2.6.4",
      targetVersion: "2.8.2",
      isDirect: true,
      status: "UPGRADED",
      children: [
        {
          name: "pydantic-core",
          currentVersion: "2.16.3",
          targetVersion: "2.20.1",
          isDirect: false,
          status: "UPGRADED",
        },
        {
          name: "typing-extensions",
          currentVersion: "4.10.0",
          targetVersion: "4.12.2",
          isDirect: false,
          status: "UPGRADED",
        },
      ],
    },
    {
      name: "typing-extensions",
      currentVersion: "4.10.0",
      targetVersion: "4.12.2",
      isDirect: true,
      status: "UPGRADED",
    },
  ],
};

export const DEMO_SECURITY_ADVISORIES: SecurityAdvisory[] = [
  {
    id: "GHSA-74m5-2c7w-9w3x",
    cve: "CVE-2024-24762",
    severity: "HIGH",
    affectedPackage: "starlette",
    affectedVersions: "< 0.37.0",
    fixedIn: "0.37.0",
    summary:
      "Denial of Service via unbounded memory allocation during parsing of multipart/form-data boundary markers.",
    recommendation:
      "Upgrading to FastAPI 0.120.0 brings in Starlette 0.37.2, successfully remediating this vulnerability.",
    source: "GitHub Security Advisory & OSV",
    isDemo: true,
  },
  {
    id: "DEMO-ADV-2026-081",
    severity: "LOW",
    affectedPackage: "pydantic-core",
    affectedVersions: "< 2.18.0",
    fixedIn: "2.18.0",
    summary:
      "Mild regex recursion limit bypass on crafted deeply-nested JSON schemas.",
    recommendation:
      "Pydantic 2.8.2 pins pydantic-core 2.20.1 which completely mitigates this scenario.",
    source: "PyPI Advisory DB",
    isDemo: true,
  },
];

export const DEMO_MIGRATION_STEPS: MigrationStep[] = [
  {
    stepNumber: "01",
    title: "Replace deprecated 'regex' with 'pattern' in validation parameters",
    findingRef: "F-01",
    description:
      "Update all Query(), Path(), and Header() declarations from 'regex=' to 'pattern=' to comply with Pydantic v2 and FastAPI 0.120 schema validation.",
    estimatedMinutes: 10,
    risk: "HIGH",
    filePath: "src/api/users.py",
    snippetBefore: `user_id: str = Query(..., regex=r"^usr_[a-zA-Z0-9]{12}$")`,
    snippetAfter: `user_id: str = Query(..., pattern=r"^usr_[a-zA-Z0-9]{12}$")`,
  },
  {
    stepNumber: "02",
    title: "Convert response_model_include and exclude parameters to Sets",
    findingRef: "F-04",
    description:
      "Change list syntax ['id', 'token'] to set literal {'id', 'token'} in route decorators to prevent PydanticUserError during startup schema compilation.",
    estimatedMinutes: 15,
    risk: "HIGH",
    filePath: "src/auth.py",
    snippetBefore: `@auth_router.post("/login", response_model_include=["id", "token", "roles"])`,
    snippetAfter: `@auth_router.post("/login", response_model_include={"id", "token", "roles"})`,
  },
  {
    stepNumber: "03",
    title: "Resolve dependency constraint for 'fastapi-limiter'",
    findingRef: "F-09",
    description:
      "Upgrade fastapi-limiter to >=0.2.0 in pyproject.toml to loosen the starlette<0.36 pin and allow Starlette 0.37.2 resolution.",
    estimatedMinutes: 20,
    risk: "HIGH",
    filePath: "pyproject.toml",
    snippetBefore: `fastapi-limiter = "^0.1.5"  # locks starlette < 0.36`,
    snippetAfter: `fastapi-limiter = "^0.2.0"  # supports starlette >= 0.37`,
  },
  {
    stepNumber: "04",
    title: "Migrate on_event('startup') to ASGI lifespan context manager",
    findingRef: "F-06",
    description:
      "Replace @app.on_event('startup') and 'shutdown' with the modern asynccontextmanager lifespan handler on the FastAPI app instance.",
    estimatedMinutes: 25,
    risk: "MEDIUM",
    filePath: "src/main.py",
    snippetBefore: `@app.on_event("startup")
async def startup_db_client():
    await init_db()`,
    snippetAfter: `@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)`,
  },
  {
    stepNumber: "05",
    title: "Run targeted test suite and review deprecation warnings",
    description:
      "Execute the 5 targeted test suites to confirm zero runtime 422 errors or route compilation failures.",
    estimatedMinutes: 15,
    risk: "LOW",
    snippetBefore: `# Command
pytest tests/test_auth.py tests/test_users.py -W error::DeprecationWarning`,
  },
];

export const DEMO_TEST_CASES: TestCase[] = [
  {
    id: "TC-01",
    name: "Authentication flow & Token claims serialization",
    area: "Authentication flow",
    command: "pytest tests/test_auth.py -k test_quick_login_response_model -v",
    targetFiles: ["src/auth.py"],
    rationale:
      "Directly validates that changing response_model_include from list to set resolves without schema generation error and retains correct JSON keys.",
    status: "RECOMMENDED",
  },
  {
    id: "TC-02",
    name: "Token validation with OAuth2 password flow",
    area: "Token validation",
    command: "pytest tests/test_auth.py -k test_jwt_signature_verification -v",
    targetFiles: ["src/auth.py"],
    rationale:
      "Ensures dependency injection with OAuth2PasswordRequestForm functions identically under FastAPI 0.120.",
    status: "RECOMMENDED",
  },
  {
    id: "TC-03",
    name: "API response validation & field inclusion",
    area: "API response validation",
    command: "pytest tests/test_users.py -k test_get_summary_fields -v",
    targetFiles: ["src/api/users.py"],
    rationale:
      "Verifies user summary response excludes internal metadata per the new set filtering.",
    status: "RECOMMENDED",
  },
  {
    id: "TC-04",
    name: "Lifespan startup and shutdown database connection",
    area: "Middleware behavior",
    command: "pytest tests/test_main.py -k test_app_lifespan_lifecycle -v",
    targetFiles: ["src/main.py", "src/database.py"],
    rationale:
      "Tests that database connection pool initializes cleanly during ASGI test client startup without on_event warnings.",
    status: "RECOMMENDED",
  },
  {
    id: "TC-05",
    name: "Query pattern parameter boundary enforcement",
    area: "Error handling",
    command: "pytest tests/test_users.py tests/test_payments.py -k test_regex_pattern_validation -v",
    targetFiles: ["src/api/users.py", "src/api/payments.py"],
    rationale:
      "Confirms that 'pattern=' correctly rejects invalid customer IDs and invalid transaction cursors with 422 responses.",
    status: "RECOMMENDED",
  },
];

export const DEMO_EVIDENCE: EvidenceItem[] = [
  {
    id: "EV-01",
    findingId: "F-04",
    sourceName: "FastAPI Release Notes v0.120.0 (GitHub Release)",
    sourceType: "PyPI Changelog",
    summary:
      "Official changelog entry deprecates sequence types in response_model_include/exclude.",
    rawExcerpt:
      "BREAKING CHANGE: response_model_include and response_model_exclude now strictly require Set[Union[int, str]] or Mapping. Passing tuples/lists is no longer coerced automatically and triggers PydanticUserError.",
    confidence: 98,
    verificationStatus: "VERIFIED",
    verifierCritique:
      "Cross-referenced with FastAPI commit c8921f. The signature strictly types parameter as IncEx = Union[Set[IntStr], Mapping[IntStr, Any], None].",
    timestamp: "11:04:18Z",
  },
  {
    id: "EV-02",
    findingId: "F-04",
    sourceName: "Python AST Analyzer (Repository Scan)",
    sourceType: "AST Call Graph",
    summary:
      "AST parser matched 2 occurrences of router decorator with list-valued response_model_include.",
    rawExcerpt:
      "Match 1: src/auth.py:35 (ast.Call -> keywords['response_model_include'] = ast.List)\nMatch 2: src/api/users.py:42 (ast.Call -> keywords['response_model_include'] = ast.List)",
    confidence: 100,
    verificationStatus: "VERIFIED",
    verifierCritique:
      "Verified against repository source code. Deterministic AST match confirmed.",
    timestamp: "11:04:19Z",
  },
  {
    id: "EV-03",
    findingId: "F-01",
    sourceName: "Pydantic v2 Compatibility Guide & FastAPI docs",
    sourceType: "PyPI Changelog",
    summary:
      "Parameter validation 'regex' parameter removed to unify with Pydantic Field(pattern=...).",
    rawExcerpt:
      "FastAPI Params: Remove deprecated 'regex' parameter from Query, Path, Header, Cookie. Use 'pattern' instead.",
    confidence: 96,
    verificationStatus: "VERIFIED",
    verifierCritique:
      "Confirmed in tests. Passing 'regex' parameter to Query constructor produces an unexpected keyword argument error.",
    timestamp: "11:04:16Z",
  },
  {
    id: "EV-04",
    findingId: "F-01",
    sourceName: "Call Graph Static Inspection",
    sourceType: "AST Call Graph",
    summary:
      "Found 2 call sites in src/api/users.py and src/api/payments.py passing keyword arg regex=.",
    rawExcerpt:
      "src/api/users.py:18 Query(..., regex=r'^usr_[a-zA-Z0-9]{12}$')\nsrc/api/payments.py:27 Query(None, regex=r'^txn_[0-9a-f]{24}$')",
    confidence: 100,
    verificationStatus: "VERIFIED",
    verifierCritique: "Confirmed exact file paths and line offsets.",
    timestamp: "11:04:17Z",
  },
  {
    id: "EV-05",
    findingId: "F-06",
    sourceName: "Starlette ASGI Specification Docs",
    sourceType: "PyPI Changelog",
    summary:
      "on_event startup and shutdown replaced by ASGI lifespan protocol context manager.",
    rawExcerpt:
      "Lifespan state is now the standard ASGI approach. Starlette on_event is retained only for backwards compatibility and emits DeprecationWarning.",
    confidence: 90,
    verificationStatus: "VERIFIED",
    verifierCritique:
      "Existing startup handlers will still execute in 0.120, but deprecation warnings will pollute test outputs and logs.",
    timestamp: "11:04:15Z",
  },
  {
    id: "EV-06",
    findingId: "F-09",
    sourceName: "GHSA-74m5-2c7w-9w3x Advisory Patch",
    sourceType: "OSV Advisory DB",
    summary:
      "Transitive bump in Starlette modifies multipart parser boundary termination handling.",
    rawExcerpt:
      "Starlette 0.37.0 fixes CVE-2024-24762: Form multi-part parser rejects headers with missing CRLF boundary markers.",
    confidence: 75,
    verificationStatus: "PARTIALLY_VERIFIED",
    verifierCritique:
      "Code Impact Agent flagged src/utils.py, but need runtime payload tests to confirm if custom webhook clients will be affected.",
    timestamp: "11:04:18Z",
  },
];

export const DEMO_AGENT_EVENTS: AgentActivityEvent[] = [
  {
    id: "E-101",
    timestamp: "11:04:12",
    agent: "Supervisor",
    message: "Initiated upgrade impact plan for FastAPI: 0.110.0 → 0.120.0 on FastAPI Commerce API",
    type: "info",
  },
  {
    id: "E-102",
    timestamp: "11:04:13",
    agent: "Dependency Agent",
    message: "Parsed poetry.lock: 38 direct and transitive packages mapped. Flagged Starlette bump 0.27.0 → 0.37.2",
    type: "info",
  },
  {
    id: "E-103",
    timestamp: "11:04:14",
    agent: "Change Analysis Agent",
    message: "Fetched release changelogs for FastAPI 0.110.0..0.120.0. Identified 3 candidate breaking changes",
    type: "warning",
  },
  {
    id: "E-104",
    timestamp: "11:04:15",
    agent: "Code Impact Agent",
    message: "Scanned 48 Python repository files. Found 7 candidate usages of affected APIs",
    type: "info",
  },
  {
    id: "E-105",
    timestamp: "11:04:16",
    agent: "Security Agent",
    message: "Queried OSV database: 1 high severity vulnerability (CVE-2024-24762) remediated by upgrade",
    type: "success",
  },
  {
    id: "E-106",
    timestamp: "11:04:17",
    agent: "Verifier",
    message: "Critique loop triggered: Requested AST proof for F-04 (response_model_include argument type)",
    type: "critique",
  },
  {
    id: "E-107",
    timestamp: "11:04:18",
    agent: "Code Impact Agent",
    message: "AST Call Graph re-evaluation completed: Confirmed list literal in src/auth.py:35 and src/api/users.py:42",
    type: "action",
  },
  {
    id: "E-108",
    timestamp: "11:04:19",
    agent: "Verifier",
    message: "Finding F-04 VERIFIED (Confidence: 98%). Finding F-01 VERIFIED (Confidence: 96%)",
    type: "success",
  },
  {
    id: "E-109",
    timestamp: "11:04:20",
    agent: "Risk Engine",
    message: "Calculated composite risk score: 72/100 (HIGH). Generated 4 key drivers and risk breakdown",
    type: "warning",
  },
  {
    id: "E-110",
    timestamp: "11:04:21",
    agent: "Test Planner",
    message: "Synthesized 5 targeted test suites covering authentication, token flows, and parameter validation",
    type: "info",
  },
  {
    id: "E-111",
    timestamp: "11:04:22",
    agent: "Report Agent",
    message: "Generated executive migration plan, code diffs, and verification summary",
    type: "success",
  },
];

export const DEMO_ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "supervisor",
    name: "Supervisor Agent",
    role: "Orchestrator & Task Decomposition",
    category: "controller",
    purpose:
      "Coordinates the multi-agent upgrade lifecycle. Receives target dependency specification, builds execution DAG, dispatches sub-tasks, and controls the critique/verification loop.",
    inputs: [
      "Repository URL / local path",
      "Dependency name ('FastAPI')",
      "Current version ('0.110.0')",
      "Target version ('0.120.0')",
    ],
    outputs: [
      "Task DAG",
      "Dynamic execution state",
      "Agent coordination signals",
    ],
    modelContext: "High-reasoning model with strict tool calling and DAG tracking",
    tools: ["git_inspector", "task_dispatcher", "state_coordinator"],
  },
  {
    id: "dependency_agent",
    name: "Dependency Agent",
    role: "Lockfile & Resolution Analysis",
    category: "worker",
    purpose:
      "Parses package manager manifests (pyproject.toml, package.json, Cargo.lock, go.mod), maps transitive dependency trees, and detects upstream conflict constraints.",
    inputs: ["Lockfiles", "Ecosystem package registries (PyPI, npm)"],
    outputs: [
      "Dependency resolution graph",
      "Transitive version bump list",
      "Identified constraint conflicts",
    ],
    modelContext: "Specialized in dependency SAT solvers and SemVer arithmetic",
    tools: ["poetry_solver", "pypi_inspector", "npm_audit"],
  },
  {
    id: "change_agent",
    name: "Change Analysis Agent",
    role: "Release & Diff Intelligence",
    category: "worker",
    purpose:
      "Mines GitHub releases, git commit histories, and changelogs between tag intervals to isolate breaking changes, parameter deprecations, and API signature changes.",
    inputs: ["Git tag diffs", "Changelog markdown", "Release notes"],
    outputs: [
      "Extracted breaking change catalog",
      "Modified API signatures",
      "Deprecated methods",
    ],
    modelContext: "Extracts semantic diffs from unstructured developer release logs",
    tools: ["github_release_fetcher", "git_diff_extractor", "changelog_parser"],
  },
  {
    id: "code_impact_agent",
    name: "Code Impact Agent",
    role: "AST & Call Site Mapping",
    category: "worker",
    purpose:
      "Performs AST parsing and static call-graph traversal across the target repository to pinpoint exact file paths, line numbers, and parameter call sites invoking changed APIs.",
    inputs: ["Repository source files", "Catalog of breaking APIs"],
    outputs: [
      "Affected file tree",
      "Call site coordinates (file:line:col)",
      "AST usage patterns",
    ],
    modelContext: "Deep static analysis comprehension and syntax tree matching",
    tools: ["python_ast_visitor", "ts_compiler_api", "ripgrep_ast"],
  },
  {
    id: "security_agent",
    name: "Security Agent",
    role: "Vulnerability & Advisory Intelligence",
    category: "worker",
    purpose:
      "Queries OSV (Open Source Vulnerabilities), CVE registries, and GitHub Security Advisories for the current and target version window to assess patched and introduced CVEs.",
    inputs: ["Target dependency and transitive packages", "Version bounds"],
    outputs: ["Remediated CVEs", "Introduced vulnerabilities", "Severity score"],
    modelContext: "Vulnerability triage and CVSS vector interpretation",
    tools: ["osv_database_client", "nvd_cve_lookup", "ghsa_feed"],
  },
  {
    id: "verifier",
    name: "Verifier / Critic",
    role: "Adversarial Hallucination Check",
    category: "critic",
    purpose:
      "Acts as an independent adversarial critic. Challenges candidate findings, demands ground-truth evidence (AST snippet or release commit), rejects false positives, and triggers targeted re-analysis.",
    inputs: [
      "Candidate findings from worker agents",
      "Raw evidence documents",
    ],
    outputs: [
      "Verification status (VERIFIED / REJECTED)",
      "Confidence rating (0-100%)",
      "Critic critique rationale",
      "Re-analysis requests",
    ],
    modelContext: "Zero-tolerance critic prompt; penalizes unsubstantiated claims",
    tools: ["evidence_evaluator", "syntax_validator", "reanalysis_trigger"],
  },
  {
    id: "risk_engine",
    name: "Risk Engine",
    role: "Probabilistic Risk Synthesis",
    category: "evaluator",
    purpose:
      "Aggregates verified breaking changes, repository exposure depth, test coverage density, and dependency conflicts into a composite 0-100 Risk Score with weighted category drivers.",
    inputs: [
      "Verified findings count & severity",
      "Code call site criticality (e.g. auth vs utils)",
      "Conflict blocking status",
    ],
    outputs: [
      "Composite Risk Score (0-100)",
      "Risk Level (LOW / MEDIUM / HIGH / CRITICAL)",
      "Key risk driver explanations",
    ],
    modelContext: "Deterministic quantitative evaluation with weighted scoring model",
    tools: ["scoring_matrix", "criticality_heuristic"],
  },
  {
    id: "test_planner",
    name: "Test Planner Agent",
    role: "Targeted Validation Design",
    category: "worker",
    purpose:
      "Formulates a minimal targeted regression test suite. Rather than running an unguided 2-hour full test run, it generates specific test commands isolating impacted modules.",
    inputs: [
      "Affected files list",
      "Verified finding descriptions",
      "Existing test suite structure",
    ],
    outputs: [
      "Targeted test checklist",
      "Ready-to-run pytest/jest commands",
      "Regression rationale",
    ],
    modelContext: "Test-driven engineering and behavioral regression planning",
    tools: ["pytest_test_selector", "coverage_correlator"],
  },
  {
    id: "report_agent",
    name: "Report Agent",
    role: "Actionable Migration Artifact Generation",
    category: "output",
    purpose:
      "Synthesizes all verified intelligence into an actionable migration plan, before/after code diffs, PR descriptions, and executive summaries.",
    inputs: ["Verified findings", "Risk score", "Test plan", "Code diffs"],
    outputs: [
      "Interactive Dashboard data",
      "Markdown Migration Guide",
      "Automated pull request draft",
    ],
    modelContext: "Senior technical lead communication and clean diff formatting",
    tools: ["markdown_formatter", "git_pr_drafter"],
  },
];

export const DEMO_PREVIOUS_ANALYSES = [
  {
    id: "ANA-8821",
    dependency: "FastAPI",
    fromVersion: "0.110.0",
    toVersion: "0.120.0",
    repository: "FastAPI Commerce API",
    riskScore: 72,
    riskLevel: "HIGH",
    breakingChanges: 2,
    date: "Just now",
    status: "Completed",
  },
  {
    id: "ANA-8742",
    dependency: "Pydantic",
    fromVersion: "2.5.0",
    toVersion: "2.6.4",
    repository: "FastAPI Commerce API",
    riskScore: 24,
    riskLevel: "LOW",
    breakingChanges: 0,
    date: "3 days ago",
    status: "Completed",
  },
  {
    id: "ANA-8609",
    dependency: "SQLAlchemy",
    fromVersion: "1.4.48",
    toVersion: "2.0.28",
    repository: "Order Processing Engine",
    riskScore: 89,
    riskLevel: "CRITICAL",
    breakingChanges: 7,
    date: "1 week ago",
    status: "Completed",
  },
  {
    id: "ANA-8510",
    dependency: "Next.js",
    fromVersion: "14.2.3",
    toVersion: "15.0.1",
    repository: "Commerce Storefront Web",
    riskScore: 68,
    riskLevel: "MEDIUM",
    breakingChanges: 3,
    date: "2 weeks ago",
    status: "Completed",
  },
];

export const DEMO_REPOSITORIES = [
  {
    id: "repo-1",
    name: "FastAPI Commerce API",
    slug: "org/fastapi-commerce-api",
    ecosystem: "Python / Poetry",
    branch: "main",
    dependenciesCount: 42,
    lastAnalyzed: "Just now",
    healthStatus: "ATTENTION_REQUIRED",
    stars: 128,
  },
  {
    id: "repo-2",
    name: "Order Processing Engine",
    slug: "org/order-processing-engine",
    ecosystem: "Python / Poetry",
    branch: "main",
    dependenciesCount: 65,
    lastAnalyzed: "1 week ago",
    healthStatus: "HEALTHY",
    stars: 45,
  },
  {
    id: "repo-3",
    name: "Commerce Storefront Web",
    slug: "org/storefront-next",
    ecosystem: "Node.js / npm",
    branch: "production",
    dependenciesCount: 88,
    lastAnalyzed: "2 weeks ago",
    healthStatus: "HEALTHY",
    stars: 310,
  },
];
