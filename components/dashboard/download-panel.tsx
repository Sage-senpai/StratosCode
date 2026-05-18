import { Download, FileCode2, FlaskConical, Server, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface DownloadItem {
  label: string;
  description: string;
  href?: string;
  icon: LucideIcon;
  variant: "primary" | "secondary";
}

interface Props {
  downloads: {
    bundle?: string;
    iac?: string;
    tests?: string;
    adr?: string;
  };
}

export function DownloadPanel({ downloads }: Props) {
  const items: DownloadItem[] = [
    {
      label: "Modern Code",
      description: ".zip · the transformed codebase",
      href: downloads.bundle,
      icon: FileCode2,
      variant: "primary",
    },
    {
      label: "IaC Templates",
      description: "CloudFormation + CDK",
      href: downloads.iac,
      icon: Server,
      variant: "secondary",
    },
    {
      label: "Test Suite",
      description: ".zip · unit + integration",
      href: downloads.tests,
      icon: FlaskConical,
      variant: "secondary",
    },
    {
      label: "Architecture Docs",
      description: ".pdf · ADR + diagrams",
      href: downloads.adr,
      icon: FileText,
      variant: "secondary",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        Downloads
      </p>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href ?? "#"}
          aria-disabled={!item.href}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <Button
            variant={item.variant}
            size="md"
            className="w-full justify-start gap-3"
            disabled={!item.href}
          >
            <item.icon className="h-4 w-4" />
            <span className="flex flex-1 flex-col items-start text-left leading-tight">
              <span>{item.label}</span>
              <span className="font-mono text-[10px] font-normal opacity-70">
                {item.description}
              </span>
            </span>
            <Download className="h-4 w-4 opacity-60" />
          </Button>
        </a>
      ))}
    </div>
  );
}
