import { Brain, Code2, Rocket, Upload, type LucideIcon } from "lucide-react";

interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    num: "01",
    icon: Upload,
    title: "Ingest",
    description:
      "Upload your legacy code archive or connect a Git repository. Our multi-language parser builds your full dependency graph.",
  },
  {
    num: "02",
    icon: Brain,
    title: "Analyze",
    description:
      "Claude Sonnet 4 reads your full codebase in one context window, identifies patterns, and generates a transformation plan — module by module.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Transform",
    description:
      "A SageMaker model fine-tuned on 50,000+ legacy→modern code pairs rewrites every file. IaC, tests, and ADRs are generated in parallel.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Deploy",
    description:
      "Download your modern code bundle with CloudFormation + CDK templates pre-configured for AWS. One `cdk deploy` away from production.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative border-t border-[var(--border-subtle)] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mono-label mb-4 text-cyan-bright">// PIPELINE</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            From legacy archive to deployable bundle in minutes.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-px bg-[var(--border-subtle)] md:grid-cols-4">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative bg-void p-8 transition-colors hover:bg-surface/60"
            >
              <span
                aria-hidden
                className="absolute right-4 top-2 select-none font-display text-7xl font-bold text-[var(--border-subtle)]"
              >
                {step.num}
              </span>
              <div className="relative">
                <step.icon
                  className="mb-6 h-7 w-7 text-cyan-bright"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mb-3 font-heading text-lg font-semibold text-text-primary">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-px w-12 -translate-y-1/2 translate-x-full md:block"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--border-default) 50%, transparent 50%)",
                    backgroundSize: "8px 1px",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
