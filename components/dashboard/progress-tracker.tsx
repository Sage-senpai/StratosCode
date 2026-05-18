"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Circle, Loader2, XCircle } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import {
  PIPELINE_STEPS,
  PIPELINE_STEP_LABELS,
  type JobStatus,
  type PipelineStep,
  type TransformationJob,
} from "@/types/transformation";
import { cn, formatDuration } from "@/lib/utils";

interface StreamPayload {
  status?: JobStatus | "error" | "timeout";
  step?: PipelineStep;
  currentStep?: PipelineStep;
  progress?: number;
  filesProcessed?: number;
  totalFiles?: number;
  error?: string;
  errorMessage?: string;
}

export function ProgressTracker({ job }: { job: TransformationJob }) {
  const router = useRouter();
  const [progress, setProgress] = useState<number>(job.progress);
  const [currentStep, setCurrentStep] = useState<PipelineStep | undefined>(
    job.currentStep,
  );
  const [filesProcessed, setFilesProcessed] = useState(job.filesProcessed);
  const [totalFiles, setTotalFiles] = useState(job.totalFiles);
  const [status, setStatus] = useState<JobStatus>(job.status);
  const [error, setError] = useState<string | undefined>(job.errorMessage);
  const [stepStartedAt, setStepStartedAt] = useState<Record<string, number>>({});
  const [stepCompletedAt, setStepCompletedAt] = useState<Record<string, number>>(
    {},
  );

  useEffect(() => {
    if (status === "completed" || status === "failed") return;

    const es = new EventSource(`/api/transformations/${job.jobId}/status`);
    es.onmessage = (e) => {
      try {
        const data: StreamPayload = JSON.parse(e.data);
        if (data.status === "error" || data.status === "timeout") {
          setError(data.error ?? "Stream error");
          es.close();
          return;
        }
        const nextStep = data.currentStep ?? data.step;
        if (nextStep && nextStep !== currentStep) {
          const now = Date.now();
          setStepStartedAt((m) => ({ ...m, [nextStep]: now }));
          if (currentStep) {
            setStepCompletedAt((m) => ({ ...m, [currentStep]: now }));
          }
          setCurrentStep(nextStep);
        }
        if (typeof data.progress === "number") setProgress(data.progress);
        if (typeof data.filesProcessed === "number")
          setFilesProcessed(data.filesProcessed);
        if (typeof data.totalFiles === "number") setTotalFiles(data.totalFiles);
        if (data.errorMessage) setError(data.errorMessage);
        if (data.status && data.status !== status) {
          const nextStatus = data.status as JobStatus;
          setStatus(nextStatus);
          if (nextStatus === "completed" || nextStatus === "failed") {
            es.close();
            // Trigger a server-component refresh so the page swaps from
            // ProgressTracker into the diff viewer / failed-state panel.
            router.refresh();
          }
        }
      } catch (err) {
        // Bad SSE payload — surface it in the console rather than silently
        // dropping. We don't unblock the stream; the next valid message recovers.
        console.error("[progress-tracker] malformed SSE payload", err);
      }
    };
    es.onerror = () => es.close();
    return () => es.close();
    // Effect intentionally depends only on jobId — re-subscribing on every
    // state tick would tear down and re-open the SSE connection on every
    // server event, which is what we're consuming inside this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job.jobId]);

  const currentIndex = currentStep
    ? PIPELINE_STEPS.indexOf(currentStep)
    : -1;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-[var(--border-default)] bg-surface p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-text-secondary">
            Overall progress
          </p>
          <span className="font-mono text-xs text-text-muted">
            {filesProcessed} / {totalFiles || "—"} files
          </span>
        </div>
        <ProgressBar value={progress} showLabel segments={24} />
        {status === "queued" && currentIndex < 0 && (
          <p className="mt-4 font-mono text-xs text-text-muted">
            // Queued · waiting for the executor to pick up this job.
          </p>
        )}
      </div>

      <ol className="flex flex-col gap-1">
        {PIPELINE_STEPS.map((step, i) => {
          const isCurrent = step === currentStep && status === "running";
          const isComplete = currentIndex > i || status === "completed";
          const isFailed = status === "failed" && i === currentIndex;
          const started = stepStartedAt[step];
          const completed = stepCompletedAt[step];
          const duration =
            started && completed ? formatDuration(completed - started) : null;

          return (
            <li
              key={step}
              className={cn(
                "flex items-center gap-4 rounded-sharp border border-transparent px-4 py-3",
                isCurrent &&
                  "border-[var(--border-default)] bg-cyan-bright/[0.04] shadow-glow-subtle",
              )}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                {isFailed ? (
                  <XCircle className="h-5 w-5 text-error" />
                ) : isComplete ? (
                  <Check className="h-5 w-5 text-success" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 animate-spin text-cyan-bright" />
                ) : (
                  <Circle
                    className="h-5 w-5 text-text-muted"
                    strokeWidth={1.5}
                  />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    "font-heading text-sm font-medium",
                    isComplete || isCurrent
                      ? "text-text-primary"
                      : "text-text-muted",
                  )}
                >
                  {PIPELINE_STEP_LABELS[step]}
                </p>
              </div>
              <div className="flex items-center gap-3">
                {duration && (
                  <span className="font-mono text-xs text-text-muted">
                    {duration}
                  </span>
                )}
                {isFailed ? (
                  <Badge status="failed" />
                ) : isComplete ? (
                  <Badge status="completed" />
                ) : isCurrent ? (
                  <Badge status="running" />
                ) : (
                  <Badge status="pending" />
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {error && (
        <div className="rounded-sharp border border-error/30 bg-error/5 px-4 py-3 font-mono text-xs text-error">
          {error}
        </div>
      )}
    </div>
  );
}
