export default function HomePage() {
  return (
    <main className="job-page">
      <header className="site-header">
        <div className="shell topbar">
          <a className="brand" href="#top">
            <span className="brand-mark">JOB</span>
            <span className="brand-name">Job Coin</span>
          </a>

          <div className="search-shell" aria-label="Search">
            <span className="search-icon">Search</span>
            <span className="search-copy">workers, payroll, jobs</span>
          </div>

          <nav className="site-nav">
            <a href="#feed">Feed</a>
            <a href="#payroll">Payroll</a>
            <a href="#verified">Verified</a>
            <a href="#jobs">Jobs</a>
            <a href="#buy">Buy JOB</a>
          </nav>
        </div>
      </header>

      <div className="shell app-shell" id="top">
        <aside className="left-rail">
          <section className="panel profile-panel">
            <div className="profile-cover" />
            <div className="profile-body">
              <div className="profile-avatar">J</div>
              <h1>Job Coin</h1>
              <p className="profile-headline">AI took your job. Come work for the coin.</p>
              <p className="profile-meta">
                Creator fees buy back JOB. Verified workers get paid for helping the coin grow.
              </p>

              <div className="profile-stats">
                <div>
                  <span>Verified workers</span>
                  <strong>27</strong>
                </div>
                <div>
                  <span>Payroll this cycle</span>
                  <strong>182,500 JOB</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="panel side-list">
            <div className="panel-heading">
              <h2>How it works</h2>
            </div>
            <ol className="compact-steps">
              <li>Buy JOB</li>
              <li>Get verified</li>
              <li>Work for the coin</li>
              <li>Get paid in JOB</li>
            </ol>
          </section>

          <section className="panel side-list">
            <div className="panel-heading">
              <h2>Work types</h2>
            </div>
            <ul className="badge-list">
              <li>Content</li>
              <li>Replies</li>
              <li>Design</li>
              <li>Community</li>
              <li>Ops</li>
            </ul>
          </section>
        </aside>

        <section className="feed-column" id="feed">
          <section className="composer panel">
            <div className="composer-head">
              <div className="mini-avatar">J</div>
              <div>
                <p className="eyebrow">Pinned mission</p>
                <h2>Turn the coin into the company.</h2>
              </div>
            </div>

            <p className="lead-copy">
              Job Coin is built around one loop: creator fees buy back JOB, the treasury pays
              verified workers, and workers keep pushing the coin because the upside is visible.
            </p>

            <div className="action-row">
              <a className="button button-primary" href="#buy">
                Buy JOB
              </a>
              <a className="button button-secondary" href="#verified">
                Become Verified
              </a>
              <a className="button button-secondary" href="#payroll">
                View Payroll
              </a>
            </div>
          </section>

          <section className="post-card panel">
            <div className="post-head">
              <div className="mini-avatar">P</div>
              <div>
                <strong>Payroll engine</strong>
                <span>Creator fees drive buybacks and worker pay</span>
              </div>
            </div>

            <h3>The strategy is simple.</h3>
            <p>
              Use creator fees to buy back JOB and distribute it to verified workers posting,
              replying, designing, moderating, and onboarding for the coin.
            </p>

            <div className="feature-grid">
              <article>
                <span>Buyback source</span>
                <strong>Creator fees</strong>
              </article>
              <article>
                <span>Payout asset</span>
                <strong>JOB</strong>
              </article>
              <article>
                <span>Who gets paid</span>
                <strong>Verified workers</strong>
              </article>
            </div>
          </section>

          <section className="post-card panel" id="payroll">
            <div className="post-head">
              <div className="mini-avatar">$</div>
              <div>
                <strong>Public payroll</strong>
                <span>Obvious by design</span>
              </div>
            </div>

            <h3>People should instantly see workers getting paid.</h3>

            <div className="payroll-strip">
              <div>
                <span>Cycle payout</span>
                <strong>182,500 JOB</strong>
              </div>
              <div>
                <span>Workers paid</span>
                <strong>27</strong>
              </div>
              <div>
                <span>Fee routing</span>
                <strong>94%</strong>
              </div>
            </div>

            <div className="payroll-table" role="table" aria-label="Job Coin payroll table">
              <div className="table-row table-head" role="row">
                <span role="columnheader">Worker</span>
                <span role="columnheader">Role</span>
                <span role="columnheader">Output</span>
                <span role="columnheader">Paid</span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">worker_01</span>
                <span role="cell">Content</span>
                <span role="cell">Clips and posts</span>
                <span role="cell">22,000 JOB</span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">worker_02</span>
                <span role="cell">Replies</span>
                <span role="cell">Reply ops and joins</span>
                <span role="cell">17,500 JOB</span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">worker_03</span>
                <span role="cell">Threads</span>
                <span role="cell">Long-form posts</span>
                <span role="cell">14,000 JOB</span>
              </div>
              <div className="table-row" role="row">
                <span role="cell">worker_04</span>
                <span role="cell">Community</span>
                <span role="cell">Moderation and onboarding</span>
                <span role="cell">11,500 JOB</span>
              </div>
            </div>
          </section>

          <section className="post-card panel" id="verified">
            <div className="post-head">
              <div className="mini-avatar">V</div>
              <div>
                <strong>Verified worker</strong>
                <span>No badge, no fees</span>
              </div>
            </div>

            <h3>You need the badge to get paid.</h3>
            <p>
              Payroll is only for approved accounts with a linked wallet and tracked output. The
              point is a real worker network, not random wallet farming.
            </p>

            <div className="verification-grid">
              <article className="verification-item">
                <span>Identity</span>
                <strong>Wallet + account</strong>
              </article>
              <article className="verification-item">
                <span>Track</span>
                <strong>Content, growth, ops</strong>
              </article>
              <article className="verification-item">
                <span>Approval</span>
                <strong>Verified worker badge</strong>
              </article>
            </div>
          </section>
        </section>

        <aside className="right-rail">
          <section className="panel side-list" id="jobs">
            <div className="panel-heading">
              <h2>Open jobs</h2>
            </div>

            <div className="job-list">
              <article className="job-item">
                <strong>Content operator</strong>
                <span>Remote - Verified</span>
                <p>Posts, clips, edits.</p>
              </article>
              <article className="job-item">
                <strong>Reply coordinator</strong>
                <span>Remote - Verified</span>
                <p>Replies, campaigns, raids.</p>
              </article>
              <article className="job-item">
                <strong>Payroll reviewer</strong>
                <span>Remote - Ops</span>
                <p>Check output and payouts.</p>
              </article>
            </div>
          </section>

          <section className="panel side-list">
            <div className="panel-heading">
              <h2>Why it works</h2>
            </div>

            <ul className="insight-list">
              <li>Visible upside for real work</li>
              <li>Buybacks create demand</li>
              <li>Payroll makes the pitch concrete</li>
            </ul>
          </section>

          <section className="panel cta-panel" id="buy">
            <p className="eyebrow">Start here</p>
            <h2>Buy JOB. Get verified. Work for the coin.</h2>
            <p>AI took your job. Come work for the coin.</p>
            <a className="button button-primary" href="#top">
              Buy JOB
            </a>
            <a className="button button-secondary" href="#verified">
              Apply for Verified Worker
            </a>
          </section>
        </aside>
      </div>
    </main>
  );
}
