import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  logger.info({ email: parsed.data.email }, "waitlist signup");
  return NextResponse.json({ ok: true });
}
