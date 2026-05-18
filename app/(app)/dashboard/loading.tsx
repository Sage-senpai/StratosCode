import { Header } from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <>
      <Header title="Dashboard" email="…" />
      <div className="flex flex-col gap-8 px-8 py-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="p-5">
              <div className="h-8 w-20 animate-pulse rounded bg-[var(--border-subtle)]" />
              <div className="mt-3 h-3 w-32 animate-pulse rounded bg-[var(--border-subtle)]" />
            </Card>
          ))}
        </div>
        <div>
          <div className="mb-4 h-4 w-48 animate-pulse rounded bg-[var(--border-subtle)]" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-5">
                <div className="h-5 w-2/3 animate-pulse rounded bg-[var(--border-subtle)]" />
                <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-[var(--border-subtle)]" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
