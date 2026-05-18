export const SOURCE_LANGUAGES = ["cobol", "java7", "dotnet-framework"] as const;
export const TARGET_LANGUAGES = ["java21", "python312", "dotnet8"] as const;

export type SourceLanguage = (typeof SOURCE_LANGUAGES)[number];
export type TargetLanguage = (typeof TARGET_LANGUAGES)[number];

export interface LanguagePair {
  source: SourceLanguage;
  target: TargetLanguage;
}

export const SUPPORTED_PAIRS = [
  { source: "cobol", target: "java21", label: "COBOL → Java 21" },
  { source: "cobol", target: "python312", label: "COBOL → Python 3.12" },
  { source: "java7", target: "java21", label: "Java 7 → Java 21" },
  { source: "java7", target: "python312", label: "Java 7 → Python 3.12" },
  { source: "dotnet-framework", target: "dotnet8", label: ".NET Framework → .NET 8" },
  { source: "dotnet-framework", target: "java21", label: ".NET Framework → Java 21" },
] as const satisfies ReadonlyArray<LanguagePair & { label: string }>;

export const LANGUAGE_LABELS: Record<SourceLanguage | TargetLanguage, string> = {
  cobol: "COBOL",
  java7: "Java 7",
  "dotnet-framework": ".NET Framework 4.x",
  java21: "Java 21",
  python312: "Python 3.12",
  dotnet8: ".NET 8",
};

export type JobStatus = "queued" | "running" | "completed" | "failed";

export type PipelineStep =
  | "ParseCodeGraph"
  | "EmbedCodeChunks"
  | "AnalyzeWithBedrock"
  | "TransformCode"
  | "GenerateIaC"
  | "GenerateTests"
  | "GenerateADR"
  | "VerifyCompliance"
  | "BundleOutput"
  | "UpdateJobComplete";

export const PIPELINE_STEPS: PipelineStep[] = [
  "ParseCodeGraph",
  "EmbedCodeChunks",
  "AnalyzeWithBedrock",
  "TransformCode",
  "GenerateIaC",
  "GenerateTests",
  "GenerateADR",
  "VerifyCompliance",
  "BundleOutput",
  "UpdateJobComplete",
];

export const PIPELINE_STEP_LABELS: Record<PipelineStep, string> = {
  ParseCodeGraph: "Parse Code Graph",
  EmbedCodeChunks: "Embed Code Chunks",
  AnalyzeWithBedrock: "Analyze with Claude",
  TransformCode: "Transform Code",
  GenerateIaC: "Generate IaC",
  GenerateTests: "Generate Tests",
  GenerateADR: "Generate ADR",
  VerifyCompliance: "Verify Compliance",
  BundleOutput: "Bundle Output",
  UpdateJobComplete: "Finalize Job",
};

export interface TransformationJob {
  jobId: string;
  tenantId: string;
  userId: string;
  status: JobStatus;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  filename: string;
  s3InputKey: string;
  s3OutputKey?: string;
  executionArn?: string;
  currentStep?: PipelineStep;
  progress: number;
  linesOfCode: number;
  filesProcessed: number;
  totalFiles: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  errorMessage?: string;
}

export interface CreateJobInput {
  jobId: string;
  tenantId: string;
  userId: string;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  filename: string;
  s3InputKey: string;
  linesOfCode: number;
}

export interface TransformationInput {
  jobId: string;
  tenantId: string;
  userId: string;
  s3InputKey: string;
  s3OutputPrefix: string;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  linesOfCode: number;
  bedrockModelId: string;
  sagemakerEndpointName: string;
}

export interface ExecutionStatus {
  status: "RUNNING" | "SUCCEEDED" | "FAILED" | "TIMED_OUT" | "ABORTED";
  startDate?: Date;
  stopDate?: Date;
  output?: string;
  cause?: string;
  error?: string;
}

export interface ExecutionEvent {
  timestamp: Date;
  type: string;
  stepName?: string;
  details?: string;
}

export interface TransformationPlan {
  summary: string;
  modules: Array<{
    name: string;
    sourceFiles: string[];
    strategy: string;
    risks: string[];
  }>;
  estimatedDurationMinutes: number;
}

export interface IaCBundle {
  cloudformation: string;
  cdk: string;
  notes: string;
}

export interface TestSuite {
  framework: string;
  files: Array<{ path: string; content: string }>;
  coverageTarget: number;
}

export interface ArchitectureDecisionRecord {
  title: string;
  status: "proposed" | "accepted";
  context: string;
  decision: string;
  consequences: string;
}

export interface TransformPayload {
  sourceCode: string;
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
  context?: string;
}

export interface TransformResult {
  modernCode: string;
  notes: string;
  warnings: string[];
}

export interface LineageEntry {
  legacyFile: string;
  legacyLanguage: SourceLanguage;
  legacyLOC: number;
  modernFile: string;
  modernLanguage: TargetLanguage;
  modernLOC: number;
}
