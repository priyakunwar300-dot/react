import { useEffect, useRef, useState } from "react";
import { Box, Typography, Container, Grid } from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";

/* ══════════════════════════════════════════════════════════
   GLOBAL FONTS + CSS
══════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

    /* ── Scroll reveal ── */
    .ef-reveal   { opacity:0; transform:translateY(40px);  transition:opacity .8s ease,transform .8s ease; }
    .ef-reveal-l { opacity:0; transform:translateX(-40px); transition:opacity .8s ease,transform .8s ease; }
    .ef-reveal-r { opacity:0; transform:translateX(40px);  transition:opacity .8s ease,transform .8s ease; }
    .ef-reveal.ef-vis,.ef-reveal-l.ef-vis,.ef-reveal-r.ef-vis { opacity:1; transform:translate(0,0); }

    /* ── Service card ── */
    .ef-card { background:rgba(255,255,255,0.03); border:1px solid rgba(201,168,76,0.12); padding:32px 28px; position:relative; overflow:hidden; cursor:pointer; transition:transform .4s,border-color .4s,background .4s,box-shadow .4s; height:100%; display:flex; flex-direction:column; }
    .ef-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(201,168,76,0.07) 0%,transparent 60%); opacity:0; transition:opacity .4s; }
    .ef-card::after  { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:linear-gradient(90deg,#C9A84C,#F5D98B); transition:width .4s; }
    .ef-card:hover { transform:translateY(-6px); border-color:rgba(201,168,76,0.4); background:rgba(255,255,255,0.055); box-shadow:0 20px 60px rgba(0,0,0,0.4); }
    .ef-card:hover::before { opacity:1; }
    .ef-card:hover::after  { width:100%; }
    .ef-card:hover .ef-icon  { transform:scale(1.12) rotate(-4deg); }
    .ef-card:hover .ef-arrow { opacity:1; transform:translateX(0); }
    .ef-icon  { font-size:2rem; margin-bottom:16px; display:block; transition:transform .4s; flex-shrink:0; }
    .ef-arrow { position:absolute; top:26px; right:26px; font-size:1rem; color:#C9A84C; opacity:0; transform:translateX(-8px); transition:opacity .3s,transform .3s; }

    /* ── Why card ── */
    .ef-why { padding:28px 24px; border-left:2px solid rgba(201,168,76,0.15); transition:border-color .3s,background .3s; height:100%; }
    .ef-why:hover { border-color:#C9A84C; background:rgba(201,168,76,0.04); }
    .ef-why:hover .ef-why-num { color:#C9A84C !important; }

    /* ── Process step ── */
    .ef-step { padding-left:28px; padding-bottom:44px; border-left:1px solid rgba(201,168,76,0.15); position:relative; transition:border-color .3s; }
    .ef-step:last-child { border-color:transparent !important; padding-bottom:0; }
    .ef-step::before { content:''; position:absolute; left:-5px; top:5px; width:9px; height:9px; border-radius:50%; background:rgba(201,168,76,0.3); border:1px solid #C9A84C; transition:background .3s; }
    .ef-step:hover { border-color:rgba(201,168,76,0.5); }
    .ef-step:hover::before { background:#C9A84C; }

    /* ── Testimonial ── */
    .ef-testi { background:rgba(255,255,255,0.03); border:1px solid rgba(201,168,76,0.1); padding:32px; position:relative; transition:all .3s; height:100%; display:flex; flex-direction:column; }
    .ef-testi:hover { border-color:rgba(201,168,76,0.3); background:rgba(255,255,255,0.05); transform:translateY(-4px); }
    .ef-testi::before { content:'"'; position:absolute; top:10px; left:20px; font-family:'Playfair Display',serif; font-size:5rem; color:rgba(201,168,76,0.09); line-height:1; pointer-events:none; }

    /* ── Stat ── */
    .ef-stat { text-align:center; padding:32px 16px; position:relative; transition:background .3s; }
    .ef-stat::after { content:''; position:absolute; right:0; top:20%; bottom:20%; width:1px; background:rgba(201,168,76,0.1); }
    .ef-stat:last-child::after { display:none; }
    .ef-stat:hover { background:rgba(201,168,76,0.04); }

    /* ── Chip badge ── */
    .ef-chip { display:inline-flex; align-items:center; gap:7px; padding:4px 14px; border:1px solid rgba(201,168,76,0.3); background:rgba(201,168,76,0.07); font-family:'DM Sans',sans-serif; font-size:0.58rem; font-weight:400; letter-spacing:0.22em; text-transform:uppercase; color:#C9A84C; }
    .ef-dot  { width:5px; height:5px; border-radius:50%; background:#C9A84C; animation:efDot 2s ease-in-out infinite; }

    /* ── Buttons ── */
    .ef-btn-gold { background:#C9A84C; color:#0D0D1A; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:500; font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase; padding:14px 38px; position:relative; overflow:hidden; transition:transform .3s,box-shadow .3s; }
    .ef-btn-gold::before { content:''; position:absolute; inset:0; background:rgba(255,255,255,0.15); transform:translateX(-100%); transition:transform .35s; }
    .ef-btn-gold:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(201,168,76,0.4); }
    .ef-btn-gold:hover::before { transform:translateX(0); }
    .ef-btn-ghost { background:transparent; cursor:pointer; border:1px solid rgba(201,168,76,0.3); color:rgba(242,237,228,0.55); font-family:'DM Sans',sans-serif; font-weight:300; font-size:0.72rem; letter-spacing:0.2em; text-transform:uppercase; padding:13px 32px; transition:all .3s; }
    .ef-btn-ghost:hover { border-color:#C9A84C; color:#C9A84C; background:rgba(201,168,76,0.06); }

    /* ── Marquee ── */
    @keyframes efMarq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    .ef-marq { animation:efMarq 26s linear infinite; display:flex; white-space:nowrap; }
    .ef-marq:hover { animation-play-state:paused; }

    /* ── Keyframes ── */
    @keyframes efDot   { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
    @keyframes efFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes efSpin  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes efGlow  { 0%,100%{opacity:.45} 50%{opacity:.9} }
    @keyframes efFadeU { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
    @keyframes efFadeIn{ from{opacity:0} to{opacity:1} }
  `}</style>
);

/* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#C9A84C" },
    background: { default: "#0D0D1A", paper: "#111120" },
  },
  typography: { fontFamily: "'DM Sans', sans-serif" },
  components: { MuiButton: { styleOverrides: { root: { borderRadius: 0 } } } },
});

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const SERVICES = [
  { icon:"📱", title:"Social Media Marketing",    desc:"Engage audiences and grow communities across every major platform with data-driven content strategies." },
  { icon:"🔍", title:"Search Engine Optimization",desc:"Dominate Google rankings with technical SEO, keyword mastery, and authoritative link building." },
  { icon:"📊", title:"Google & Meta Ads",          desc:"Precision-targeted paid campaigns that maximise ROAS and deliver measurable, scalable results." },
  { icon:"🎨", title:"Web Design & Development",   desc:"Stunning, conversion-optimised websites built to perform beautifully on every device." },
  { icon:"📸", title:"Photography & Videography",  desc:"Professional visuals — product shoots, brand films, reels — crafted to stop the scroll." },
  { icon:"🧠", title:"Consultancy Services",       desc:"Strategic advisory from senior digital experts to audit, plan, and accelerate your growth." },
];

const STATS = [
  { value:340, suffix:"+", label:"Projects Done"    },
  { value:98,  suffix:"%", label:"Client Retention" },
  { value:12,  suffix:"+", label:"Years Active"     },
  { value:50,  suffix:"+", label:"Team Experts"     },
];

const WHY = [
  { num:"01", title:"Data-First Approach",    desc:"Every decision we make is backed by analytics, not guesswork. We measure what matters." },
  { num:"02", title:"Full-Service Studio",    desc:"From strategy to execution under one roof — no agency juggling, no lost context." },
  { num:"03", title:"Transparent Reporting",  desc:"Real-time dashboards so you always know exactly where every rupee of budget goes." },
  { num:"04", title:"Dedicated Account Team", desc:"A named team of specialists assigned to your brand — not a revolving door of juniors." },
];

const PROCESS = [
  { num:"01", title:"Discovery & Audit",  desc:"We immerse in your brand, competitors, and target audience to surface growth opportunities." },
  { num:"02", title:"Strategy Blueprint", desc:"A custom 90-day roadmap — channels, KPIs, timelines, and creative direction." },
  { num:"03", title:"Launch & Execute",   desc:"Our specialists activate campaigns with precision, managing every creative and technical detail." },
  { num:"04", title:"Optimise & Scale",   desc:"Continuous A/B testing, budget reallocation, and performance analysis to compound results." },
];

const TESTIMONIALS = [
  { name:"Rahul Mehta",  role:"Founder, TechNest", text:"Efourge tripled our organic traffic in 4 months. Their SEO and content strategy is second to none. Absolutely brilliant team!", rating:5 },
  { name:"Priya Sharma", role:"CMO, LuxeStyle",    text:"Our Meta Ads ROAS went from 1.8x to 6.2x in two months. Genuinely invested in our success — not just another vendor.", rating:5 },
  { name:"Arun Patel",   role:"CEO, GreenGrow",    text:"The website they built is stunning. Leads doubled within a month of launch. Best digital investment we've ever made.", rating:5 },
];

const MARQUEE = ["Brand Identity","SEO","Paid Ads","Social Media","Web Design","Content","Analytics","Video","Strategy","Photography"];

/* ══════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ef-reveal,.ef-reveal-l,.ef-reveal-r");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("ef-vis"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref           = useRef(null);
  const started       = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 2000, t0 = Date.now();
        const tick = () => {
          const p = Math.min((Date.now() - t0) / dur, 1);
          setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════════════════════ */
function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.35 + 0.08,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;  if (d.x > canvas.width)  d.x = 0;
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${d.o})`; ctx.fill();
      });
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath(); ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(201,168,76,${0.05 * (1 - dist / 90)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />;
}

/* ══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════ */
const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior:"smooth", block:"start" }); };

/* ── Ornament divider — always centred ── */
function Ornament({ my = 3, opacity = 0.45 }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", my }}>
      <Box sx={{ height:"1px", width:40, background:"linear-gradient(90deg,transparent,#C9A84C)", opacity }}/>
      <Box sx={{ width:5, height:5, border:"1px solid #C9A84C", transform:"rotate(45deg)", flexShrink:0, opacity }}/>
      <Box sx={{ height:"1px", width:40, background:"linear-gradient(90deg,#C9A84C,transparent)", opacity }}/>
    </Box>
  );
}

/* ── Section heading — always centred, eyebrow lines both sides ── */
function SectionHeading({ eyebrow, title, accent, subtitle, light = false }) {
  return (
    <Box sx={{ textAlign:"center", mb:{ xs:6, md:9 } }}>
      {/* Eyebrow row */}
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:2 }}>
        <Box sx={{ width:26, height:"1px", background:"#C9A84C", opacity:.6 }}/>
        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:"#C9A84C", whiteSpace:"nowrap" }}>
          {eyebrow}
        </Typography>
        <Box sx={{ width:26, height:"1px", background:"#C9A84C", opacity:.6 }}/>
      </Box>

      {/* Headline */}
      <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:{ xs:"2.2rem", md:"3.8rem" }, lineHeight:1.05, letterSpacing:"-0.02em", color: light ? "#1A1A2E" : "#F2EDE4" }}>
        {title}{" "}
        {accent && <Box component="em" sx={{ fontStyle:"italic", color:"#C9A84C" }}>{accent}</Box>}
      </Typography>

      <Ornament my={2.5}/>

      {subtitle && (
        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.92rem", color: light ? "rgba(26,26,46,0.5)" : alpha("#F2EDE4",0.4), lineHeight:1.9, maxWidth:540, mx:"auto" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME — default export
══════════════════════════════════════════════════════════ */
export default function Home() {
  useScrollReveal();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Box sx={{ background:"#0D0D1A", overflow:"hidden" }}>

        {/* ════════════════════════════════════
            HERO — fully centred
        ════════════════════════════════════ */}
        <Box sx={{
          position:"relative", minHeight:"100vh",
          display:"flex", alignItems:"center",
          overflow:"hidden",
          pt:{ xs:"88px", md:"100px" },
          pb:{ xs:"60px", md:"80px" },
        }}>
          <Particles/>

          {/* Grid texture */}
          <Box sx={{ position:"absolute", inset:0, pointerEvents:"none",
            backgroundImage:`linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px)`,
            backgroundSize:"72px 72px",
          }}/>

          {/* Centred radial glow */}
          <Box sx={{ position:"absolute", width:700, height:700, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(201,168,76,0.07) 0%,transparent 70%)",
            top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none",
            animation:"efGlow 5s ease-in-out infinite",
            "@keyframes efGlow":{"0%,100%":{opacity:.5},"50%":{opacity:1}},
          }}/>

          {/* Left + Right accent lines */}
          {[{ left:{ xs:16, md:48 } }, { right:{ xs:16, md:48 } }].map((pos, i) => (
            <Box key={i} sx={{ position:"absolute", ...pos, top:"18%", bottom:"18%", width:"1px",
              background:"linear-gradient(to bottom,transparent,rgba(201,168,76,0.35),transparent)",
              display:{ xs:"none", md:"block" },
            }}/>
          ))}

          <Container maxWidth="md" sx={{ position:"relative", zIndex:2, textAlign:"center" }}>

            {/* Chip */}
            <Box sx={{ display:"flex", justifyContent:"center", mb:3,
              animation:"efFadeU 0.7s ease 0.1s both",
              "@keyframes efFadeU":{from:{opacity:0,transform:"translateY(20px)"},to:{opacity:1,transform:"translateY(0)"}},
            }}>
              <span className="ef-chip"><span className="ef-dot"/>Digital Marketing Agency · Udaipur</span>
            </Box>

            {/* Eyebrow ornament lines */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:3,
              animation:"efFadeU 0.7s ease 0.15s both",
              "@keyframes efFadeU":{from:{opacity:0,transform:"translateY(16px)"},to:{opacity:1,transform:"translateY(0)"}},
            }}>
              <Box sx={{ width:32, height:"1px", background:"rgba(201,168,76,0.4)" }}/>
              <Box sx={{ width:5, height:5, border:"1px solid rgba(201,168,76,0.5)", transform:"rotate(45deg)", flexShrink:0 }}/>
              <Box sx={{ width:32, height:"1px", background:"rgba(201,168,76,0.4)" }}/>
            </Box>

            {/* Big centred headline */}
            <Box sx={{ mb:4,
              animation:"efFadeU 0.8s ease 0.2s both",
              "@keyframes efFadeU":{from:{opacity:0,transform:"translateY(24px)"},to:{opacity:1,transform:"translateY(0)"}},
            }}>
              {[
                { line:"Grow Your",    gold:false },
                { line:"Brand Online", gold:true  },
                { line:"with Efourge.",gold:false },
              ].map(({ line, gold }, i) => (
                <Typography key={i} sx={{
                  fontFamily:"'Playfair Display',serif", fontWeight:400,
                  fontStyle: gold ? "italic" : "normal",
                  fontSize:{ xs:"3.2rem", sm:"4.5rem", md:"6rem", lg:"7.5rem" },
                  lineHeight:.92, letterSpacing:"-0.025em",
                  color: gold ? "#C9A84C" : "#F2EDE4",
                  display:"block",
                }}>
                  {line}
                </Typography>
              ))}
            </Box>

            {/* Ornament divider */}
            <Ornament my={3}/>

            {/* Body copy — centred, max-width for readability */}
            <Typography sx={{
              fontFamily:"'DM Sans',sans-serif", fontWeight:300,
              fontSize:{ xs:"0.92rem", md:"1.05rem" },
              color:alpha("#F2EDE4",0.45), lineHeight:1.9,
              maxWidth:"520px", mx:"auto", mb:6,
              animation:"efFadeU 0.8s ease 0.35s both",
              "@keyframes efFadeU":{from:{opacity:0,transform:"translateY(20px)"},to:{opacity:1,transform:"translateY(0)"}},
            }}>
              We're a full-service digital marketing agency helping brands across India dominate search, social, and paid channels with strategies that actually convert.
            </Typography>

            {/* CTA buttons — centred row */}
            <Box sx={{ display:"flex", gap:2, flexWrap:"wrap", justifyContent:"center",
              animation:"efFadeU 0.8s ease 0.45s both",
              "@keyframes efFadeU":{from:{opacity:0,transform:"translateY(20px)"},to:{opacity:1,transform:"translateY(0)"}},
            }}>
              <button className="ef-btn-gold" onClick={() => scrollTo("contact")}>Start a Project</button>
              <button className="ef-btn-ghost" onClick={() => scrollTo("services")}>Our Services</button>
            </Box>

            {/* Quick stat pills — centred row */}
            <Box sx={{
              display:"flex", justifyContent:"center", flexWrap:"wrap",
              gap:{ xs:4, md:6 }, mt:7,
              pt:4, borderTop:"1px solid rgba(201,168,76,0.12)",
              animation:"efFadeIn 1s ease 0.7s both",
              "@keyframes efFadeIn":{from:{opacity:0},to:{opacity:1}},
            }}>
              {[
                { val:"12+",  lbl:"Years Active"    },
                { val:"340+", lbl:"Projects Done"   },
                { val:"98%",  lbl:"Client Retention"},
                { val:"50+",  lbl:"Team Experts"    },
              ].map(({ val, lbl }) => (
                <Box key={lbl} sx={{ textAlign:"center" }}>
                  <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:{ xs:"1.8rem", md:"2.4rem" }, color:"#C9A84C", lineHeight:1 }}>
                    {val}
                  </Typography>
                  <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.62rem", color:alpha("#F2EDE4",0.32), letterSpacing:"0.15em", textTransform:"uppercase", mt:.5 }}>
                    {lbl}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Scroll hint — centred */}
            <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", gap:1, mt:6,
              animation:"efFadeIn 1s ease 0.9s both",
              "@keyframes efFadeIn":{from:{opacity:0},to:{opacity:1}},
            }}>
              <Box sx={{ width:"1px", height:44, background:"linear-gradient(to bottom,transparent,rgba(201,168,76,0.5))" }}/>
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.52rem", letterSpacing:"0.3em", color:alpha("#F2EDE4",0.2), textTransform:"uppercase" }}>
                Scroll
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            MARQUEE
        ════════════════════════════════════ */}
        <Box sx={{ borderTop:"1px solid rgba(201,168,76,0.1)", borderBottom:"1px solid rgba(201,168,76,0.1)", py:2.5, overflow:"hidden", background:"rgba(201,168,76,0.02)" }}>
          <div className="ef-marq">
            {[...MARQUEE,...MARQUEE,...MARQUEE,...MARQUEE].map((item, i) => (
              <Box key={i} sx={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"1rem", fontWeight:400, color:alpha("#F2EDE4",0.2), px:4, letterSpacing:"0.06em" }}>{item}</Typography>
                <Box sx={{ width:4, height:4, borderRadius:"50%", background:"rgba(201,168,76,0.3)", flexShrink:0 }}/>
              </Box>
            ))}
          </div>
        </Box>

        {/* ════════════════════════════════════
            STATS — centred 4-col grid
        ════════════════════════════════════ */}
        <Box sx={{ py:{ xs:8, md:10 }, background:"#0F0F1C" }}>
          <Container maxWidth="xl" sx={{ px:{ xs:3, md:7 } }}>
            <Grid container>
              {STATS.map((s, i) => (
                <Grid key={i} item xs={6} md={3}>
                  <div className="ef-stat">
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:{ xs:"2.8rem", md:"4rem" }, color:"#C9A84C", lineHeight:1, mb:1 }}>
                      <Counter target={s.value} suffix={s.suffix}/>
                    </Typography>
                    <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.68rem", letterSpacing:"0.15em", textTransform:"uppercase", color:alpha("#F2EDE4",0.35) }}>
                      {s.label}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            SERVICES — centred heading + uniform 3×2 grid
        ════════════════════════════════════ */}
        <Box id="services" sx={{ py:{ xs:10, md:14 }, background:"#0D0D1A" }}>
          <Container maxWidth="lg" sx={{ px:{ xs:3, md:6 } }}>

            <Box className="ef-reveal">
              <SectionHeading
                eyebrow="What We Do"
                title="Services That"
                accent="Deliver"
                subtitle="End-to-end digital marketing solutions — from brand strategy to performance campaigns — all designed to grow your business and your bottom line."
              />
            </Box>

            {/*
              6 cards in a strict 3-column grid.
              All cards same height via display:flex on Grid item.
              Content inside each card is centred: icon → title → desc.
            */}
            <Grid container spacing={3}>
              {SERVICES.map((s, i) => (
                <Grid
                  key={i}
                  item
                  xs={12}       /* 1 col on mobile   */
                  sm={6}        /* 2 cols on tablet  */
                  md={4}        /* 3 cols on desktop */
                  sx={{ display:"flex" }}
                >
                  <Box
                    className="ef-reveal"
                    style={{ transitionDelay:`${i*0.08}s`, width:"100%" }}
                    sx={{
                      /* Card shell */
                      background:"rgba(255,255,255,0.03)",
                      border:"1px solid rgba(201,168,76,0.12)",
                      borderRadius:"4px",
                      p:{ xs:"28px 24px", md:"36px 32px" },
                      position:"relative", overflow:"hidden",
                      cursor:"pointer",
                      display:"flex", flexDirection:"column",
                      alignItems:"center",    /* ← centre all content */
                      textAlign:"center",     /* ← centre all text   */
                      transition:"transform .4s,border-color .4s,background .4s,box-shadow .4s",

                      /* Bottom gold bar on hover */
                      "&::after":{
                        content:'""', position:"absolute",
                        bottom:0, left:0, width:0, height:"2px",
                        background:"linear-gradient(90deg,#C9A84C,#F5D98B)",
                        transition:"width .4s",
                      },
                      "&:hover":{
                        transform:"translateY(-6px)",
                        borderColor:"rgba(201,168,76,0.4)",
                        background:"rgba(255,255,255,0.055)",
                        boxShadow:"0 20px 60px rgba(0,0,0,0.4)",
                        "&::after":{ width:"100%" },
                      },
                      /* Diagonal shimmer on hover */
                      "&::before":{
                        content:'""', position:"absolute", inset:0,
                        background:"linear-gradient(135deg,rgba(201,168,76,0.07) 0%,transparent 60%)",
                        opacity:0, transition:"opacity .4s",
                      },
                      "&:hover::before":{ opacity:1 },
                    }}
                  >
                    {/* Arrow indicator — top right */}
                    <Typography sx={{
                      position:"absolute", top:20, right:22,
                      fontSize:"1rem", color:"#C9A84C",
                      opacity:0, transform:"translateX(-6px)",
                      transition:"opacity .3s,transform .3s",
                      ".ef-reveal:hover &":{ opacity:1, transform:"translateX(0)" },
                    }}>
                      ↗
                    </Typography>

                    {/* Icon — centred, large */}
                    <Typography sx={{
                      fontSize:"2.4rem", mb:2.5, display:"block",
                      transition:"transform .4s",
                      "&:hover":{ transform:"scale(1.12) rotate(-4deg)" },
                    }}>
                      {s.icon}
                    </Typography>

                    {/* Gold accent line — centred */}
                    <Box sx={{
                      width:28, height:"2px", borderRadius:99,
                      background:"#C9A84C", mb:2, mx:"auto",
                      transition:"width .4s",
                      ".MuiBox-root:hover &":{ width:52 },
                    }}/>

                    {/* Title */}
                    <Typography sx={{
                      fontFamily:"'Playfair Display',serif", fontWeight:400,
                      fontSize:{ xs:"1.15rem", md:"1.25rem" },
                      color:"#F2EDE4", mb:1.5, lineHeight:1.3,
                    }}>
                      {s.title}
                    </Typography>

                    {/* Description */}
                    <Typography sx={{
                      fontFamily:"'DM Sans',sans-serif", fontWeight:300,
                      fontSize:"0.82rem",
                      color:alpha("#F2EDE4",0.45), lineHeight:1.85,
                    }}>
                      {s.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Centred explore CTA */}
            <Box sx={{ mt:{ xs:6, md:8 }, textAlign:"center" }} className="ef-reveal">
              <button className="ef-btn-ghost" onClick={() => scrollTo("services")}>
                Explore All Services →
              </button>
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            WHY EFOURGE — centred heading + split layout
        ════════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, background:"#0F0F1C" }}>
          <Container maxWidth="xl" sx={{ px:{ xs:3, md:7 } }}>

            <Box className="ef-reveal">
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Why"
                accent="Efourge?"
                subtitle="We're not just an agency — we're an extension of your marketing team. Here's what sets us apart."
              />
            </Box>

            <Grid container spacing={{ xs:4, md:6 }} alignItems="flex-start">
              {/* Deco badge — centred in its column */}
              <Grid item xs={12} md={3} sx={{ display:{ xs:"none", md:"flex" }, justifyContent:"center", alignItems:"flex-start", pt:2 }}>
                <Box className="ef-reveal-l" sx={{ width:110, height:110, borderRadius:"50%", border:"1px dashed rgba(201,168,76,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Box sx={{ width:76, height:76, borderRadius:"50%", background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"0.68rem", color:"#C9A84C", textAlign:"center", lineHeight:1.4 }}>Since<br/>2013</Typography>
                  </Box>
                </Box>
              </Grid>

              {/* 2×2 why cards */}
              <Grid item xs={12} md={9}>
                <Grid container spacing={2}>
                  {WHY.map((w, i) => (
                    <Grid key={i} item xs={12} sm={6} sx={{ display:"flex" }}>
                      <div className="ef-why ef-reveal-r" style={{ transitionDelay:`${i*0.1}s`, width:"100%" }}>
                        <Typography className="ef-why-num" sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"2rem", color:"rgba(201,168,76,0.12)", lineHeight:1, mb:1.5, transition:"color .3s" }}>{w.num}</Typography>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:"1.1rem", color:"#F2EDE4", mb:1, lineHeight:1.3 }}>{w.title}</Typography>
                        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.8rem", color:alpha("#F2EDE4",0.4), lineHeight:1.8 }}>{w.desc}</Typography>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            PROCESS — fully centred layout
        ════════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, background:"#0D0D1A" }}>
          <Container maxWidth="md" sx={{ px:{ xs:3, md:6 } }}>

            <Box className="ef-reveal">
              <SectionHeading
                eyebrow="How We Work"
                title="Our"
                accent="Process"
                subtitle="A proven four-step framework that turns strategy into sustained, scalable growth."
              />
            </Box>

            {/*
              Steps as centred cards — no left timeline bias.
              Each step is a full-width card with number centred on top,
              title centred, desc centred — clean, readable, symmetrical.
            */}
            <Box sx={{ display:"flex", flexDirection:"column", gap:3 }}>
              {PROCESS.map((step, i) => (
                <Box
                  key={i}
                  className="ef-reveal"
                  style={{ transitionDelay:`${i * 0.1}s` }}
                  sx={{
                    textAlign:"center",
                    p:{ xs:"28px 24px", md:"36px 48px" },
                    border:"1px solid rgba(201,168,76,0.1)",
                    background:"rgba(255,255,255,0.02)",
                    position:"relative",
                    transition:"all 0.3s ease",
                    "&:hover":{
                      borderColor:"rgba(201,168,76,0.35)",
                      background:"rgba(201,168,76,0.04)",
                    },
                    /* Gold top accent line on hover */
                    "&::before":{
                      content:'""', position:"absolute",
                      top:0, left:"50%", transform:"translateX(-50%)",
                      width:0, height:"2px",
                      background:"linear-gradient(90deg,transparent,#C9A84C,transparent)",
                      transition:"width 0.4s ease",
                    },
                    "&:hover::before":{ width:"60%" },
                  }}
                >
                  {/* Step number — gold, small, centred */}
                  <Typography sx={{
                    fontFamily:"'DM Sans',sans-serif", fontWeight:500,
                    fontSize:"0.65rem", color:"#C9A84C",
                    letterSpacing:"0.2em", textTransform:"uppercase",
                    mb:1.5,
                  }}>
                    Step {step.num}
                  </Typography>

                  {/* Title — centred */}
                  <Typography sx={{
                    fontFamily:"'Playfair Display',serif", fontWeight:400,
                    fontSize:{ xs:"1.5rem", md:"2rem" },
                    color:"#F2EDE4", mb:1.5,
                    lineHeight:1.15, letterSpacing:"-0.01em",
                  }}>
                    {step.title}
                  </Typography>

                  {/* Description — centred, max-width for readability */}
                  <Typography sx={{
                    fontFamily:"'DM Sans',sans-serif", fontWeight:300,
                    fontSize:"0.88rem",
                    color:alpha("#F2EDE4", 0.45),
                    lineHeight:1.85,
                    maxWidth:"480px",
                    mx:"auto",
                  }}>
                    {step.desc}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Centred CTA below steps */}
            <Box sx={{ textAlign:"center", mt:{ xs:6, md:8 } }} className="ef-reveal">
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontWeight:400, fontSize:{ xs:"1.4rem", md:"1.8rem" }, color:alpha("#F2EDE4",0.65), mb:4, lineHeight:1.4 }}>
                Ready to start your{" "}
                <Box component="em" sx={{ fontStyle:"italic", color:"#C9A84C" }}>growth journey?</Box>
              </Typography>
              <button className="ef-btn-gold" onClick={() => scrollTo("contact")}>Let's Get Started</button>
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            TESTIMONIALS — centred heading + equal cards
        ════════════════════════════════════ */}
        <Box sx={{ py:{ xs:10, md:14 }, background:"#0F0F1C" }}>
          <Container maxWidth="xl" sx={{ px:{ xs:3, md:7 } }}>

            <Box className="ef-reveal">
              <SectionHeading
                eyebrow="Client Stories"
                title="What Our"
                accent="Clients Say"
              />
            </Box>

            <Grid container spacing={3}>
              {TESTIMONIALS.map((t, i) => (
                <Grid key={i} item xs={12} md={4} sx={{ display:"flex" }}>
                  <div className="ef-testi ef-reveal" style={{ transitionDelay:`${i*0.1}s`, width:"100%" }}>
                    <Box sx={{ display:"flex", gap:.5, mb:2.5, flexShrink:0 }}>
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Typography key={j} sx={{ fontSize:"0.8rem", color:"#C9A84C" }}>★</Typography>
                      ))}
                    </Box>
                    <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontWeight:400, fontSize:"1.05rem", color:alpha("#F2EDE4",0.8), lineHeight:1.75, mb:3, position:"relative", zIndex:1, flex:1 }}>
                      {t.text}
                    </Typography>
                    <Box sx={{ display:"flex", alignItems:"center", gap:2, flexShrink:0 }}>
                      <Box sx={{ width:40, height:40, borderRadius:"50%", background:"rgba(201,168,76,0.12)", border:"1px solid rgba(201,168,76,0.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:"0.9rem", color:"#C9A84C" }}>{t.name[0]}</Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:"0.82rem", color:"#F2EDE4" }}>{t.name}</Typography>
                        <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.7rem", color:alpha("#F2EDE4",0.35), letterSpacing:"0.04em" }}>{t.role}</Typography>
                      </Box>
                    </Box>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            CTA BAND — fully centred
        ════════════════════════════════════ */}
        <Box sx={{ background:"#C9A84C", position:"relative", overflow:"hidden", py:{ xs:10, md:14 }, "&::before":{ content:'""', position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(-45deg,transparent,transparent 18px,rgba(13,13,26,0.04) 18px,rgba(13,13,26,0.04) 19px)" } }}>
          <Container maxWidth="md" sx={{ position:"relative", zIndex:1, textAlign:"center" }}>
            <Box className="ef-reveal">

              {/* Eyebrow — centred with lines */}
              <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:3 }}>
                <Box sx={{ width:26, height:"1px", background:"rgba(13,13,26,0.25)" }}/>
                <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.62rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"rgba(13,13,26,0.45)", whiteSpace:"nowrap" }}>
                  Ready to scale?
                </Typography>
                <Box sx={{ width:26, height:"1px", background:"rgba(13,13,26,0.25)" }}/>
              </Box>

              {/* Headline */}
              <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:{ xs:"2.4rem", sm:"3.2rem", md:"4.5rem" }, lineHeight:1.08, letterSpacing:"-0.025em", color:"#0D0D1A", mb:1.5 }}>
                Let's build your{" "}
                <Box component="em" sx={{ fontStyle:"italic" }}>digital empire</Box>
                {" "}together.
              </Typography>

              {/* Diamond ornament — dark variant */}
              <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", my:3 }}>
                <Box sx={{ height:"1px", width:40, background:"linear-gradient(90deg,transparent,rgba(13,13,26,0.3))" }}/>
                <Box sx={{ width:5, height:5, border:"1px solid rgba(13,13,26,0.4)", transform:"rotate(45deg)", flexShrink:0 }}/>
                <Box sx={{ height:"1px", width:40, background:"linear-gradient(90deg,rgba(13,13,26,0.3),transparent)" }}/>
              </Box>

              {/* Buttons — centred row */}
              <Box sx={{ display:"flex", gap:2, justifyContent:"center", flexWrap:"wrap", mb:6 }}>
                <button
                  onClick={() => scrollTo("contact")}
                  style={{ background:"#0D0D1A", color:"#C9A84C", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"15px 40px", transition:"transform 0.3s" }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  Get a Free Audit
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  style={{ background:"transparent", color:"rgba(13,13,26,0.65)", border:"1px solid rgba(13,13,26,0.25)", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"14px 36px", transition:"all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor="rgba(13,13,26,0.6)"; e.currentTarget.style.color="#0D0D1A"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor="rgba(13,13,26,0.25)"; e.currentTarget.style.color="rgba(13,13,26,0.65)"; }}
                >
                  View Services
                </button>
              </Box>

              {/* Contact info — centred 3-col */}
              <Box sx={{ display:"flex", justifyContent:"center", gap:{ xs:4, md:8 }, flexWrap:"wrap" }}>
                {[
                  { label:"Call",  value:"+91 90435 61290", href:"tel:9043561290" },
                  { label:"Email", value:"efourge@gmail.com", href:"mailto:efourge@gmail.com" },
                  { label:"Visit", value:"Udaipur, Rajasthan", href:null },
                ].map(({ label, value, href }) => (
                  <Box key={label} component={href?"a":"div"} href={href} sx={{ textAlign:"center", textDecoration:"none" }}>
                    <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:"0.55rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(13,13,26,0.4)", mb:.3 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:400, fontSize:"0.82rem", color:"rgba(13,13,26,0.65)", transition:"color .3s", "&:hover":{ color:"#0D0D1A" } }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}

