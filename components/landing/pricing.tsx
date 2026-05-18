import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  price: string;
  priceMeta?: string;
  highlight?: boolean;
  ctaLabel: string;
  ctaVariant: "primary" | "secondary";
  features: Array<{ label: string; included: boolean }>;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    price: "Free",
    ctaLabel: "Start free",
    ctaVariant: "secondary",
    features: [
      { label: "10,000 LOC / month", included: true },
      { label: "2 transformations / month", included: true },
      { label: "Java 7 → Java 21 only", included: true },
      { label: "IaC output", included: true },
      { label: "Test generation", included: false },
      { label: "ADR generation", included: false },
      { label: "Compliance report", included: false },
      { label: "Community support", included: true },
    ],
  },
  {
    name: "Pro",
    price: "$499",
    priceMeta: "/mo",
    highlight: true,
    ctaLabel: "Request Pro",
    ctaVariant: "primary",
    features: [
      { label: "500,000 LOC / month", included: true },
      { label: "20 transformations / month", included: true },
      { label: "All supported language pairs", included: true },
      { label: "IaC output", included: true },
      { label: "Test generation", included: true },
      { label: "ADR generation", included: true },
      { label: "Compliance report", included: false },
      { label: "Email support", included: true },
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    ctaLabel: "Talk to sales",
    ctaVariant: "primary",
    features: [
      { label: "Unlimited LOC", included: true },
      { label: "Unlimited transformations", included: true },
      { label: "All pairs + custom pairs", included: true },
      { label: "IaC output", included: true },
      { label: "Test generation", included: true },
      { label: "ADR generation", included: true },
      { label: "Compliance report (SOX/PCI)", included: true },
      { label: "Dedicated CSM", included: true },
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-[var(--border-subtle)] bg-base/50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mono-label mb-4 text-cyan-bright">// PRICING</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Priced per line, not per developer.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-lg border bg-surface p-6",
                tier.highlight
                  ? "border-[var(--border-default)] border-t-2 border-t-cyan-bright shadow-glow-subtle"
                  : "border-[var(--border-subtle)]",
              )}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-6 inline-flex items-center rounded-badge bg-cyan-bright px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-void">
                  Most popular
                </span>
              )}

              <div>
                <p className="font-heading text-sm font-medium uppercase tracking-wider text-text-secondary">
                  {tier.name}
                </p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-text-primary">
                    {tier.price}
                  </span>
                  {tier.priceMeta && (
                    <span className="font-mono text-sm text-text-muted">
                      {tier.priceMeta}
                    </span>
                  )}
                </p>
              </div>

              <ul className="my-8 flex flex-1 flex-col gap-2.5 text-sm">
                {tier.features.map((f) => (
                  <li
                    key={f.label}
                    className={cn(
                      "flex items-start gap-2.5",
                      !f.included && "text-text-muted",
                    )}
                  >
                    {f.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-bright" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                    )}
                    <span className={cn(f.included && "text-text-primary")}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <a href="#cta">
                <Button variant={tier.ctaVariant} size="md" className="w-full">
                  {tier.ctaLabel}
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
