"use client";

import Link from "next/link";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import {
  formatAddress,
  formatNumber,
  formatPercent,
  formatRelativeCountdown,
  formatSol,
  formatTimestamp,
  getCountdownParts,
  getSolscanUrl,
} from "@/lib/format";
import {
  LOTTO_MINT,
  REGISTRY_REFRESH_MS,
  RPC_RETRY_MS,
  TICKET_CHUNK,
  TREASURY_REFRESH_MS,
} from "@/lib/constants";

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
}

function useClock() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return now;
}

function usePolledResource(endpoint, intervalMs, initialData) {
  const [data, setData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(initialData?.updatedAt || null);

  useEffect(() => {
    let mounted = true;
    let retryTimeout;

    async function refresh({ silent = false } = {}) {
      if (!silent && !data) {
        setLoading(true);
      }

      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || `Request failed for ${endpoint}.`);
        }

        if (!mounted) return;

        startTransition(() => {
          setData(payload.data);
          setUpdatedAt(payload.data.updatedAt || new Date().toISOString());
          setError("");
        });
      } catch (refreshError) {
        if (!mounted) return;
        setError(refreshError.message || "RPC request failed.");
        retryTimeout = window.setTimeout(() => {
          refresh();
        }, RPC_RETRY_MS);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    refresh({ silent: Boolean(initialData) });

    const interval = window.setInterval(() => {
      refresh({ silent: true });
    }, intervalMs);

    return () => {
      mounted = false;
      window.clearInterval(interval);
      if (retryTimeout) {
        window.clearTimeout(retryTimeout);
      }
    };
  }, [endpoint, intervalMs]);

  return { data, loading, error, updatedAt };
}

function SkeletonRows({ rows = 5, columns = 4 }) {
  return Array.from({ length: rows }).map((_, rowIndex) => (
    <tr key={`skeleton-${rowIndex}`}>
      {Array.from({ length: columns }).map((__, columnIndex) => (
        <td key={`cell-${rowIndex}-${columnIndex}`}>
          <span className="skeleton-line" />
        </td>
      ))}
    </tr>
  ));
}

function getLastUpdatedLabel(updatedAt, now) {
  if (!updatedAt) return "Last updated just now";
  const elapsedSeconds = Math.max(0, Math.floor((now - new Date(updatedAt).getTime()) / 1000));
  return `Last updated ${elapsedSeconds} seconds ago`;
}

function PoolPanel({ pool, nextDrawAt, todayWinnerCount }) {
  const now = useClock();
  const countdown = getCountdownParts(nextDrawAt, now);
  const balance = pool?.balance ?? pool?.solBalance ?? 0;
  const isEmpty = balance <= 0;

  return (
    <section className="panel pool-panel">
      <div className="pool-shell">
        <p className="eyebrow">Live Pool Display</p>
        <div className={`pool-amount ${isEmpty ? "pool-amount-empty" : ""}`}>
          {isEmpty ? "Pool grows with every trade. Be early." : formatSol(balance)}
        </div>
        <p className="pool-caption">Current prize pool pulled from the treasury wallet using Solana RPC.</p>
        <div className="countdown-grid">
          <div>
            <span>Minutes</span>
            <strong>{countdown.minutes}</strong>
          </div>
          <div>
            <span>Seconds</span>
            <strong>{countdown.seconds}</strong>
          </div>
        </div>
        <p className="next-draw">Next draw at {formatTimestamp(nextDrawAt, { timeOnly: true })}</p>
        <div className="pool-actions">
          <Link href="#winners" className="button button-gold">
            See Today&apos;s Winners
          </Link>
          <span className="ticket-note">1 ticket = {formatNumber(TICKET_CHUNK)} $LOTTO</span>
        </div>
        <div className="pool-meta">
          <span>Today&apos;s winners logged: {formatNumber(todayWinnerCount)}</span>
          <span>Treasury wallet: {formatAddress(pool?.treasuryWallet)}</span>
        </div>
      </div>
    </section>
  );
}

