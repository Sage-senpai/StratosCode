import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { auth } from "@/lib/auth";
import { getJob } from "@/lib/aws/dynamodb";
import { getJobOutput, type JobOutput } from "@/lib/job-output";
import { Header } from "@/components/dashboard/header";
import { Badge, type BadgeStatus } from "@/components/ui/badge";
import { ProgressTracker } from "@/components/dashboard/progress-tracker";
import { CodeDiffViewer } from "@/components/dashboard/code-diff-viewer";
import { LineageTable } from "@/components/dashboard/lineage-table";
import { DownloadPanel } from "@/components/dashboard/download-panel";
import { LANGUAGE_LABELS } from "@/types/transformation";
import { formatDuration, formatLOC } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function TransformationDetailPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/?signin=true");

  const job = await getJob(params.id);
  if (!job) notFound();
  if (job.tenantId !== session.user.tenantId) notFound();

  const email = session.user.email ?? "unknown@stratoscode.local";

  const output: JobOutput | null =
    job.status === "completed" ? await getJobOutput(job) : null;

  const duration =
    job.completedAt && job.createdAt
      ? formatDuration(
          new Date(job.completedAt).getTime() -
            new Date(job.createdAt).getTime(),
        )
      : null;

  return (
    <>
      <Header title="Transformation" email={email} showNewButton={false} />

      <div className="flex flex-col gap-8 px-8 py-8">
        <div>
          <nav
            aria-label="Breadcrumb"
            className="mb-3 flex items-center gap-1 font-mono text-xs text-text-muted"
          >
            <Link href="/dashboard" className="hover:text-cyan-bright">
              Dashboard
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-text-secondary">{job.filename}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
              {job.filename}
            </h2>
            <Badge status={job.status as BadgeStatus} />
          </div>

          <p className="mt-2 font-mono text-lg text-cyan-bright">
            {LANGUAGE_LABELS[job.sourceLanguage].toUpperCase()}{" "}
            <span className="text-text-muted">→</span>{" "}
            {LANGUAGE_LABELS[job.targetLanguage].toUpperCase()}
          </p>

          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs">
            <Meta label="Created" value={new Date(job.createdAt).toLocaleString()} />
            <Meta label="LOC" value={formatLOC(job.linesOfCode)} />
            <Meta
              label="Files"
              value={`${job.filesProcessed} / ${job.totalFiles || "—"}`}
            />
            {duration && <Meta label="Duration" value={duration} />}
          </dl>
        </div>

        {/* Content */}
        {(job.status === "running" || job.status === "queued") && (
          <ProgressTracker job={job} />
        )}

        {job.status === "failed" && (
          <div className="rounded-lg border border-error/30 bg-error/[0.05] p-6">
            <h3 className="font-heading text-base font-semibold text-error">
              Transformation failed
            </h3>
            <p className="mt-2 font-mono text-sm text-text-secondary">
              {job.errorMessage ??
                "Transformation encountered an error. Our team has been notified. Your input code is still available for retry."}
            </p>
          </div>
        )}

        {job.status === "completed" && output && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
            <div className="flex flex-col gap-8 min-w-0">
              <section>
                <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Diff Viewer
                </h3>
                <CodeDiffViewer
                  files={output.diffFiles}
                  sourceLanguage={job.sourceLanguage}
                  targetLanguage={job.targetLanguage}
                />
              </section>
              <section>
                <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-text-secondary">
                  Transformation Lineage
                </h3>
                <LineageTable entries={output.lineage} />
              </section>
            </div>
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <DownloadPanel downloads={output.downloads} />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="text-text-primary">{value}</dd>
    </div>
  );
}
