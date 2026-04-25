import { NextResponse } from "next/server";
import { getHolderRegistry } from "@/lib/solana";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const registry = await getHolderRegistry();

    return NextResponse.json({
      ok: true,
      data: {
        holders: registry.holders,
        totalHolders: registry.totalHolders,
        totalTickets: registry.totalTickets,
        summary: registry.summary,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Unable to load holders." },
      { status: 500 },
    );
  }
}
