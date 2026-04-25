export function formatNumber(value) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export function formatSol(value) {
  return `${formatNumber(value || 0)} SOL`;
}

export function formatPercent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

export function formatAddress(value) {
  if (!value) return "Pending";
  if (value.length <= 12) return value;
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

export function formatTimestamp(value, options = {}) {
  if (!value) return "Pending";
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: options.timeOnly ? undefined : "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: options.timeOnly ? undefined : "2-digit",
  });
}

export function getCountdownParts(nextDrawAt, now = Date.now()) {
  const target = nextDrawAt ? new Date(nextDrawAt).getTime() : now;
  const distance = Math.max(0, target - now);
  const minutes = Math.floor(distance / 60_000);
  const seconds = Math.floor((distance % 60_000) / 1_000);

  return {
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export function formatRelativeCountdown(nextDrawAt) {
  const { minutes, seconds } = getCountdownParts(nextDrawAt);
  return `${minutes}:${seconds}`;
}

export function getSolscanUrl(type, value) {
  const base = process.env.NEXT_PUBLIC_SOLSCAN_BASE || "https://solscan.io";
  return `${base}/${type}/${value}`;
}
