import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { buildJobKey, getPresignedUploadUrl } from "@/lib/aws/s3";
import { presignedUploadSchema } from "@/lib/validations";
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

  const parsed = presignedUploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { filename, contentType, jobId } = parsed.data;
  const key = buildJobKey(session.user.tenantId, jobId, filename, "input");

  try {
    const presignedUrl = await getPresignedUploadUrl(key, contentType);
    return NextResponse.json({ presignedUrl, key });
  } catch (err) {
    logger.error({ err }, "Failed to create presigned upload URL");
    return NextResponse.json(
      { error: "Failed to create upload URL" },
      { status: 500 },
    );
  }
}
