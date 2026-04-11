import { useState, useEffect, useRef } from "react";
import {
  Box, Container, Typography, Button, Grid, Card, CardContent,
  Chip, Avatar, LinearProgress, Divider, IconButton, AppBar, Toolbar,
} from "@mui/material";
import { createTheme, ThemeProvider, alpha } from "@mui/material/styles";
import ArrowForwardIcon     from "@mui/icons-material/ArrowForward";
import LinkedInIcon         from "@mui/icons-material/LinkedIn";
import TwitterIcon          from "@mui/icons-material/Twitter";
import InstagramIcon        from "@mui/icons-material/Instagram";
import FormatQuoteIcon      from "@mui/icons-material/FormatQuote";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import RocketLaunchIcon     from "@mui/icons-material/RocketLaunch";
import PsychologyIcon       from "@mui/icons-material/Psychology";
import HandshakeIcon        from "@mui/icons-material/Handshake";
import TrendingUpIcon       from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon      from "@mui/icons-material/EmojiEvents";
import GroupsIcon           from "@mui/icons-material/Groups";
import AutoGraphIcon        from "@mui/icons-material/AutoGraph";
import VerifiedIcon         from "@mui/icons-material/Verified";
import MenuIcon             from "@mui/icons-material/Menu";
import EmailIcon            from "@mui/icons-material/Email";
import PhoneIcon            from "@mui/icons-material/Phone";
import LocationOnIcon       from "@mui/icons-material/LocationOn";

/* ══════════════════════════════════════════════════════════
   THEME
══════════════════════════════════════════════════════════ */
const theme = createTheme({
  palette: {
    mode: "dark",
    primary:    { main: "#C8963E", light: "#E0B86A", dark: "#A07830" },
    secondary:  { main: "#E8E0D0", light: "#F5F0E8", dark: "#C8C0B0" },
    background: { default: "#080608", paper: "#100E14" },
    text:       { primary: "#F2EDE4", secondary: "#8C8298" },
  },
  typography: {
    fontFamily: "'Cormorant Garamond', serif",
    h1: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 700 },
    h3: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h4: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h5: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    h6: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 },
    body1:   { fontFamily: "'Jost', sans-serif" },
    body2:   { fontFamily: "'Jost', sans-serif" },
    button:  { fontFamily: "'Jost', sans-serif", fontWeight: 600 },
    caption: { fontFamily: "'Jost', sans-serif" },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", borderRadius: 2, letterSpacing: "0.08em" } },
    },
    MuiContainer: {
      styleOverrides: { root: { paddingLeft: "24px !important", paddingRight: "24px !important" } },
    },
  },
});

/* ══════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════ */
const skills = [
  { label: "Brand Strategy",        value: 97 },
  { label: "Performance Marketing", value: 95 },
  { label: "Content & SEO",         value: 92 },
  { label: "Social Media Growth",   value: 98 },
  { label: "Data Analytics",        value: 88 },
  { label: "Paid Advertising",      value: 94 },
];

const milestones = [
  { year:"2019", title:"The Spark",          desc:"EFOURGE was born from a single belief — that every brand deserves a powerful digital voice." },
  { year:"2021", title:"First 100 Clients",  desc:"Crossed 100 successful brand campaigns. Recognition from industry peers and first major awards." },
  { year:"2023", title:"National Expansion", desc:"Scaled operations across India with a full-service team of creatives, strategists, and data scientists." },
  { year:"2024", title:"500+ Brands Served", desc:"Achieved the milestone of 500+ brands elevated with a 98% client retention record." },
];

const values = [
  { icon:<PsychologyIcon   sx={{ fontSize:28 }}/>, title:"Strategic Clarity",  desc:"Every decision is rooted in insight. We plan with precision and act with purpose.",                    color:"#C8963E" },
  { icon:<RocketLaunchIcon sx={{ fontSize:28 }}/>, title:"Bold Execution",     desc:"We don't play it safe. Bold ideas, fearless campaigns, and relentless follow-through.",                 color:"#9B6BB5" },
  { icon:<HandshakeIcon    sx={{ fontSize:28 }}/>, title:"Client Partnership", desc:"Your goals become our goals. We work as an extension of your team, not just a vendor.",                 color:"#4AADBB" },
  { icon:<TrendingUpIcon   sx={{ fontSize:28 }}/>, title:"Measurable Growth",  desc:"Every campaign is tied to numbers. We obsess over ROI, conversions, and real outcomes.",                color:"#6AB87A" },
];

const team = [
  { name:"Priya Solanki", role:"Founder & CEO",       initials:"PS", color:"#C8963E", speciality:"Brand Strategy & Vision"  },
  { name:"Rohan Verma",   role:"Head of Performance", initials:"RV", color:"#9B6BB5", speciality:"Paid Ads & ROI"           },
  { name:"Ananya Joshi",  role:"Creative Director",   initials:"AJ", color:"#4AADBB", speciality:"Visual Storytelling"      },
  { name:"Kabir Singh",   role:"Data Strategist",     initials:"KS", color:"#6AB87A", speciality:"Analytics & Intelligence" },
];