function StatsBar({ stats }) {
  const items = [
    { label: "Total holders", value: formatNumber(stats?.totalHolders ?? 0) },
    { label: "Total tickets", value: formatNumber(stats?.totalTickets ?? 0) },
    { label: "Total SOL paid out", value: formatSol(stats?.totalSolPaidOut ?? 0) },
    { label: "Draws completed", value: formatNumber(stats?.drawsCompleted ?? 0) },
  ];

  return (
    <section className="stats-bar">
      {items.map((item) => (
        <article className="stat-chip" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Step 1 - Hold $LOTTO",
      body: "Every 10,000 $LOTTO in your wallet = 1 ticket. More tokens = better odds. No staking, no lockup.",
    },
    {
      title: "Step 2 - Fees Accrue",
      body: "Creator fees from every $LOTTO trade flow into the prize pool. Watch it grow live.",
    },
    {
      title: "Step 3 - On-Chain Draw",
      body: "Every 30 minutes an on-chain random number is generated. That number mod total tickets = the winning ticket.",
    },
    {
      title: "Step 4 - You Win",
      body: "SOL sent directly to the winner's wallet in one transaction. Verifiable on Solscan.",
    },
  ];

  return (
    <section className="section" id="how-it-works">
      <SectionHeading
        eyebrow="How It Works"
        title="A transparent lottery program built around holder snapshots and verifiable outcomes."
        subtitle="Creator fees fund the prize pool, tickets are derived from wallet balance, and every draw leaves a public audit trail."
      />
      <div className="steps-grid">
        {steps.map((step) => (
          <article className="step-card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EligibilityChecker() {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const deferredWallet = useDeferredValue(wallet.trim());

  async function handleSubmit(event) {
    event.preventDefault();

    if (!deferredWallet) {
      setError("Enter a Solana wallet address to continue.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/check-wallet?wallet=${encodeURIComponent(deferredWallet)}`, {
        cache: "no-store",
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Unable to check this wallet.");
      }

      setResult(payload.data);
    } catch (submitError) {
      setResult(null);
      setError(submitError.message || "Unable to check this wallet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section" id="registry">
      <SectionHeading
        eyebrow="Eligibility Checker"
        title="Check Your Tickets"
        subtitle="Enter a Solana wallet and the registry will pull current $LOTTO holdings, ticket count, odds, and ranking."
      />
      <div className="checker-panel panel">
        <form className="checker-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={wallet}
            onChange={(event) => setWallet(event.target.value)}
            placeholder="Enter your Solana wallet address"
          />
          <button className="button button-green" type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check My Tickets"}
          </button>
        </form>
        {error ? <p className="error-banner">{error}</p> : null}
        {loading && !result ? (
          <div className="checker-grid checker-grid-loading">
            <span className="skeleton-line" />
            <span className="skeleton-line" />
            <span className="skeleton-line" />
            <span className="skeleton-line" />
          </div>
        ) : null}
        {result ? (
          <div className="checker-grid">
            <article>
              <span>$LOTTO held</span>
              <strong>{formatNumber(result.balance ?? result.held)}</strong>
            </article>
            <article>
              <span>Number of tickets</span>
              <strong>{formatNumber(result.tickets)}</strong>
            </article>
            <article>
              <span>Odds percentage</span>
              <strong>{formatPercent(result.oddsPercent)}</strong>
            </article>
            <article>
              <span>Registry rank</span>
              <strong>{result.registryRank ? `#${formatNumber(result.registryRank)}` : "Unranked"}</strong>
            </article>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function RegistryTable({ registry, loading, error, updatedAt }) {
  const now = useClock();

  return (
    <section className="section">
      <SectionHeading
        eyebrow="Registry"
        title="Current Ticket Registry"
        subtitle={`${formatNumber(registry?.summary?.eligibleHolders ?? 0)} eligible | ${formatNumber(registry?.totalTickets ?? 0)} total tickets | refreshes every 30 seconds`}
      />
      <div className="table-shell panel">
        <div className="table-meta">
          <span>Sorted by holdings descending.</span>
          <span>
            {loading && !registry?.holders?.length
              ? "Fetching holders..."
              : error
                ? "RPC error — retrying..."
                : "Live registry online."}
          </span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Address</th>
                <th>$LOTTO Held</th>
                <th>Tickets</th>
                <th>Win Odds %</th>
              </tr>
            </thead>
            <tbody>
              {loading && !registry?.holders?.length ? <SkeletonRows rows={8} columns={5} /> : null}
              {!loading && !registry?.holders?.length ? (
                <tr>
                  <td colSpan={5} className="empty-cell">
                    {error ? "RPC error — retrying..." : "Holder registry is waiting on Solana RPC data."}
                  </td>
                </tr>
              ) : null}
              {registry?.holders?.map((holder) => (
                <tr key={holder.wallet}>
                  <td>{holder.rank}</td>
                  <td>{formatAddress(holder.wallet)}</td>
                  <td>{formatNumber(holder.balance ?? holder.held)}</td>
                  <td>{formatNumber(holder.tickets)}</td>
                  <td>{holder.odds || formatPercent(holder.oddsPercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="table-updated">{getLastUpdatedLabel(updatedAt, now)}</p>
    </section>
  );
}

function WinnersFeed({ winners, nextDrawAt, loading }) {
  const hasWinners = winners?.length > 0;

  return (
    <section className="section" id="winners">
      <SectionHeading
        eyebrow="Winners"
        title="Latest Winners"
        subtitle="Real holders. Real SOL. Every draw verified on-chain."
      />
      <div className={`panel winners-panel ${hasWinners ? "is-celebrating" : ""}`}>
        {hasWinners ? <div className="confetti-layer" aria-hidden="true" /> : null}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Wallet</th>
                <th>Amount SOL</th>
                <th>Transaction</th>
              </tr>
            </thead>
            <tbody>
              {loading && !hasWinners ? <SkeletonRows rows={4} columns={4} /> : null}
              {!loading && !hasWinners ? (
                <tr>
                  <td colSpan={4} className="empty-cell">
                    No winners yet. First draw runs in {formatRelativeCountdown(nextDrawAt)}. Good luck.
                  </td>
                </tr>
              ) : null}
              {winners?.map((winner) => (
                <tr key={winner.id}>
                  <td>{formatTimestamp(winner.createdAt)}</td>
                  <td>{formatAddress(winner.wallet)}</td>
                  <td>{formatSol(winner.amountSol)}</td>
                  <td>
                    {winner.txHash ? (
                      <a href={getSolscanUrl("tx", winner.txHash)} target="_blank" rel="noreferrer">
                        View on Solscan
                      </a>
                    ) : (
                      <span className="muted">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PublicRecord({ records, loading }) {
  return (
    <section className="section" id="record">
      <div className="section-heading split">
        <div>
          <p className="eyebrow">Public Record</p>
          <h2>Every draw is logged, linkable, and independently verifiable.</h2>
          <p>Each record includes winner mapping, placeholder VRF hooks, and payout references for full manual verification.</p>
        </div>
        <a className="button button-outline" href="/api/export">
          Download raw data
        </a>
      </div>
      <div className="table-shell panel">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Draw #</th>
                <th>Date</th>
                <th>Winner wallet</th>
                <th>Amount SOL</th>
                <th>VRF request tx</th>
                <th>VRF fulfillment tx</th>
                <th>Payout tx</th>
              </tr>
            </thead>
            <tbody>
              {loading && !records?.length ? <SkeletonRows rows={6} columns={7} /> : null}
              {!loading && !records?.length ? (
                <tr>
                  <td colSpan={7} className="empty-cell">
                    Public record will populate after the first draw is logged.
                  </td>
                </tr>
              ) : null}
              {records?.map((record) => (
                <tr key={record.id}>
                  <td>{record.drawNumber}</td>
                  <td>{formatTimestamp(record.timestamp)}</td>
                  <td>{record.winnerWallet ? formatAddress(record.winnerWallet) : "Pending"}</td>
                  <td>{record.amountSol ? formatSol(record.amountSol) : "Pending"}</td>
                  <td>
                    {record.vrfRequestTx ? (
                      <a href={getSolscanUrl("tx", record.vrfRequestTx)} target="_blank" rel="noreferrer">
                        Request
                      </a>
                    ) : (
                      <span className="muted">Manual integration</span>
                    )}
                  </td>
                  <td>
                    {record.vrfFulfillmentTx ? (
                      <a href={getSolscanUrl("tx", record.vrfFulfillmentTx)} target="_blank" rel="noreferrer">
                        Fulfillment
                      </a>
                    ) : (
                      <span className="muted">Manual integration</span>
                    )}
                  </td>
                  <td>
                    {record.payoutTx ? (
                      <a href={getSolscanUrl("tx", record.payoutTx)} target="_blank" rel="noreferrer">
                        Payout
                      </a>
                    ) : (
                      <span className="muted">Pending payout</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Hero({ nextDrawAt }) {
  const now = useClock();

  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="status-badge">
          <span className="pulse-dot" />
          Program Status: ACTIVE
        </div>
        <h1>No Forms. No Filing. Just Winners.</h1>
        <p>
          The $LOTTO program randomly selects holders every 30 minutes. Creator fees fund the prize
          pool. On-chain randomness picks the winner. SOL paid directly to your wallet.
        </p>
        <div className="feature-badges">
          <span>On-chain VRF</span>
          <span>Draws every 30 min</span>
          <span>Paid in SOL</span>
          <span>No sign-in required</span>
        </div>
        <div className="hero-actions">
          <Link href="#winners" className="button button-gold">
            See Latest Winners
          </Link>
          <div className="hero-timer">Next draw in {formatRelativeCountdown(new Date(nextDrawAt || now))}</div>
        </div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="lottery-ball ball-07">07</div>
        <div className="lottery-ball ball-18">18</div>
        <div className="lottery-ball ball-30">30</div>
        <div className="lottery-ball ball-77">77</div>
        <div className="terminal-grid" />
      </div>
    </section>
  );
}

export function LottoDashboard({ initialDashboard }) {
  const holdersResource = usePolledResource(
    "/api/holders",
    REGISTRY_REFRESH_MS,
    initialDashboard?.registry || null,
  );
  const treasuryResource = usePolledResource(
    "/api/treasury",
    TREASURY_REFRESH_MS,
    initialDashboard?.pool || null,
  );

  const data = initialDashboard?.generatedAt ? initialDashboard : null;
  const registry = holdersResource.data || data?.registry || null;
  const pool = treasuryResource.data || data?.pool || null;
  const today = new Date().toDateString();
  const todayWinnerCount =
    data?.latestWinners?.filter((winner) => new Date(winner.createdAt).toDateString() === today).length ?? 0;

  const stats = {
    totalHolders: registry?.totalHolders ?? data?.stats?.totalHolders ?? 0,
    totalTickets: registry?.totalTickets ?? data?.stats?.totalTickets ?? 0,
    totalSolPaidOut: data?.stats?.totalSolPaidOut ?? 0,
    drawsCompleted: data?.stats?.drawsCompleted ?? 0,
  };

  return (
    <main className="lotto-page">
      <div className="ticker-wrap">
        <div className="ticker-track">
          <span>
            PROGRAM STATUS: ACTIVE | DRAWS EVERY 30 MINUTES | FUNDED BY CREATOR FEES | RECIPIENT
            SELECTION VIA ON-CHAIN RANDOMNESS | VERIFIED ON SOLANA | NO FORMS | NO FILING | JUST
            WINNERS
          </span>
          <span>
            PROGRAM STATUS: ACTIVE | DRAWS EVERY 30 MINUTES | FUNDED BY CREATOR FEES | RECIPIENT
            SELECTION VIA ON-CHAIN RANDOMNESS | VERIFIED ON SOLANA | NO FORMS | NO FILING | JUST
            WINNERS
          </span>
        </div>
      </div>

      <header className="site-header">
        <Link href="#" className="logo">
          $LOTTO
        </Link>
        <nav>
          <Link href="#registry">Registry</Link>
          <Link href="#how-it-works">How It Works</Link>
          <Link href="#winners">Winners</Link>
          <Link href="#record">Public Record</Link>
        </nav>
        <a className="button button-gold" href={`https://pump.fun/coin/${LOTTO_MINT}`} target="_blank" rel="noreferrer">
          Buy $LOTTO
        </a>
      </header>

      <section className="page-shell">
        <Hero nextDrawAt={data?.nextDrawAt} />
        <PoolPanel pool={pool} nextDrawAt={data?.nextDrawAt} todayWinnerCount={todayWinnerCount} />
        <StatsBar stats={stats} />
        {holdersResource.error && !registry?.holders?.length ? <p className="error-banner">RPC error — retrying...</p> : null}
        <HowItWorks />
        <EligibilityChecker />
        <RegistryTable
          registry={registry}
          loading={holdersResource.loading}
          error={holdersResource.error}
          updatedAt={holdersResource.updatedAt}
        />
        <WinnersFeed winners={data?.latestWinners} nextDrawAt={data?.nextDrawAt} loading={false} />
        <PublicRecord records={data?.publicRecord} loading={false} />
      </section>

      <footer className="site-footer">
        <div>
          <div className="logo">$LOTTO</div>
          <p>Every draw is verifiable on-chain.</p>
        </div>
        <div className="footer-links">
          <a href={process.env.NEXT_PUBLIC_X_URL || "https://x.com"} target="_blank" rel="noreferrer">
            X
          </a>
          <a href={process.env.NEXT_PUBLIC_TELEGRAM_URL || "https://t.me"} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={getSolscanUrl("account", LOTTO_MINT)} target="_blank" rel="noreferrer">
            Solscan
          </a>
        </div>
        <div className="footer-meta">
          <p>CA: {LOTTO_MINT}</p>
          <p>(c) 2026 $LOTTO | NFA | DYOR | On-chain lottery. Not affiliated with any government lottery program.</p>
        </div>
      </footer>
    </main>
  );
}
