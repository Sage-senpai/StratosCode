"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AVATAR_COLORS = [
  "bg-cyan-bright/20 text-cyan-bright",
  "bg-orange-bright/20 text-orange-bright",
  "bg-success/20 text-success",
  "bg-info/20 text-info",
  "bg-warning/20 text-warning",
];

const AVATAR_INITIALS = ["AK", "MR", "JS", "LP", "EN"];

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<
    "idle" | "submitting" | "persisted" | "received" | "error"
  >("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("submitting");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json().catch(() => ({}))) as {
        persisted?: boolean;
      };
      setState(data.persisted ? "persisted" : "received");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section id="cta" className="relative overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
        aria-hidden
      />
      <div className="absolute inset-0 bg-void/85" aria-hidden />
      <div className="bg-grid absolute inset-0 opacity-50" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mono-label mb-4 text-cyan-bright">// REQUEST ACCESS</p>
        <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-text-primary md:text-5xl">
          Ship the migration you&rsquo;ve been deferring for years.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-text-secondary">
          Join the early access list. We&rsquo;re onboarding teams in batches
          starting with COBOL → Java 21 modernizations.
        </p>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="engineer@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={cn(
              "h-12 flex-1 rounded-sharp bg-surface px-4 font-mono text-sm",
              "border border-[var(--border-default)] text-text-primary placeholder:text-text-muted",
              "focus-visible:outline-none focus-visible:border-cyan-bright",
            )}
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={state === "submitting"}
          >
            Request Access
          </Button>
        </form>

        {state === "persisted" && (
          <p className="mt-4 font-mono text-xs text-success">
            // You&rsquo;re on the list. We&rsquo;ll be in touch.
          </p>
        )}
        {state === "received" && (
          <p className="mt-4 font-mono text-xs text-warning">
            // Request received. The waitlist store isn&rsquo;t live yet;
            we&rsquo;ll reach out as soon as it is.
          </p>
        )}
        {state === "error" && (
          <p className="mt-4 font-mono text-xs text-error">
            // Something went wrong. Try again.
          </p>
        )}

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {AVATAR_INITIALS.map((initials, i) => (
              <span
                key={initials}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-void font-mono text-[10px] font-medium",
                  AVATAR_COLORS[i],
                )}
                aria-hidden
              >
                {initials}
              </span>
            ))}
          </div>
          <p className="font-mono text-xs text-text-secondary">
            Join 200+ engineering teams on the waitlist
          </p>
        </div>
      </div>
    </section>
  );
}