const awards = [
  { icon:<EmojiEventsIcon/>,      title:"Best Digital Agency 2024",    org:"India Marketing Summit" },
  { icon:<WorkspacePremiumIcon/>, title:"Top 50 Growth Agencies",      org:"Forbes India, 2023"     },
  { icon:<AutoGraphIcon/>,        title:"Excellence in ROI Marketing", org:"AdTech Awards 2023"     },
  { icon:<GroupsIcon/>,           title:"Best Employer Brand",         org:"Agency Awards 2024"     },
];

const navLinks = ["Home", "Services", "Results", "Case Studies", "Contact"];

/* ══════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════ */
function useInView(threshold = 0.18) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
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
   SKILL BAR
══════════════════════════════════════════════════════════ */
function SkillBar({ label, value, delay, visible }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setProgress(value), delay);
      return () => clearTimeout(t);
    }
  }, [visible, value, delay]);
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:1 }}>
        <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:500, color:"text.primary", letterSpacing:"0.05em", fontSize:13 }}>{label}</Typography>
        <Typography sx={{ fontFamily:"'Jost',sans-serif", color:"primary.main", fontWeight:700, fontSize:13 }}>{progress}%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} sx={{
        height:3, borderRadius:99, bgcolor:alpha("#C8963E",0.12),
        "& .MuiLinearProgress-bar":{ borderRadius:99, background:"linear-gradient(90deg,#C8963E,#E0B86A)", transition:"transform 1.4s cubic-bezier(0.4,0,0.2,1) !important" },
      }}/>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   SVG LOGO
