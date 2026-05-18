import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

export const metadata: Metadata = {
  title: "About · StratosCode",
  description:
    "Why we built StratosCode — a legacy code modernization engine designed by engineers who've done the migration the hard way.",
};

const PORTRAIT_URL =
  "https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=1200&q=80";

const TIMELINE = [
  {
    year: "2015",
    title: "First migration",
    body: "Joined a global insurance carrier as a principal engineer. First assignment: extract a 1980s actuarial reserving engine from a CICS mainframe.",
  },
  {
    year: "2018",
    title: "The 14M LOC year",
    body: "Led a 40-engineer team rewriting the company's core ledger from COBOL to Java. Two-year project, three regulator delays, one rewritten compliance report.",
  },
  {
    year: "2022",
    title: "The Bedrock moment",
    body: "Watched Claude Sonnet read a 200K-line module in one shot and produce a transformation plan a senior architect would have spent three weeks writing.",
  },
  {
    year: "2024",
    title: "StratosCode",
    body: "Founded the company. First customer: a fintech with 4.2M lines of Java 7 they'd been deferring since 2019.",
  },
];

const PRINCIPLES = [
  {
    label: "Code first, slides second",
    body: "We ship a working transformation, not a transformation plan. Customers see modern code before they see the invoice.",
  },
  {
    label: "Every migration is a compliance migration",
    body: "Banking and insurance customers don't get to lose business logic in translation. Every job ships with a behavioral-equivalence report.",
  },
  {
    label: "Open formats",
    body: "Output is plain Java, Python, or C# in a Git-ready bundle. No proprietary runtime. No lock-in.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="bg-grid relative overflow-hidden border-b border-[var(--border-subtle)]">
        <div className="radial-glow-cyan absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <ScrollReveal>
            <p className="mono-label mb-6 text-cyan-bright">// ABOUT</p>
          </ScrollReveal>
          <ScrollReveal delay={80} emphasis>
            <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-text-primary md:text-7xl lg:text-8xl">
              We build for the systems
              <br />
              <span className="font-editorial font-normal italic text-cyan-bright md:text-[1.05em]">
                that keep the world running.
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-10 max-w-2xl font-body text-lg text-text-secondary md:text-xl">
              Banks. Insurers. Logistics. Air traffic. Tax. The systems
              everyone depends on, written in languages most engineers
              graduating today have never seen.
              <br />
              <br />
              StratosCode is the modernization engine those systems should have
              had ten years ago.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FOUNDER SPREAD */}
      <section className="relative py-28 md:py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-24">
            <ScrollReveal>
              <figure>
                <div className="rounded-[28px] bg-cyan-bright/[0.06] p-1.5 ring-1 ring-[var(--border-default)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-code-bg">
                    <Image
                      src={PORTRAIT_URL}
                      alt="Portrait of Niko Vasilakis"
                      fill
                      sizes="(min-width: 1024px) 480px, 90vw"
                      className="object-cover grayscale contrast-[1.05]"
                      priority
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
                  </div>
                </div>
                <figcaption className="mt-6">
                  <p className="font-heading text-2xl font-semibold text-text-primary">
                    Niko Vasilakis
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyan-bright">
                    Founder &amp; Chief Architect
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--border-subtle)] pt-5 text-xs">
                    <Fact label="Years migrating" value="9" />
                    <Fact label="LOC shipped" value="14M+" />
                    <Fact label="Languages" value="COBOL · Java · C#" />
                    <Fact label="Regulators" value="3" />
                  </dl>
                </figcaption>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div>
                <p className="mono-label mb-4 text-text-muted">
                  // FOUNDER&rsquo;S NOTE
                </p>
                <p className="font-editorial text-3xl italic leading-tight text-text-primary md:text-4xl">
                  I&rsquo;ve sat in too many meetings where a director points at
                  a screen full of COBOL and asks why the rewrite is still a
                  year out.
                </p>
                <div className="mt-10 space-y-5 font-body text-base text-text-secondary md:text-lg">
                  <p>
                    The answer was always the same. We didn&rsquo;t have a
                    model that could hold an entire codebase in context. We
                    didn&rsquo;t have a runtime that could produce IaC,
                    compliance reports, and equivalence proofs alongside the
                    transformed code. We didn&rsquo;t have a pipeline that
                    could run inside our own VPC without a six-month security
                    review.
                  </p>
                  <p>
                    We do now. Sonnet 4 reads a 1M-line repository in one shot.
                    Bedrock and SageMaker run end-to-end on your account.
                    Aurora pgvector handles the semantic graph. Step Functions
                    orchestrate the eight stages.
                  </p>
                  <p>
                    StratosCode is the orchestration layer that ties those
                    primitives into a product. We didn&rsquo;t invent the
                    technology. We built the tool the migration team should
                    have had on day one.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative border-t border-[var(--border-subtle)] bg-base/40 py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <p className="mono-label mb-4 text-cyan-bright">// TIMELINE</p>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Nine years from{" "}
              <span className="font-editorial font-normal italic">
                migration engineer
              </span>{" "}
              to founder.
            </h2>
          </ScrollReveal>

          <ol className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 80} as="li">
                <div className="border-t border-[var(--border-default)] pt-4">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-bright">
                    {t.year}
                  </p>
                  <h3 className="mt-3 font-heading text-lg font-semibold text-text-primary">
                    {t.title}
                  </h3>
                  <p className="mt-3 font-body text-sm text-text-secondary">
                    {t.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="relative border-t border-[var(--border-subtle)] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-24">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <p className="mono-label mb-4 text-cyan-bright">// PRINCIPLES</p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                  How we work.
                </h2>
              </div>
            </ScrollReveal>

            <ul className="divide-y divide-[var(--border-subtle)]">
              {PRINCIPLES.map((p, i) => (
                <ScrollReveal key={p.label} delay={i * 80} as="li">
                  <div className="grid grid-cols-[2.5rem_1fr] gap-6 py-8 md:grid-cols-[3.5rem_1fr]">
                    <span className="font-mono text-xs text-text-muted">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-text-primary md:text-2xl">
                        {p.label}
                      </h3>
                      <p className="mt-3 font-body text-text-secondary md:text-lg">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative border-t border-[var(--border-subtle)] py-28 md:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <p className="font-editorial text-3xl italic leading-tight text-text-primary md:text-5xl">
              Built for the systems that keep the world running.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/#cta">
                <Button variant="primary" size="lg" className="group">
                  Request Early Access
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </Button>
              </Link>
              <Link href="/#architecture">
                <Button variant="secondary" size="lg">
                  Read the Architecture
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-text-primary">{value}</dd>
    </div>
  );
}
