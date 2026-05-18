import { auth } from "@/lib/auth";
import { getJob, updateJobStatus } from "@/lib/aws/dynamodb";
import { isDevMock } from "@/lib/dev-mode";
import { PIPELINE_STEPS } from "@/types/transformation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POLL_INTERVAL_MS = 3000;
const MAX_STREAM_DURATION_MS = 5 * 60 * 1000;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  const startedAt = Date.now();
  let mockStep = 0;

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };
      const close = () => {
        clearInterval(interval);
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      const tick = async () => {
        if (Date.now() - startedAt > MAX_STREAM_DURATION_MS) {
          send({ status: "timeout" });
          return close();
        }
        try {
          const job = await getJob(params.id);
          if (!job) {
            send({ status: "error", error: "Job not found" });
            return close();
          }
          if (job.tenantId !== session.user.tenantId) {
            send({ status: "error", error: "Forbidden" });
            return close();
          }

          // In dev-mock, advance the progress synthetically so the UI animates.
          if (isDevMock() && job.status === "running") {
            mockStep = Math.min(mockStep + 1, PIPELINE_STEPS.length - 1);
            const progress = Math.min(
              100,
              Math.round(((mockStep + 1) / PIPELINE_STEPS.length) * 100),
            );
            const next = {
              currentStep: PIPELINE_STEPS[mockStep],
              progress,
              filesProcessed: Math.min(
                job.totalFiles || 64,
                Math.round(((job.totalFiles || 64) * progress) / 100),
              ),
              totalFiles: job.totalFiles || 64,
              status: progress >= 100 ? ("completed" as const) : ("running" as const),
              ...(progress >= 100
                ? { completedAt: new Date().toISOString() }
                : {}),
            };
            await updateJobStatus(params.id, next);
            send({ ...job, ...next });
            if (progress >= 100) return close();
            return;
          }

          send({
            status: job.status,
            step: job.currentStep,
            progress: job.progress,
            filesProcessed: job.filesProcessed,
            totalFiles: job.totalFiles,
            outputKey: job.s3OutputKey,
            errorMessage: job.errorMessage,
          });

          if (job.status === "completed" || job.status === "failed") {
            return close();
          }
        } catch (err) {
          send({ status: "error", error: (err as Error).message });
          return close();
        }
      };

      // Initial tick + interval
      await tick();
      const interval = setInterval(tick, POLL_INTERVAL_MS);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
