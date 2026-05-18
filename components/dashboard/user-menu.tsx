"use client";

import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { LogOut, Settings as SettingsIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export function UserMenu({ email }: { email: string }) {
  const initial = email.charAt(0).toUpperCase();
  return (
    <Dropdown.Root>
      <Dropdown.Trigger
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          "bg-cyan-bright/15 font-mono text-sm font-medium text-cyan-bright",
          "border border-[var(--border-default)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-bright",
        )}
        aria-label="User menu"
      >
        {initial}
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content
          align="end"
          sideOffset={8}
          className={cn(
            "z-50 min-w-[200px] overflow-hidden rounded-lg border border-[var(--border-default)] bg-elevated",
            "shadow-glow-subtle",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          )}
        >
          <div className="border-b border-[var(--border-subtle)] px-3 py-2.5">
            <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
              Signed in as
            </p>
            <p className="mt-0.5 truncate font-mono text-xs text-text-primary">
              {email}
            </p>
          </div>
          <div className="p-1">
            <Dropdown.Item
              className="flex cursor-pointer items-center gap-2 rounded-sharp px-2 py-2 font-heading text-sm text-text-secondary outline-none focus:bg-white/[0.04] focus:text-text-primary"
              onSelect={(e) => e.preventDefault()}
            >
              <SettingsIcon className="h-4 w-4" />
              Account settings
            </Dropdown.Item>
            <Dropdown.Item
              className="flex cursor-pointer items-center gap-2 rounded-sharp px-2 py-2 font-heading text-sm text-error outline-none focus:bg-error/10"
              onSelect={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Dropdown.Item>
          </div>
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
}
