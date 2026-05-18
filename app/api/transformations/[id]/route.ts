import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getJob } from "@/lib/aws/dynamodb";
import { getPresignedDownloadUrl } from "@/lib/aws/s3";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const job = await getJob(params.id);
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    if (job.tenantId !== session.user.tenantId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const downloads: Record<string, string> = {};
    if (job.status === "completed" && job.s3OutputKey) {
      const base = job.s3OutputKey.replace(/bundle\.zip$/, "");
      downloads.bundle = await getPresignedDownloadUrl(`${base}bundle.zip`);
      downloads.iac = await getPresignedDownloadUrl(`${base}iac.zip`);
      downloads.tests = await getPresignedDownloadUrl(`${base}tests.zip`);
      downloads.adr = await getPresignedDownloadUrl(`${base}adr.pdf`);
    }

    return NextResponse.json({ job, downloads });
  } catch (err) {
    logger.error({ err, jobId: params.id }, "Failed to get job");
    return NextResponse.json({ error: "Failed to load job" }, { status: 500 });
  }
}
