import { auth } from "@/lib/auth";
import { listJobsByTenant } from "@/lib/aws/dynamodb";
import { Header } from "@/components/dashboard/header";
import { StatsBar } from "@/components/dashboard/stats-bar";
import { TransformationCard } from "@/components/dashboard/transformation-card";
import { EmptyState } from "@/components/dashboard/empty-state";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email ?? "unknown@vetuscloud.local";
  const tenantId = session?.user?.tenantId ?? "default-tenant";
  const jobs = await listJobsByTenant(tenantId);

  return (
    <>
      <Header title="Dashboard" email={email} />
      <div className="flex flex-col gap-8 px-8 py-8">
        <StatsBar jobs={jobs} />

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-text-secondary">
              Recent transformations
            </h2>
            <span className="font-mono text-xs text-text-muted">
              {jobs.length} {jobs.length === 1 ? "job" : "jobs"}
            </span>
          </div>

          {jobs.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="flex flex-col gap-3">
              {jobs.map((job) => (
                <li key={job.jobId}>
                  <TransformationCard job={job} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
