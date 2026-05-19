import {
  SFNClient,
  StartExecutionCommand,
  DescribeExecutionCommand,
  GetExecutionHistoryCommand,
} from "@aws-sdk/client-sfn";
import { awsClientConfig, withRetry } from "./_client";
import { isDevMock } from "../dev-mode";
import { logger } from "../logger";
import type {
  ExecutionEvent,
  ExecutionStatus,
  TransformationInput,
} from "@/types/transformation";

const client = new SFNClient(awsClientConfig());

export async function startTransformation(
  input: TransformationInput,
): Promise<string> {
  if (isDevMock()) {
    const fakeArn = `arn:aws:states:us-east-1:000000000000:execution:vetuscloud-dev:${input.jobId}`;
    logger.debug({ jobId: input.jobId, fakeArn }, "dev-mock: starting fake execution");
    return fakeArn;
  }
  const stateMachineArn = process.env.SFN_STATE_MACHINE_ARN;
  if (!stateMachineArn) {
    throw new Error("SFN_STATE_MACHINE_ARN is not configured");
  }
  const command = new StartExecutionCommand({
    stateMachineArn,
    name: input.jobId,
    input: JSON.stringify(input),
  });
  const response = await withRetry(() => client.send(command), {
    label: "sfn.startExecution",
  });
  if (!response.executionArn) {
    throw new Error("StartExecution returned no executionArn");
  }
  return response.executionArn;
}

export async function getExecutionStatus(
  executionArn: string,
): Promise<ExecutionStatus> {
  if (isDevMock()) {
    return { status: "RUNNING", startDate: new Date() };
  }
  const response = await withRetry(
    () => client.send(new DescribeExecutionCommand({ executionArn })),
    { label: "sfn.describeExecution" },
  );
  return {
    status: (response.status as ExecutionStatus["status"]) ?? "RUNNING",
    startDate: response.startDate,
    stopDate: response.stopDate,
    output: response.output,
    cause: response.cause,
    error: response.error,
  };
}

export async function getExecutionEvents(
  executionArn: string,
): Promise<ExecutionEvent[]> {
  if (isDevMock()) return [];
  const response = await withRetry(
    () =>
      client.send(
        new GetExecutionHistoryCommand({ executionArn, maxResults: 50, reverseOrder: true }),
      ),
    { label: "sfn.getExecutionHistory" },
  );
  return (response.events ?? []).map((e) => ({
    timestamp: e.timestamp ?? new Date(),
    type: e.type ?? "Unknown",
    stepName:
      e.stateEnteredEventDetails?.name ?? e.stateExitedEventDetails?.name,
    details: e.stateEnteredEventDetails?.input ?? e.stateExitedEventDetails?.output,
  }));
}
