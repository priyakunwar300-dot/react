import { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Typography, Button,
  Container, Drawer, useScrollTrigger,
} from "@mui/material";

/* ══════════════════════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════════════════════ */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ══════════════════════════════════════════════════════════
   NAV CONFIG
══════════════════════════════════════════════════════════ */
const NAV = [
  { label: "Home",     id: "home"     },
  { label: "About",    id: "about"    },
  { label: "Services", id: "services" },
  { label: "Contact",  id: "contact"  },
];

/* ══════════════════════════════════════════════════════════
   ACTIVE SECTION TRACKER
══════════════════════════════════════════════════════════ */
function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ══════════════════════════════════════════════════════════
   LOGO
══════════════════════════════════════════════════════════ */
function Logo() {
  return (
    <Box
      onClick={() => scrollToSection("home")}
      sx={{ display:"flex", alignItems:"center", gap:1.4, cursor:"pointer", userSelect:"none", flexShrink:0 }}
    >
      <svg width="36" height="36" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="17.5" stroke="#8B6F47" strokeWidth="1.2" />
        <circle cx="19" cy="19" r="12"   stroke="#8B6F47" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.45" />
        <line x1="11" y1="11" x2="11" y2="27" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="11" x2="22" y2="11" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="19" x2="20" y2="19" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="27" x2="22" y2="27" stroke="#8B6F47" strokeWidth="2" strokeLinecap="round" />
        <circle cx="27" cy="19" r="2" fill="#8B6F47" opacity="0.7" />
      </svg>

      <Box>
        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"1.05rem", letterSpacing:"0.1em", color:"#1A1A2E", lineHeight:1, textTransform:"uppercase" }}>
          Efourge
        </Typography>
        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.44rem", letterSpacing:"0.38em", color:"#8B6F47", textTransform:"uppercase", lineHeight:1, mt:"3px" }}>
          Creative Studio
        </Typography>
      </Box>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   MOBILE DRAWER
══════════════════════════════════════════════════════════ */
function MobileDrawer({ open, onClose, active }) {
  const handleNav = (id) => {
    onClose();
    setTimeout(() => scrollToSection(id), 320);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 380 },
          background: "#1A1A2E",
          display: "flex", flexDirection: "column",
          justifyContent: "center", px: 5,
        },
      }}
    >
      {/* Close */}
      <Box
        onClick={onClose}
        sx={{ position:"absolute", top:20, right:20, width:38, height:38, border:"1px solid rgba(249,246,240,0.15)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(249,246,240,0.4)", fontSize:"1rem", fontFamily:"'DM Sans',sans-serif", transition:"all .3s", "&:hover":{ borderColor:"#8B6F47", color:"#8B6F47" } }}
      >✕</Box>

      {/* Ghost word */}
      <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"4rem", fontWeight:400, color:"rgba(139,111,71,0.07)", lineHeight:1, mb:4, userSelect:"none" }}>
        Menu
      </Typography>

      {/* Nav items */}
      <Box sx={{ display:"flex", flexDirection:"column" }}>
        {NAV.map(({ label, id }, i) => (
          <Box
            key={id}
            onClick={() => handleNav(id)}
            sx={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              py:2.5, borderBottom:"1px solid rgba(249,246,240,0.06)", cursor:"pointer",
              opacity:0,
              animation: open ? `dSlide 0.45s ease forwards ${i*0.07+0.12}s` : "none",
              "@keyframes dSlide":{ from:{opacity:0,transform:"translateX(24px)"}, to:{opacity:1,transform:"translateX(0)"} },
              "&:hover .dLbl":{ color:"#8B6F47", transform:"translateX(6px)" },
              "&:hover .dArr":{ opacity:1 },
            }}
          >
            <Box sx={{ display:"flex", alignItems:"baseline", gap:2 }}>
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.52rem", color:"#8B6F47", letterSpacing:"0.15em", minWidth:22 }}>
                {String(i+1).padStart(2,"0")}
              </Typography>
              <Typography className="dLbl" sx={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", fontWeight:400, color: active===id?"#8B6F47":"#F9F6F0", transition:"color .25s,transform .25s" }}>
                {label}
              </Typography>
            </Box>
            <Typography className="dArr" sx={{ color:"#8B6F47", opacity: active===id?1:0, transition:"opacity .25s" }}>→</Typography>
          </Box>
        ))}
      </Box>

      <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.6rem", color:"rgba(249,246,240,0.18)", letterSpacing:"0.2em", textTransform:"uppercase", mt:6 }}>
        © 2025 Efourge Creative Studio
      </Typography>
    </Drawer>
  );
}

