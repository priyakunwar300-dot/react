import { useState, useEffect } from "react";
import { Box, Typography, Zoom } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

/* ── Page components ──────────────────────────────────────────────────────── */
import Header   from "./Components/Header";
import Home     from "./Components/Home";
import About    from "./Components/About";
import Services from "./Components/Services";
import Contact  from "./Components/Contact";

/* ══════════════════════════════════════════════════════════
   GLOBAL THEME
══════════════════════════════════════════════════════════ */
const globalTheme = createTheme({
  palette: {
    mode: "light",
    primary:    { main: "#8B6F47" },
    secondary:  { main: "#1A1A2E" },
    background: { default: "#F9F6F0", paper: "#FFFFFF" },
    text:       { primary: "#1A1A2E", secondary: "#7A7570" },
  },
  typography: { fontFamily: "'DM Sans', 'Lato', sans-serif" },
  shape: { borderRadius: 0 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": { boxSizing: "border-box", margin: 0, padding: 0 },
        html: { scrollBehavior: "smooth" },
        body: {
          background: "#F9F6F0",
          overflowX: "hidden",
          /* Custom scrollbar */
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-track": { background: "#F9F6F0" },
          "&::-webkit-scrollbar-thumb": { background: "rgba(139,111,71,0.4)" },
          "&::-webkit-scrollbar-thumb:hover": { background: "rgba(139,111,71,0.7)" },
        },
        "::selection": { background: "rgba(139,111,71,0.2)", color: "#1A1A2E" },
        a: { textDecoration: "none", color: "inherit" },
      },
    },
    MuiButton:  { styleOverrides: { root: { borderRadius: 0, textTransform: "none" } } },
    MuiAppBar:  { styleOverrides: { root: { boxShadow: "none" } } },
  },
});

