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
      {/* Abstract "{V}" mark — two cyan brackets */}
      <span
        aria-hidden
        className="inline-flex items-center font-mono text-cyan-bright"
      >
        {"{"}
        <span className="text-text-primary">V</span>
        {"}"}
      </span>
      <span>VetusCloud</span>
    </span>
  );
}
