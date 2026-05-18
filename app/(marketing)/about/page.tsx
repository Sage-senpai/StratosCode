import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

export const metadata: Metadata = {
  title: "About · StratosCode",
  description:
    "Why we built StratosCode — a legacy code modernization engine born in Enugu, Nigeria, with engineering hubs serving West Africa and Latin America.",
};

interface FounderProfile {
  name: string;
  title: string;
  location: string;
  portrait: string;
  facts: Array<{ label: string; value: string }>;
  eyebrow: string;
  pullQuote: string;
  paragraphs: string[];
  priority?: boolean;
}

const FOUNDERS: FounderProfile[] = [
  {
    name: "Chikamso Livinus Uzuagu",
    title: "Founder & CEO",
    location: "Enugu · NG",
    portrait:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1100&q=80",
    facts: [
      { label: "Years migrating", value: "5" },
      { label: "LOC shipped", value: "4M+" },
      { label: "Region", value: "West Africa" },
      { label: "Banks served", value: "Tier-1 · WA" },
    ],
    eyebrow: "// FOUNDER'S NOTE",
    pullQuote:
      "Africa's engineering market doubled while the West argued about whether AI would replace developers.",
    paragraphs: [
      "I spent five years leading the core banking modernization at a Tier-1 Lagos bank. Same COBOL, same NATURAL, same forty-year-old batch jobs running interest accruals overnight. None of the tooling people in New York or London were complaining about not having — we didn't have it either.",
      "What we did have was an engineering bench that had grown 3x in five years. The hub I now run in Enugu is full of engineers who learned Kafka before they learned mainframe paradigms. They ship migrations faster than the teams I've worked with in the West. That isn't a story the analysts have caught up to yet.",
      "Camila and I met at AWS re:Invent in 2023, both giving variations of the same talk on why nobody had productized this. We started the company a year later. The headquarters stays in Enugu — that's where it had to be. Mexico City became the second hub the day we shipped our first migration.",
    ],
    priority: true,
  },
  {
    name: "Camila Reyes",
    title: "Co-founder & VP of Engineering",
    location: "Mexico City · MX",
    portrait:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1100&q=80",
    facts: [
      { label: "Years migrating", value: "5" },
      { label: "LOC shipped", value: "3M+" },
      { label: "Domains", value: "Banking · Fintech" },
      { label: "Migrations led", value: "4" },
    ],
    eyebrow: "// CO-FOUNDER'S NOTE",
    pullQuote:
      "Latin America runs as much COBOL as the United States. The teams modernizing it are mostly in cities Western VCs don't fly to.",
    paragraphs: [
      "I've sat in too many meetings where a director points at a screen full of COBOL and asks why the rewrite is still a year out. At Banorte. At Santander México. At three more banks I worked with as a consultant.",
      "The answer was always the same. We didn't have a model that could hold an entire codebase in context. We didn't have a runtime that could produce IaC, compliance reports, and equivalence proofs alongside the transformed code. We didn't have a pipeline that could run inside our own VPC without a six-month security review.",
      "Chikamso had been running the same conversation in Lagos. We met at re:Invent in 2023 and stopped pretending it wasn't the same problem. Mexico City became the second hub on day one. Latin America runs as much COBOL as the United States — somebody had to build for it, and the founder's chair was always going to be in Enugu.",
    ],
  },
];

const TIMELINE = [
  {
    year: "2020",
    title: "Parallel starts",
    body: "Chikamso took on core banking modernization at a Tier-1 bank in Lagos. Camila joined Banorte's COBOL ledger team in Mexico City. Same problem, two continents.",
  },
  {
    year: "2023",
    title: "The conversation",
    body: "Met at AWS re:Invent in Las Vegas comparing migration war stories. Started sketching what a real modernization product would look like on a hotel napkin.",
  },
  {
    year: "2024",
    title: "The Bedrock moment",
    body: "Watched Sonnet 4 read a 200K-line module in one shot and produce a transformation plan a senior architect would have spent three weeks writing.",
  },
  {
    year: "2025",
    title: "StratosCode",
    body: "Founded the company. Enugu becomes headquarters; the Mexico City hub opens the same week. First customer — a fintech with 4.2M lines of Java 7 — signs in Q2.",
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
    label: "Open formats, no lock-in",
    body: "Output is plain Java, Python, or C# in a Git-ready bundle. No proprietary runtime. Customers can leave us at any time and keep their code.",
  },
  {
    label: "Engineering hubs, not branch offices",
    body: "Both Enugu and Mexico City own production migrations end-to-end. Same on-call rotation, same review standard, same equity. The company moves outward from emerging markets, not into them.",
  },
];

