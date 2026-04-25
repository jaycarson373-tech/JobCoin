export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <div className="shell topbar">
          <a className="brand" href="#top">
            <div className="brand-icon">in</div>
          </a>

          <div className="search-box">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z"/>
            </svg>
            <input type="text" placeholder="Search" />
          </div>

          <div className="nav-spacer" />

          <nav className="site-nav">
            <a href="#feed" className="nav-item active">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 9v2h-2v7a3 3 0 0 1-3 3h-4v-6h-4v6H6a3 3 0 0 1-3-3v-7H1V9l11-7 5 3.18V2h3v5.09z"/>
              </svg>
              <span>Home</span>
            </a>
            <a href="#payroll" className="nav-item">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 16v6H3v-6a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3zm5.5-3A3.5 3.5 0 1 0 14 9.5a3.5 3.5 0 0 0 3.5 3.5zm1 2h-2a2.5 2.5 0 0 0-2.5 2.5V22h7v-4.5a2.5 2.5 0 0 0-2.5-2.5zM7.5 2A4.5 4.5 0 1 0 12 6.5 4.49 4.49 0 0 0 7.5 2z"/>
              </svg>
              <span>Workers</span>
            </a>
            <a href="#verified" className="nav-item">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 6V5a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3v1H2v4a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V6zM9 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9zm10 9a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4v-1h14z"/>
              </svg>
              <span>Jobs</span>
            </a>
            <a href="#buy" className="nav-item">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18h-2v-1.07A4 4 0 0 1 8 13h2a2 2 0 1 0 2-2 4 4 0 0 1 1-7.93V2h2v1.07A4 4 0 0 1 16 7h-2a2 2 0 1 0-2 2 4 4 0 0 1 1 7.93z"/>
              </svg>
              <span>Buy JOB</span>
            </a>

            <div className="nav-divider" />

            <div className="nav-profile">
              <div className="nav-avatar">J</div>
              <span className="nav-label">
                Me
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </span>
            </div>
          </nav>
        </div>
      </header>

      <div className="shell app-shell" id="top">
        <aside className="left-rail">
          <section className="card profile-card">
            <div className="profile-cover" />
            <div className="profile-content">
              <div className="profile-avatar">J</div>
              <h1 className="profile-name">Job Coin</h1>
              <p className="profile-headline">AI took your job. Come work for the coin.</p>
              
              <div className="profile-divider" />
              
              <div className="profile-stats">
                <div className="stat-row">
                  <span className="stat-label">Verified workers</span>
                  <span className="stat-value">27</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Payroll this cycle</span>
                  <span className="stat-value">182,500 JOB</span>
                </div>
              </div>
            </div>
          </section>

          <section className="card side-panel">
            <div className="side-panel-header">
              <h2 className="side-panel-title">How it works</h2>
            </div>
            <ol className="side-list">
              <li>Buy JOB tokens</li>
              <li>Get verified as a worker</li>
              <li>Work for the coin</li>
              <li>Get paid in JOB</li>
            </ol>
          </section>

          <section className="card side-panel">
            <div className="side-panel-header">
              <h2 className="side-panel-title">Work types</h2>
            </div>
            <div className="tag-list">
              <span className="tag">Content</span>
              <span className="tag">Replies</span>
              <span className="tag">Design</span>
              <span className="tag">Community</span>
              <span className="tag">Ops</span>
            </div>
          </section>
        </aside>

        <section className="feed-column" id="feed">
          <section className="banner-placeholder">
            <div className="banner-content">
              <span className="banner-text">Banner</span>
            </div>
          </section>

          <a 
            href="https://x.com/i/communities/1920174889428152689" 
            target="_blank" 
            rel="noopener noreferrer"
            className="card composer composer-link"
          >
            <div className="composer-row">
              <div className="composer-avatar">J</div>
              <div className="composer-input">Start a post about the coin...</div>
            </div>
            <div className="composer-actions">
              <div className="composer-action media">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>Post on X</span>
              </div>
              <div className="composer-action event">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span>Community</span>
              </div>
              <div className="composer-action article">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span>Join</span>
              </div>
            </div>
          </a>

          <article className="card post">
            <div className="post-header">
              <div className="post-avatar">J</div>
              <div className="post-meta">
                <div className="post-author">Job Coin</div>
                <div className="post-author-detail">AI took your job. Come work for the coin.</div>
                <div className="post-time">
                  Pinned
                  <span>{"·"}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </div>
              <div className="post-more">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                </svg>
              </div>
            </div>
            <div className="post-content">
              <h3 className="post-title">Turn the coin into the company.</h3>
              <p className="post-text">
                Job Coin is built around one loop: creator fees buy back JOB, the treasury pays
                verified workers, and workers keep pushing the coin because the upside is visible.
              </p>
            </div>
            <div className="post-metrics">
              <div className="metric">
                <span className="metric-label">Buyback source</span>
                <span className="metric-value">Creator fees</span>
              </div>
              <div className="metric">
                <span className="metric-label">Payout asset</span>
                <span className="metric-value">JOB</span>
              </div>
              <div className="metric">
                <span className="metric-label">Who gets paid</span>
                <span className="metric-value">Workers</span>
              </div>
            </div>
            <div className="post-engagement">
              <div className="post-reactions">
                <div className="reaction-icons">
                  <div className="reaction-icon like">+</div>
                  <div className="reaction-icon celebrate">!</div>
                  <div className="reaction-icon support">*</div>
                </div>
                <span>127 reactions</span>
              </div>
              <span>42 comments</span>
            </div>
            <div className="post-actions">
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.46 11l-3.91-3.91a7 7 0 0 1 1.69-2.74l-.49-.49a9 9 0 0 0-2.34 3.18l-4.87-4.87a1 1 0 0 0-1.42 0L2 8.29a1 1 0 0 0 0 1.42l4.87 4.87a9 9 0 0 0-3.18 2.34l.49.49a7 7 0 0 0 2.74-1.69L11 19.46a1 1 0 0 0 1.42 0l.49-.49-3.91-3.91a1 1 0 0 0-1.42 0l-.49.49 2.83 2.83-2.83 2.83L4 18l2.83-2.83L4 12.34l3.66-3.66 2.83 2.83-2.83 2.83.49.49a1 1 0 0 0 1.42 0l3.91-3.91.49.49a1 1 0 0 0 0-1.42z"/>
                </svg>
                <span>Like</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a10 10 0 0 1-10 10H3v-3h10a7 7 0 1 0-7-7v2H3V3h10a10 10 0 0 1 10 10z"/>
                </svg>
                <span>Comment</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12l-4.61 7H16l4-6H8a7 7 0 0 1-7-7V3h2v3a5 5 0 0 0 5 5h12l-4-6h2.39z"/>
                </svg>
                <span>Repost</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"/>
                </svg>
                <span>Send</span>
              </div>
            </div>
          </article>

          <article className="card post" id="payroll">
            <div className="payroll-header">
              <h3 className="payroll-title">Public Payroll</h3>
              <span className="payroll-badge">Live</span>
            </div>
            <div className="post-content">
              <p className="post-text">
                People should instantly see workers getting paid. Transparency builds trust.
              </p>
            </div>
            <div className="post-metrics">
              <div className="metric">
                <span className="metric-label">Cycle payout</span>
                <span className="metric-value">182,500 JOB</span>
              </div>
              <div className="metric">
                <span className="metric-label">Workers paid</span>
                <span className="metric-value">27</span>
              </div>
              <div className="metric">
                <span className="metric-label">Fee routing</span>
                <span className="metric-value">94%</span>
              </div>
            </div>
            <div className="payroll-table">
              <div className="table-row table-head">
                <span>Worker</span>
                <span>Role</span>
                <span>Output</span>
                <span>Paid</span>
              </div>
              <div className="table-row">
                <span>worker_01</span>
                <span>Content</span>
                <span>Clips and posts</span>
                <span>22,000 JOB</span>
              </div>
              <div className="table-row">
                <span>worker_02</span>
                <span>Replies</span>
                <span>Reply ops and joins</span>
                <span>17,500 JOB</span>
              </div>
              <div className="table-row">
                <span>worker_03</span>
                <span>Threads</span>
                <span>Long-form posts</span>
                <span>14,000 JOB</span>
              </div>
              <div className="table-row">
                <span>worker_04</span>
                <span>Community</span>
                <span>Moderation</span>
                <span>11,500 JOB</span>
              </div>
            </div>
            <div className="post-engagement">
              <div className="post-reactions">
                <div className="reaction-icons">
                  <div className="reaction-icon like">+</div>
                  <div className="reaction-icon celebrate">!</div>
                </div>
                <span>89 reactions</span>
              </div>
              <span>18 comments</span>
            </div>
            <div className="post-actions">
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.46 11l-3.91-3.91a7 7 0 0 1 1.69-2.74l-.49-.49a9 9 0 0 0-2.34 3.18l-4.87-4.87a1 1 0 0 0-1.42 0L2 8.29a1 1 0 0 0 0 1.42l4.87 4.87a9 9 0 0 0-3.18 2.34l.49.49a7 7 0 0 0 2.74-1.69L11 19.46a1 1 0 0 0 1.42 0l.49-.49-3.91-3.91a1 1 0 0 0-1.42 0l-.49.49 2.83 2.83-2.83 2.83L4 18l2.83-2.83L4 12.34l3.66-3.66 2.83 2.83-2.83 2.83.49.49a1 1 0 0 0 1.42 0l3.91-3.91.49.49a1 1 0 0 0 0-1.42z"/>
                </svg>
                <span>Like</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a10 10 0 0 1-10 10H3v-3h10a7 7 0 1 0-7-7v2H3V3h10a10 10 0 0 1 10 10z"/>
                </svg>
                <span>Comment</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12l-4.61 7H16l4-6H8a7 7 0 0 1-7-7V3h2v3a5 5 0 0 0 5 5h12l-4-6h2.39z"/>
                </svg>
                <span>Repost</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"/>
                </svg>
                <span>Send</span>
              </div>
            </div>
          </article>

          <article className="card post" id="verified">
            <div className="post-header">
              <div className="post-avatar">V</div>
              <div className="post-meta">
                <div className="post-author">Verified Workers</div>
                <div className="post-author-detail">No badge, no fees. Get verified to start earning.</div>
                <div className="post-time">2h ago</div>
              </div>
            </div>
            <div className="post-content">
              <h3 className="post-title">You need the badge to get paid.</h3>
              <p className="post-text">
                Payroll is only for approved accounts with a linked wallet and tracked output. The
                point is a real worker network, not random wallet farming.
              </p>
            </div>
            <div className="post-metrics">
              <div className="metric">
                <span className="metric-label">Identity</span>
                <span className="metric-value">Wallet + account</span>
              </div>
              <div className="metric">
                <span className="metric-label">Track</span>
                <span className="metric-value">Content, ops</span>
              </div>
              <div className="metric">
                <span className="metric-label">Approval</span>
                <span className="metric-value">Verified badge</span>
              </div>
            </div>
            <div className="post-engagement">
              <div className="post-reactions">
                <div className="reaction-icons">
                  <div className="reaction-icon like">+</div>
                  <div className="reaction-icon support">*</div>
                </div>
                <span>64 reactions</span>
              </div>
              <span>23 comments</span>
            </div>
            <div className="post-actions">
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.46 11l-3.91-3.91a7 7 0 0 1 1.69-2.74l-.49-.49a9 9 0 0 0-2.34 3.18l-4.87-4.87a1 1 0 0 0-1.42 0L2 8.29a1 1 0 0 0 0 1.42l4.87 4.87a9 9 0 0 0-3.18 2.34l.49.49a7 7 0 0 0 2.74-1.69L11 19.46a1 1 0 0 0 1.42 0l.49-.49-3.91-3.91a1 1 0 0 0-1.42 0l-.49.49 2.83 2.83-2.83 2.83L4 18l2.83-2.83L4 12.34l3.66-3.66 2.83 2.83-2.83 2.83.49.49a1 1 0 0 0 1.42 0l3.91-3.91.49.49a1 1 0 0 0 0-1.42z"/>
                </svg>
                <span>Like</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 9h10v1H7zm0 4h7v-1H7zm16-2a10 10 0 0 1-10 10H3v-3h10a7 7 0 1 0-7-7v2H3V3h10a10 10 0 0 1 10 10z"/>
                </svg>
                <span>Comment</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 12l-4.61 7H16l4-6H8a7 7 0 0 1-7-7V3h2v3a5 5 0 0 0 5 5h12l-4-6h2.39z"/>
                </svg>
                <span>Repost</span>
              </div>
              <div className="post-action">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"/>
                </svg>
                <span>Send</span>
              </div>
            </div>
          </article>
        </section>

        <aside className="right-rail">
          <section className="card jobs-card" id="jobs">
            <div className="jobs-header">
              <h2 className="jobs-title">Open jobs for you</h2>
            </div>
            <div className="job-item">
              <h3 className="job-title">Content Operator</h3>
              <p className="job-company">Job Coin</p>
              <p className="job-location">Remote - Verified</p>
              <p className="job-posted">Actively hiring</p>
            </div>
            <div className="job-divider" />
            <div className="job-item">
              <h3 className="job-title">Reply Coordinator</h3>
              <p className="job-company">Job Coin</p>
              <p className="job-location">Remote - Verified</p>
              <p className="job-posted">Actively hiring</p>
            </div>
            <div className="job-divider" />
            <div className="job-item">
              <h3 className="job-title">Payroll Reviewer</h3>
              <p className="job-company">Job Coin</p>
              <p className="job-location">Remote - Ops</p>
              <p className="job-posted">Actively hiring</p>
            </div>
          </section>

          <section className="card side-panel">
            <div className="side-panel-header">
              <h2 className="side-panel-title">Why it works</h2>
            </div>
            <ul className="side-list">
              <li>Visible upside for real work</li>
              <li>Buybacks create demand</li>
              <li>Payroll makes the pitch concrete</li>
              <li>Transparent worker payments</li>
            </ul>
          </section>

          <section className="card cta-panel" id="buy">
            <div className="cta-icon">J</div>
            <h2 className="cta-title">Start working for the coin</h2>
            <p className="cta-text">AI took your job. Come work for the coin.</p>
            <a className="btn btn-primary" href="#top">Buy JOB</a>
            <a className="btn btn-outline" href="#verified">Apply for Verified</a>
          </section>

          <div className="footer-links">
            <a href="#" className="footer-link">Job Coin Corporation 2024</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
