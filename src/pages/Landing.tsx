import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./landing.css";

const BARS = [34, 42, 38, 90, 48, 40, 36];

export default function Landing() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Loop | Autonomous ops that fix incidents before users notice";

    const counter = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      counter.unobserve(e.target);
      const el = e.target as HTMLElement;
      const to = +el.dataset.n!, d = +(el.dataset.d || 0), t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - t0) / 1200), v = to * (1 - Math.pow(1 - p, 3));
        el.textContent = (el.dataset.p || "") + v.toFixed(d) + (el.dataset.s || "");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }), { threshold: 0.6 });
    document.querySelectorAll(".landing [data-n]").forEach((el) => counter.observe(el));

    const reveal = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
    }), { threshold: 0.12 });
    document.querySelectorAll(".landing .card, .landing .steps li, .landing .faq details, .landing .final, .landing .stats > div").forEach((el) => {
      el.classList.add("rv");
      reveal.observe(el);
    });
    return () => { counter.disconnect(); reveal.disconnect(); document.title = prev; };
  }, []);

  return (
    <div className="landing">
      <div className="shell">
      
      <header className="nav">
        <a className="brand" href="#top"><img className="mark" src="/logo.svg" alt="" />Loop</a>
        <nav className="pill" aria-label="Main">
          <a className="is-on" href="#top">Home</a>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#results">Results</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav__right">
          <Link className="link" to="/overview">Login</Link>
          <Link className="btn btn--dark btn--sm" to="/overview">Open demo</Link>
        </div>
      </header>
      
      <section className="hero" id="top">
        <div className="hero__sky"></div>
        <div className="hero__copy">
          <h1>
            <span className="tag tag--blue">SRE team</span>
            Fix Incidents <span className="box box--blue">Before</span><br />
            Users <span className="box box--pink">Notice</span>
            <span className="tag tag--pink">Loop AI</span>
          </h1>
          <p>Loop watches 4.2M events a second, predicts failures up to an hour early, and rolls out the fix on its own. Every action is signed and audited.</p>
          <div className="cta">
            <Link className="btn btn--dark" to="/overview">Start for free <span>→</span></Link>
            <a className="btn btn--ghost" href="#how"><b className="play"></b>See how it works</a>
          </div>
          <p className="proof"><span className="avatars"><i></i><i></i><i></i><i></i></span>2,400+ incidents auto-resolved this month</p>
        </div>
      
        <div className="dash" aria-label="Loop dashboard preview">
          <aside className="dash__side">
            <div className="dash__logo"><img className="mark" src="/logo.svg" alt="" />Loop</div>
            <div className="dash__search">Search anything…</div>
            <small>MENU</small>
            <a className="on">Overview</a><a>Incidents</a><a>Predictions</a><a>Remediation</a><a>Deployments</a>
            <small>TOOLS</small>
            <a>FinOps</a><a>Chaos</a><a>Audit log</a>
          </aside>
          <div className="dash__main">
            <div className="kpis">
              <div><span>Avg MTTR</span><b>14.2m</b><em className="up">↓ 73% vs baseline</em></div>
              <div><span>Auto-fix rate</span><b>83%</b><em>↑ 5% this week</em></div>
              <div><span>Cost saved</span><b>$9K</b><em>per month</em></div>
            </div>
            <div className="dash__row">
              <div className="panel">
                <span className="ph">Incident timeline</span>
                <ul className="tl">
                  <li><i className="d red"></i>Redis cache memory exhaustion<em>2 min ago</em></li>
                  <li><i className="d amber"></i>Payment latency spike<em className="chip">PREDICTED · 18m</em></li>
                  <li><i className="d green"></i>Auth token refresh failure<em className="chip ok">AUTO-FIX · 15m</em></li>
                  <li><i className="d green"></i>API gateway 502 errors<em className="chip ok">AUTO-FIX · 30m</em></li>
                </ul>
              </div>
              <div className="panel">
                <span className="ph">P99 latency</span>
                <div className="bars">{BARS.map((h, i) => <i key={i} className={h > 80 ? "hi" : ""} style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} />)}</div>
                <div className="days"><i>Mon</i><i>Tue</i><i>Wed</i><i>Thu</i><i>Fri</i><i>Sat</i><i>Sun</i></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="logos" aria-label="Works with">
        <span>Datadog</span><span>Kubernetes</span><span>Grafana</span><span>PagerDuty</span><span>AWS</span>
      </section>
      
      <section className="sec" id="features">
        <h2>Ops for teams that<br />would rather sleep</h2>
        <p className="sub">One platform to detect, predict, fix and prove. No runbooks to dig through at 3 a.m.</p>
      
        <div className="grid">
          <article className="card card--wide">
            <div className="card__txt"><h3>Predicts incidents up to 60 minutes early</h3><p>Loop learns your normal and flags drift before it turns into downtime.</p></div>
            <div className="card__viz pink">
              <div className="mini"><span>payment-service</span><b>Latency 245ms</b><div className="meter"><i style={{ width: "72%" }}></i></div><em>Predicted in 18 min</em></div>
              <div className="mini"><span>redis-cache</span><b>CPU 95%</b><div className="meter hot"><i style={{ width: "95%" }}></i></div><em>Critical now</em></div>
            </div>
          </article>
          <article className="card">
            <div className="card__viz blue center"><div className="big">83%</div><span>of incidents fixed with no human</span></div>
            <div className="card__txt"><h3>Auto-remediation</h3><p>Restarts, scale-ups and rollbacks, run safely behind canary checks.</p></div>
          </article>
          <article className="card">
            <div className="card__viz blue center"><div className="hash">0xa3f2…8b1c</div><div className="hash">0xb7d1…4e2a</div><div className="hash">0xc9e4…7f3b</div></div>
            <div className="card__txt"><h3>Tamper-proof audit log</h3><p>Every action is signed and verifiable, so reviews take minutes.</p></div>
          </article>
          <article className="card card--wide">
            <div className="card__txt"><h3>Root cause in one click</h3><p>Trace a failure across services, deploys and config changes without opening six tabs.</p></div>
            <div className="card__viz pink center">
              <div className="chain"><span>cdn-edge</span><i></i><span>api-gateway</span><i></i><span className="bad">redis-cache</span><i></i><span>payment</span></div>
            </div>
          </article>
        </div>
      </section>
      
      <section className="sec" id="how">
        <h2>From alert to <span className="box box--blue">fixed</span><br />in four steps</h2>
        <ol className="steps">
          <li><b>1</b><h3>Connect</h3><p>Plug in metrics, logs and your CI/CD in minutes.</p></li>
          <li><b>2</b><h3>Learn</h3><p>Loop maps your services and builds a baseline.</p></li>
          <li><b>3</b><h3>Predict</h3><p>Risky drift is flagged before users feel it.</p></li>
          <li><b>4</b><h3>Fix</h3><p>Safe remediation runs, then is logged and signed.</p></li>
        </ol>
      </section>
      
      <section className="sec" id="results">
        <div className="stats">
          <div><b data-n="73" data-s="%">73%</b><span>faster MTTR</span></div>
          <div><b data-n="83" data-s="%">83%</b><span>auto-fix rate</span></div>
          <div><b data-n="99.8" data-s="%" data-d="1">99.8%</b><span>uptime</span></div>
          <div><b data-n="9" data-p="$" data-s="K">$9K</b><span>saved per month</span></div>
        </div>
      </section>
      
      <section className="sec" id="faq">
        <h2>Questions, answered</h2>
        <div className="faq">
          <details open><summary>Will Loop change production without asking?</summary><p>Only inside the guardrails you set. Risky actions use canary rollouts and can require approval.</p></details>
          <details><summary>What does it connect to?</summary><p>Metrics, logs, Kubernetes, cloud providers and your deploy pipeline.</p></details>
          <details><summary>How are actions audited?</summary><p>Each action is hashed and signed, so you can verify who or what changed what, and when.</p></details>
        </div>
      </section>
      
      <section className="final">
        <h2>Let Loop take the<br />pager for a while</h2>
        <Link className="btn btn--dark" to="/overview">Try the live demo <span>→</span></Link>
      </section>
      
      <footer className="foot"><a className="brand" href="#top"><img className="mark" src="/logo.svg" alt="" />Loop</a><span>© 2026 Loop. Autonomous ops.</span></footer>
      </div>
    </div>
  );
}
