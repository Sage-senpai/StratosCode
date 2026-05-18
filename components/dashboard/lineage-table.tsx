"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import { cn, formatLOC } from "@/lib/utils";
import type { LineageEntry } from "@/types/transformation";

type SortKey = "legacyFile" | "modernFile" | "legacyLOC" | "modernLOC" | "ratio";

export function LineageTable({ entries }: { entries: LineageEntry[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("legacyFile");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const rows = useMemo(() => {
    const withRatio = entries.map((e) => ({
      ...e,
      ratio: e.legacyLOC > 0 ? e.modernLOC / e.legacyLOC : 0,
    }));
    return withRatio.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [entries, sortKey, sortDir]);

  const toggle = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle)] bg-surface px-6 py-12 text-center font-mono text-sm text-text-muted">
        Lineage data will appear once the transformation completes.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-[var(--border-subtle)] bg-surface">
      <table className="w-full min-w-[700px] text-left font-mono text-sm">
        <thead>
          <tr className="border-b border-[var(--border-subtle)] text-[10px] uppercase tracking-wider text-text-muted">
            <TH onClick={() => toggle("legacyFile")}>Legacy File</TH>
            <th className="px-4 py-3">Lang</th>
            <TH onClick={() => toggle("legacyLOC")} className="text-right">
              LOC
            </TH>
            <th />
            <TH onClick={() => toggle("modernFile")}>Modern File</TH>
            <th className="px-4 py-3">Lang</th>
            <TH onClick={() => toggle("modernLOC")} className="text-right">
              LOC
            </TH>
            <TH onClick={() => toggle("ratio")} className="text-right">
              Ratio
            </TH>
          </tr>
        </thead>
        <tbody className="text-text-primary">
          {rows.map((r) => (
            <tr
              key={`${r.legacyFile}-${r.modernFile}`}
              className="border-b border-[var(--border-subtle)] last:border-b-0"
            >
              <td className="px-4 py-3 text-text-secondary">{r.legacyFile}</td>
              <td className="px-4 py-3 text-text-muted">{r.legacyLanguage}</td>
              <td className="px-4 py-3 text-right">{formatLOC(r.legacyLOC)}</td>
              <td className="px-2 py-3 text-cyan-bright">
                <ArrowRight className="inline h-4 w-4" />
              </td>
              <td className="px-4 py-3">{r.modernFile}</td>
              <td className="px-4 py-3 text-text-muted">{r.modernLanguage}</td>
              <td className="px-4 py-3 text-right">{formatLOC(r.modernLOC)}</td>
              <td
                className={cn(
                  "px-4 py-3 text-right",
                  r.ratio < 1 ? "text-success" : "text-warning",
                )}
              >
                {r.ratio.toFixed(2)}×
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TH({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "cursor-pointer select-none px-4 py-3 transition-colors hover:text-cyan-bright",
        className,
      )}
      onClick={onClick}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <ArrowUpDown className="h-3 w-3 opacity-50" />
      </span>
    </th>
  );
}
