import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createTransformationSchema } from "@/lib/validations";
import { createJob, listJobsByTenant, updateJobStatus } from "@/lib/aws/dynamodb";
import { startTransformation } from "@/lib/aws/step-functions";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = createTransformationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const tenantId = session.user.tenantId;
  const userId = session.user.id;

  try {
    const job = await createJob({
      jobId: input.jobId,
      tenantId,
      userId,
      sourceLanguage: input.sourceLanguage,
      targetLanguage: input.targetLanguage,
      filename: input.filename,
      s3InputKey: input.s3InputKey,
      linesOfCode: input.linesOfCode,
    });

    const executionArn = await startTransformation({
      jobId: input.jobId,
      tenantId,
      userId,
      s3InputKey: input.s3InputKey,
      s3OutputPrefix: `${tenantId}/${input.jobId}/output/`,
      sourceLanguage: input.sourceLanguage,
      targetLanguage: input.targetLanguage,
      linesOfCode: input.linesOfCode,
      bedrockModelId:
        process.env.BEDROCK_MODEL_ID ?? "us.anthropic.claude-sonnet-4-5-20251001",
      sagemakerEndpointName:
        process.env.SAGEMAKER_ENDPOINT_NAME ?? "vetuscloud-transform",
    });

    await updateJobStatus(input.jobId, {
      executionArn,
      status: "running",
      currentStep: "ParseCodeGraph",
    });

    return NextResponse.json(
      { ...job, executionArn, status: "running", currentStep: "ParseCodeGraph" },
      { status: 201 },
    );
  } catch (err) {
    logger.error({ err, jobId: input.jobId }, "Failed to start transformation");
    return NextResponse.json(
      { error: "Failed to start transformation" },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const jobs = await listJobsByTenant(session.user.tenantId);
    return NextResponse.json({ jobs });
  } catch (err) {
    logger.error({ err }, "Failed to list jobs");
    return NextResponse.json({ error: "Failed to list jobs" }, { status: 500 });
  }
}
