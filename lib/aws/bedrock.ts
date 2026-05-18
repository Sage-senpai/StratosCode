import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { awsClientConfig, withRetry } from "./_client";
import { isDevMock } from "../dev-mode";
import { logger } from "../logger";
import { mockADR, mockIaC, mockPlan, mockTests } from "./mocks";
import type {
  ArchitectureDecisionRecord,
  IaCBundle,
  TestSuite,
  TransformationPlan,
} from "@/types/transformation";

const client = new BedrockRuntimeClient(awsClientConfig());

const modelId = (): string =>
  process.env.BEDROCK_MODEL_ID ?? "us.anthropic.claude-sonnet-4-5-20251001";

async function invokeClaude(prompt: string, maxTokens = 4096): Promise<string> {
  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: maxTokens,
    messages: [{ role: "user", content: prompt }],
  };
  const command = new InvokeModelCommand({
    modelId: modelId(),
    body: JSON.stringify(payload),
    contentType: "application/json",
    accept: "application/json",
  });
  const response = await withRetry(() => client.send(command), {
    label: "bedrock.invokeModel",
  });
  const body = JSON.parse(new TextDecoder().decode(response.body));
  const text = body.content?.[0]?.text;
  if (typeof text !== "string") {
    throw new Error("Unexpected Bedrock response shape");
  }
  return text;
}

function extractJSON<T>(text: string): T {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON object found in model response");
  return JSON.parse(match[0]) as T;
}

export async function invokeClaudeForTransformationPlan(
  codeContext: string,
  sourceLanguage: string,
  targetLanguage: string,
): Promise<TransformationPlan> {
  if (isDevMock()) {
    logger.debug("dev-mock: returning mock transformation plan");
    return mockPlan();
  }
  const prompt = `You are an expert code modernization architect. Analyze this legacy ${sourceLanguage} codebase context and produce a structured JSON transformation plan for migration to ${targetLanguage}.

Return ONLY a JSON object matching this shape:
{ "summary": string, "modules": [{ "name": string, "sourceFiles": string[], "strategy": string, "risks": string[] }], "estimatedDurationMinutes": number }

Codebase context:
${codeContext}`;
  const text = await invokeClaude(prompt);
  return extractJSON<TransformationPlan>(text);
}

export async function invokeClaudeForIaC(
  modernCodeContext: string,
): Promise<IaCBundle> {
  if (isDevMock()) return mockIaC();
  const prompt = `Generate CloudFormation and AWS CDK templates for deploying the following modern application. Return JSON with shape { "cloudformation": string, "cdk": string, "notes": string }.

Application:
${modernCodeContext}`;
  const text = await invokeClaude(prompt, 6144);
  return extractJSON<IaCBundle>(text);
}

export async function invokeClaudeForTestSuite(
  modernCodeContext: string,
  language: string,
): Promise<TestSuite> {
  if (isDevMock()) return mockTests();
  const prompt = `Generate a unit + integration test suite for the following ${language} application. Return JSON with shape { "framework": string, "files": [{ "path": string, "content": string }], "coverageTarget": number }.

Application:
${modernCodeContext}`;
  const text = await invokeClaude(prompt, 6144);
  return extractJSON<TestSuite>(text);
}

export async function invokeClaudeForADR(
  transformationPlan: TransformationPlan,
): Promise<ArchitectureDecisionRecord> {
  if (isDevMock()) return mockADR();
  const prompt = `Write an Architecture Decision Record for this transformation plan. Return JSON with shape { "title": string, "status": "accepted", "context": string, "decision": string, "consequences": string }.

Plan:
${JSON.stringify(transformationPlan, null, 2)}`;
  const text = await invokeClaude(prompt);
  return extractJSON<ArchitectureDecisionRecord>(text);
}
