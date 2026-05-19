"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  History,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { Wordmark } from "@/components/landing/wordmark";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/history", label: "All Transformations", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <aside
      className={cn(
        "flex h-screen w-60 shrink-0 flex-col border-r border-[var(--border-subtle)] bg-base",
        className,
      )}
    >
      <div className="p-6">
        <Link href="/dashboard" aria-label="VetusCloud dashboard">
          <Wordmark size="sm" />
        </Link>
      </div>

      <nav className="flex-1 px-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-sharp px-3 py-2",
                    "font-heading text-sm transition-colors",
                    isActive
                      ? "border-l-2 border-l-cyan-bright bg-cyan-bright/[0.06] pl-[10px] text-cyan-bright"
                      : "text-text-secondary hover:bg-white/[0.03] hover:text-text-primary",
                  )}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-[var(--border-subtle)] p-4">
        <p className="font-mono text-xs text-text-muted">Signed in as</p>
        <p className="mt-1 truncate font-mono text-xs text-text-primary">
          {email}
        </p>
      </div>
    </aside>
  );
}
