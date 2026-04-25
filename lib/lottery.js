import crypto from "node:crypto";
import { getNextDrawNumber, insertDraw } from "@/lib/database";
import { getHolderRegistry, getNextDrawAt, getTreasuryBalance } from "@/lib/solana";

function pickWinner(holders, randomOffset) {
  let cursor = 0;

  for (const holder of holders) {
    cursor += holder.tickets;
    if (randomOffset < cursor) {
      return holder;
    }
  }

  return null;
}

export async function runDraw() {
  const registry = await getHolderRegistry();
  const drawNumber = getNextDrawNumber();
  const timestamp = new Date().toISOString();

  if (!registry.summary.totalTickets) {
    const drawId = insertDraw({
      drawNumber,
      timestamp,
      totalTickets: 0,
      winningTicket: null,
      winnerWallet: null,
      randomNumber: null,
      amountSol: 0,
      status: "skipped_no_eligible_wallets",
    });

    return {
      drawId,
      drawNumber,
      status: "skipped_no_eligible_wallets",
      nextDrawAt: getNextDrawAt().toISOString(),
    };
  }

  const treasury = await getTreasuryBalance();

  // Replace this placeholder RNG with Orao VRF request + fulfillment wiring before production payouts.
  const randomNumber = crypto.randomInt(0, registry.summary.totalTickets);
  const winner = pickWinner(registry.holders, randomNumber);

  if (!winner) {
    throw new Error("Unable to map the winning ticket to a holder.");
  }

  const drawId = insertDraw({
    drawNumber,
    timestamp,
    totalTickets: registry.summary.totalTickets,
    winningTicket: randomNumber + 1,
    winnerWallet: winner.wallet,
    randomNumber: String(randomNumber),
    amountSol: treasury.solBalance,
    status: "pending_manual_vrf_and_payout",
  });

  return {
    drawId,
    drawNumber,
    winnerWallet: winner.wallet,
    winningTicket: randomNumber + 1,
    totalTickets: registry.summary.totalTickets,
    amountSol: treasury.solBalance,
    status: "pending_manual_vrf_and_payout",
    nextDrawAt: getNextDrawAt().toISOString(),
    notes: [
      "Placeholder randomness currently uses node:crypto.randomInt.",
      "Manual Orao VRF integration and manual SOL payout settlement are still required.",
    ],
  };
}
