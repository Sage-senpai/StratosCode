import { ArrowRight, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

interface LangEntry {
  name: string;
  meta: string;
  disabled?: boolean;
}

const SOURCES: LangEntry[] = [
  { name: "COBOL", meta: "Est. 1959 · mainframe heritage" },
  { name: "Java 7", meta: "Released 2011 · end-of-life" },
  { name: ".NET Framework 4.x", meta: "2010–2016 · Windows-bound" },
  { name: "VB6", meta: "Coming soon", disabled: true },
  { name: "RPG/400", meta: "Coming soon", disabled: true },
];

const TARGETS: LangEntry[] = [
  { name: "Java 21", meta: "LTS · virtual threads" },
  { name: "Python 3.12", meta: "AsyncIO-native" },
  { name: "C# on .NET 8", meta: "LTS · cross-platform" },
];

export function LanguageGrid() {
  return (
    <section className="relative border-t border-[var(--border-subtle)] bg-base/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <p className="mono-label mb-4 text-cyan-bright">// LANGUAGE MATRIX</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-5xl">
            What we modernize.
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_auto_1fr]">
          <Column title="Source · Legacy" entries={SOURCES} variant="legacy" />

          <div className="hidden self-center md:block">
            <ArrowRight className="h-8 w-8 text-cyan-bright" strokeWidth={1.5} />
          </div>

          <Column title="Target · Modern" entries={TARGETS} variant="modern" />
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  entries,
  variant,
}: {
  title: string;
  entries: LangEntry[];
  variant: "legacy" | "modern";
}) {
  return (
    <div>
      <p className="mono-label mb-4 text-text-muted">{title}</p>
      <ul className="flex flex-col gap-2">
        {entries.map((e) => (
          <li
            key={e.name}
            className={cn(
              "flex items-center gap-4 rounded-sharp border-l-2 bg-surface p-4",
              "transition-colors",
              variant === "modern"
                ? "border-l-cyan-bright"
                : "border-l-[var(--border-default)]",
              e.disabled && "opacity-40",
            )}
          >
            <Cpu
              className={cn(
                "h-5 w-5 shrink-0",
                variant === "modern" ? "text-cyan-bright" : "text-text-secondary",
              )}
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="font-heading text-base font-semibold text-text-primary">
                {e.name}
              </p>
              <p className="font-mono text-xs text-text-muted">{e.meta}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
