"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Absolute hash hrefs so the links work from any route (e.g. /about).
  const links = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Architecture", href: "/#architecture" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/#pricing" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-200",
        "border-b border-transparent",
        scrolled &&
          "border-[var(--border-subtle)] bg-void/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" aria-label="VetusCloud home">
          <Wordmark size="md" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-heading text-sm text-text-secondary transition-colors hover:text-cyan-bright"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/?signin=true">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <a href="#cta">
            <Button variant="primary" size="sm">
              Request Access
            </Button>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sharp text-text-primary md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--border-subtle)] bg-void md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-sharp px-2 py-2 font-heading text-sm text-text-secondary hover:bg-white/[0.03] hover:text-cyan-bright"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2">
              <Link href="/?signin=true" className="flex-1">
                <Button variant="secondary" size="sm" className="w-full">
                  Sign in
                </Button>
              </Link>
              <a href="#cta" className="flex-1">
                <Button variant="primary" size="sm" className="w-full">
                  Request Access
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
