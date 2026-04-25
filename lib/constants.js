export const LOTTO_MINT =
  process.env.LOTTO_MINT || "Geo5k2fwBCqAjLVR3j5k9BeqaEnpK7RYSezaYRZWpump";
export const TREASURY_WALLET = process.env.LOTTO_TREASURY_WALLET || LOTTO_MINT;
export const HELIUS_RPC_URL =
  process.env.SOLANA_RPC_URL ||
  "https://mainnet.helius-rpc.com/?api-key=1aee9a37-23d4-4d5e-a547-adc1fc98e231";
export const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export const TICKET_CHUNK = 10_000;
export const REGISTRY_REFRESH_MS = 30_000;
export const TREASURY_REFRESH_MS = 60_000;
export const RPC_RETRY_MS = 10_000;
export const LATEST_WINNERS_LIMIT = 8;
export const PUBLIC_RECORD_LIMIT = 100;
export const EXCLUDED_WALLETS = new Set(
  [TREASURY_WALLET, LOTTO_MINT, ...(process.env.LOTTO_EXCLUDED_WALLETS || "").split(",")]
    .map((entry) => entry.trim())
    .filter(Boolean),
);
