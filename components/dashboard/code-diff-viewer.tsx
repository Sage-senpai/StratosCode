"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import type {
  SourceLanguage,
  TargetLanguage,
} from "@/types/transformation";

const SYNTAX_MAP: Record<SourceLanguage | TargetLanguage, string> = {
  cobol: "cobol",
  java7: "java",
  "dotnet-framework": "csharp",
  java21: "java",
  python312: "python",
  dotnet8: "csharp",
};

export interface DiffFile {
  legacyPath: string;
  modernPath: string;
  legacyCode: string;
  modernCode: string;
}

interface Props {
  files: DiffFile[];
  sourceLanguage: SourceLanguage;
  targetLanguage: TargetLanguage;
}

export function CodeDiffViewer({ files, sourceLanguage, targetLanguage }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (files.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle)] bg-surface px-6 py-12 text-center font-mono text-sm text-text-muted">
        No transformed files available yet.
      </div>
    );
  }
  const active = files[activeIndex];

  return (
    <div className="flex flex-col">
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-[var(--border-subtle)] pb-2"
      >
        {files.map((f, i) => (
          <button
            key={f.modernPath}
            role="tab"
            aria-selected={i === activeIndex}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "shrink-0 rounded-sharp px-3 py-1.5 font-mono text-xs",
              i === activeIndex
                ? "bg-cyan-bright/10 text-cyan-bright"
                : "text-text-secondary hover:bg-white/[0.03]",
            )}
          >
            {f.modernPath.split("/").pop()}
          </button>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <Panel
          tint="legacy"
          title={`Legacy · ${sourceLanguage.toUpperCase()}`}
          path={active.legacyPath}
          code={active.legacyCode}
          language={SYNTAX_MAP[sourceLanguage]}
        />
        <Panel
          tint="modern"
          title={`Modern · ${targetLanguage.toUpperCase()}`}
          path={active.modernPath}
          code={active.modernCode}
          language={SYNTAX_MAP[targetLanguage]}
        />
      </div>
    </div>
  );
}

function Panel({
  tint,
  title,
  path,
  code,
  language,
}: {
  tint: "legacy" | "modern";
  title: string;
  path: string;
  code: string;
  language: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-[var(--border-subtle)]",
        tint === "legacy" ? "bg-error/[0.03]" : "bg-cyan-bright/[0.03]",
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-surface/60 px-3 py-2">
        <span
          className={cn(
            "font-mono text-[10px] uppercase tracking-wider",
            tint === "legacy" ? "text-error/80" : "text-cyan-bright",
          )}
        >
          {title}
        </span>
        <span className="truncate font-mono text-[11px] text-text-muted">
          {path}
        </span>
      </div>
      <div className="max-h-[600px] overflow-auto">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: 12.5,
            fontFamily: "Fira Code, monospace",
            padding: "1rem",
          }}
          showLineNumbers
          lineNumberStyle={{ color: "#3D5068", fontSize: 11 }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
