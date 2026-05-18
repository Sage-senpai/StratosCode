import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  /** Number of segments to render. Default: 20 */
  segments?: number;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function ProgressBar({
  value,
  segments = 20,
  showLabel = true,
  label,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const filledCount = Math.round((clamped / 100) * segments);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
        className="flex h-2 w-full gap-[2px]"
      >
        {Array.from({ length: segments }).map((_, i) => {
          const isFilled = i < filledCount;
          return (
            <span
              key={i}
              className={cn(
                "flex-1 rounded-[1px] transition-colors duration-200",
                isFilled
                  ? "bg-cyan-bright shadow-[0_0_4px_rgba(0,217,255,0.6)]"
                  : "bg-[var(--border-subtle)]",
              )}
            />
          );
        })}
      </div>
      {showLabel && (
        <div className="flex items-baseline justify-between font-mono text-xs">
          {label && (
            <span className="text-text-secondary uppercase tracking-wider">
              {label}
            </span>
          )}
          <span className="text-cyan-bright">
            {Math.round(clamped).toString().padStart(2, "0")}%
          </span>
        </div>
      )}
    </div>
  );
}
