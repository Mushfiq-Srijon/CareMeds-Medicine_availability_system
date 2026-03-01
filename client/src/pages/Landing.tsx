// @ts-nocheck
import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <>
      <div className="landing-root">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-inner">

            {/* Bottom-left: tagline + buttons */}
            <div className="hero-left">
              <p className="hero-tagline">
                <strong>Can't find your medicines at nearby pharmacies?</strong>
                CareMeds connects you instantly.
              </p>
              <div className="btn-row">
                <Link to="/login"    className="btn btn-login">Login</Link>
                <Link to="/register" className="btn btn-register">Register</Link>
              </div>
            </div>

            {/* Right: title + desc */}
            <div className="hero-right">
              <div className="hero-pill">Medicine Delivery Platform</div>
              <h1 className="hero-title">Care<span>Meds</span></h1>
              <p className="hero-desc">
                Find medicines from nearby pharmacies, order online, and get them delivered to your door — fast, simple, reliable.
              </p>
            </div>

          </div>
        </div>

        {/* ── BOTTOM ── */}
        <div className="bottom">

          {/* Left: roles */}
          <div className="bottom-block">
            <div className="bottom-tag"><span className="dot" />Access</div>
            <h2 className="bottom-heading">Login as<br />different roles</h2>
            <p className="bottom-desc">
              CareMeds is built for everyone in the chain — whether you're ordering, stocking, or delivering.
            </p>

            <div className="role-cards">
              <div className="role-card customer">
                <div className="role-icon customer">🛒</div>
                <div className="role-info">
                  <div className="role-name">Customer</div>
                  <div className="role-desc">Browse medicines, place orders & track deliveries</div>
                </div>
                <span className="role-arrow">›</span>
              </div>

              <div className="role-card pharmacy">
                <div className="role-icon pharmacy">🏪</div>
                <div className="role-info">
                  <div className="role-name">Pharmacy</div>
                  <div className="role-desc">Manage stock, listings & incoming orders</div>
                </div>
                <span className="role-arrow">›</span>
              </div>

              <div className="role-card rider">
                <div className="role-icon rider">🚴</div>
                <div className="role-info">
                  <div className="role-name">Rider</div>
                  <div className="role-desc">Accept delivery tasks & earn on every order</div>
                </div>
                <span className="role-arrow">›</span>
              </div>
            </div>
          </div>

          {/* Right: find medicine */}
          <div className="bottom-block bottom-block-right">
            <div className="bottom-tag"><span className="dot" style={{background:'#27ae60'}} />How it works</div>
            <h2 className="bottom-heading">Find your<br />desired medicine</h2>
            <p className="bottom-desc">
              Three simple steps — and your medicine is on its way.
            </p>

            <div className="how-steps">
              <div className="how-step">
                <div className="step-num">01</div>
                <div className="step-body">
                  <div className="step-title">Create an account</div>
                  <div className="step-desc">Register as a customer in under a minute — no hassle, no paperwork.</div>
                </div>
              </div>
              <div className="step-connector" />
              <div className="how-step">
                <div className="step-num">02</div>
                <div className="step-body">
                  <div className="step-title">Search any medicine</div>
                  <div className="step-desc">Type the name and instantly see availability across nearby pharmacies.</div>
                </div>
              </div>
              <div className="step-connector" />
              <div className="how-step">
                <div className="step-num">03</div>
                <div className="step-body">
                  <div className="step-title">Order & receive</div>
                  <div className="step-desc">Pick home delivery or self-pickup — we'll take care of the rest.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Landing;