/* ══════════════════════════════════════════════════════════
   GLOBAL FONTS
══════════════════════════════════════════════════════════ */
const GlobalFonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Lato:wght@300;400&display=swap');

    /* ─ Gold text colour patch ─────────────────────────────────────────────
       These selectors target the plain-text headline words that appear
       BEFORE the italic gold <em> inside every section.
       e.g.  "Mastery Across Every"  (plain)  +  "Digital Channel"  (italic gold)
             "The Mind Behind"        (plain)  +  "Efourge"          (italic gold)
       We make the plain part a warm charcoal so it never looks washed out.
    ─────────────────────────────────────────────────────────────────────── */
    .ef-headline-plain {
      color: #1A1A2E !important;
      font-family: 'Playfair Display', serif !important;
      font-weight: 400 !important;
    }
    .ef-headline-gold {
      color: #C9A84C !important;
      font-family: 'Playfair Display', serif !important;
      font-style: italic !important;
      font-weight: 400 !important;
    }

    /* ─ Section wrapper scroll offset ── */
    .ef-section {
      scroll-margin-top: 72px;
      width: 100%;
      position: relative;
    }

    /* ─ Scroll-to-top button ── */
    .ef-top-btn {
      position: fixed;
      bottom: 104px;
      right: 32px;
      z-index: 1200;
      width: 44px; height: 44px;
      background: #1A1A2E;
      border: 1px solid rgba(139,111,71,0.35);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(26,26,46,0.2);
    }
    .ef-top-btn:hover {
      background: #8B6F47;
      border-color: #8B6F47;
      transform: translateY(-3px);
      box-shadow: 0 10px 32px rgba(139,111,71,0.35);
    }

    /* ─ Page progress bar ── */
    .ef-progress-bar {
      position: fixed; top: 0; left: 0; right: 0;
      height: 2px; z-index: 9998;
      background: rgba(139,111,71,0.1);
    }
    .ef-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #8B6F47, #C9A84C);
      transition: width 0.12s linear;
    }

    /* ─ Loading screen ── */
    .ef-loading {
      position: fixed; inset: 0; z-index: 9999;
      background: #1A1A2E;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 24px;
      transition: opacity 0.65s ease;
    }
    .ef-loading.hidden { opacity: 0; pointer-events: none; }

    @keyframes efSpinRing {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes efLoadBar {
      from { width: 0%; }
      to   { width: 100%; }
    }
    @keyframes efFadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ─ Section ornament divider ── */
    .ef-divider {
      display: flex; align-items: center; gap: 12px;
      padding: 4px 0;
    }
    .ef-divider-line { height: 1px; flex: 1; background: rgba(139,111,71,0.12); }
    .ef-divider-diamond {
      width: 6px; height: 6px; flex-shrink: 0;
      border: 1px solid rgba(139,111,71,0.35);
      transform: rotate(45deg);
    }

    /* ─ Cookie bar ── */
    .ef-cookie {
      position: fixed; bottom: 20px; left: 20px;
      z-index: 9000; max-width: 360px;
      background: #1A1A2E;
      border: 1px solid rgba(139,111,71,0.25);
      padding: 20px;
      animation: efFadeUp 0.5s ease;
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════════════════════ */
function LoadingScreen({ visible }) {
  return (
    <div className={`ef-loading${visible ? "" : " hidden"}`}>
      {/* Animated monogram */}
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg
          width="80" height="80" viewBox="0 0 80 80"
          style={{ position: "absolute", inset: 0, animation: "efSpinRing 2.5s linear infinite" }}
        >
          <circle cx="40" cy="40" r="36" stroke="#8B6F47" strokeWidth="1"
            strokeDasharray="4 6" opacity="0.4" fill="none" />
        </svg>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute", inset: 0 }}>
          <circle cx="40" cy="40" r="28" stroke="#8B6F47" strokeWidth="1.2" fill="none" />
          <line x1="24" y1="24" x2="24" y2="56" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="24" x2="48" y2="24" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="40" x2="44" y2="40" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="24" y1="56" x2="48" y2="56" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="56" cy="40" r="3" fill="#C9A84C" opacity="0.7" />
        </svg>
      </div>

      {/* Brand text */}
      <div style={{ textAlign: "center", animation: "efFadeUp 0.6s ease 0.2s both" }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem", letterSpacing: "0.18em", color: "#F9F6F0", textTransform: "uppercase", lineHeight: 1 }}>
          Efourge
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.42em", color: "#8B6F47", textTransform: "uppercase", marginTop: 5 }}>
          Digital Marketing Agency
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: 120, height: 1, background: "rgba(139,111,71,0.2)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: "100%", background: "#8B6F47", animation: "efLoadBar 1.6s ease forwards" }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE PROGRESS BAR
══════════════════════════════════════════════════════════ */
function PageProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setPct((scrollTop / (scrollHeight - clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="ef-progress-bar">
      <div className="ef-progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON
══════════════════════════════════════════════════════════ */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <Zoom in={show}>
      <div
        className="ef-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to top"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="#F9F6F0" strokeWidth="2" strokeLinecap="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
    </Zoom>
  );
}

/* ══════════════════════════════════════════════════════════
   COOKIE NOTICE
══════════════════════════════════════════════════════════ */
function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("ef_cookie")) setTimeout(() => setShow(true), 2800);
  }, []);
  const accept = () => { localStorage.setItem("ef_cookie", "1"); setShow(false); };
  if (!show) return null;
  return (
    <div className="ef-cookie">
      <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.75rem", color: "rgba(249,246,240,0.6)", lineHeight: 1.75, mb: 2 }}>
        We use cookies to enhance your experience. By continuing you agree to our{" "}
        <span style={{ color: "#C9A84C", cursor: "pointer" }}>Privacy Policy</span>.
      </Typography>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        {[{ label: "Accept", action: accept, filled: true }, { label: "Dismiss", action: () => setShow(false), filled: false }].map(({ label, action, filled }) => (
          <Box
            key={label}
            onClick={action}
            sx={{
              px: 2.5, py: 0.9, cursor: "pointer",
              background: filled ? "#8B6F47" : "transparent",
              border: filled ? "none" : "1px solid rgba(249,246,240,0.15)",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 400,
              fontSize: "0.62rem", letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: filled ? "#F9F6F0" : "rgba(249,246,240,0.4)",
              transition: "all 0.3s",
              "&:hover": filled
                ? { background: "#C9A84C" }
                : { color: "rgba(249,246,240,0.7)", borderColor: "rgba(249,246,240,0.35)" },
            }}
          >
            {label}
          </Box>
        ))}
      </Box>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION WRAPPER
   • id       → anchor for scroll-to and IntersectionObserver
   • scrollMarginTop → stops fixed header overlapping heading
══════════════════════════════════════════════════════════ */
function Section({ id, children }) {
  return (
    <section id={id} className="ef-section">
      {children}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION DIVIDER (thin ornamental line between sections)
══════════════════════════════════════════════════════════ */
function SectionDivider({ dark = false }) {
  return (
    <div className="ef-divider" style={{ background: dark ? "#0A0A10" : "#F9F6F0", padding: "2px 0" }}>
      <div className="ef-divider-line" />
      <div className="ef-divider-diamond" />
      <div className="ef-divider-line" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   GLOBAL FOOTER
══════════════════════════════════════════════════════════ */
function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      component="footer"
      sx={{
        background: "#0D0D1A",
        borderTop: "1px solid rgba(139,111,71,0.14)",
        py: { xs: 5, md: 7 },
        px: { xs: 3, md: 8 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { md: "center" },
          gap: 4,
          mb: 5,
        }}
      >
        {/* Brand */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.4, mb: 1.2 }}>
            <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="17.5" stroke="#8B6F47" strokeWidth="1.2" />
              <line x1="11" y1="11" x2="11" y2="27" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
              <line x1="11" y1="11" x2="22" y2="11" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
              <line x1="11" y1="19" x2="20" y2="19" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
              <line x1="11" y1="27" x2="22" y2="27" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
              <circle cx="27" cy="19" r="2" fill="#C9A84C" opacity="0.7" />
            </svg>
            <Box>
              <Typography sx={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em", color: "#F9F6F0", textTransform: "uppercase", lineHeight: 1 }}>Efourge</Typography>
              <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.44rem", letterSpacing: "0.4em", color: "#8B6F47", textTransform: "uppercase", lineHeight: 1, mt: "3px" }}>Digital Marketing Agency</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.76rem", color: "rgba(249,246,240,0.32)", lineHeight: 1.8, maxWidth: 280 }}>
            Transforming brands through data-driven digital marketing since 2013. Based in Udaipur, Rajasthan.
          </Typography>
        </Box>

        {/* Quick nav */}
        <Box sx={{ display: "flex", gap: { xs: 3, md: 5 }, flexWrap: "wrap" }}>
          {[{ label: "Home", id: "home" }, { label: "About", id: "about" }, { label: "Services", id: "services" }, { label: "Contact", id: "contact" }].map(({ label, id }) => (
            <Typography
              key={id}
              onClick={() => scrollTo(id)}
              sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(249,246,240,0.38)", cursor: "pointer", transition: "color .3s", "&:hover": { color: "#C9A84C" } }}
            >
              {label}
            </Typography>
          ))}
        </Box>

        {/* Contact info */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[{ l: "Phone", v: "+91 90435 61290", h: "tel:9043561290" }, { l: "Email", v: "efourge@gmail.com", h: "mailto:efourge@gmail.com" }, { l: "Address", v: "45, Shakti Nagar, Udaipur", h: null }].map(({ l, v, h }) => (
            <Box key={l} component={h ? "a" : "div"} href={h} sx={{ display: "flex", alignItems: "baseline", gap: 1.5, textDecoration: "none", "&:hover .fv": { color: "#C9A84C" } }}>
              <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6F47", minWidth: 52 }}>{l}</Typography>
              <Typography className="fv" sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.73rem", color: "rgba(249,246,240,0.4)", transition: "color .3s" }}>{v}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom bar */}
      <Box sx={{ borderTop: "1px solid rgba(249,246,240,0.06)", pt: 3, display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
        <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.62rem", color: "rgba(249,246,240,0.18)", letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} Efourge Digital Marketing Agency · All rights reserved · Udaipur, Rajasthan
        </Typography>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          {["IG", "FB", "LI", "TW"].map((s) => (
            <Box key={s} sx={{ width: 28, height: 28, border: "1px solid rgba(249,246,240,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all .3s", "&:hover": { background: "#8B6F47", borderColor: "#8B6F47" } }}>
              <Typography sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.48rem", color: "rgba(249,246,240,0.4)", letterSpacing: "0.04em" }}>{s}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", gap: 3 }}>
          {["Privacy Policy", "Terms"].map((t) => (
            <Typography key={t} sx={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: "0.6rem", color: "rgba(249,246,240,0.18)", cursor: "pointer", "&:hover": { color: "#8B6F47" }, transition: "color .3s" }}>{t}</Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   APP — root component
══════════════════════════════════════════════════════════ */
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <CssBaseline />
      <GlobalFonts />

      {/* ── Splash loading screen ── */}
      <LoadingScreen visible={loading} />

      {/* ── Page scroll progress bar ── */}
      <PageProgressBar />

      {/* ── Back to top button ── */}
      <ScrollToTop />

      {/* ── Cookie notice ── */}
      <CookieNotice />

      {/* ── Fixed navigation header ── */}
      <Header />

      {/* ══════════════════════════════
          PAGE SECTIONS
          Each <Section id="..."> gives the block:
            • an anchor id for scrolling
            • scroll-margin-top:72px so the AppBar never hides the heading
      ══════════════════════════════ */}

      {/* HOME */}
      <Section id="home">
        <Home />
      </Section>

      <SectionDivider />

      {/* ABOUT */}
      <Section id="about">
        <About />
      </Section>

      <SectionDivider dark />

      {/* SERVICES */}
      <Section id="services">
        <Services />
      </Section>

      <SectionDivider />

      {/* CONTACT */}
      <Section id="contact">
        <Contact />
      </Section>

      {/* ── Global footer ── */}
      <Footer />
    </ThemeProvider>
  );
}

