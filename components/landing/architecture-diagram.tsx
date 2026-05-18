import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Three tiers of node, each visually distinct:
 *   - I/O (dashed border, transient)
 *   - Orchestrator (solid cyan accent, the only "active" path)
 *   - Compute fan-out (parallel branch, grouped panel)
 */

const PARALLEL_COMPUTE = [
  { name: "Bedrock", detail: "Claude Sonnet 4 · plan + IaC + ADR" },
  { name: "SageMaker", detail: "Fine-tuned transform endpoint" },
  { name: "Aurora pgvector", detail: "Embeddings · semantic search" },
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
          <div className="min-w-[720px] lg:min-w-0">
            {/* Top row: linear path */}
            <div className="grid grid-cols-[1fr_auto_1.4fr_auto_1fr] items-stretch gap-3">
              <IONode label="S3 Input" detail="Encrypted archive" />
              <Connector />
              <OrchestratorNode />
              <Connector />
              <IONode label="S3 Output" detail="Bundle · IaC · ADR" />
            </div>

            {/* Drop-down indicator from orchestrator to fan-out */}
            <div className="grid grid-cols-[1fr_auto_1.4fr_auto_1fr] items-stretch">
              <div />
              <div />
              <div className="relative h-6">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[var(--border-default)]" />
              </div>
              <div />
              <div />
            </div>

            {/* Fan-out panel */}
            <div className="grid grid-cols-[1fr_auto_1.4fr_auto_1fr]">
              <div />
              <div />
              <FanOutPanel />
              <div />
              <div />
            </div>
          </div>
        </div>

        <p className="mt-12 max-w-3xl font-mono text-xs text-text-muted">
          Built natively on AWS. Every job runs in your account, encrypted with
          customer-managed KMS keys. No code or embeddings leave your VPC.
        </p>
      </div>
    </section>
  );
}

function IONode({ label, detail }: { label: string; detail: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--border-default)] bg-surface/40 p-5 text-center">
      <p className="font-heading text-sm font-semibold text-text-secondary">
        {label}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {detail}
      </p>
    </div>
  );
}

function OrchestratorNode() {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-lg border border-cyan-bright/40 bg-cyan-bright/[0.04] p-5 text-center shadow-glow-subtle">
      <span className="absolute -top-2 left-3 bg-void px-1 font-mono text-[9px] uppercase tracking-wider text-cyan-bright">
        Active path
      </span>
      <p className="font-heading text-base font-semibold text-text-primary">
        Step Functions
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        10-step state machine
      </p>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center" aria-hidden>
      <ArrowRight className="h-5 w-5 text-cyan-bright/70" />
    </div>
  );
}

function FanOutPanel() {
  return (
    <div className="rounded-lg border border-[var(--border-subtle)] bg-base/40 p-4">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        Parallel compute · fan-out
      </p>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {PARALLEL_COMPUTE.map((n) => (
          <li
            key={n.name}
            className={cn(
              "rounded-sharp border border-[var(--border-subtle)] bg-surface px-3 py-2",
            )}
          >
            <p className="font-heading text-xs font-semibold text-text-primary">
              {n.name}
            </p>
            <p className="font-mono text-[10px] text-text-muted">{n.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
