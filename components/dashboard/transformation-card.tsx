import Link from "next/link";
import { ChevronRight, FileArchive } from "lucide-react";
import { Badge, type BadgeStatus } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LANGUAGE_LABELS, type TransformationJob } from "@/types/transformation";
import { formatLOC } from "@/lib/utils";

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function TransformationCard({ job }: { job: TransformationJob }) {
  return (
    <Link href={`/dashboard/${job.jobId}`} className="block">
      <Card
        interactive
        className="group flex items-center gap-6 border-l-2 border-l-transparent p-5 transition-colors hover:border-l-cyan-bright"
      >
        <FileArchive
          className="h-6 w-6 shrink-0 text-text-secondary group-hover:text-cyan-bright"
          strokeWidth={1.5}
          aria-hidden
        />

        <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-6">
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-semibold text-text-primary">
              {job.filename}
            </p>
            <p className="mt-1 font-mono text-xs text-cyan-bright">
              {LANGUAGE_LABELS[job.sourceLanguage].toUpperCase()}{" "}
              <span className="text-text-muted">→</span>{" "}
              {LANGUAGE_LABELS[job.targetLanguage].toUpperCase()}
            </p>
          </div>

          <dl className="mt-3 flex gap-6 md:mt-0">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                LOC
              </dt>
              <dd className="font-mono text-sm text-text-primary">
                {formatLOC(job.linesOfCode)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Files
              </dt>
              <dd className="font-mono text-sm text-text-primary">
                {job.filesProcessed} / {job.totalFiles || "—"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                Created
              </dt>
              <dd className="font-mono text-sm text-text-primary">
                {relativeTime(job.createdAt)}
              </dd>
            </div>
          </dl>

          <div className="mt-3 flex items-center gap-3 md:mt-0">
            <Badge status={job.status as BadgeStatus} />
            <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-cyan-bright" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
