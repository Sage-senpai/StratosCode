import { auth } from "@/lib/auth";
import { listJobsByTenant } from "@/lib/aws/dynamodb";
import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { TransformationCard } from "@/components/dashboard/transformation-card";
import { EmptyState } from "@/components/dashboard/empty-state";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user) redirect("/?signin=true");

  const email = session.user.email ?? "unknown@vetuscloud.local";
  const tenantId = session.user.tenantId ?? "default-tenant";
  const jobs = await listJobsByTenant(tenantId);

  return (
    <>
      <Header title="All Transformations" email={email} />
      <div className="flex flex-col gap-6 px-8 py-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-heading text-base font-semibold uppercase tracking-wider text-text-secondary">
            Full history
          </h2>
          <span className="font-mono text-xs text-text-muted">
            {jobs.length} total
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
      </div>
    </>
  );
}
