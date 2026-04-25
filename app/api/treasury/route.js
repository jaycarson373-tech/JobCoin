import { NextResponse } from "next/server";
import { getTreasuryBalance } from "@/lib/solana";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const treasury = await getTreasuryBalance();

    return NextResponse.json({
      ok: true,
      data: {
        balance: treasury.solBalance,
        lamports: treasury.lamports,
        treasuryWallet: treasury.treasuryWallet,
        updatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Unable to load treasury balance." },
      { status: 500 },
    );
  }
}
