import { useState, useEffect, useCallback, useRef } from "react";
import {
  Box, Typography, Button, Container, IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

/* ══════════════════════════════════════════════════════════
   SLIDE DATA
══════════════════════════════════════════════════════════ */
const SLIDES = [
  {
    id: 0,
    eyebrow: "Design · Identity · Experience",
    headline: ["Where Vision", "Becomes"],
    accent: "Legacy.",
    sub: "We partner with ambitious brands to craft identities that transcend trends and stand the test of time.",
    cta: "Explore Our Work",
    ctaSecondary: "Our Story",
    stat: { value: "12+", label: "Years of Craft" },
    palette: {
      bg: "#F9F6F0",
      ink: "#1A1A2E",
      gold: "#8B6F47",
      muted: "#6B6880",
      cardBg: "#EEEAE2",
    },
    shape: "circle",
  },
  {
    id: 1,
    eyebrow: "Strategy · Direction · Craft",
    headline: ["Ideas That", "Move"],
    accent: "Worlds.",
    sub: "From brand strategy to digital execution — every touchpoint deliberately designed to leave a mark.",
    cta: "View Services",
    ctaSecondary: "Case Studies",
    stat: { value: "340+", label: "Projects Delivered" },
    palette: {
      bg: "#1A1A2E",
      ink: "#F9F6F0",
      gold: "#C9A84C",
      muted: "rgba(249,246,240,0.45)",
      cardBg: "#232340",
    },
    shape: "diamond",
  },
  {
    id: 2,
    eyebrow: "Bespoke · Timeless · Precise",
    headline: ["Beauty Lives", "in the"],
    accent: "Details.",
    sub: "Obsessive attention to craft — typography, spacing, colour, motion — every element in perfect harmony.",
    cta: "Start a Project",
    ctaSecondary: "Get in Touch",
    stat: { value: "98%", label: "Client Satisfaction" },
    palette: {
      bg: "#F0EBE1",
      ink: "#1A1A2E",
      gold: "#8B6F47",
      muted: "#6B6880",
      cardBg: "#E4DDD3",
    },
    shape: "cross",
  },
];

const DURATION = 6000;

/* ══════════════════════════════════════════════════════════
   DECORATIVE SHAPES
   Each shape is right-side only on desktop, hidden on mobile.
══════════════════════════════════════════════════════════ */
function DecorShape({ type, color }) {
  const sharedWrapper = {
    position: "absolute",
    top: 0, bottom: 0,
    right: 0,
    width: { xs: 0, md: "45%" },          /* occupies right 45% of slide */
    display: { xs: "none", md: "flex" },
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    overflow: "hidden",
  };

  if (type === "circle") return (
    <Box sx={sharedWrapper}>
      <Box sx={{
        width: 460, height: 460,
        borderRadius: "50%",
        border: `1px solid ${alpha(color, 0.12)}`,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "spin 40s linear infinite",
        "@keyframes spin":{ from:{transform:"rotate(0deg)"}, to:{transform:"rotate(360deg)"} },
        flexShrink: 0,
      }}>
        <Box sx={{ width:"70%", height:"70%", borderRadius:"50%", border:`1px dashed ${alpha(color,0.18)}` }} />
        <Box sx={{ position:"absolute", width:"38%", height:"38%", borderRadius:"50%", background:alpha(color,0.07), border:`1px solid ${alpha(color,0.15)}` }} />
        <Box sx={{ position:"absolute", top:"10%", right:"10%", width:8, height:8, borderRadius:"50%", background:color, opacity:.6 }} />
      </Box>
    </Box>
  );

  if (type === "diamond") return (
    <Box sx={sharedWrapper}>
      <Box sx={{
        width: 380, height: 380,
        border: `1px solid ${alpha(color, 0.15)}`,
        transform: "rotate(45deg)",
        position: "relative",
        animation: "rotateDiamond 30s linear infinite",
        "@keyframes rotateDiamond":{ from:{transform:"rotate(45deg)"}, to:{transform:"rotate(405deg)"} },
        flexShrink: 0,
      }}>
        <Box sx={{ position:"absolute", inset:"18%", border:`1px dashed ${alpha(color,0.2)}` }} />
        <Box sx={{ position:"absolute", inset:"36%", background:alpha(color,0.08), border:`1px solid ${alpha(color,0.2)}` }} />
      </Box>
    </Box>
  );

  if (type === "cross") return (
    <Box sx={sharedWrapper}>
      <Box sx={{ position:"relative", width:400, height:400, flexShrink:0 }}>
        <Box sx={{ position:"absolute", top:"50%", left:0, right:0, height:1, background:alpha(color,0.15), transform:"translateY(-50%)" }} />
        <Box sx={{ position:"absolute", left:"50%", top:0, bottom:0, width:1, background:alpha(color,0.15), transform:"translateX(-50%)" }} />
        {[0.12, 0.28, 0.44].map((inset, i) => (
          <Box key={i} sx={{ position:"absolute", inset:`${inset*100}%`, border:`1px solid ${alpha(color,i===2?0.18:0.08)}`, borderRadius:i===2?"50%":0 }} />
        ))}
      </Box>
    </Box>
  );

  return null;
}

/* ══════════════════════════════════════════════════════════
   PROGRESS BAR (top edge)
══════════════════════════════════════════════════════════ */
function ProgressBar({ progress, color }) {
  return (
    <Box sx={{ position:"absolute", top:0, left:0, right:0, height:2, zIndex:10 }}>
      <Box sx={{ height:"100%", background:alpha(color,0.12), position:"absolute", inset:0 }} />
      <Box sx={{ height:"100%", width:`${progress}%`, background:color, transition:"width 0.1s linear", position:"absolute", top:0, left:0 }} />
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN SLIDESHOW
══════════════════════════════════════════════════════════ */
export default function Slideshow() {
  const [current, setCurrent]   = useState(0);
  const [phase, setPhase]       = useState("idle");   // "idle" | "out" | "in"
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x:0, y:0 });
  const timerRef    = useRef(null);
  const progressRef = useRef(null);

  const slide   = SLIDES[current];
  const { palette } = slide;

  /* Mouse parallax */
  useEffect(() => {
    const h = (e) => setMousePos({
      x: (e.clientX / window.innerWidth  - 0.5) * 18,
      y: (e.clientY / window.innerHeight - 0.5) * 12,
    });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  /* Slide transition */
  const goTo = useCallback((next) => {
    if (phase !== "idle" || next === current) return;
    clearInterval(progressRef.current);
    clearTimeout(timerRef.current);
    setPhase("out");
    setProgress(0);
    setTimeout(() => {
      setCurrent(next);
      setPhase("in");
      setTimeout(() => { setPhase("idle"); }, 700);
    }, 400);
  }, [current, phase]);

  const goNext = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  /* Auto-advance + progress ticker */
  useEffect(() => {
    setProgress(0);
    const t0 = Date.now();
    progressRef.current = setInterval(() => {
      setProgress(Math.min(((Date.now() - t0) / DURATION) * 100, 100));
    }, 50);
    timerRef.current = setTimeout(goNext, DURATION);
    return () => {
      clearInterval(progressRef.current);
      clearTimeout(timerRef.current);
    };
  }, [current, goNext]);

  const isOut = phase === "out";
  const isIn  = phase === "in";

  /* Shared animation styles helpers */
  const fadeOut = (delay = 0) => ({
    opacity:   isOut ? 0 : isIn ? 0 : 1,
    transform: isOut ? "translateY(-10px)" : isIn ? "translateY(14px)" : "none",
    transition: isOut ? `all 0.35s ease ${delay}s` : "none",
  });
  const fadeIn = (delay = 0) => ({
    animation: isIn ? `ssFadeUp 0.6s ease ${delay}s forwards` : "none",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,700;1,300;1,400&family=Lato:wght@300;400&display=swap');
        @keyframes ssFadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes ssRevealLine {
          from { opacity:0; transform:translateY(40px); }
          to   { opacity:1; transform:translateY(0);    }
        }
      `}</style>

      <Box
        id="home"
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
          background: palette.bg,
          overflow: "hidden",
          transition: "background 0.6s ease",
          display: "flex",
          alignItems: "center",
          /* account for fixed header */
          pt: { xs: "64px", md: "72px" },
          pb: { xs: "80px", md: "80px" }, /* space for bottom nav bar */
        }}
      >
        <ProgressBar progress={progress} color={palette.gold} />

        {/* Dot grid */}
        <Box sx={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`radial-gradient(circle,${alpha(palette.gold,0.15)} 1px,transparent 1px)`, backgroundSize:"36px 36px", opacity:.6 }} />

        {/* Decorative shape — parallax */}
        <Box sx={{
          position: "absolute", inset: 0,
          transform:`translate(${mousePos.x*0.4}px,${mousePos.y*0.4}px)`,
          transition:"transform 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}>
          <DecorShape type={slide.shape} color={palette.gold} />
        </Box>

        {/* Left accent line */}
        <Box sx={{
          position:"absolute",
          left:{ xs:20, md:52 },
          top:"22%", bottom:"22%",
          width:"1px",
          background:`linear-gradient(to bottom,transparent,${alpha(palette.gold,0.35)},transparent)`,
          display:{ xs:"none", md:"block" },
        }} />

        {/* ── MAIN CONTENT — left half of screen on desktop ── */}
        <Container
          maxWidth="xl"
          sx={{
            position: "relative",
            zIndex: 2,
            px: { xs: 3, md: 9 },    /* generous side padding */
          }}
        >
          {/*
            On desktop the text occupies the left ~52%.
            On mobile it occupies 100%.
            This keeps text away from the decorative shape on the right.
          */}
          <Box sx={{ width: { xs: "100%", md: "52%", lg: "48%" } }}>

            {/* ── Eyebrow label ── */}
            <Box sx={{
              display:"flex", alignItems:"center", gap:2, mb:4,
              ...fadeOut(0), ...fadeIn(0.1),
            }}>
              <Box sx={{ width:24, height:"1px", background:palette.gold, flexShrink:0 }} />
              <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.62rem", letterSpacing:"0.28em", textTransform:"uppercase", color:palette.gold }}>
                {slide.eyebrow}
              </Typography>
            </Box>

            {/* ── Headline lines ── */}
            <Box sx={{ mb:3 }}>
              {slide.headline.map((line, li) => (
                <Box key={`${current}-hl-${li}`} sx={{ overflow:"hidden" }}>
                  <Typography sx={{
                    fontFamily:"'Playfair Display',serif", fontWeight:300,
                    fontSize:{ xs:"2.8rem", sm:"4rem", md:"5rem", lg:"6.2rem" },
                    lineHeight:1.0, letterSpacing:"-0.025em",
                    color: palette.ink, display:"block",
                    opacity: isOut ? 0 : isIn ? 0 : 1,
                    transform: isOut ? "translateY(-28px)" : isIn ? "translateY(38px)" : "none",
                    animation: isIn ? `ssRevealLine 0.65s cubic-bezier(0.76,0,0.24,1) ${0.15+li*0.1}s forwards` : "none",
                    transition: isOut ? `all 0.35s ease ${li*0.05}s` : "none",
                  }}>
                    {line}
                  </Typography>
                </Box>
              ))}

              {/* Italic gold accent word */}
              <Box key={`${current}-acc`} sx={{ overflow:"hidden" }}>
                <Typography sx={{
                  fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontWeight:300,
                  fontSize:{ xs:"2.8rem", sm:"4rem", md:"5rem", lg:"6.2rem" },
                  lineHeight:1.05, letterSpacing:"-0.025em",
                  color: palette.gold, display:"block",
                  opacity: isOut ? 0 : isIn ? 0 : 1,
                  transform: isOut ? "translateY(-28px)" : isIn ? "translateY(38px)" : "none",
                  animation: isIn ? `ssRevealLine 0.65s cubic-bezier(0.76,0,0.24,1) ${0.15+slide.headline.length*0.1}s forwards` : "none",
                  transition: isOut ? "all 0.35s ease 0.1s" : "none",
                }}>
                  {slide.accent}
                </Typography>
              </Box>
            </Box>

            {/* ── Ornament ── */}
            <Box sx={{ display:"flex", alignItems:"center", gap:1.5, mb:3, ...fadeOut(0.05), ...fadeIn(0.32) }}>
              <Box sx={{ width:32, height:"1px", background:palette.gold, opacity:.45 }} />
              <Box sx={{ width:5, height:5, border:`1px solid ${palette.gold}`, transform:"rotate(45deg)", opacity:.45, flexShrink:0 }} />
              <Box sx={{ width:32, height:"1px", background:palette.gold, opacity:.45 }} />
            </Box>

            {/* ── Sub copy ── */}
            <Typography sx={{
              fontFamily:"'Lato',sans-serif", fontWeight:300,
              fontSize:{ xs:"0.88rem", md:"0.95rem" },
              color: palette.muted,
              lineHeight:1.9, letterSpacing:"0.03em",
              maxWidth:440, mb:5,
              ...fadeOut(0.05), ...fadeIn(0.38),
            }}>
              {slide.sub}
            </Typography>

            {/* ── CTAs ── */}
            <Box sx={{
              display:"flex", gap:2, flexWrap:"wrap", alignItems:"center",
              ...fadeOut(0), ...fadeIn(0.48),
            }}>
              {/* Primary button */}
              <Button
                disableElevation
                sx={{
                  background: palette.gold, color: palette.bg,
                  fontFamily:"'Lato',sans-serif", fontWeight:400,
                  fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase",
                  px:4.5, py:1.7, borderRadius:0,
                  position:"relative", overflow:"hidden",
                  "&::after":{ content:'""', position:"absolute", inset:0, background:"rgba(255,255,255,0.12)", transform:"translateX(-100%)", transition:"transform 0.35s ease" },
                  "&:hover":{ background:palette.gold, transform:"translateY(-2px)", boxShadow:`0 10px 32px ${alpha(palette.gold,0.35)}`, "&::after":{ transform:"translateX(0)" } },
                  transition:"transform 0.3s,box-shadow 0.3s",
                }}
              >
                {slide.cta}
              </Button>

              {/* Ghost arrow button */}
              <Button sx={{
                color: palette.muted,
                fontFamily:"'Lato',sans-serif", fontWeight:300,
                fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase",
                px:0, py:1.7,
                display:"flex", alignItems:"center", gap:1.2,
                "&:hover":{ color:palette.gold, background:"transparent" },
                transition:"color 0.3s",
                "& .arr":{
                  width:26, height:26,
                  border:`1px solid ${alpha(palette.gold,0.3)}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.8rem", flexShrink:0,
                  transition:"all 0.3s",
                },
                "&:hover .arr":{ borderColor:palette.gold, background:alpha(palette.gold,0.08), transform:"translateX(4px)" },
              }}>
                <span className="arr">→</span>
                {slide.ctaSecondary}
              </Button>
            </Box>
          </Box>
        </Container>

        {/* ══════════════════════════════════════════════════
            STAT CARD
            Fixed bottom-left on desktop (not right, so it
            doesn't clash with the slide number indicator).
            On mobile: bottom-left, small.
        ══════════════════════════════════════════════════ */}
        <Box sx={{
          position:"absolute",
          bottom:{ xs:88, md:88 },  /* above the nav bar */
          left:{ xs:20, md:72 },
          background: palette.cardBg,
          border:`1px solid ${alpha(palette.gold,0.18)}`,
          px:{ xs:2.5, md:3.5 }, py:{ xs:2, md:2.5 },
          display:"flex", flexDirection:"column", gap:0.4,
          minWidth:{ xs:110, md:130 },
          opacity:  isOut ? 0 : isIn ? 0 : 1,
          animation: isIn ? "ssFadeUp 0.6s ease 0.55s forwards" : "none",
          transition: isOut ? "opacity 0.3s" : "none",
          zIndex: 3,
        }}>
          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:{ xs:"1.8rem", md:"2.2rem" }, color:palette.gold, lineHeight:1 }}>
            {slide.stat.value}
          </Typography>
          <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.62rem", color:palette.muted, letterSpacing:"0.14em", textTransform:"uppercase" }}>
            {slide.stat.label}
          </Typography>
        </Box>

        {/* ══════════════════════════════════════════════════
            BOTTOM NAV BAR — centred
            Previous arrow · dots · next arrow
        ══════════════════════════════════════════════════ */}
        <Box sx={{
          position:"absolute",
          bottom:0, left:0, right:0,
          height:{ xs:72, md:72 },
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:3,
          zIndex:4,
          /* Subtle separator line */
          borderTop:`1px solid ${alpha(palette.gold,0.1)}`,
        }}>
          {/* Prev */}
          <IconButton
            onClick={goPrev}
            sx={{
              width:40, height:40,
              border:`1px solid ${alpha(palette.gold,0.25)}`,
              borderRadius:0, color:palette.gold, fontSize:"0.9rem",
              "&:hover":{ background:alpha(palette.gold,0.08), borderColor:palette.gold },
              transition:"all 0.25s",
            }}
          >←</IconButton>

          {/* Dot indicators — centred */}
          <Box sx={{ display:"flex", alignItems:"center", gap:1.5 }}>
            {SLIDES.map((_, i) => (
              <Box
                key={i}
                onClick={() => goTo(i)}
                sx={{
                  cursor:"pointer",
                  width:  i === current ? 28 : 6,
                  height: 2,
                  background: i === current ? palette.gold : alpha(palette.gold, 0.25),
                  transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",
                  "&:hover":{ background:palette.gold },
                }}
              />
            ))}
          </Box>

          {/* Next */}
          <IconButton
            onClick={goNext}
            sx={{
              width:40, height:40,
              border:`1px solid ${alpha(palette.gold,0.25)}`,
              borderRadius:0, color:palette.gold, fontSize:"0.9rem",
              "&:hover":{ background:alpha(palette.gold,0.08), borderColor:palette.gold },
              transition:"all 0.25s",
            }}
          >→</IconButton>
        </Box>

        {/* ══════════════════════════════════════════════════
            SLIDE NUMBER — right edge, vertical, desktop only
        ══════════════════════════════════════════════════ */}
        <Box sx={{
          position:"absolute",
          right:{ md:20 },
          top:"50%", transform:"translateY(-50%)",
          display:{ xs:"none", md:"flex" },
          flexDirection:"column", alignItems:"center", gap:2,
          zIndex:3,
        }}>
          <Typography sx={{ fontFamily:"'Playfair Display',serif", fontSize:"0.7rem", fontWeight:300, color:palette.gold, letterSpacing:"0.1em", writingMode:"vertical-rl" }}>
            {String(current+1).padStart(2,"0")} / {String(SLIDES.length).padStart(2,"0")}
          </Typography>
          <Box sx={{ width:"1px", height:44, background:alpha(palette.gold,0.25) }} />
        </Box>

      </Box>
    </>
  );
}