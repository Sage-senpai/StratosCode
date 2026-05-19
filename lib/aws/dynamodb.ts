import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "node:crypto";
import { awsClientConfig, withRetry } from "./_client";
import { isDevMock } from "../dev-mode";
import { logger } from "../logger";
import { mockJob, mockJobList } from "./mocks";
import type {
  CreateJobInput,
  PipelineStep,
  TransformationJob,
} from "@/types/transformation";

const raw = new DynamoDBClient(awsClientConfig());
const doc = DynamoDBDocumentClient.from(raw, {
  marshallOptions: { removeUndefinedValues: true },
});

const table = (): string => process.env.DYNAMODB_TABLE_NAME ?? "vetuscloud-transformations";

// In-memory store for dev-mock — survives across requests in the same Node process.
const devStore = new Map<string, TransformationJob>();

function seedDevStore(tenantId: string) {
  if (devStore.size > 0) return;
  for (const job of mockJobList(tenantId)) devStore.set(job.jobId, job);
}

export async function createJob(input: CreateJobInput): Promise<TransformationJob> {
  const now = new Date().toISOString();
  const job: TransformationJob = {
    jobId: input.jobId,
    tenantId: input.tenantId,
    userId: input.userId,
    status: "queued",
    sourceLanguage: input.sourceLanguage,
    targetLanguage: input.targetLanguage,
    filename: input.filename,
    s3InputKey: input.s3InputKey,
    progress: 0,
    linesOfCode: input.linesOfCode,
    filesProcessed: 0,
    totalFiles: 0,
    createdAt: now,
    updatedAt: now,
  };

  if (isDevMock()) {
    devStore.set(job.jobId, job);
    logger.debug({ jobId: job.jobId }, "dev-mock: created job in memory");
    return job;
  }

  await withRetry(
    () =>
      doc.send(
        new PutCommand({
          TableName: table(),
          Item: { ...job, SK: "JOB" },
        }),
      ),
    { label: "ddb.createJob" },
  );
  return job;
}

export async function getJob(jobId: string): Promise<TransformationJob | null> {
  if (isDevMock()) {
    seedDevStore("dev-tenant");
    return devStore.get(jobId) ?? mockJob(jobId);
  }
  const response = await withRetry(
    () =>
      doc.send(
        new GetCommand({ TableName: table(), Key: { jobId, SK: "JOB" } }),
      ),
    { label: "ddb.getJob" },
  );
  if (!response.Item) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { SK, ...job } = response.Item as TransformationJob & { SK: string };
  return job;
}

export async function listJobsByTenant(
  tenantId: string,
): Promise<TransformationJob[]> {
  if (isDevMock()) {
    seedDevStore(tenantId);
    return Array.from(devStore.values())
      .filter((j) => j.tenantId === tenantId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  const response = await withRetry(
    () =>
      doc.send(
        new QueryCommand({
          TableName: table(),
          IndexName: "tenantId-createdAt-index",
          KeyConditionExpression: "tenantId = :t",
          ExpressionAttributeValues: { ":t": tenantId },
          ScanIndexForward: false,
        }),
      ),
    { label: "ddb.listJobsByTenant" },
  );
  return (response.Items ?? []).map((item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { SK, ...job } = item as TransformationJob & { SK: string };
    return job;
  });
}

export async function updateJobStatus(
  jobId: string,
  update: Partial<TransformationJob>,
): Promise<void> {
  if (isDevMock()) {
    const existing = devStore.get(jobId);
    if (existing) {
      devStore.set(jobId, {
        ...existing,
        ...update,
        updatedAt: new Date().toISOString(),
      });
    }
    return;
  }

  const keys = Object.keys(update);
  if (keys.length === 0) return;
  const ExpressionAttributeNames: Record<string, string> = {};
  const ExpressionAttributeValues: Record<string, unknown> = {
    ":updatedAt": new Date().toISOString(),
  };
  const setExpr: string[] = ["#updatedAt = :updatedAt"];
  ExpressionAttributeNames["#updatedAt"] = "updatedAt";

  for (const key of keys) {
    ExpressionAttributeNames[`#${key}`] = key;
    ExpressionAttributeValues[`:${key}`] = update[key as keyof TransformationJob];
    setExpr.push(`#${key} = :${key}`);
  }

  await withRetry(
    () =>
      doc.send(
        new UpdateCommand({
          TableName: table(),
          Key: { jobId, SK: "JOB" },
          UpdateExpression: `SET ${setExpr.join(", ")}`,
          ExpressionAttributeNames,
          ExpressionAttributeValues,
        }),
      ),
    { label: "ddb.updateJobStatus" },
  );
}

export function newJobId(): string {
  return randomUUID();
}

export type { PipelineStep };
