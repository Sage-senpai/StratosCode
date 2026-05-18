import {
  CloudUpload,
  GitBranch,
  Sparkles,
  Boxes,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Node {
  label: string;
  service: string;
  icon: LucideIcon;
}

const NODES: Node[] = [
  { label: "S3 Upload", service: "Amazon S3", icon: CloudUpload },
  { label: "Step Functions", service: "AWS SFN", icon: GitBranch },
  { label: "Claude Sonnet 4", service: "Amazon Bedrock", icon: Sparkles },
  { label: "Transform Model", service: "Amazon SageMaker", icon: Boxes },
  { label: "Output Bundle", service: "Amazon S3", icon: Package },
];

export function ArchitectureDiagram() {
  return (
    <section
      id="architecture"
      className="relative border-t border-[var(--border-subtle)] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mono-label mb-4 text-cyan-bright">// AWS NATIVE</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Pipeline runs entirely in your VPC.
          </h2>
        </div>

        <div className="overflow-x-auto">
          <ol className="flex min-w-[700px] items-stretch gap-3 lg:min-w-0">
            {NODES.map((n, i) => (
              <li key={n.label} className="flex flex-1 items-stretch gap-3">
                <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-l-2 border-[var(--border-subtle)] border-l-cyan-bright bg-surface p-5 text-center">
                  <n.icon
                    className="mb-3 h-7 w-7 text-cyan-bright"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <p className="font-heading text-sm font-semibold text-text-primary">
                    {n.label}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {n.service}
                  </p>
                </div>
                {i < NODES.length - 1 && (
                  <div
                    aria-hidden
                    className="flex items-center text-cyan-bright"
                  >
                    <span className="font-mono text-lg">→</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-10 max-w-3xl font-mono text-xs text-text-muted">
          Built natively on AWS. Every job runs in your account, encrypted with
          customer-managed KMS keys. No code or embeddings leave your VPC.
        </p>
      </div>
    </section>
  );
}
