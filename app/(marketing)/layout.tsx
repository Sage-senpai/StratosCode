import { Suspense } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SigninTrigger } from "@/components/landing/signin-trigger";
import { isDevMock } from "@/lib/dev-mode";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-void">
      <Suspense fallback={null}>
        <SigninTrigger devMock={isDevMock()} />
      </Suspense>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
