import { redirect } from "next/navigation";
import { Construction } from "lucide-react";
import { auth } from "@/lib/auth";
import { Header } from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user) redirect("/?signin=true");

  const email = session.user.email ?? "unknown@vetuscloud.local";
  const tenantId = session.user.tenantId ?? "default-tenant";

  return (
    <>
      <Header title="Settings" email={email} showNewButton={false} />
      <div className="flex flex-col gap-8 px-8 py-8">
        <Card className="p-6">
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Account
          </p>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Email" value={email} />
            <Field label="Tenant ID" value={tenantId} />
          </dl>
        </Card>

        <Card className="flex items-start gap-4 p-6">
          <Construction
            className="h-6 w-6 shrink-0 text-warning"
            strokeWidth={1.5}
            aria-hidden
          />
          <div>
            <h3 className="font-heading text-base font-semibold text-text-primary">
              More settings coming
            </h3>
            <p className="mt-1 font-mono text-xs text-text-secondary">
              Team management, API keys, billing, and webhook configuration are
              on the roadmap.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm text-text-primary">{value}</dd>
    </div>
  );
}
