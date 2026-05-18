import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-grid relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="relative z-10 max-w-md text-center">
        <FileQuestion
          className="mx-auto mb-6 h-10 w-10 text-cyan-bright"
          strokeWidth={1.5}
        />
        <p className="mono-label mb-2 text-cyan-bright">// 404</p>
        <h1 className="font-display text-3xl font-bold text-text-primary">
          Job not found.
        </h1>
        <p className="mt-3 font-mono text-sm text-text-secondary">
          The transformation you&rsquo;re looking for doesn&rsquo;t exist or you
          don&rsquo;t have access to it.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/dashboard">
            <Button variant="primary">Back to dashboard</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