/* ══════════════════════════════════════════════════════════
   HEADER — default export

   Layout (desktop):
   ┌─────────────────────────────────────────────────────┐
   │  [Logo]   ·   [Home  About  Services  Contact]  ·  [Let's Talk]  │
   └─────────────────────────────────────────────────────┘
     flex-start      flex:1  →  centred                  flex-end

   We achieve true centre alignment by giving the nav
   wrapper position:absolute so it sits in the middle of
   the toolbar regardless of logo or CTA width.
══════════════════════════════════════════════════════════ */
export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const active  = useActiveSection();
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(249,246,240,0.97)" : "rgba(249,246,240,0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid rgba(139,111,71,${scrolled ? 0.22 : 0.1})`,
          boxShadow: scrolled ? "0 2px 28px rgba(26,26,46,0.07)" : "none",
          transition: "all 0.4s ease",
          zIndex: 1300,
        }}
      >
        {/* Use a single full-width container that fills the viewport width */}
        <Box sx={{ width:"100%", px:{ xs:2.5, md:5 } }}>
          <Toolbar
            disableGutters
            sx={{
              height: { xs:64, md:72 },
              display: "flex",
              alignItems: "center",
              /* No justifyContent here — logo left, CTA right, nav absolutely centred */
              position: "relative",
            }}
          >
            {/* ── Logo — left edge ── */}
            <Logo />

            {/* ── Nav links — ABSOLUTELY CENTRED in the toolbar ── */}
            <Box
              sx={{
                display: { xs:"none", md:"flex" },
                alignItems: "center",
                gap: 0,
                /* Absolute positioning centres it regardless of logo/CTA widths */
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {/* Left ornament line */}
              <Box sx={{ width:32, height:"1px", background:"rgba(139,111,71,0.22)", mr:2, flexShrink:0 }} />

              {NAV.map(({ label, id }) => {
                const isActive = active === id;
                return (
                  <Button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    disableRipple
                    sx={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontWeight: isActive ? 500 : 300,
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isActive ? "#8B6F47" : "#3D3D5C",
                      px: 2,
                      py: 1,
                      minWidth: "auto",
                      borderRadius: 0,
                      position: "relative",
                      transition: "color 0.3s",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 2,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: isActive ? 16 : 0,
                        height: "1.5px",
                        background: "#8B6F47",
                        transition: "width 0.35s ease",
                      },
                      "&:hover": {
                        color: "#8B6F47",
                        background: "transparent",
                        "&::after": { width: 16 },
                      },
                    }}
                  >
                    {label}
                  </Button>
                );
              })}

              {/* Right ornament line */}
              <Box sx={{ width:32, height:"1px", background:"rgba(139,111,71,0.22)", ml:2, flexShrink:0 }} />
            </Box>

            {/* ── Spacer — pushes CTA to the right edge ── */}
            <Box sx={{ flex:1 }} />

            {/* ── CTA button — right edge, desktop only ── */}
            <Button
              onClick={() => scrollToSection("contact")}
              disableRipple
              sx={{
                display: { xs:"none", md:"flex" },
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 500,
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#F9F6F0",
                background: "#1A1A2E",
                px: 2.8,
                py: 1.25,
                borderRadius: 0,
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "#8B6F47",
                  transform: "translateX(-100%)",
                  transition: "transform 0.35s ease",
                },
                "& .ctaLabel": { position:"relative", zIndex:1 },
                "&:hover": {
                  color: "#F9F6F0",
                  background: "#1A1A2E",
                  "&::before": { transform: "translateX(0)" },
                },
              }}
            >
              <span className="ctaLabel">Let's Talk</span>
            </Button>

            {/* ── Hamburger — mobile only ── */}
            <Box
              onClick={() => setDrawerOpen(true)}
              sx={{
                display: { xs:"flex", md:"none" },
                flexDirection: "column",
                gap: "5px",
                p: 0.8,
                cursor: "pointer",
                ml: 1,
              }}
            >
              {[22, 14, 22].map((w, i) => (
                <Box
                  key={i}
                  sx={{
                    width: w,
                    height: "1.5px",
                    background: i===1 ? "#8B6F47" : "#1A1A2E",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        active={active}
      />
    </>
  );
}
