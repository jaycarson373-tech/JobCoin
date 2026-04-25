import { NextResponse } from "next/server";
import { runDraw } from "@/lib/lottery";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const providedSecret = request.headers.get("x-draw-secret");
  const expectedSecret = process.env.LOTTO_DRAW_SECRET || "";

  if (expectedSecret && providedSecret !== expectedSecret) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await runDraw();
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Unable to execute draw." },
      { status: 500 },
    );
  }
}
