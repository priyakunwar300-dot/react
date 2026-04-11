import { useState, useEffect, useRef } from "react";
import {
  Box, Container, Typography, Grid, Chip, Button,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthEastIcon    from "@mui/icons-material/NorthEast";

/* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#C9A96E" },
    secondary:  { main: "#E8E0D0" },
    background: { default: "#0C0C0F", paper: "#13131A" },
    text:       { primary: "#F0EDE8", secondary: "#8A8699" },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h3: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
    h4: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
    h5: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
    h6: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
  },
  shape: { borderRadius: 4 },
});

/* ══════════════════════════════════════════════════════════
   GLOBAL CSS
══════════════════════════════════════════════════════════ */
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:#0C0C0F; }
    ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,#C9A96E,#6E9EC9); border-radius:99px; }

    @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes floatUp      { 0%,100%{transform:translateY(0) rotate(0deg)} 33%{transform:translateY(-8px) rotate(1deg)} 66%{transform:translateY(-4px) rotate(-1deg)} }
    @keyframes tickerScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

    /* ── Service card ── */
    .efg-svc-card {
      position:relative; overflow:hidden; border-radius:12px;
      border:1px solid rgba(201,169,110,0.12); background:rgba(19,19,26,0.85);
      transition:all .45s cubic-bezier(0.25,0.8,0.25,1);
      height:100%; display:flex; flex-direction:column;
    }
    .efg-svc-card:hover { transform:translateY(-8px); border-color:rgba(201,169,110,0.45); }
    .efg-svc-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(201,169,110,0.04) 0%,transparent 60%); opacity:0; transition:opacity .4s; pointer-events:none; z-index:1; }
    .efg-svc-card:hover::before { opacity:1; }

    .efg-img-wrap { position:relative; overflow:hidden; flex-shrink:0; }
    .efg-img-wrap img { width:100%; height:220px; object-fit:cover; filter:brightness(0.72) saturate(0.85); transition:transform .65s,filter .4s; display:block; }
    .efg-svc-card:hover .efg-img-wrap img { transform:scale(1.07); filter:brightness(0.55) saturate(0.75); }
    .efg-img-overlay { position:absolute; inset:0; background:linear-gradient(to bottom,transparent 35%,rgba(12,12,15,0.9) 100%); pointer-events:none; }

    .efg-badge { position:absolute; top:14px; left:14px; backdrop-filter:blur(10px); border-radius:6px; padding:4px 12px; font-family:'DM Mono',monospace; font-size:0.62rem; font-weight:500; letter-spacing:0.14em; z-index:2; }
    .efg-arrow-btn { position:absolute; top:12px; right:12px; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; opacity:0; transform:scale(0.7) rotate(-45deg); transition:all .35s; z-index:2; }
    .efg-svc-card:hover .efg-arrow-btn { opacity:1; transform:scale(1) rotate(0deg); }

    .efg-accent-line { height:2px; border-radius:99px; width:24px; transition:width .4s; margin-bottom:14px; }
    .efg-svc-card:hover .efg-accent-line { width:52px; }

    .efg-tag { display:inline-flex; align-items:center; padding:2px 10px; border-radius:4px; font-family:'DM Sans',sans-serif; font-size:0.62rem; font-weight:500; letter-spacing:0.05em; border:1px solid transparent; }

    .efg-explore { display:flex; align-items:center; gap:6px; font-family:'DM Sans',sans-serif; font-size:0.72rem; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; opacity:.6; transition:all .3s; }
    .efg-svc-card:hover .efg-explore { opacity:1; transform:translateX(5px); }

    .efg-bg-num { position:absolute; bottom:-10px; right:12px; font-family:'Cormorant Garamond',serif; font-size:5.5rem; font-weight:600; line-height:1; opacity:0.035; pointer-events:none; user-select:none; transition:opacity .4s; }
    .efg-svc-card:hover .efg-bg-num { opacity:0.07; }

    /* ── Hero card ── */
    .efg-hero-card { position:relative; overflow:hidden; border-radius:14px; transition:all .5s cubic-bezier(0.25,0.8,0.25,1); height:100%; }
    .efg-hero-card:hover { transform:translateY(-6px); }
    .efg-hero-card img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.55) saturate(0.82); transition:transform .7s,filter .5s; }
    .efg-hero-card:hover img { transform:scale(1.06); filter:brightness(0.38) saturate(0.7); }
    .efg-hero-overlay { position:absolute; inset:0; pointer-events:none; }
    .efg-hero-content { position:absolute; inset:0; padding:32px; display:flex; flex-direction:column; justify-content:flex-end; z-index:2; }

    /* ── Stats ── */
    .efg-stat-item { text-align:center; padding:28px 16px; transition:background .3s; }
    .efg-stat-item:hover { background:rgba(201,169,110,0.04); }

    /* ── Ticker ── */
    .efg-ticker-track { display:flex; white-space:nowrap; animation:tickerScroll 28s linear infinite; }
    .efg-ticker-track:hover { animation-play-state:paused; }

    /* ── CTA card ── */
    .efg-cta {
      position:relative; overflow:hidden; border-radius:16px;
      border:1px solid rgba(201,169,110,0.2); padding:80px 40px;
      text-align:center;
      background:linear-gradient(135deg,rgba(201,169,110,0.08) 0%,rgba(19,19,26,0.95) 50%,rgba(110,158,201,0.06) 100%);
    }
    .efg-cta::before { content:''; position:absolute; top:0; left:50%; transform:translateX(-50%); width:65%; height:1px; background:linear-gradient(90deg,transparent,#C9A96E,transparent); }
    .efg-cta::after  { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:40%; height:1px; background:linear-gradient(90deg,transparent,rgba(201,169,110,0.4),transparent); }

    /* ── Buttons ── */
    .efg-btn-primary { background:#C9A96E !important; color:#0C0C0F !important; font-family:'DM Sans',sans-serif !important; font-weight:700 !important; font-size:0.76rem !important; letter-spacing:0.16em !important; text-transform:uppercase !important; padding:14px 36px !important; border-radius:8px !important; box-shadow:0 0 40px rgba(201,169,110,0.35) !important; transition:all .3s !important; }
    .efg-btn-primary:hover { background:#E8D5A3 !important; box-shadow:0 0 60px rgba(201,169,110,0.55) !important; transform:translateY(-2px) !important; }
    .efg-btn-outline { border:1px solid rgba(240,237,232,0.2) !important; color:rgba(240,237,232,0.65) !important; font-family:'DM Sans',sans-serif !important; font-weight:500 !important; font-size:0.76rem !important; letter-spacing:0.16em !important; text-transform:uppercase !important; padding:14px 36px !important; border-radius:8px !important; transition:all .3s !important; }
    .efg-btn-outline:hover { border-color:#C9A96E !important; color:#C9A96E !important; background:rgba(201,169,110,0.06) !important; }

    /* ── Orb ── */
    .efg-orb { position:absolute; border-radius:50%; pointer-events:none; animation:floatUp 8s ease-in-out infinite; }

    /* ── Photo strip ── */
    .efg-photo-strip img { width:100%; height:100%; object-fit:cover; display:block; filter:saturate(0.7) brightness(0.8); transition:filter .4s,transform .5s; }
    .efg-photo-strip div:hover img { filter:saturate(1) brightness(1); transform:scale(1.04); }

    @media (max-width:768px) {
      .efg-hero-content { padding:20px; }
      .efg-cta          { padding:48px 24px; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const SERVICES = [
  { id:1, title:"Social Media Marketing",           short:"SMM",  tagline:"Build Communities. Drive Conversations.",      desc:"We craft scroll-stopping content strategies across Instagram, LinkedIn, X, and beyond — turning followers into loyal brand advocates.", image:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format", accent:"#C9A96E", tags:["Instagram","LinkedIn","X / Twitter","Content Strategy"], featured:true },
  { id:2, title:"Search Engine Optimisation",       short:"SEO",  tagline:"Rank Higher. Stay There.",                     desc:"Technical audits, keyword architecture, and content optimization that put your brand at the top of Google — and keep it there.", image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format", accent:"#6E9EC9", tags:["On-Page SEO","Technical SEO","Link Building","Local SEO"], featured:false },
  { id:3, title:"Digital Marketing Strategy",       short:"DM",   tagline:"Full-Funnel. Data-Driven. Relentless.",        desc:"End-to-end digital marketing campaigns engineered around your KPIs — from brand awareness to conversion.", image:"https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=900&q=80&auto=format", accent:"#C96E6E", tags:["Campaign Strategy","Email Marketing","CRO","Funnels"], featured:false },
  { id:4, title:"Web Design & Development",         short:"WD",   tagline:"Websites That Convert, Not Just Impress.",     desc:"Performance-first websites and landing pages built with precision design and clean code — merging aesthetics with conversion science.", image:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80&auto=format", accent:"#6EC99A", tags:["UI/UX Design","React / Next.js","CMS","Landing Pages"], featured:true },
  { id:5, title:"Google Ads Optimisation",          short:"GAds", tagline:"Every Rupee Spent, Accounted For.",            desc:"Precision-targeted Search, Display, Shopping, and Performance Max campaigns with continuous bid strategy refinement.", image:"https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=900&q=80&auto=format", accent:"#C9A96E", tags:["Search Ads","Display Ads","Performance Max","ROAS Optimisation"], featured:false },
  { id:6, title:"Meta Ads Optimisation",            short:"Meta", tagline:"Scale What Works. Kill What Doesn't.",         desc:"Advanced Facebook & Instagram advertising — audience segmentation, creative testing, pixel setup, and retargeting flows.", image:"https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=900&q=80&auto=format", accent:"#9E6EC9", tags:["Facebook Ads","Instagram Ads","Retargeting","Lookalike Audiences"], featured:false },
  { id:7, title:"Photography & Videography",        short:"P&V",  tagline:"Stories Told Through a Lens.",                desc:"Brand shoots, product photography, reels, testimonial videos, and cinematic brand films — crafted to stop the scroll.", image:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=900&q=80&auto=format", accent:"#C9836E", tags:["Brand Photography","Product Shoots","Reels & Shorts","Brand Films"], featured:true },
  { id:8, title:"Images, Videos & Creative Content",short:"CCR",  tagline:"Content That Earns Attention.",                desc:"Graphic design, motion graphics, infographics, and short-form video — a full creative studio producing platform-native content.", image:"https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&auto=format", accent:"#6EC9C9", tags:["Graphic Design","Motion Graphics","Infographics","Reels Production"], featured:false },
  { id:9, title:"Consultancy Services",             short:"CST",  tagline:"Expert Guidance. Measurable Direction.",       desc:"One-on-one strategy sessions, brand audits, and growth roadmaps for founders and marketing teams who need clarity.", image:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format", accent:"#C9A96E", tags:["Brand Audit","Growth Roadmap","1:1 Strategy","Team Training"], featured:false },
];

const STATS = [
  { value:"500+", label:"Brands Served" },
  { value:"9",    label:"Core Services" },
  { value:"98%",  label:"Retention Rate"},
  { value:"6×",   label:"Average ROI"  },
];

const TICKER_ITEMS = ["Social Media Marketing","SEO","Google Ads","Meta Ads","Web Design","Photography","Video Production","Consultancy","Digital Strategy","Brand Growth","Content Creation","Performance Marketing"];

/* ══════════════════════════════════════════════════════════
   INTERSECTION HOOK
══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ══════════════════════════════════════════════════════════
   LOGO
══════════════════════════════════════════════════════════ */
function Logo({ size = 36 }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", gap:1.2, userSelect:"none" }}>
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="17" stroke="#C9A96E" strokeWidth="1" />
        <circle cx="18" cy="18" r="12" stroke="#C9A96E" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.45" />
        <line x1="10" y1="10" x2="10" y2="26" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="10" x2="21" y2="10" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="18" x2="19" y2="18" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="26" x2="21" y2="26" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="26" cy="18" r="2" fill="#C9A96E" opacity="0.7" />
      </svg>
      <Box>
        <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:size*0.44+"px", letterSpacing:"0.1em", color:"#F0EDE8", lineHeight:1, textTransform:"uppercase" }}>Efourge</Typography>
        <Typography sx={{ fontFamily:"'DM Mono',monospace", fontWeight:400, fontSize:size*0.2+"px", letterSpacing:"0.28em", color:"#C9A96E", lineHeight:1, mt:"2px", textTransform:"uppercase" }}>Digital</Typography>
      </Box>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   CENTRED ORNAMENT — used between sections
══════════════════════════════════════════════════════════ */
function Ornament({ my = 3 }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", my }}>
      <Box sx={{ height:"1px", width:48, background:"linear-gradient(90deg,transparent,#C9A96E)", opacity:.6 }}/>
      <Box sx={{ width:5, height:5, border:"1px solid #C9A96E", transform:"rotate(45deg)", flexShrink:0, opacity:.7 }}/>
      <Box sx={{ height:"1px", width:48, background:"linear-gradient(90deg,#C9A96E,transparent)", opacity:.6 }}/>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   SECTION DIVIDER — centred label with lines both sides
   replaces the old left-aligned SectionLabel
══════════════════════════════════════════════════════════ */
function SectionDivider({ label, count }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", gap:3, mb:{ xs:4, md:6 } }}>
      {/* Left line */}
      <Box sx={{ height:"1px", flex:1, bgcolor:alpha("#C9A96E",.1) }}/>

      {/* Centred label */}
      <Box sx={{ display:"flex", alignItems:"center", gap:2, flexShrink:0 }}>
        <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.32em", textTransform:"uppercase", color:alpha("#C9A96E",0.65), whiteSpace:"nowrap" }}>
          {label}
        </Typography>
        {count && (
          <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:"0.6rem", color:alpha("#F0EDE8",.18), letterSpacing:".14em" }}>
            {count}
          </Typography>
        )}
      </Box>

      {/* Right line */}
      <Box sx={{ height:"1px", flex:1, bgcolor:alpha("#C9A96E",.1) }}/>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO SERVICE CARD
══════════════════════════════════════════════════════════ */
function HeroServiceCard({ service, minH = 520 }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.08);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        height:"100%",
        opacity:  visible ? 1 : 0,
        transform:visible ? "translateY(0)" : "translateY(44px)",
        transition:"opacity .8s ease, transform .8s cubic-bezier(0.34,1.1,0.64,1)",
        cursor:"pointer",
      }}
    >
      <Box
        className="efg-hero-card"
        sx={{
          minHeight:{ xs:340, md:minH },
          border:`1px solid ${alpha(service.accent, hovered ? 0.5 : 0.15)}`,
          boxShadow: hovered ? `0 32px 80px ${alpha(service.accent, 0.22)}` : "none",
          transition:"all .45s ease",
        }}
      >
        <img src={service.image} alt={service.title} loading="lazy" />

        <div className="efg-hero-overlay" style={{ background:`linear-gradient(160deg,${alpha("#0C0C0F",0.55)} 0%,transparent 55%,${alpha(service.accent,0.12)} 100%)` }} />

        <div className="efg-hero-content">
          <Box sx={{ display:"inline-flex", alignSelf:"flex-start", bgcolor:alpha(service.accent,0.14), border:`1px solid ${alpha(service.accent,0.5)}`, backdropFilter:"blur(12px)", borderRadius:"6px", px:1.8, py:.6, mb:2 }}>
            <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", fontWeight:500, color:service.accent, letterSpacing:".16em" }}>
              FEATURED — {service.short}
            </Typography>
          </Box>

          <Box sx={{ width:hovered?48:28, height:2, bgcolor:service.accent, mb:2, borderRadius:99, transition:"width .4s ease" }} />

          <Typography variant="h3" sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:{ xs:"1.8rem", md:"2.4rem" }, fontWeight:600, color:"#F0EDE8", lineHeight:1.15, mb:1.5 }}>
            {service.title}
          </Typography>
          <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:".72rem", fontWeight:500, color:service.accent, letterSpacing:".18em", textTransform:"uppercase", mb:1.5 }}>
            {service.tagline}
          </Typography>
          <Typography sx={{ color:alpha("#F0EDE8",0.6), lineHeight:1.78, fontSize:".85rem", mb:2.5, maxWidth:420 }}>
            {service.desc}
          </Typography>

          <Box sx={{ display:"flex", flexWrap:"wrap", gap:.8, mb:3 }}>
            {service.tags.map(tag => (
              <Box key={tag} className="efg-tag" sx={{ bgcolor:alpha("#0C0C0F",0.5), backdropFilter:"blur(8px)", color:alpha(service.accent,0.9), borderColor:alpha(service.accent,0.25) }}>
                {tag}
              </Box>
            ))}
          </Box>

          <Button variant="outlined" endIcon={<ArrowForwardIcon />} sx={{
            alignSelf:"flex-start",
            borderColor:alpha(service.accent,0.5), color:service.accent,
            fontFamily:"'DM Sans',sans-serif", fontSize:".7rem", fontWeight:600,
            letterSpacing:".15em", textTransform:"uppercase",
            px:3, py:1.2, borderRadius:"6px",
            backdropFilter:"blur(12px)", bgcolor:alpha(service.accent,0.08),
            "&:hover":{ bgcolor:alpha(service.accent,0.2), borderColor:service.accent },
          }}>
            Learn More
          </Button>
        </div>
      </Box>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   STANDARD SERVICE CARD
══════════════════════════════════════════════════════════ */
function ServiceCard({ service, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useInView(0.08);

  return (
    <Box
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        height:"100%",
        opacity:  visible ? 1 : 0,
        transform:visible ? "translateY(0)" : "translateY(48px)",
        transition:`opacity .7s ease ${index*.08}s, transform .7s cubic-bezier(0.34,1.1,0.64,1) ${index*.08}s`,
        cursor:"pointer",
      }}
    >
      <Box className="efg-svc-card" sx={{ boxShadow: hovered ? `0 24px 60px ${alpha(service.accent,0.18)}` : "none" }}>
        <div className="efg-img-wrap">
          <img src={service.image} alt={service.title} loading="lazy" style={{ height:220 }} />
          <div className="efg-img-overlay" />
          <div className="efg-badge" style={{ background:alpha(service.accent,0.15), border:`1px solid ${alpha(service.accent,0.5)}`, color:service.accent }}>
            {service.short}
          </div>
          <div className="efg-arrow-btn" style={{ background:alpha(service.accent,0.18), border:`1px solid ${alpha(service.accent,0.45)}` }}>
            <NorthEastIcon sx={{ fontSize:15, color:service.accent }} />
          </div>
        </div>

        <Box sx={{ p:3, flex:1, display:"flex", flexDirection:"column", position:"relative", zIndex:2 }}>
          <Typography className="efg-bg-num" sx={{ color:service.accent }}>{String(service.id).padStart(2,"0")}</Typography>
          <div className="efg-accent-line" style={{ background:service.accent }} />
          <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:{ xs:"1.32rem", md:"1.45rem" }, fontWeight:600, color:"#F0EDE8", lineHeight:1.2, mb:.8 }}>
            {service.title}
          </Typography>
          <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", fontWeight:500, color:service.accent, letterSpacing:".18em", textTransform:"uppercase", mb:1.4 }}>
            {service.tagline}
          </Typography>
          <Typography sx={{ color:alpha("#F0EDE8",0.52), lineHeight:1.76, fontSize:".83rem", mb:2.5, flex:1 }}>
            {service.desc}
          </Typography>
          <Box sx={{ display:"flex", flexWrap:"wrap", gap:.7, mb:2.5 }}>
            {service.tags.map(tag => (
              <Box key={tag} className="efg-tag" sx={{ bgcolor:alpha(service.accent,0.07), color:alpha(service.accent,0.85), borderColor:alpha(service.accent,0.2) }}>
                {tag}
              </Box>
            ))}
          </Box>
          <div className="efg-explore" style={{ color:service.accent }}>
            <span>Explore Service</span>
            <ArrowForwardIcon sx={{ fontSize:14 }} />
          </div>
        </Box>
      </Box>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   STATS ROW — centred 4-col
══════════════════════════════════════════════════════════ */
function StatsRow() {
  const [ref, visible] = useInView(0.2);
  return (
    <Box ref={ref} sx={{ py:{ xs:6, md:8 }, borderTop:`1px solid ${alpha("#C9A96E",.1)}`, borderBottom:`1px solid ${alpha("#C9A96E",.1)}`, mb:{ xs:6, md:10 } }}>
      <Grid container>
        {STATS.map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <div className="efg-stat-item" style={{ borderRight: i < 3 ? `1px solid ${alpha("#C9A96E",.1)}` : "none" }}>
              <Box sx={{ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transition:`all .65s ease ${i*.1}s` }}>
                <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:{ xs:"2.2rem", md:"3.2rem" }, fontWeight:600, background:"linear-gradient(135deg,#C9A96E,#E8D5A3)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, mb:.5 }}>
                  {s.value}
                </Typography>
                <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:".68rem", fontWeight:400, color:alpha("#F0EDE8",.38), letterSpacing:".18em", textTransform:"uppercase" }}>
                  {s.label}
                </Typography>
              </Box>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   TICKER
══════════════════════════════════════════════════════════ */
function Ticker() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <Box sx={{ py:2.5, overflow:"hidden", borderTop:`1px solid ${alpha("#C9A96E",.08)}`, borderBottom:`1px solid ${alpha("#C9A96E",.08)}`, background:alpha("#C9A96E",.025), mb:{ xs:6, md:10 } }}>
      <div className="efg-ticker-track">
        {repeated.map((item, i) => (
          <Box key={i} sx={{ display:"flex", alignItems:"center", flexShrink:0 }}>
            <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"1rem", color:alpha("#F0EDE8",.2), px:4, letterSpacing:".06em" }}>
              {item}
            </Typography>
            <Box sx={{ width:4, height:4, borderRadius:"50%", background:"rgba(201,169,110,0.3)", flexShrink:0 }} />
          </Box>
        ))}
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   PHOTO STRIP
══════════════════════════════════════════════════════════ */
function PhotoStrip() {
  const photos = [
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=70&auto=format",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=70&auto=format",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&q=70&auto=format",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=70&auto=format",
  ];
  return (
    <Box className="efg-photo-strip" sx={{ my:{ xs:6, md:10 } }}>
      <Grid container spacing={1.5}>
        {photos.map((src, i) => (
          <Grid item xs={6} md={3} key={i}>
            <Box sx={{ height:{ xs:140, md:220 }, overflow:"hidden", borderRadius:"8px", border:`1px solid ${alpha("#C9A96E",.1)}` }}>
              <img src={src} alt="" loading="lazy" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   CTA STRIP — fully centred
══════════════════════════════════════════════════════════ */
function CTAStrip() {
  const [ref, visible] = useInView(0.15);
  return (
    <Box ref={ref} sx={{ mt:{ xs:8, md:14 }, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(40px)", transition:"all .8s ease" }}>
      <div className="efg-cta">
        <div className="efg-orb" style={{ width:300, height:300, background:"radial-gradient(circle,rgba(201,169,110,0.06) 0%,transparent 70%)", top:-100, left:-100 }} />
        <div className="efg-orb" style={{ width:250, height:250, background:"radial-gradient(circle,rgba(110,158,201,0.05) 0%,transparent 70%)", bottom:-80, right:-80, animationDelay:"3s" }} />

        <Box sx={{ position:"relative", zIndex:1 }}>
          {/* Eyebrow — centred with lines */}
          <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:2.5 }}>
            <Box sx={{ width:26, height:"1px", bgcolor:alpha("#C9A96E",.4) }}/>
            <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:"#C9A96E", letterSpacing:".32em", textTransform:"uppercase", opacity:.75, whiteSpace:"nowrap" }}>
              Ready to Scale?
            </Typography>
            <Box sx={{ width:26, height:"1px", bgcolor:alpha("#C9A96E",.4) }}/>
          </Box>

          {/* Headline */}
          <Typography variant="h2" sx={{ fontFamily:"'Cormorant Garamond',serif", fontSize:{ xs:"2.2rem", md:"4rem" }, fontWeight:600, color:"#F0EDE8", lineHeight:1.1, mb:2, letterSpacing:"-0.02em" }}>
            Let's Forge Your<br/>
            <Box component="span" sx={{ background:"linear-gradient(135deg,#C9A96E,#E8D5A3)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              Digital Presence
            </Box>
          </Typography>

          {/* Ornament */}
          <Ornament my={2.5} />

          <Typography sx={{ color:alpha("#F0EDE8",.48), fontSize:"1rem", lineHeight:1.85, mb:5, maxWidth:500, mx:"auto" }}>
            Book a free strategy session with our team. No fluff — just honest analysis and a clear growth roadmap for your brand.
          </Typography>

          {/* Contact info — centred 3-col */}
          <Box sx={{ display:"flex", justifyContent:"center", gap:{ xs:4, md:8 }, flexWrap:"wrap", mb:5 }}>
            {[
              { l:"Call",  v:"+91 90435 61290", h:"tel:9043561290" },
              { l:"Email", v:"efourge@gmail.com", h:"mailto:efourge@gmail.com" },
              { l:"Visit", v:"Udaipur, Rajasthan", h:null },
            ].map(({ l, v, h }) => (
              <Box key={l} component={h?"a":"div"} href={h} sx={{ textDecoration:"none", textAlign:"center" }}>
                <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:".52rem", letterSpacing:".2em", textTransform:"uppercase", color:alpha("#C9A96E",.5), mb:.4 }}>{l}</Typography>
                <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontWeight:300, fontSize:".78rem", color:alpha("#F0EDE8",.45), transition:"color .3s", "&:hover":{ color:"#C9A96E" } }}>{v}</Typography>
              </Box>
            ))}
          </Box>

          {/* Buttons — centred */}
          <Box sx={{ display:"flex", gap:2, justifyContent:"center", flexWrap:"wrap" }}>
            <Button className="efg-btn-primary" variant="contained" endIcon={<ArrowForwardIcon />}>
              Book Free Audit
            </Button>
            <Button className="efg-btn-outline" variant="outlined">
              View Case Studies
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function ServicesPage() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);



  return (
    <ThemeProvider theme={theme}>
      <GlobalCSS />
      <Box sx={{ bgcolor:"background.default", minHeight:"100vh", color:"text.primary", overflowX:"hidden" }}>

        {/* ════════════════════════════════════
            HERO — full-width centred
        ════════════════════════════════════ */}
        <Box sx={{
          position:"relative",
          pt:{ xs:14, md:20 }, pb:{ xs:10, md:14 },
          overflow:"hidden",
          "&::before":{ content:'""', position:"absolute", inset:0, backgroundImage:`radial-gradient(ellipse 80% 50% at 50% -5%,${alpha("#C9A96E",.18)} 0%,transparent 62%)`, pointerEvents:"none" },
        }}>
          {[...Array(5)].map((_,i) => (
            <Box key={i} sx={{ position:"absolute", top:0, bottom:0, left:`${(i+1)*20}%`, width:"1px", background:`linear-gradient(to bottom,transparent,${alpha("#C9A96E",.055)},transparent)`, pointerEvents:"none" }} />
          ))}
          <div className="efg-orb" style={{ width:400, height:400, background:`radial-gradient(circle,${alpha("#C9A96E",.06)} 0%,transparent 70%)`, top:"-10%", left:"-5%", animationDuration:"10s" }} />
          <div className="efg-orb" style={{ width:300, height:300, background:`radial-gradient(circle,${alpha("#6E9EC9",.05)} 0%,transparent 70%)`, top:"20%", right:"-5%", animationDuration:"8s", animationDelay:"2s" }} />

          <Container maxWidth="lg">
            <Box sx={{
              opacity:  heroVisible ? 1 : 0,
              transform:heroVisible ? "translateY(0)" : "translateY(32px)",
              transition:"all .9s cubic-bezier(0.34,1.1,0.64,1)",
              textAlign:"center",
            }}>
              {/* Logo — centred */}
              <Box sx={{ display:"flex", justifyContent:"center", mb:4 }}>
                <Logo size={40} />
              </Box>

              {/* Eyebrow — centred with lines */}
              <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:3 }}>
                <Box sx={{ width:48, height:"1px", bgcolor:alpha("#C9A96E",.4) }} />
                <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:"#C9A96E", letterSpacing:".35em", textTransform:"uppercase", flexShrink:0 }}>
                  What We Offer
                </Typography>
                <Box sx={{ width:48, height:"1px", bgcolor:alpha("#C9A96E",.4) }} />
              </Box>

              {/* Main headline — centred */}
              <Typography variant="h1" sx={{ fontSize:{ xs:"3rem", sm:"4.5rem", md:"6rem" }, lineHeight:.92, letterSpacing:"-0.03em", mb:3, color:"#F0EDE8" }}>
                Our{" "}
                <Box component="span" sx={{
                  fontStyle:"italic",
                  background:"linear-gradient(135deg,#C9A96E 0%,#E8D5A3 50%,#C9A96E 100%)",
                  backgroundSize:"200%",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  animation:"shimmer 4s linear infinite",
                  "@keyframes shimmer":{"0%":{backgroundPosition:"-200% center"},"100%":{backgroundPosition:"200% center"}},
                }}>
                  Services
                </Box>
              </Typography>

              {/* Ornament below headline */}
              <Ornament my={2.5} />

              {/* Sub copy — centred */}
              <Typography sx={{ fontFamily:"'DM Sans',sans-serif", fontSize:{ xs:"1rem", md:"1.1rem" }, color:alpha("#F0EDE8",.48), lineHeight:1.82, maxWidth:560, mx:"auto", mb:5 }}>
                Nine specialised disciplines. One unified goal — to make your brand impossible to ignore in the digital world.
              </Typography>

              {/* Service chips — centred wrap */}
              <Box sx={{ display:"flex", justifyContent:"center", gap:1, flexWrap:"wrap", maxWidth:640, mx:"auto" }}>
                {SERVICES.map((s, i) => (
                  <Chip key={s.id} label={s.short} size="small" sx={{
                    bgcolor:alpha(s.accent,.08), color:s.accent,
                    border:`1px solid ${alpha(s.accent,.22)}`,
                    fontFamily:"'DM Mono',monospace", fontSize:".6rem", letterSpacing:".1em", height:26,
                    opacity:  heroVisible ? 1 : 0,
                    transform:heroVisible ? "translateY(0)" : "translateY(16px)",
                    transition:`all .5s ease ${.4+i*.05}s`,
                    "& .MuiChip-label":{ px:1.4 },
                  }} />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            MAIN CONTENT
        ════════════════════════════════════ */}
        <Container maxWidth="lg" sx={{ pb:{ xs:10, md:16 } }}>

          <StatsRow />
          <Ticker />

          {/* ── All 9 Services ── */}
          <SectionDivider label="All Services" count="09 / 09" />

          <Grid container spacing={3}>
            {SERVICES.map((service, i) => (
              <Grid item xs={12} sm={6} md={4} key={service.id} sx={{ display:"flex" }}>
                <Box sx={{ width:"100%" }}>
                  <ServiceCard service={service} index={i} />
                </Box>
              </Grid>
            ))}
          </Grid>

          <CTAStrip />

        </Container>

        {/* ════════════════════════════════════
            FOOTER — centred
        ════════════════════════════════════ */}
        <Box sx={{ borderTop:`1px solid ${alpha("#C9A96E",.07)}`, py:{ xs:4, md:5 }, textAlign:"center" }}>
          <Box sx={{ display:"flex", justifyContent:"center", mb:2 }}>
            <Logo size={28} />
          </Box>
          <Typography sx={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:alpha("#F0EDE8",.14), letterSpacing:".24em", textTransform:"uppercase" }}>
            © 2025 Efourge Digital Marketing Agency · Udaipur, Rajasthan · All Services Available Pan-India
          </Typography>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