const HUBS = [
  {
    city: "Enugu",
    region: "Nigeria · Headquarters",
    note: "Founding team, platform engineering, West Africa banking and fintech migrations. The company's center of gravity.",
    metric: "EST. 2025 · HQ",
  },
  {
    city: "Mexico City",
    region: "Mexico · LATAM Hub",
    note: "Latin America go-to-market, production migrations for Mexican and Andean banking. Opened with the first customer.",
    metric: "EST. 2025",
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
              StratosCode is the modernization engine those systems should
              have had ten years ago. It was born in Enugu, and it moves
              outward from there.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* FOUNDERS — two spreads */}
      <section className="relative py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <p className="mono-label mb-4 text-cyan-bright">// FOUNDERS</p>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Two engineers,{" "}
              <span className="font-editorial font-normal italic">
                same problem,
              </span>{" "}
              two continents.
            </h2>
          </ScrollReveal>

          <div className="mt-20 flex flex-col gap-28 md:gap-36">
            {FOUNDERS.map((f, i) => (
              <FounderSpread key={f.name} founder={f} reversed={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* HUBS — where we're built */}
      <section className="relative border-t border-[var(--border-subtle)] bg-base/40 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <p className="mono-label mb-4 text-cyan-bright">
              // WHERE WE&rsquo;RE BUILT
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Headquartered in Enugu.{" "}
              <span className="font-editorial font-normal italic">
                Moving outward.
              </span>
            </h2>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            {HUBS.map((hub, i) => (
              <ScrollReveal key={hub.city} delay={i * 100}>
                <div className="rounded-[20px] bg-cyan-bright/[0.04] p-1.5 ring-1 ring-[var(--border-default)]">
                  <div className="rounded-[14px] border border-[var(--border-subtle)] bg-surface p-8 md:p-10">
                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-1 h-5 w-5 shrink-0 text-cyan-bright"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <div>
                        <p className="font-display text-3xl font-bold text-text-primary md:text-4xl">
                          {hub.city}
                        </p>
                        <p className="mt-1 font-mono text-xs uppercase tracking-wider text-text-muted">
                          {hub.region}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 font-body text-text-secondary md:text-lg">
                      {hub.note}
                    </p>
                    <p className="mt-6 border-t border-[var(--border-subtle)] pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-bright">
                      {hub.metric}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative border-t border-[var(--border-subtle)] py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <p className="mono-label mb-4 text-cyan-bright">// TIMELINE</p>
            <h2 className="max-w-3xl font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
              Five years from{" "}
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
      <section className="relative border-t border-[var(--border-subtle)] bg-base/40 py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-24">
            <ScrollReveal>
              <div className="lg:sticky lg:top-32">
                <p className="mono-label mb-4 text-cyan-bright">
                  // PRINCIPLES
                </p>
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

      {/* CLOSING */}
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

function FounderSpread({
  founder,
  reversed,
}: {
  founder: FounderProfile;
  reversed: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-20 ${
        reversed ? "lg:[&>figure]:order-2" : ""
      }`}
    >
      <ScrollReveal>
        <figure>
          <div className="rounded-[26px] bg-cyan-bright/[0.06] p-1.5 ring-1 ring-[var(--border-default)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-code-bg">
              <Image
                src={founder.portrait}
                alt={`Portrait of ${founder.name}`}
                fill
                sizes="(min-width: 1024px) 440px, 90vw"
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
                <MapPin className="h-3 w-3 text-cyan-bright" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">
                  {founder.location}
                </span>
              </div>
            </div>
          </div>
          <figcaption className="mt-6">
            <p className="font-heading text-2xl font-semibold text-text-primary">
              {founder.name}
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-cyan-bright">
              {founder.title}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[var(--border-subtle)] pt-5 text-xs">
              {founder.facts.map((f) => (
                <div key={f.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-text-primary">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </figcaption>
        </figure>
      </ScrollReveal>

      <ScrollReveal delay={120}>
        <div>
          <p className="mono-label mb-4 text-text-muted">{founder.eyebrow}</p>
          <p className="font-editorial text-3xl italic leading-tight text-text-primary md:text-4xl">
            {founder.pullQuote}
          </p>
          <div className="mt-10 space-y-5 font-body text-base text-text-secondary md:text-lg">
            {founder.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
