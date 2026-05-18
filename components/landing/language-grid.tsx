import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LangEntry {
  name: string;
  era: string;
  meta: string;
  disabled?: boolean;
}

const SOURCES: LangEntry[] = [
  { name: "COBOL", era: "1959", meta: "Mainframe heritage" },
  { name: "Java 7", era: "2011", meta: "End-of-life since 2022" },
  { name: ".NET Framework 4.x", era: "2010–16", meta: "Windows-bound" },
  { name: "VB6", era: "1998", meta: "Coming soon", disabled: true },
  { name: "RPG/400", era: "1979", meta: "Coming soon", disabled: true },
];

const TARGETS: LangEntry[] = [
  { name: "Java 21", era: "LTS", meta: "Virtual threads · records" },
  { name: "Python 3.12", era: "3.12", meta: "AsyncIO-native" },
  { name: "C# on .NET 8", era: "LTS", meta: "Cross-platform" },
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
              "flex items-stretch gap-4 rounded-sharp border border-[var(--border-subtle)] bg-surface",
              "transition-colors",
              e.disabled && "opacity-40",
            )}
          >
            <div
              className={cn(
                "flex w-16 shrink-0 items-center justify-center border-r font-mono text-[11px] uppercase tracking-wider",
                variant === "modern"
                  ? "border-cyan-bright/30 bg-cyan-bright/[0.05] text-cyan-bright"
                  : "border-[var(--border-subtle)] text-text-muted",
              )}
            >
              {e.era}
            </div>
            <div className="min-w-0 flex-1 py-3 pr-4">
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
