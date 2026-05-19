"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

/**
 * When `?signin=true` is in the URL, automatically trigger the auth flow.
 * Picks the dev Credentials provider when VETUSCLOUD_DEV_MOCK=true is exposed,
 * otherwise Cognito.
 */
export function SigninTrigger({ devMock }: { devMock: boolean }) {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (params.get("signin") !== "true") return;
    if (devMock) {
      signIn("dev", {
        email: "dev@vetuscloud.local",
        callbackUrl: "/dashboard",
      });
    } else {
      signIn("cognito", { callbackUrl: "/dashboard" });
    }
    router.replace("/");
  }, [params, router, devMock]);

  return null;
}