══════════════════════════════════════════════════════════ */
function EfourgeLogo({ size = 38 }) {
  return (
    <Box sx={{ width:size, height:size, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#C8963E" strokeWidth="1" strokeDasharray="4 2.5" opacity="0.45"/>
        <circle cx="24" cy="24" r="18" fill="url(#abLg)"/>
        <path d="M13.5 24.5 Q24 11 34.5 24.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.95"/>
        <path d="M17 24.5 Q24 15 31 24.5"     stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75"/>
        <rect x="16.5" y="28.5" width="3" height="5"  rx="0.8" fill="white" opacity="0.9"/>
        <rect x="22.5" y="25.5" width="3" height="8"  rx="0.8" fill="white" opacity="0.9"/>
        <rect x="28.5" y="22.5" width="3" height="11" rx="0.8" fill="white" opacity="0.9"/>
        <circle cx="24" cy="24.5" r="1.8" fill="white"/>
        <defs>
          <radialGradient id="abLg" cx="35%" cy="28%" r="72%">
            <stop offset="0%"   stopColor="#EAC97A"/>
            <stop offset="100%" stopColor="#9A7028"/>
          </radialGradient>
        </defs>
      </svg>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   REUSABLE: centred ornament divider
══════════════════════════════════════════════════════════ */
function Ornament() {
  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", my:2.5 }}>
      <Box sx={{ width:40, height:"1px", background:"linear-gradient(90deg,transparent,#C8963E)", opacity:.7 }}/>
      <Box sx={{ width:6, height:6, border:"1px solid #C8963E", transform:"rotate(45deg)", flexShrink:0, opacity:.7 }}/>
      <Box sx={{ width:40, height:"1px", background:"linear-gradient(90deg,#C8963E,transparent)", opacity:.7 }}/>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   REUSABLE: section eyebrow — always centred
══════════════════════════════════════════════════════════ */
function SectionLabel({ text }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:2 }}>
      <Box sx={{ width:28, height:"1px", bgcolor:"primary.main", opacity:.8 }}/>
      <Typography sx={{ fontFamily:"'Jost',sans-serif", color:"primary.main", letterSpacing:"0.24em", fontSize:11, fontWeight:500, whiteSpace:"nowrap" }}>
        {text}
      </Typography>
      <Box sx={{ width:28, height:"1px", bgcolor:"primary.main", opacity:.8 }}/>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export default function EfourgeAboutPage() {
  const [scrolled,    setScrolled]    = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [skillsRef,   skillsVisible]  = useInView(0.22);
  const [valuesRef,   valuesVisible]  = useInView(0.12);
  const [timelineRef, timelineVisible]= useInView(0.12);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setHeroVisible(true), 120);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { margin:0; }
        ::-webkit-scrollbar       { width:5px; }
        ::-webkit-scrollbar-track { background:#080608; }
        ::-webkit-scrollbar-thumb { background:#C8963E; border-radius:99px; }
        @keyframes floatSlow  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes fadeUp     { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rotateSlow { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
        .hero-word { display:inline-block; opacity:0; animation:fadeUp 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .ab-val-card  { transition:all 0.35s ease; }
        .ab-val-card:hover  { transform:translateY(-8px); }
        .ab-team-card { transition:all 0.35s ease; }
        .ab-team-card:hover { transform:translateY(-8px) scale(1.02); }
        .ab-award     { transition:all 0.3s ease; }
        .ab-award:hover { transform:translateY(-4px); }
        .pattern-bg { background-image:radial-gradient(circle,rgba(200,150,62,0.06) 1px,transparent 1px); background-size:32px 32px; }
      `}</style>

      <Box sx={{ bgcolor:"background.default", color:"text.primary", minHeight:"100vh", overflowX:"hidden", position:"relative" }}>

        {/* ── Background orbs ── */}
        <Box sx={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
          <Box sx={{ position:"absolute", top:"-15%", right:"-8%",  width:700, height:700, background:"radial-gradient(circle,rgba(200,150,62,0.07) 0%,transparent 65%)", borderRadius:"50%" }}/>
          <Box sx={{ position:"absolute", bottom:"10%", left:"-12%", width:550, height:550, background:"radial-gradient(circle,rgba(155,107,181,0.06) 0%,transparent 65%)", borderRadius:"50%" }}/>
        </Box>

        {/* ════════════════════════════════════
            NAVBAR  ·  Logo left · Nav centre · CTA right
        ════════════════════════════════════ */}
        <AppBar position="fixed" elevation={0} sx={{
          bgcolor: scrolled ? alpha("#080608",0.92) : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? `1px solid ${alpha("#C8963E",0.12)}` : "none",
          transition:"all 0.5s ease", zIndex:100,
        }}>
          <Box sx={{ width:"100%", px:{ xs:2.5, md:6 } }}>
            <Toolbar disableGutters sx={{ minHeight:{ xs:64, md:72 }, position:"relative" }}>

              {/* Logo — left */}
              <Box sx={{ display:"flex", alignItems:"center", gap:1.5, flexShrink:0 }}>
                <EfourgeLogo size={40}/>
                <Box>
                  <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:700, fontSize:17, letterSpacing:"0.12em", color:"#F2EDE4", lineHeight:1 }}>EFOURGE</Typography>
                  <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:9, letterSpacing:"0.32em", color:"#C8963E", lineHeight:1, mt:"4px" }}>DIGITAL MARKETING</Typography>
                </Box>
              </Box>

              {/* Nav — absolutely centred */}
              <Box sx={{
                display:{ xs:"none", md:"flex" }, alignItems:"center", gap:0.5,
                position:"absolute", left:"50%", transform:"translateX(-50%)",
              }}>
                {navLinks.map((l) => (
                  <Button key={l} sx={{ color: l==="Home"?"primary.main":"text.secondary", fontSize:13, letterSpacing:"0.06em", px:1.5, "&:hover":{ color:"primary.light", bgcolor:"transparent" } }}>
                    {l}
                  </Button>
                ))}
              </Box>

              {/* Spacer */}
              <Box sx={{ flex:1 }}/>

              {/* CTA — right */}
              <Button variant="outlined" sx={{ display:{ xs:"none", md:"flex" }, borderColor:alpha("#C8963E",0.5), color:"primary.main", fontSize:13, py:1, px:3, flexShrink:0, "&:hover":{ borderColor:"primary.main", bgcolor:alpha("#C8963E",0.07) } }}>
                Get in Touch
              </Button>
              <IconButton sx={{ display:{ md:"none" }, color:"text.primary", ml:1 }}>
                <MenuIcon/>
              </IconButton>
            </Toolbar>
          </Box>
        </AppBar>

        {/* ════════════════════════════════════
            HERO  ·  Fully centred
        ════════════════════════════════════ */}
        <Box className="pattern-bg" sx={{ position:"relative", zIndex:1, pt:{ xs:16, md:20 }, pb:{ xs:10, md:14 }, borderBottom:`1px solid ${alpha("#C8963E",0.1)}` }}>
          <Container maxWidth="lg">

            {/* Eyebrow — centred */}
            <Box sx={{
              display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:6,
              opacity: heroVisible?1:0, transform: heroVisible?"none":"translateY(20px)", transition:"all 0.7s ease",
            }}>
              <Box sx={{ width:40, height:"1px", bgcolor:"primary.main", opacity:.7 }}/>
              <Typography sx={{ fontFamily:"'Jost',sans-serif", color:"primary.main", letterSpacing:"0.26em", fontSize:12, fontWeight:500 }}>OUR STORY</Typography>
              <Box sx={{ width:40, height:"1px", bgcolor:"primary.main", opacity:.7 }}/>
            </Box>

            <Grid container spacing={{ xs:6, md:10 }} alignItems="flex-start">

              {/* Left: big stacked headline */}
              <Grid item xs={12} md={5}>
                <Typography variant="h1" sx={{ fontSize:{ xs:"3.4rem", sm:"4.5rem", md:"5.5rem" }, lineHeight:1.0, letterSpacing:"-0.02em" }}>
                  {["We","Are","EFOURGE."].map((word, i) => (
                    <Box key={i} component="span" sx={{ display:"block" }}>
                      <span className="hero-word" style={{
                        animationDelay:`${0.1+i*0.15}s`,
                        ...(i===2 ? {
                          background:"linear-gradient(135deg,#C8963E 0%,#E0B86A 50%,#C8963E 100%)",
                          backgroundSize:"200% auto",
                          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                          animation: heroVisible ? `fadeUp 0.8s cubic-bezier(0.34,1.56,0.64,1) ${0.1+i*0.15}s forwards, shimmer 3s linear 1s infinite` : "none",
                        } : {
                          animation: heroVisible ? `fadeUp 0.8s cubic-bezier(0.34,1.56,0.64,1) ${0.1+i*0.15}s forwards` : "none",
                        }),
                      }}>
                        {word}
                      </span>
                    </Box>
                  ))}
                </Typography>
              </Grid>

              {/* Right: body copy */}
              <Grid item xs={12} md={7}>
                <Box sx={{ opacity: heroVisible?1:0, transform: heroVisible?"none":"translateY(30px)", transition:"all 0.9s ease 0.4s", pt:{ md:1 } }}>
                  <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontStyle:"italic", fontSize:{ xs:"1.5rem", md:"1.85rem" }, lineHeight:1.35, mb:2.5, background:"linear-gradient(135deg,#E0B86A 0%,#F5E4B8 50%,#C8963E 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-0.01em" }}>
                    Transforming Brands through digital experiences and innovation.
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight:400, fontStyle:"italic", color:"text.secondary", mb:3, lineHeight:1.6, fontSize:{ xs:"1.2rem", md:"1.4rem" } }}>
                    "Born from passion. Built on strategy. Driven by your success."
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight:2, mb:2.5, fontSize:15.5, fontWeight:300 }}>
                    EFOURGE is a full-service digital marketing agency dedicated to helping brands find their voice and amplify it across the digital world. We combine the art of storytelling with the science of data to create campaigns that convert, connect, and captivate.
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight:2, fontSize:15.5, fontWeight:300 }}>
                    Founded by <Box component="span" sx={{ color:"primary.light", fontWeight:500 }}>Priya Solanki</Box>, a visionary with 5 years of deep digital marketing expertise, EFOURGE has grown from a solo consultancy into a powerhouse agency trusted by 500+ brands across India and beyond.
                  </Typography>
                  <Box sx={{ display:"flex", gap:{ xs:4, md:6 }, mt:5, pt:4, borderTop:`1px solid ${alpha("#C8963E",0.15)}`, flexWrap:"wrap" }}>
                    {[["5+","Years"],["500+","Brands"],["98%","Retention"]].map(([val,lbl]) => (
                      <Box key={lbl}>
                        <Typography variant="h4" sx={{ color:"primary.main", fontWeight:700, lineHeight:1, fontSize:{ xs:"1.8rem", md:"2.2rem" } }}>{val}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", letterSpacing:"0.1em", fontSize:11 }}>{lbl}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            FOUNDER
        ════════════════════════════════════ */}
        <Box sx={{ position:"relative", zIndex:1, py:{ xs:12, md:18 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={{ xs:6, md:10 }} alignItems="center">

              {/* Founder card */}
              <Grid item xs={12} md={5}>
                <Box sx={{ display:"flex", justifyContent:"center", alignItems:"center", position:"relative", minHeight:{ xs:360, md:440 } }}>
                  {[380,320].map((sz,i) => (
                    <Box key={i} sx={{ position:"absolute", width:sz, height:sz, borderRadius:"50%", border:`1px dashed ${alpha("#C8963E",i===0?0.22:0.13)}`, top:"50%", left:"50%", animation:`rotateSlow ${i===0?25:18}s linear infinite ${i===1?"reverse":""}`, transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>
                  ))}
                  <Box sx={{ position:"relative", zIndex:2, width:260, height:320, borderRadius:"130px 130px 110px 110px", background:"linear-gradient(160deg,#1C1620 0%,#120F18 100%)", border:`1px solid ${alpha("#C8963E",0.3)}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", boxShadow:`0 40px 100px ${alpha("#C8963E",0.18)}, inset 0 1px 0 ${alpha("#C8963E",0.2)}`, overflow:"hidden", animation:"floatSlow 7s ease-in-out infinite" }}>
                    <Box sx={{ position:"absolute", top:0, left:0, right:0, height:"50%", background:`linear-gradient(180deg,${alpha("#C8963E",0.08)} 0%,transparent 100%)` }}/>
                    <Box sx={{ mb:2, zIndex:1 }}><EfourgeLogo size={68}/></Box>
                    <Typography variant="h5" sx={{ fontWeight:700, letterSpacing:"-0.01em", zIndex:1, textAlign:"center", px:2 }}>Priya Solanki</Typography>
                    <Typography variant="body2" sx={{ color:"primary.light", fontFamily:"'Jost',sans-serif", letterSpacing:"0.1em", fontSize:11, mt:.5, zIndex:1 }}>FOUNDER & CEO</Typography>
                    <Typography variant="caption" sx={{ color:alpha("#C8963E",0.55), fontFamily:"'Jost',sans-serif", letterSpacing:"0.12em", fontSize:9.5, mt:.4, zIndex:1, textAlign:"center", px:2 }}>EFOURGE Digital Marketing</Typography>
                    <Box sx={{ display:"flex", gap:1, mt:2.5, zIndex:1 }}>
                      {[{icon:<LinkedInIcon sx={{fontSize:16}}/>,color:"#0077B5"},{icon:<TwitterIcon sx={{fontSize:16}}/>,color:"#1DA1F2"},{icon:<InstagramIcon sx={{fontSize:16}}/>,color:"#E1306C"}].map(({icon,color},i)=>(
                        <IconButton key={i} size="small" sx={{ bgcolor:alpha(color,0.12), color, border:`1px solid ${alpha(color,0.25)}`, width:32, height:32, transition:"all .25s", "&:hover":{transform:"translateY(-3px)"} }}>{icon}</IconButton>
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ position:"absolute", bottom:{ xs:0, md:12 }, right:{ xs:"2%", md:"-2%" }, bgcolor:alpha("#100E14",0.95), border:`1px solid ${alpha("#C8963E",0.35)}`, borderRadius:"14px", px:2.5, py:1.5, backdropFilter:"blur(20px)", boxShadow:`0 16px 40px ${alpha("#000",0.4)}`, zIndex:3 }}>
                    <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                      <VerifiedIcon sx={{ color:"primary.main", fontSize:18 }}/>
                      <Box>
                        <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:600, color:"text.primary", fontSize:13, lineHeight:1 }}>5 Years</Typography>
                        <Typography sx={{ fontFamily:"'Jost',sans-serif", color:"text.secondary", fontSize:11 }}>of Expertise</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Founder copy */}
              <Grid item xs={12} md={7}>
                <SectionLabel text="MEET THE FOUNDER"/>
                <Typography variant="h2" sx={{ fontSize:{ xs:"2.4rem", md:"3.6rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mb:3.5, textAlign:{ xs:"center", md:"left" } }}>
                  The Mind Behind <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>EFOURGE</Box>
                </Typography>
                <Box sx={{ position:"relative", pl:3.5, mb:4, borderLeft:`3px solid ${alpha("#C8963E",0.5)}` }}>
                  <FormatQuoteIcon sx={{ color:"primary.main", opacity:0.35, fontSize:38, position:"absolute", top:-8, left:-2 }}/>
                  <Typography variant="h6" sx={{ fontStyle:"italic", color:"text.secondary", fontWeight:400, lineHeight:1.75, pl:1.5, fontSize:{ xs:"1.05rem", md:"1.2rem" } }}>
                    "I started EFOURGE because I saw too many great products failing simply because no one knew they existed. My mission is to make sure your brand is impossible to ignore."
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily:"'Jost',sans-serif", color:"primary.main", mt:1.5, pl:1.5, fontWeight:600 }}>— Priya Solanki</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight:2, mb:2.5, fontWeight:300, fontSize:15.5 }}>
                  With <strong style={{color:"#E0B86A"}}>5 years of hands-on digital marketing experience</strong>, Priya has built her expertise from the ground up — starting as a solo consultant helping local businesses get online, to leading a full-service agency that manages multi-crore campaigns across platforms.
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight:2, mb:4, fontWeight:300, fontSize:15.5 }}>
                  Priya specializes in brand strategy, performance marketing, and growth hacking across e-commerce, B2B, lifestyle, and tech sectors. She is passionate about <strong style={{color:"#E0B86A"}}>helping businesses of every size compete and win digitally</strong>.
                </Typography>
                <Box sx={{ display:"flex", flexWrap:"wrap", gap:1.2, mb:4.5, justifyContent:{ xs:"center", md:"flex-start" } }}>
                  {["Brand Strategy","Meta & Google Ads","SEO & Content","Growth Hacking","Email Marketing","Influencer Campaigns"].map((t)=>(
                    <Chip key={t} label={t} size="small" sx={{ bgcolor:alpha("#C8963E",0.08), color:"primary.light", border:`1px solid ${alpha("#C8963E",0.25)}`, fontFamily:"'Jost',sans-serif", fontSize:12, borderRadius:"4px" }}/>
                  ))}
                </Box>
                <Box sx={{ display:"flex", gap:2, flexWrap:"wrap", justifyContent:{ xs:"center", md:"flex-start" } }}>
                  <Button variant="contained" color="primary" endIcon={<ArrowForwardIcon/>} sx={{ py:1.6, px:4, bgcolor:"primary.main", color:"#080608", fontWeight:600, fontSize:14, boxShadow:`0 0 40px ${alpha("#C8963E",0.35)}`, "&:hover":{ bgcolor:"primary.light", boxShadow:`0 0 60px ${alpha("#C8963E",0.5)}`, transform:"translateY(-2px)" }, transition:"all 0.3s ease" }}>Work With EFOURGE</Button>
                  <Button variant="outlined" sx={{ py:1.6, px:4, borderColor:alpha("#C8963E",0.35), color:"primary.light", fontSize:14, "&:hover":{ borderColor:"primary.main", bgcolor:alpha("#C8963E",0.06) } }}>View Portfolio</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            SKILLS  ·  Centred heading
        ════════════════════════════════════ */}
        <Box ref={skillsRef} sx={{ position:"relative", zIndex:1, py:{ xs:12, md:16 }, bgcolor:alpha("#100E14",0.6), borderTop:`1px solid ${alpha("#C8963E",0.08)}`, borderBottom:`1px solid ${alpha("#C8963E",0.08)}` }}>
          <Container maxWidth="lg">
            {/* Centred section heading */}
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <SectionLabel text="CORE EXPERTISE"/>
              <Typography variant="h2" sx={{ fontSize:{ xs:"2.2rem", md:"3.2rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mt:1 }}>
                Mastery Across Every{" "}
                <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>Digital Channel</Box>
              </Typography>
              <Ornament/>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight:2, fontWeight:300, fontSize:15.5, maxWidth:560, mx:"auto" }}>
                Priya and the EFOURGE team bring proven expertise across every major digital marketing discipline — ensuring your brand thrives wherever your audience lives.
              </Typography>
            </Box>

            <Grid container spacing={{ xs:6, md:8 }} alignItems="center">
              {/* Certifications — left col */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display:"flex", flexDirection:"column", gap:2.5 }}>
                  {["Google Certified Partner","Meta Business Expert","HubSpot Certified"].map((cert)=>(
                    <Box key={cert} sx={{ display:"flex", alignItems:"center", gap:2, p:2.5, border:`1px solid ${alpha("#C8963E",0.12)}`, bgcolor:alpha("#100E14",0.5) }}>
                      <WorkspacePremiumIcon sx={{ color:"primary.main", fontSize:20, flexShrink:0 }}/>
                      <Typography variant="body2" sx={{ fontFamily:"'Jost',sans-serif", color:"text.secondary", fontSize:14 }}>{cert}</Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>
              {/* Skill bars — right col */}
              <Grid item xs={12} md={8}>
                <Box sx={{ pl:{ md:4 } }}>
                  {skills.map((s,i)=>(
                    <SkillBar key={s.label} {...s} delay={i*150} visible={skillsVisible}/>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            VALUES  ·  Centred heading + equal cards
        ════════════════════════════════════ */}
        <Box ref={valuesRef} sx={{ position:"relative", zIndex:1, py:{ xs:12, md:16 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <SectionLabel text="OUR PRINCIPLES"/>
              <Typography variant="h2" sx={{ fontSize:{ xs:"2.2rem", md:"3.4rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mt:1 }}>
                What We <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>Stand For</Box>
              </Typography>
              <Ornament/>
            </Box>
            <Grid container spacing={3} alignItems="stretch">
              {values.map((v,i)=>(
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display:"flex" }}>
                  <Card className="ab-val-card" sx={{ width:"100%", bgcolor:alpha("#100E14",0.7), border:`1px solid ${alpha(v.color,0.15)}`, borderRadius:2, backdropFilter:"blur(20px)", opacity:valuesVisible?1:0, transform:valuesVisible?"translateY(0)":"translateY(40px)", transition:`all 0.7s ease ${i*0.12}s`, cursor:"default", "&:hover":{ border:`1px solid ${alpha(v.color,0.45)}`, boxShadow:`0 24px 60px ${alpha(v.color,0.15)}` } }}>
                    <CardContent sx={{ p:4, textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", height:"100%" }}>
                      <Box sx={{ width:60, height:60, borderRadius:"50%", bgcolor:alpha(v.color,0.1), border:`1px solid ${alpha(v.color,0.25)}`, display:"flex", alignItems:"center", justifyContent:"center", color:v.color, mb:3, flexShrink:0 }}>{v.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight:600, mb:1.5, fontSize:"1.12rem", lineHeight:1.2 }}>{v.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", lineHeight:1.8, fontSize:13.5, fontWeight:300 }}>{v.desc}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            TIMELINE  ·  Centred heading + centred zigzag
        ════════════════════════════════════ */}
        <Box ref={timelineRef} sx={{ position:"relative", zIndex:1, py:{ xs:12, md:16 }, bgcolor:alpha("#100E14",0.5), borderTop:`1px solid ${alpha("#C8963E",0.08)}`, borderBottom:`1px solid ${alpha("#C8963E",0.08)}` }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <SectionLabel text="OUR JOURNEY"/>
              <Typography variant="h2" sx={{ fontSize:{ xs:"2.2rem", md:"3.4rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mt:1 }}>
                Five Years of <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>Forging Forward</Box>
              </Typography>
              <Ornament/>
            </Box>
            <Box sx={{ position:"relative", maxWidth:720, mx:"auto" }}>
              <Box sx={{ position:"absolute", left:{ xs:"24px", md:"50%" }, top:0, bottom:0, width:"1px", bgcolor:alpha("#C8963E",0.15), transform:{ md:"translateX(-50%)" } }}/>
              {milestones.map((m,i)=>{
                const isRight = i%2===0;
                return (
                  <Box key={i} sx={{
                    position:"relative", display:"flex",
                    justifyContent:{ xs:"flex-start", md:isRight?"flex-end":"flex-start" },
                    mb:i<milestones.length-1?5:0,
                    pl:{ xs:"56px", md:0 },
                    ...(isRight ? { pr:{ md:"calc(50% + 32px)" } } : { pl:{ xs:"56px", md:"calc(50% + 32px)" } }),
                    opacity:timelineVisible?1:0,
                    transform:timelineVisible?"none":`translateX(${isRight?28:-28}px)`,
                    transition:`all 0.7s ease ${i*0.15}s`,
                  }}>
                    <Box sx={{ position:"absolute", left:{ xs:"18px", md:"calc(50% - 7px)" }, top:10, width:14, height:14, borderRadius:"50%", bgcolor:"primary.main", boxShadow:`0 0 16px ${alpha("#C8963E",0.7)}`, zIndex:2 }}/>
                    <Box sx={{ width:{ xs:"100%", md:"auto" }, maxWidth:{ md:280 }, p:3, bgcolor:alpha("#100E14",0.85), border:`1px solid ${alpha("#C8963E",0.18)}`, borderRadius:2, backdropFilter:"blur(20px)" }}>
                      <Typography sx={{ fontFamily:"'Jost',sans-serif", color:"primary.main", fontWeight:600, letterSpacing:"0.1em", fontSize:12, mb:.6 }}>{m.year}</Typography>
                      <Typography variant="h6" sx={{ fontWeight:700, mb:1, fontSize:"1.05rem" }}>{m.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", lineHeight:1.75, fontSize:13.5, fontWeight:300 }}>{m.desc}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            TEAM  ·  Centred heading + equal cards
        ════════════════════════════════════ */}
        <Box sx={{ position:"relative", zIndex:1, py:{ xs:12, md:16 } }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign:"center", mb:{ xs:6, md:8 } }}>
              <SectionLabel text="THE TEAM"/>
              <Typography variant="h2" sx={{ fontSize:{ xs:"2.2rem", md:"3.4rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mt:1 }}>
                The People Who <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>Drive Results</Box>
              </Typography>
              <Ornament/>
            </Box>
            <Grid container spacing={3} alignItems="stretch">
              {team.map((m,i)=>(
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display:"flex" }}>
                  <Card className="ab-team-card" sx={{ width:"100%", bgcolor:alpha("#100E14",0.7), border:`1px solid ${alpha(m.color,0.18)}`, borderRadius:2, cursor:"default", backdropFilter:"blur(20px)", "&:hover":{ border:`1px solid ${alpha(m.color,0.5)}`, boxShadow:`0 28px 70px ${alpha(m.color,0.18)}` } }}>
                    <CardContent sx={{ p:4, display:"flex", flexDirection:"column", alignItems:"center", height:"100%" }}>
                      <Avatar sx={{ width:76, height:76, mb:2.5, background:`linear-gradient(135deg,${alpha(m.color,0.25)},${alpha(m.color,0.1)})`, border:`2px solid ${alpha(m.color,0.4)}`, color:m.color, fontFamily:"'Cormorant Garamond',serif", fontWeight:700, fontSize:22, boxShadow:`0 12px 30px ${alpha(m.color,0.25)}` }}>{m.initials}</Avatar>
                      <Typography variant="h6" sx={{ fontWeight:700, fontSize:"1.08rem", mb:.5, textAlign:"center" }}>{m.name}</Typography>
                      <Typography variant="body2" sx={{ color:m.color, fontFamily:"'Jost',sans-serif", fontSize:12, letterSpacing:"0.08em", fontWeight:500, mb:1.5, textAlign:"center" }}>{m.role}</Typography>
                      <Divider sx={{ borderColor:alpha(m.color,0.12), mb:1.5, width:"100%" }}/>
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", fontSize:12, textAlign:"center" }}>{m.speciality}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            AWARDS  ·  Centred heading + equal cards
        ════════════════════════════════════ */}
        <Box sx={{ position:"relative", zIndex:1, py:{ xs:8, md:10 }, bgcolor:alpha("#100E14",0.5), borderTop:`1px solid ${alpha("#C8963E",0.08)}`, borderBottom:`1px solid ${alpha("#C8963E",0.08)}` }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign:"center", mb:{ xs:5, md:7 } }}>
              <SectionLabel text="RECOGNITION"/>
              <Ornament/>
            </Box>
            <Grid container spacing={3} alignItems="stretch">
              {awards.map((a,i)=>(
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display:"flex" }}>
                  <Box className="ab-award" sx={{ width:"100%", p:3, borderRadius:2, border:`1px solid ${alpha("#C8963E",0.12)}`, display:"flex", alignItems:"flex-start", gap:2, bgcolor:alpha("#100E14",0.6), "&:hover":{ border:`1px solid ${alpha("#C8963E",0.35)}`, bgcolor:alpha("#C8963E",0.05) } }}>
                    <Box sx={{ color:"primary.main", mt:.3, flexShrink:0 }}>{a.icon}</Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight:600, fontSize:14, mb:.5, lineHeight:1.3 }}>{a.title}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", fontSize:12 }}>{a.org}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            CTA  ·  All centred
        ════════════════════════════════════ */}
        <Box sx={{ position:"relative", zIndex:1, py:{ xs:12, md:18 } }}>
          <Container maxWidth="md">
            <Box sx={{ textAlign:"center", p:{ xs:5, md:10 }, borderRadius:3, background:`linear-gradient(135deg,${alpha("#C8963E",0.08)} 0%,${alpha("#9B6BB5",0.05)} 100%)`, border:`1px solid ${alpha("#C8963E",0.2)}`, position:"relative", overflow:"hidden", "&::before":{ content:'""', position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 0%,${alpha("#C8963E",0.1)} 0%,transparent 60%)`, pointerEvents:"none" } }}>
              <SectionLabel text="READY TO BEGIN?"/>
              <Typography variant="h2" sx={{ fontSize:{ xs:"2.2rem", md:"3.6rem" }, lineHeight:1.1, letterSpacing:"-0.02em", mb:2.5, mt:1 }}>
                Let EFOURGE Help You <Box component="span" sx={{ fontStyle:"italic", color:"primary.light" }}>Market Smarter</Box>
              </Typography>
              <Ornament/>
              <Typography variant="body1" color="text.secondary" sx={{ mb:5, maxWidth:500, mx:"auto", lineHeight:2, fontWeight:300, fontSize:15.5 }}>
                Whether you're launching a new product, scaling an existing service, or rebuilding your digital presence — EFOURGE is ready to forge your path forward.
              </Typography>
              <Box sx={{ display:"flex", gap:{ xs:3, md:5 }, justifyContent:"center", flexWrap:"wrap", mb:5 }}>
                {[{icon:<EmailIcon sx={{fontSize:16}}/>,text:"hello@efourge.in"},{icon:<PhoneIcon sx={{fontSize:16}}/>,text:"+91 90435 61290"},{icon:<LocationOnIcon sx={{fontSize:16}}/>,text:"Udaipur, Rajasthan"}].map(({icon,text})=>(
                  <Box key={text} sx={{ display:"flex", alignItems:"center", gap:1, color:"text.secondary" }}>
                    <Box sx={{ color:"primary.main", flexShrink:0 }}>{icon}</Box>
                    <Typography variant="body2" sx={{ fontFamily:"'Jost',sans-serif", fontSize:14 }}>{text}</Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display:"flex", gap:2, justifyContent:"center", flexWrap:"wrap" }}>
                <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon/>} sx={{ py:2, px:6, bgcolor:"primary.main", color:"#080608", fontWeight:700, fontSize:15, letterSpacing:"0.06em", boxShadow:`0 0 50px ${alpha("#C8963E",0.4)}`, "&:hover":{ bgcolor:"primary.light", boxShadow:`0 0 70px ${alpha("#C8963E",0.6)}`, transform:"translateY(-2px)" }, transition:"all 0.3s ease" }}>Book a Free Strategy Call</Button>
                <Button variant="outlined" size="large" sx={{ py:2, px:6, borderColor:alpha("#C8963E",0.35), color:"primary.light", fontSize:15, letterSpacing:"0.06em", "&:hover":{ borderColor:"primary.main", bgcolor:alpha("#C8963E",0.07) } }}>View Our Work</Button>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            CLOSING QUOTE  ·  Centred, both ornaments present
        ════════════════════════════════════ */}
        <Box sx={{ position:"relative", zIndex:1, py:{ xs:8, md:10 }, textAlign:"center", borderTop:`1px solid ${alpha("#C8963E",0.08)}`, background:`linear-gradient(180deg,transparent 0%,${alpha("#C8963E",0.04)} 100%)` }}>
          <Container maxWidth="md">
            <Ornament/>
            <Typography sx={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontStyle:"italic", fontSize:{ xs:"1.55rem", sm:"1.9rem", md:"2.5rem" }, lineHeight:1.45, color:alpha("#F2EDE4",0.9), letterSpacing:"-0.01em" }}>
              We create amazing products that define user experience.
            </Typography>
            <Ornament/>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            FOOTER
        ════════════════════════════════════ */}
        <Box component="footer" sx={{ position:"relative", zIndex:1, py:5, borderTop:`1px solid ${alpha("#C8963E",0.1)}`, bgcolor:alpha("#080608",0.9) }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Box sx={{ display:"flex", alignItems:"center", gap:1.5, justifyContent:{ xs:"center", md:"flex-start" } }}>
                  <EfourgeLogo size={32}/>
                  <Box>
                    <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:700, letterSpacing:"0.12em", fontSize:15, color:"#F2EDE4", lineHeight:1 }}>EFOURGE</Typography>
                    <Typography sx={{ fontFamily:"'Jost',sans-serif", fontWeight:300, fontSize:9, letterSpacing:"0.28em", color:"#C8963E", lineHeight:1, mt:"3px" }}>DIGITAL MARKETING</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign:"center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", fontSize:13 }}>© 2025 EFOURGE. Founded by Priya Solanki.</Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign:{ xs:"center", md:"right" } }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontStyle:"italic" }}>Forging Digital Brands Since 2019.</Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
