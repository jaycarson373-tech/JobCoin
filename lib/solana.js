import {
  EXCLUDED_WALLETS,
  HELIUS_RPC_URL,
  LOTTO_MINT,
  TICKET_CHUNK,
  TOKEN_PROGRAM_ID,
  TREASURY_WALLET,
} from "@/lib/constants";

async function rpcRequest(method, params) {
  const response = await fetch(HELIUS_RPC_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Helius RPC returned ${response.status}.`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message || `Helius RPC ${method} failed.`);
  }

  return payload.result;
}

function rawToDecimal(rawAmount, decimals) {
  return Number(rawAmount) / 10 ** decimals;
}

function getTicketCount(rawAmount, decimals) {
  const rawTicketUnit = BigInt(TICKET_CHUNK) * BigInt(10) ** BigInt(decimals);
  return rawTicketUnit > 0n ? Number(rawAmount / rawTicketUnit) : 0;
}

function aggregateHolderBalances(accounts) {
  const holders = new Map();

  for (const account of accounts) {
    const info = account.account?.data?.parsed?.info;
    const owner = info?.owner;
    const tokenAmount = info?.tokenAmount;

    if (!owner || !tokenAmount?.amount) continue;
    if (EXCLUDED_WALLETS.has(owner)) continue;

    const decimals = Number(tokenAmount.decimals || 0);
    const rawAmount = BigInt(tokenAmount.amount);
    if (rawAmount <= 0n) continue;

    const existing = holders.get(owner) || { wallet: owner, rawAmount: 0n, decimals };
    existing.rawAmount += rawAmount;
    existing.decimals = decimals;
    holders.set(owner, existing);
  }

  return holders;
}

export function getNextDrawAt(from = new Date()) {
  const next = new Date(from);
  next.setSeconds(0, 0);

  if (next.getMinutes() < 30) {
    next.setMinutes(30);
  } else {
    next.setHours(next.getHours() + 1, 0, 0, 0);
  }

  if (next.getTime() <= from.getTime()) {
    next.setMinutes(next.getMinutes() + 30);
  }

  return next;
}

export async function getTreasuryBalance() {
  const result = await rpcRequest("getBalance", [TREASURY_WALLET]);
  const lamports = Number(result?.value || 0);

  return {
    treasuryWallet: TREASURY_WALLET,
    lamports,
    solBalance: lamports / 1e9,
  };
}

export async function getHolderRegistry() {
  const result = await rpcRequest("getProgramAccounts", [
    TOKEN_PROGRAM_ID,
    {
      encoding: "jsonParsed",
      filters: [
        { dataSize: 165 },
        { memcmp: { offset: 0, bytes: LOTTO_MINT } },
      ],
    },
  ]);

  const holderMap = aggregateHolderBalances(result);
  const rawHolders = Array.from(holderMap.values())
    .map((holder) => ({
      wallet: holder.wallet,
      balance: rawToDecimal(holder.rawAmount, holder.decimals),
      tickets: getTicketCount(holder.rawAmount, holder.decimals),
    }))
    .filter((holder) => holder.balance > 0)
    .sort((left, right) => right.balance - left.balance);

  const totalTickets = rawHolders.reduce((sum, holder) => sum + holder.tickets, 0);
  const eligibleHolders = rawHolders.filter((holder) => holder.tickets > 0);
  const holders = rawHolders.map((holder, index) => ({
    rank: index + 1,
    wallet: holder.wallet,
    balance: holder.balance,
    held: holder.balance,
    tickets: holder.tickets,
    odds: `${((holder.tickets / (totalTickets || 1)) * 100).toFixed(3)}%`,
    oddsPercent: totalTickets > 0 ? (holder.tickets / totalTickets) * 100 : 0,
  }));

  return {
    holders,
    totalHolders: holders.length,
    totalTickets,
    summary: {
      totalHolders: holders.length,
      eligibleHolders: eligibleHolders.length,
      totalTickets,
    },
  };
}

export async function getEligibilityForWallet(walletAddress) {
  const tokenAccounts = await rpcRequest("getTokenAccountsByOwner", [
    walletAddress,
    { mint: LOTTO_MINT },
    { encoding: "jsonParsed" },
  ]);

  let rawAmount = 0n;
  let decimals = 0;

  for (const tokenAccount of tokenAccounts.value || []) {
    const tokenAmount = tokenAccount.account?.data?.parsed?.info?.tokenAmount;
    if (!tokenAmount?.amount) continue;
    rawAmount += BigInt(tokenAmount.amount);
    decimals = Number(tokenAmount.decimals || 0);
  }

  const registry = await getHolderRegistry();
  const rankedWallet = registry.holders.find((holder) => holder.wallet === walletAddress);
  const tickets = getTicketCount(rawAmount, decimals);
  const balance = rawToDecimal(rawAmount, decimals);

  return {
    wallet: walletAddress,
    balance,
    held: balance,
    tickets,
    oddsPercent: registry.totalTickets > 0 ? (tickets / registry.totalTickets) * 100 : 0,
    odds: `${((tickets / (registry.totalTickets || 1)) * 100).toFixed(3)}%`,
    registryRank: rankedWallet?.rank ?? null,
  };
}
