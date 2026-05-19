"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CloudUpload, FileArchive, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LANGUAGE_LABELS,
  SUPPORTED_PAIRS,
  type SourceLanguage,
  type TargetLanguage,
} from "@/types/transformation";
import { formatBytes, cn } from "@/lib/utils";

const MAX_BYTES = 500 * 1024 * 1024;

type FormState = "idle" | "uploading" | "submitting" | "error";

export function UploadDialog({ trigger }: { trigger: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [sourceLanguage, setSourceLanguage] = useState<SourceLanguage | "">("");
  const [targetLanguage, setTargetLanguage] = useState<TargetLanguage | "">("");
  const [linesOfCode, setLOC] = useState<string>("");
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const availableTargets = sourceLanguage
    ? SUPPORTED_PAIRS.filter((p) => p.source === sourceLanguage).map(
        (p) => p.target,
      )
    : ([] as TargetLanguage[]);

  const reset = () => {
    setFile(null);
    setSourceLanguage("");
    setTargetLanguage("");
    setLOC("");
    setState("idle");
    setError(null);
  };

  const onPickFile = useCallback((f: File | undefined) => {
    setError(null);
    if (!f) return;
    if (f.size > MAX_BYTES) {
      setError(
        "This archive exceeds the 500MB limit. Consider splitting into smaller modules.",
      );
      return;
    }
    if (!/\.(zip|tar\.gz|tgz)$/i.test(f.name)) {
      setError(
        "Upload failed — check your file is under 500MB and is a .zip or .tar.gz archive.",
      );
      return;
    }
    setFile(f);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !sourceLanguage || !targetLanguage || !linesOfCode) return;

    setState("uploading");
    setError(null);
    try {
      const jobId = crypto.randomUUID();

      // Step 1: get presigned URL
      const presignedRes = await fetch("/api/upload/presigned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/zip",
          jobId,
        }),
      });
      if (!presignedRes.ok) throw new Error("Failed to get upload URL");
      const { presignedUrl, key } = await presignedRes.json();

      // Step 2: upload to S3 (skipped in dev-mock — URL is fake)
      if (!presignedUrl.includes("dev-mock.vetuscloud.local")) {
        const uploadRes = await fetch(presignedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type || "application/zip" },
          body: file,
        });
        if (!uploadRes.ok) throw new Error("Upload to S3 failed");
      }

      // Step 3: create transformation
      setState("submitting");
      const createRes = await fetch("/api/transformations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          s3InputKey: key,
          filename: file.name,
          sourceLanguage,
          targetLanguage,
          linesOfCode: Number(linesOfCode),
        }),
      });
      if (!createRes.ok) throw new Error("Failed to start transformation");

      setOpen(false);
      reset();
      router.push(`/dashboard/${jobId}`);
      router.refresh();
    } catch (err) {
      setState("error");
      setError(
        err instanceof Error
          ? err.message
          : "Transformation encountered an error. Try again.",
      );
    }
  };

  const submitting = state === "uploading" || state === "submitting";
  const canSubmit =
    !!file && !!sourceLanguage && !!targetLanguage && !!linesOfCode && !submitting;

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>New transformation</DialogTitle>
          <DialogDescription>
            Upload a legacy code archive and configure the language pair.
            We&rsquo;ll handle the rest.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              onPickFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed",
              "px-4 py-8 text-center transition-colors cursor-pointer",
              dragging
                ? "border-cyan-bright bg-cyan-bright/[0.04]"
                : "border-[var(--border-default)] hover:border-cyan-bright/60",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".zip,.tar.gz,.tgz"
              className="hidden"
              onChange={(e) => onPickFile(e.target.files?.[0] ?? undefined)}
            />
            {file ? (
              <div className="flex w-full items-center justify-between gap-3 rounded-sharp bg-surface px-3 py-2 text-left">
                <FileArchive className="h-5 w-5 text-cyan-bright" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-sm text-text-primary">
                    {file.name}
                  </p>
                  <p className="font-mono text-[11px] text-text-muted">
                    {formatBytes(file.size)}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Remove file"
                  className="text-text-muted hover:text-error"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <CloudUpload
                  className="h-8 w-8 text-cyan-bright"
                  strokeWidth={1.5}
                />
                <p className="font-heading text-sm text-text-primary">
                  Drop your archive here, or click to browse
                </p>
                <p className="font-mono text-[11px] text-text-muted">
                  .zip / .tar.gz · up to 500MB
                </p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                Source language
              </label>
              <Select
                value={sourceLanguage}
                onValueChange={(v) => {
                  setSourceLanguage(v as SourceLanguage);
                  setTargetLanguage("");
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(SUPPORTED_PAIRS.map((p) => p.source))).map(
                    (lang) => (
                      <SelectItem key={lang} value={lang}>
                        {LANGUAGE_LABELS[lang]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                Target language
              </label>
              <Select
                value={targetLanguage}
                onValueChange={(v) => setTargetLanguage(v as TargetLanguage)}
                disabled={!sourceLanguage}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      sourceLanguage ? "Select target" : "Pick a source first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableTargets.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {LANGUAGE_LABELS[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label
              htmlFor="loc"
              className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-text-secondary"
            >
              Estimated lines of code
            </label>
            <input
              id="loc"
              type="number"
              min={1}
              required
              value={linesOfCode}
              onChange={(e) => setLOC(e.target.value)}
              placeholder="e.g. 45000"
              className={cn(
                "h-10 w-full rounded-sharp bg-surface px-3",
                "border border-[var(--border-default)] font-mono text-sm text-text-primary placeholder:text-text-muted",
                "focus-visible:outline-none focus-visible:border-cyan-bright",
              )}
            />
          </div>

          {error && (
            <p className="rounded-sharp border border-error/30 bg-error/5 px-3 py-2 font-mono text-xs text-error">
              {error}
            </p>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!canSubmit}
              isLoading={submitting}
            >
              {state === "uploading"
                ? "Uploading…"
                : state === "submitting"
                  ? "Starting…"
                  : "Start transformation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
