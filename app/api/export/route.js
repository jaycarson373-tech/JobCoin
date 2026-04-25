import { exportLotteryData } from "@/lib/database";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = exportLotteryData();

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="lotto-public-record.json"',
      "Cache-Control": "no-store",
    },
  });
}
