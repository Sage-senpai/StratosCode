"use client";

import { useEffect } from "react";
import { AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main className="bg-grid relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="relative z-10 max-w-md text-center">
        <AlertOctagon
          className="mx-auto mb-6 h-10 w-10 text-error"
          strokeWidth={1.5}
        />
        <p className="mono-label mb-2 text-error">// SYSTEM ERROR</p>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Something went wrong.
        </h1>
        <p className="mt-3 font-mono text-sm text-text-secondary">
          {error.message || "An unexpected error occurred while processing your request."}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
            digest: {error.digest}
          </p>
        )}
        <div className="mt-8 flex justify-center gap-3">
          <Button variant="primary" onClick={reset}>
            Try again
          </Button>
          <a href="/dashboard">
            <Button variant="secondary">Back to dashboard</Button>
          </a>
        </div>
      </div>
    </main>
  );
}
