import { formatLOC, formatDuration } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { TransformationJob } from "@/types/transformation";

export function StatsBar({ jobs }: { jobs: TransformationJob[] }) {
  const total = jobs.length;
  const completed = jobs.filter((j) => j.status === "completed");
  const totalLOC = completed.reduce((sum, j) => sum + (j.linesOfCode ?? 0), 0);
  const avgDurationMs =
    completed.length > 0
      ? completed.reduce((sum, j) => {
          if (!j.completedAt) return sum;
          return (
            sum +
            (new Date(j.completedAt).getTime() -
              new Date(j.createdAt).getTime())
          );
        }, 0) / completed.length
      : 0;
  const successRate = total > 0 ? (completed.length / total) * 100 : 0;

  const stats: Array<{ value: string; label: string }> = [
    { value: total.toString(), label: "Total transformations" },
    { value: formatLOC(totalLOC), label: "LOC modernized" },
    {
      value: avgDurationMs > 0 ? formatDuration(avgDurationMs) : "—",
      label: "Avg. duration",
    },
    {
      value: total > 0 ? `${Math.round(successRate)}%` : "—",
      label: "Success rate",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="p-5">
          <p className="font-mono text-3xl font-bold text-text-primary md:text-4xl">
            {s.value}
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {s.label}
          </p>
        </Card>
      ))}
    </div>
  );
}
