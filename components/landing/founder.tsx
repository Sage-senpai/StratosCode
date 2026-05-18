import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

interface FounderCard {
  name: string;
  title: string;
  portrait: string;
  location: string;
  badge: string;
  facts: Array<{ label: string; value: string }>;
  blurb: string;
  priority?: boolean;
}

const FOUNDERS: FounderCard[] = [
  {
    name: "Niko Vasilakis",
    title: "Founder & Chief Architect",
    portrait:
      "https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=900&q=80",
    location: "New York · US",
    badge: "Founder · 2025",
    facts: [
      { label: "Years migrating", value: "5" },
      { label: "LOC shipped", value: "3M" },
      { label: "Domains", value: "Banking · Insurance" },
      { label: "Stack", value: "COBOL · Java · C#" },
    ],
    blurb:
      "Five years inside actuarial mainframes and core banking ledgers. Led two production migrations at Aetna and JPMC before walking out to build the tool he wished those teams had.",
    priority: true,
  },
  {
    name: "Adaeze Onyebuchi",
    title: "Co-founder & VP of Engineering",
    portrait:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
    location: "Enugu · NG",
    badge: "Co-founder · 2025",
    facts: [
      { label: "Years migrating", value: "5" },
      { label: "LOC shipped", value: "4M" },
      { label: "Region", value: "West Africa" },
      { label: "Stack", value: "COBOL · NATURAL · Java" },
    ],
    blurb:
      "Led core banking modernization at a Tier-1 Lagos bank from 2020 to 2024. Runs the Enugu engineering hub — currently shipping migrations for two of West Africa's largest financial institutions.",
  },
];

/**
 * Editorial two-founder spread, not a meet-the-team grid:
 *   - Each founder gets a treated portrait inside a double-bezel frame
 *   - Facts strip is mono and minimal
 *   - One oversized editorial pull-quote below — Adaeze's Africa-tech insight,
 *     which is the most distinctive line on the page.
 */
export function Founder() {
  return (
    <section
      id="founder"
      className="relative border-t border-[var(--border-subtle)] py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <p className="mono-label mb-4 text-cyan-bright">// ORIGIN</p>
          <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Built by engineers who&rsquo;ve done the migration the hard way.
          </h2>
        </ScrollReveal>

        {/* Two founder cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-2 lg:gap-14">
          {FOUNDERS.map((founder, i) => (
            <ScrollReveal key={founder.name} delay={i * 120}>
              <article className="flex flex-col gap-6 md:flex-row md:items-stretch">
                {/* Portrait */}
                <figure className="md:w-[44%] md:shrink-0">
                  <div className="rounded-[22px] bg-cyan-bright/[0.06] p-1.5 ring-1 ring-[var(--border-default)]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-code-bg">
                      <Image
                        src={founder.portrait}
                        alt={`Portrait of ${founder.name}`}
                        fill
                        sizes="(min-width: 1024px) 240px, (min-width: 768px) 280px, 90vw"
                        className="object-cover grayscale contrast-[1.05]"
                        priority={founder.priority}
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-br from-cyan-bright/20 via-transparent to-void/40 mix-blend-color"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0 1px, transparent 1px 3px)",
                        }}
                      />
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sharp bg-void/80 px-2.5 py-1.5 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">
                          {founder.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </figure>

                {/* Meta + blurb */}
                <div className="flex flex-1 flex-col">
                  <p className="mono-label text-text-muted">
                    // {founder.badge.toUpperCase()}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-text-primary">
                    {founder.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyan-bright">
                    {founder.title}
                  </p>

                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[var(--border-subtle)] pt-4">
                    {founder.facts.map((f) => (
                      <div key={f.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                          {f.label}
                        </dt>
                        <dd className="mt-0.5 font-mono text-xs text-text-primary">
                          {f.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <p className="mt-5 flex-1 font-body text-sm text-text-secondary md:text-base">
                    {founder.blurb}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        {/* Editorial pull-quote — Adaeze's Africa insight */}
        <ScrollReveal delay={120} emphasis className="mt-20 md:mt-28">
          <blockquote className="relative mx-auto max-w-5xl">
            <span
              aria-hidden
              className={cn(
                "absolute -left-2 -top-10 font-editorial italic leading-none text-cyan-bright/15",
                "text-[10rem] md:-left-6 md:-top-16 md:text-[14rem]",
              )}
            >
              &ldquo;
            </span>
            <p className="font-editorial text-3xl italic leading-[1.15] text-text-primary md:text-5xl lg:text-[3.25rem]">
              Western analysts call African engineering
              <span className="text-text-muted"> &lsquo;emerging.&rsquo; </span>
              It isn&rsquo;t. The team in Enugu ships migrations for two of
              West Africa&rsquo;s largest banks. We didn&rsquo;t build
              StratosCode
              <span className="text-cyan-bright"> for </span>
              them — they built it
              <span className="text-cyan-bright"> with </span>us.
            </p>
            <footer className="mt-8 flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span className="h-px w-12 bg-cyan-bright/40" />
              Adaeze Onyebuchi · Co-founder
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={200} className="mt-16 flex justify-center">
          <Link href="/about" className="inline-block">
            <Button variant="secondary" size="md" className="group">
              Read the full story
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-bright/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <ArrowUpRight className="h-3.5 w-3.5 text-cyan-bright" />
              </span>
            </Button>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
