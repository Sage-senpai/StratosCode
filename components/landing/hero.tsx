"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const COBOL_SNIPPET = [
  "IDENTIFICATION DIVISION.",
  "PROGRAM-ID. LEDGER-CALC.",
  "DATA DIVISION.",
  "WORKING-STORAGE SECTION.",
  "01  ACCOUNT-BALANCE   PIC 9(9)V99 COMP-3.",
  "PROCEDURE DIVISION.",
  "    ADD DEPOSIT TO ACCOUNT-BALANCE.",
];

const JAVA_SNIPPET = [
  "public record Account(",
  "    String id,",
  "    BigDecimal balance",
  ") {",
  "    public Account credit(BigDecimal amount) {",
  "        return new Account(id, balance.add(amount));",
  "    }",
  "}",
];

export function Hero() {
  const [phase, setPhase] = useState<"legacy" | "deleting" | "modern">("legacy");

  useEffect(() => {
    // Respect prefers-reduced-motion: hold the final "modern" frame and skip
    // the loop. Users who toggle the preference later see the change on reload,
    // which matches platform conventions for in-flight animations.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPhase("modern");
      return;
    }
    const cycle = () => {
      setPhase("legacy");
      const t1 = setTimeout(() => setPhase("deleting"), 3500);
      const t2 = setTimeout(() => setPhase("modern"), 5000);
      const t3 = setTimeout(cycle, 9000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    };
    const cleanup = cycle();
    return cleanup;
  }, []);

  return (
    <section className="bg-grid relative overflow-hidden">
      <div className="radial-glow-cyan absolute inset-0" aria-hidden />
      <div className="scanline" aria-hidden />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-5 md:py-24">
        {/* LEFT: Copy */}
        <div className="md:col-span-3">
          <p className="mono-label mb-6 text-cyan-bright">
            // LEGACY CODE MODERNIZATION ENGINE
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            Turn dead code into{" "}
            <span className="font-editorial font-normal italic tracking-tight text-cyan-bright md:text-[1.05em]">
              cloud-native assets.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
            VetusCloud ingests your COBOL, Java 7, and .NET 4.x systems and
            outputs production-ready modern code &mdash; complete with IaC, unit
            tests, and architecture decision records.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#cta">
              <Button variant="primary" size="lg">
                Request Early Access
              </Button>
            </a>
            <a href="#architecture">
              <Button variant="secondary" size="lg">
                Read the Architecture
              </Button>
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--border-subtle)] pt-8">
            <Stat value="47K+" label="LOC modernized daily" />
            <Stat value="~70%" label="Migration time reduction" />
            <Stat value="3" label="Cloud-native targets" />
          </dl>
        </div>

        {/* RIGHT: Terminal panel */}
        <div className="md:col-span-2">
          <TerminalPanel phase={phase} />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-mono text-2xl font-medium text-cyan-bright md:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-text-muted">
        {label}
      </dd>
    </div>
  );
}

function TerminalPanel({ phase }: { phase: "legacy" | "deleting" | "modern" }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-lg bg-cyan-bright/5 blur-2xl" />
      <div className="relative overflow-hidden rounded-lg border border-[var(--border-default)] bg-code-bg shadow-glow-subtle">
        {/* terminal header */}
        <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-base/60 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
          <span className="ml-3 font-mono text-[11px] text-text-muted">
            vetuscloud@engine:~$ transform --source=cobol --target=java21
          </span>
        </div>

        <div className="p-5 font-mono text-[12.5px] leading-relaxed md:text-[13.5px]">
          {phase === "legacy" &&
            COBOL_SNIPPET.map((line, i) => (
              <div
                key={i}
                className="text-error/80 transition-opacity"
                style={{ opacity: 0.6 + i * 0.05 }}
              >
                <span className="mr-3 text-text-muted">{(i + 1).toString().padStart(2, "0")}</span>
                {line}
              </div>
            ))}

          {phase === "deleting" &&
            COBOL_SNIPPET.map((line, i) => (
              <div key={i} className="text-error/60 line-through">
                <span className="mr-3 text-text-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {line}
              </div>
            ))}

          {phase === "modern" &&
            JAVA_SNIPPET.map((line, i) => (
              <div
                key={i}
                className="text-cyan-bright animate-in fade-in"
                style={{ animationDelay: `${i * 80}ms`, animationDuration: "300ms" }}
              >
                <span className="mr-3 text-text-muted">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {line}
              </div>
            ))}
          <div className="mt-3 inline-block h-4 w-2 animate-pulse bg-cyan-bright" />
        </div>
      </div>
    </div>
  );
}
