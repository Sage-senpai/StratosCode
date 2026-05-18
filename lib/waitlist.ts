/**
 * Waitlist store. In dev-mock mode, persists emails to an in-memory Map so the
 * CTA flow is honest end-to-end. In prod this is intentionally a no-op until a
 * real backing store (DDB table or external CRM) is wired up — see TODO.
 */
import { isDevMock } from "./dev-mode";
import { logger } from "./logger";

interface WaitlistEntry {
  email: string;
  createdAt: string;
}

const devStore = new Map<string, WaitlistEntry>();

export async function addToWaitlist(
  email: string,
): Promise<{ persisted: boolean }> {
  const normalized = email.trim().toLowerCase();

  if (isDevMock()) {
    if (!devStore.has(normalized)) {
      devStore.set(normalized, {
        email: normalized,
        createdAt: new Date().toISOString(),
      });
    }
    logger.info({ email: normalized, total: devStore.size }, "waitlist signup (dev)");
    return { persisted: true };
  }

  // TODO: replace with real persistence (DDB table or external CRM) before launch.
  // Until then, we log the email server-side. The route returns persisted:false
  // so the UI can be honest about the state instead of claiming success.
  logger.warn(
    { email: normalized },
    "waitlist signup received but no backing store configured",
  );
  return { persisted: false };
}

export function devListWaitlist(): WaitlistEntry[] {
  return Array.from(devStore.values());
}
