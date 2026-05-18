import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Wordmark({ className, size = "md" }: WordmarkProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display font-bold tracking-tight text-text-primary",
        "uppercase",
        sizeClasses[size],
        className,
      )}
    >
      {/* Abstract "{S}" mark — two cyan brackets */}
      <span
        aria-hidden
        className="inline-flex items-center font-mono text-cyan-bright"
      >
        {"{"}
        <span className="text-text-primary">S</span>
        {"}"}
      </span>
      <span>StratosCode</span>
    </span>
  );
}
