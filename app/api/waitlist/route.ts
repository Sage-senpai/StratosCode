import { NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/validations";
import { addToWaitlist } from "@/lib/waitlist";

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
  const result = await addToWaitlist(parsed.data.email);
  return NextResponse.json({ ok: true, persisted: result.persisted });
}
