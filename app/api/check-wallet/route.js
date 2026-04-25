import { NextResponse } from "next/server";
import { getEligibilityForWallet } from "@/lib/solana";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const wallet = request.nextUrl.searchParams.get("wallet");

  if (!wallet) {
    return NextResponse.json(
      { ok: false, error: "Wallet address is required." },
      { status: 400 },
    );
  }

  try {
    const data = await getEligibilityForWallet(wallet.trim());
    return NextResponse.json({ ok: true, data });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message || "Unable to check wallet." },
      { status: 500 },
    );
  }
}
