import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "completed"
  | "running"
  | "failed"
  | "queued"
  | "pending";

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
  children?: React.ReactNode;
}

const statusConfig: Record<
  BadgeStatus,
  { label: string; text: string; bg: string; dot: string; pulse: boolean }
> = {
  completed: {
    label: "COMPLETED",
    text: "text-success",
    bg: "bg-success/10",
    dot: "bg-success",
    pulse: false,
  },
  running: {
    label: "RUNNING",
    text: "text-warning",
    bg: "bg-warning/10",
    dot: "bg-warning",
    pulse: true,
  },
  failed: {
    label: "FAILED",
    text: "text-error",
    bg: "bg-error/10",
    dot: "bg-error",
    pulse: false,
  },
  queued: {
    label: "QUEUED",
    text: "text-text-muted",
    bg: "bg-white/[0.03]",
    dot: "bg-text-muted",
    pulse: false,
  },
  pending: {
    label: "PENDING",
    text: "text-text-muted",
    bg: "bg-white/[0.03]",
    dot: "bg-text-muted",
    pulse: false,
  },
};

export function Badge({ status, className, children }: BadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-badge px-2 py-1",
        "font-mono text-[10px] font-medium uppercase tracking-wider",
        config.text,
        config.bg,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          config.dot,
          config.pulse && "animate-pulse-dot",
        )}
      />
      {children ?? config.label}
    </span>
  );
}
