import { getDatabaseStats, getLatestWinners, getPublicRecord } from "@/lib/database";
import { getHolderRegistry, getNextDrawAt, getTreasuryBalance } from "@/lib/solana";

export async function getDashboardData() {
  const [registry, pool] = await Promise.all([getHolderRegistry(), getTreasuryBalance()]);
  const databaseStats = getDatabaseStats();

  return {
    generatedAt: new Date().toISOString(),
    nextDrawAt: getNextDrawAt().toISOString(),
    pool: {
      ...pool,
      balance: pool.solBalance,
      updatedAt: new Date().toISOString(),
    },
    registry: {
      holders: registry.holders,
      totalHolders: registry.totalHolders,
      totalTickets: registry.totalTickets,
      summary: registry.summary,
      updatedAt: new Date().toISOString(),
    },
    latestWinners: getLatestWinners(),
    publicRecord: getPublicRecord(),
    stats: {
      totalHolders: registry.totalHolders,
      totalTickets: registry.totalTickets,
      totalSolPaidOut: databaseStats.totalSolPaidOut,
      drawsCompleted: databaseStats.drawsCompleted,
    },
  };
}
