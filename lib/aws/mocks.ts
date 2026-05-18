/**
 * Deterministic mock data used when STRATOSCODE_DEV_MOCK=true.
 * Lets the entire UI flow work locally without any real AWS resources.
 */
import type {
  ArchitectureDecisionRecord,
  IaCBundle,
  TestSuite,
  TransformationJob,
  TransformationPlan,
  TransformResult,
} from "@/types/transformation";

export function mockJob(
  jobId: string,
  tenantId = "dev-tenant",
  overrides: Partial<TransformationJob> = {},
): TransformationJob {
  const now = new Date().toISOString();
  return {
    jobId,
    tenantId,
    userId: "dev-user",
    status: "running",
    sourceLanguage: "cobol",
    targetLanguage: "java21",
    filename: "banking-core.zip",
    s3InputKey: `${tenantId}/${jobId}/input/banking-core.zip`,
    s3OutputKey: `${tenantId}/${jobId}/output/bundle.zip`,
    executionArn: `arn:aws:states:us-east-1:000000000000:execution:stratoscode-dev:${jobId}`,
    currentStep: "AnalyzeWithBedrock",
    progress: 42,
    linesOfCode: 47230,
    filesProcessed: 18,
    totalFiles: 64,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function mockJobList(tenantId: string): TransformationJob[] {
  return [
    mockJob("00000000-0000-4000-8000-000000000001", tenantId, {
      status: "completed",
      progress: 100,
      filesProcessed: 64,
      totalFiles: 64,
      completedAt: new Date(Date.now() - 3600_000).toISOString(),
      createdAt: new Date(Date.now() - 4 * 3600_000).toISOString(),
      filename: "legacy-banking.zip",
    }),
    mockJob("00000000-0000-4000-8000-000000000002", tenantId, {
      status: "running",
      progress: 35,
      filesProcessed: 12,
      totalFiles: 34,
      sourceLanguage: "java7",
      targetLanguage: "java21",
      filename: "order-service.zip",
    }),
    mockJob("00000000-0000-4000-8000-000000000003", tenantId, {
      status: "failed",
      progress: 18,
      filesProcessed: 4,
      totalFiles: 22,
      sourceLanguage: "dotnet-framework",
      targetLanguage: "dotnet8",
      filename: "policy-engine.zip",
      errorMessage: "Bedrock throttling exceeded retry budget.",
    }),
  ];
}

export function mockPlan(): TransformationPlan {
  return {
    summary:
      "Modernize monolithic COBOL batch processor into a Java 21 services with event-driven decomposition.",
    modules: [
      {
        name: "AccountLedger",
        sourceFiles: ["LEDGER01.cbl", "LEDGER02.cbl"],
        strategy: "Domain service with JPA + Postgres",
        risks: ["Decimal precision must match COBOL COMP-3 semantics."],
      },
      {
        name: "BatchScheduler",
        sourceFiles: ["JCL.SCHED"],
        strategy: "Replace JCL with Java virtual threads + scheduled jobs",
        risks: ["Job dependency graph requires manual review."],
      },
    ],
    estimatedDurationMinutes: 38,
  };
}

export function mockIaC(): IaCBundle {
  return {
    cloudformation: "# CloudFormation template stub (dev-mock)",
    cdk: "// CDK app stub (dev-mock)",
    notes: "Includes VPC, RDS, ECS Fargate task definition.",
  };
}

export function mockTests(): TestSuite {
  return {
    framework: "JUnit 5",
    files: [
      {
        path: "src/test/java/com/example/AccountLedgerTest.java",
        content: "// JUnit 5 test stub (dev-mock)",
      },
    ],
    coverageTarget: 0.85,
  };
}

export function mockADR(): ArchitectureDecisionRecord {
  return {
    title: "Migrate COBOL Batch Ledger to Java 21 Service",
    status: "accepted",
    context:
      "Legacy COBOL ledger blocks weekly close. Cannot scale beyond single mainframe LPAR.",
    decision:
      "Decompose into Java 21 service backed by Postgres, with virtual threads for parallel batch processing.",
    consequences:
      "Modernizes deployment, but requires re-verification of decimal precision and night-batch SLAs.",
  };
}

export function mockTransform(input: { sourceCode: string }): TransformResult {
  return {
    modernCode: `// Modern equivalent (dev-mock)\n// Source length: ${input.sourceCode.length}\npublic record Account(String id, BigDecimal balance) {}\n`,
    notes: "Mapped COBOL records to Java records; preserved decimal semantics.",
    warnings: [],
  };
}
