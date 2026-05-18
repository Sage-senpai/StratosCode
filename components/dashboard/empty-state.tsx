import { FolderOpen } from "lucide-react";
import { UploadDialog } from "./upload-dialog";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[var(--border-default)] bg-surface/30 px-6 py-20 text-center">
      <FolderOpen className="h-10 w-10 text-cyan-bright" strokeWidth={1.25} />
      <div>
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          No transformations yet
        </h3>
        <p className="mt-1 max-w-md font-mono text-sm text-text-secondary">
          Upload your first legacy archive to start modernizing.
        </p>
      </div>
      <UploadDialog
        trigger={
          <Button variant="primary" size="md">
            Start your first modernization
          </Button>
        }
      />
    </div>
  );
}
