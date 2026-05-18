import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadDialog } from "./upload-dialog";
import { UserMenu } from "./user-menu";

interface HeaderProps {
  title: string;
  email: string;
  showNewButton?: boolean;
}

export function Header({ title, email, showNewButton = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-void/80 px-8 backdrop-blur-md">
      <h1 className="font-display text-xl font-bold tracking-tight text-text-primary">
        {title}
      </h1>

      <div className="flex items-center gap-3">
        {showNewButton && (
          <UploadDialog
            trigger={
              <Button variant="primary" size="sm">
                <Plus className="h-4 w-4" />
                New Transformation
              </Button>
            }
          />
        )}
        <UserMenu email={email} />
      </div>
    </header>
  );
}
