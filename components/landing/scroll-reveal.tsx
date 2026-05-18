"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Stagger delay in ms */
  delay?: number;
  /** Use a slightly heavier translate for hero-level moments */
  emphasis?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Wraps content with a gentle scroll-entry animation:
 *   - IntersectionObserver (no scroll listeners — no reflow cost)
 *   - GPU-only transforms (translate + opacity)
 *   - Respects prefers-reduced-motion: renders content immediately, no transform
 *   - Custom cubic-bezier matches the rest of the design system's motion language
 */
export function ScrollReveal({
  children,
  delay = 0,
  emphasis = false,
  className,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const el = ref.current;
    if (!el) return;
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={ref}
      style={{
        transitionDelay: visible && !reduced ? `${delay}ms` : "0ms",
        transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      }}
      className={cn(
        "transition-[opacity,transform] duration-[800ms]",
        !visible &&
          !reduced &&
          (emphasis ? "translate-y-10 opacity-0" : "translate-y-6 opacity-0"),
        visible && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </Component>
  );
}
