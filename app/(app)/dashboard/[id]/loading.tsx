import { Header } from "@/components/dashboard/header";

export default function DetailLoading() {
  return (
    <>
      <Header title="Transformation" email="…" showNewButton={false} />
      <div className="flex flex-col gap-8 px-8 py-8">
        <div>
          <div className="h-3 w-40 animate-pulse rounded bg-[var(--border-subtle)]" />
          <div className="mt-3 h-8 w-72 animate-pulse rounded bg-[var(--border-subtle)]" />
          <div className="mt-3 h-5 w-48 animate-pulse rounded bg-[var(--border-subtle)]" />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded bg-[var(--border-subtle)]"
              style={{ opacity: 0.5 + (10 - i) * 0.04 }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
