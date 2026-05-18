import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./scroll-reveal";

const PORTRAIT_URL =
  "https://images.unsplash.com/photo-1542178243-bc20204b769f?auto=format&fit=crop&w=1000&q=80";

/**
 * Editorial split: a single founder, not a team grid. Massive serif italic
 * pull-quote on the right; treated portrait + metadata on the left.
 * The portrait is desaturated and tinted with a cyan overlay so it reads as
 * art-directed editorial, not a stock LinkedIn headshot.
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
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            Built by an engineer who&rsquo;s done the migration the hard way.
          </h2>
        </ScrollReveal>

        <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
          {/* LEFT — treated portrait inside a double-bezel frame */}
          <ScrollReveal>
            <figure className="relative">
              {/* outer shell */}
              <div className="rounded-[24px] bg-cyan-bright/[0.06] p-1.5 ring-1 ring-[var(--border-default)]">
                {/* inner core */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-code-bg">
                  <Image
                    src={PORTRAIT_URL}
                    alt="Portrait of Niko Vasilakis at a workstation"
                    fill
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-cover grayscale contrast-[1.05]"
                    priority={false}
                  />
                  {/* cyan duotone tint */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-br from-cyan-bright/20 via-transparent to-void/40 mix-blend-color"
                  />
                  {/* subtle scan-line texture */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.8) 0 1px, transparent 1px 3px)",
                    }}
                  />
                  {/* corner badge */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-sharp bg-void/80 px-2.5 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-bright" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-primary">
                      Founder · 2024
                    </span>
                  </div>
                </div>
              </div>

              {/* meta strip below portrait */}
              <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
                <div>
                  <p className="font-heading text-lg font-semibold text-text-primary">
                    Niko Vasilakis
                  </p>
                  <p className="font-mono text-xs text-text-muted">
                    Founder &amp; Chief Architect
                  </p>
                </div>
                <p className="text-right font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  ex-Aetna · ex-JPMC
                  <br />
                  14M LOC migrated
                </p>
              </figcaption>
            </figure>
          </ScrollReveal>

          {/* RIGHT — editorial pull-quote */}
          <ScrollReveal delay={120} emphasis>
            <blockquote className="relative">
              <span
                aria-hidden
                className="absolute -left-2 -top-12 font-editorial text-[12rem] italic leading-none text-cyan-bright/15 md:-left-6 md:-top-20 md:text-[16rem]"
              >
                &ldquo;
              </span>
              <p className="font-editorial text-3xl italic leading-[1.15] text-text-primary md:text-5xl lg:text-[3.5rem]">
                Every legacy system has a half-life. You either modernize
                before it expires
                <span className="text-cyan-bright"> — </span>
                or after it takes the business down with it.
              </p>
              <footer className="mt-10 max-w-xl font-body text-text-secondary md:text-lg">
                I spent nine years inside actuarial mainframes and core banking
                ledgers, watching teams chip away at COBOL with one-engineer
                rewrite squads and PowerPoint decks. StratosCode is the tool I
                wish we&rsquo;d had: a system that ingests the whole codebase
                at once and ships modern code, IaC, tests, and ADRs together.
              </footer>
              <div className="mt-8">
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
              </div>
            </blockquote>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
