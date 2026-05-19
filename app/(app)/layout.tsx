import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/?signin=true");
  }

  const email = session.user.email ?? "unknown@vetuscloud.local";

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar email={email} className="sticky top-0 hidden md:flex" />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
