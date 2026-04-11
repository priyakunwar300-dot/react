import { useState } from "react";
import { Box, Typography, TextField, Button, Grid, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/* ══════════════════════════════════════════════════════════
   FONTS + CSS
══════════════════════════════════════════════════════════ */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

    /* floating widget */
    .ef-fab { position:fixed; bottom:32px; right:32px; z-index:9999; display:flex; flex-direction:column; align-items:flex-end; gap:10px; }
    .ef-fab-btn { width:56px; height:56px; background:#1A1A2E; border:1.5px solid rgba(139,111,71,0.6); display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 8px 32px rgba(26,26,46,0.35); transition:all .3s; position:relative; }
    .ef-fab-btn:hover { background:#8B6F47; border-color:#8B6F47; transform:translateY(-3px); }
    .ef-fab-btn svg { width:22px; height:22px; fill:none; stroke:#F9F6F0; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
    .ef-fab-btn::before { content:''; position:absolute; inset:-6px; border:1px solid rgba(139,111,71,0.4); animation:efPulse 2.5s ease-in-out infinite; }
    @keyframes efPulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:0;transform:scale(1.18)} }
    .ef-fab-mini { display:flex; align-items:center; gap:10px; background:#1A1A2E; border:1px solid rgba(139,111,71,0.35); padding:8px 14px 8px 10px; cursor:pointer; text-decoration:none; opacity:0; transform:translateX(16px); animation:efSlide .35s ease forwards; }
    .ef-fab-mini:hover { background:#8B6F47; border-color:#8B6F47; }
    .ef-fab-mini svg { width:16px; height:16px; fill:none; stroke:#C9A84C; stroke-width:1.8; stroke-linecap:round; flex-shrink:0; }
    .ef-fab-mini span { font-family:'Lato',sans-serif; font-size:.68rem; font-weight:300; letter-spacing:.1em; color:#F9F6F0; white-space:nowrap; }
    @keyframes efSlide { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }

    /* info card hover */
    .ef-card:hover .ef-ico { background:#8B6F47 !important; border-color:#8B6F47 !important; }
    .ef-card:hover .ef-val  { color:#C9A84C !important; }
    .ef-card { transition:all .3s; }
    .ef-card:hover { transform:translateY(-5px) !important; border-color:rgba(201,168,76,0.4) !important; background:rgba(201,168,76,0.05) !important; }

    /* submit button fill-sweep */
    .ef-submit { position:relative; overflow:hidden; }
    .ef-submit::before { content:''; position:absolute; inset:0; background:#8B6F47; transform:translateX(-100%); transition:transform .4s ease; }
    .ef-submit:not(:disabled):hover::before { transform:translateX(0); }
    .ef-submit span { position:relative; z-index:1; }

    @keyframes efUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  `}</style>
);

/* ── MUI Theme ───────────────────────────────────────────── */
const theme = createTheme({
  palette: { mode:"light", primary:{ main:"#8B6F47" }, background:{ default:"#F9F6F0" } },
  typography: { fontFamily:"'Lato', sans-serif" },
  components: {
    MuiButton: { styleOverrides: { root:{ borderRadius:0, textTransform:"none" } } },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius:0,
            fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.88rem",
            "& fieldset":{ borderColor:"rgba(26,26,46,0.18)" },
            "&:hover fieldset":{ borderColor:"rgba(139,111,71,0.55)" },
            "&.Mui-focused fieldset":{ borderColor:"#8B6F47", borderWidth:"1px" },
          },
          "& .MuiInputLabel-root":{
            fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.8rem",
            letterSpacing:"0.08em", textTransform:"uppercase", color:"#7A7570",
            "&.Mui-focused":{ color:"#8B6F47" },
          },
          "& .MuiFormHelperText-root":{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.68rem", marginLeft:0 },
        },
      },
    },
  },
});

/* ══════════════════════════════════════════════════════════
   REUSABLE: Centred ornament divider
══════════════════════════════════════════════════════════ */
function Ornament({ opacity = 0.5, my = 2.5 }) {
  return (
    <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", my }}>
      <Box sx={{ height:"1px", width:36, background:"linear-gradient(90deg,transparent,#8B6F47)", opacity }} />
      <Box sx={{ width:5, height:5, border:"1px solid #8B6F47", transform:"rotate(45deg)", flexShrink:0, opacity }} />
      <Box sx={{ height:"1px", width:36, background:"linear-gradient(90deg,#8B6F47,transparent)", opacity }} />
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   REUSABLE: Section heading block — always centred
   eyebrow (with lines both sides) + headline + ornament + optional sub
══════════════════════════════════════════════════════════ */
function SectionHeading({ eyebrow, headline, accent, sub, dark = false }) {
  return (
    <Box sx={{ textAlign:"center", mb:{ xs:5, md:7 } }}>
      {/* Eyebrow row — lines + text + lines */}
      <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:2 }}>
        <Box sx={{ width:24, height:"1px", background: dark ? "rgba(139,111,71,0.6)" : "#8B6F47", opacity:.7 }} />
        <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.6rem", letterSpacing:"0.38em", textTransform:"uppercase", color:"#8B6F47", whiteSpace:"nowrap" }}>
          {eyebrow}
        </Typography>
        <Box sx={{ width:24, height:"1px", background: dark ? "rgba(139,111,71,0.6)" : "#8B6F47", opacity:.7 }} />
      </Box>

      {/* Headline */}
      <Typography sx={{
        fontFamily:"'Playfair Display',serif",
        fontStyle: headline.italic ? "italic" : "normal",
        fontWeight:400,
        fontSize:{ xs:"2rem", md:"2.8rem" },
        color: dark ? "#F9F6F0" : "#1A1A2E",
        lineHeight:1.1, letterSpacing:"-0.01em",
      }}>
        {headline.text}{" "}
        {accent && <Box component="em" sx={{ fontStyle:"italic", color:"#C9A84C" }}>{accent}</Box>}
      </Typography>

      <Ornament opacity={dark ? 0.45 : 0.38} />

      {sub && (
        <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.88rem", color: dark ? "rgba(249,246,240,0.45)" : "#7A7570", lineHeight:1.9, maxWidth:480, mx:"auto" }}>
          {sub}
        </Typography>
      )}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   SVG icons
══════════════════════════════════════════════════════════ */
const PhoneIcon = () => <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#C9A84C",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>;
const MailIcon  = () => <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#C9A84C",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PinIcon   = () => <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#C9A84C",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#C9A84C",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

/* ══════════════════════════════════════════════════════════
   SERVICE CHIPS — centred wrap
══════════════════════════════════════════════════════════ */
function ServiceChips() {
  const list = ["SEO", "Social Media", "Paid Ads", "Branding", "Web Design", "Analytics"];
  const [active, setActive] = useState([]);
  const toggle = (s) => setActive((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  return (
    <Box sx={{ display:"flex", flexWrap:"wrap", gap:1, justifyContent:"center" }}>
      {list.map((s) => {
        const on = active.includes(s);
        return (
          <Box
            key={s} onClick={() => toggle(s)}
            sx={{
              px:2, py:0.9,
              border:`1px solid ${on ? "#1A1A2E" : "rgba(139,111,71,0.28)"}`,
              background: on ? "#1A1A2E" : "transparent",
              cursor:"pointer", transition:"all .25s",
              "&:hover":{ borderColor: on ? "#1A1A2E" : "rgba(139,111,71,0.65)" },
            }}
          >
            <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.7rem", letterSpacing:"0.1em", color: on ? "#C9A84C" : "#7A7570", transition:"color .25s", userSelect:"none" }}>
              {s}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════════════════════ */
function ContactForm({ onSuccess }) {
  const [form, setForm]     = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const change = (f) => (ev) => {
    setForm((p) => ({ ...p, [f]: ev.target.value }));
    if (errors[f]) setErrors((p) => ({ ...p, [f]: "" }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1800);
  };

  const svcs = ["Brand Identity", "SEO & Content", "Social Media", "Paid Advertising", "Web Design", "Other"];

  return (
    <Box component="form" onSubmit={submit} noValidate>
      <Grid container spacing={2.5}>

        {/* Row 1 */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Full Name" value={form.name}
            onChange={change("name")} error={!!errors.name} helperText={errors.name}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Email Address" type="email" value={form.email}
            onChange={change("email")} error={!!errors.email} helperText={errors.email}/>
        </Grid>

        {/* Row 2 */}
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone Number" value={form.phone} onChange={change("phone")}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth select label="Service Needed"
            value={form.service} onChange={change("service")}
            SelectProps={{ native:true }} InputLabelProps={{ shrink:true }}
            sx={{ "& select":{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.88rem", paddingTop:"18px", paddingBottom:"16px", color: form.service?"#1A1A2E":"#9A9088" } }}
          >
            <option value="">Select a service…</option>
            {svcs.map((s) => <option key={s} value={s}>{s}</option>)}
          </TextField>
        </Grid>

        {/* Row 3 */}
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={5} label="Your Message"
            value={form.message} onChange={change("message")}
            error={!!errors.message} helperText={errors.message}
            sx={{ "& .MuiOutlinedInput-root":{ padding:0 }, "& .MuiInputBase-input":{ padding:"16px 14px !important" } }}
          />
        </Grid>

        {/* Submit */}
        <Grid item xs={12}>
          <Button type="submit" fullWidth disabled={loading} disableElevation
            className="ef-submit"
            sx={{
              background: loading ? "rgba(139,111,71,0.45)" : "#1A1A2E",
              color:"#F9F6F0",
              fontFamily:"'Lato',sans-serif", fontWeight:400,
              fontSize:"0.72rem", letterSpacing:"0.24em", textTransform:"uppercase",
              py:2, "&:disabled":{ color:"#F9F6F0" },
            }}
          >
            <span>{loading ? "Sending your message…" : "Send Message →"}</span>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   SUCCESS STATE
══════════════════════════════════════════════════════════ */
function SuccessState() {
  return (
    <Box sx={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:300, textAlign:"center", animation:"efUp .7s ease" }}>
      <Box sx={{ width:72, height:72, border:"1.5px solid #8B6F47", display:"flex", alignItems:"center", justifyContent:"center", mb:3, position:"relative", "&::before":{ content:'""', position:"absolute", inset:-10, border:"1px solid rgba(139,111,71,0.2)" } }}>
        <Typography sx={{ fontSize:"1.8rem", lineHeight:1 }}>✓</Typography>
      </Box>
      <Typography sx={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic", fontSize:"2rem", color:"#1A1A2E", mb:0.5 }}>
        Message Received!
      </Typography>
      <Ornament opacity={0.4} />
      <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.88rem", color:"#7A7570", lineHeight:2, maxWidth:300, mt:0.5 }}>
        Thank you for reaching out. Our team will be in touch within 24 hours.
      </Typography>
    </Box>
  );
}

/* ══════════════════════════════════════════════════════════
   FLOATING CHAT WIDGET
══════════════════════════════════════════════════════════ */
function FloatingWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ef-fab">
      {open && (
        <Box sx={{ display:"flex", flexDirection:"column", gap:1, alignItems:"flex-end" }}>
          {[
            { href:"tel:9043561290", label:"+91 90435 61290", svg:<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.04 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg> },
            { href:"mailto:efourge@gmail.com", label:"efourge@gmail.com", svg:<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
          ].map(({ href, label, svg }, i) => (
            <a key={i} href={href} className="ef-fab-mini" style={{ animationDelay:`${i * 0.07}s` }}>
              {svg}<span>{label}</span>
            </a>
          ))}
        </Box>
      )}
      <div className="ef-fab-btn" onClick={() => setOpen((p) => !p)} title="Contact">
        {open
          ? <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"none",stroke:"#F9F6F0",strokeWidth:2,strokeLinecap:"round"}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
      </div>
      {!open && (
        <Box sx={{ position:"absolute", top:-10, right:-6, background:"#8B6F47", px:1, py:0.2, pointerEvents:"none" }}>
          <Typography sx={{ fontFamily:"'Lato',sans-serif", fontSize:"0.5rem", fontWeight:700, letterSpacing:"0.12em", color:"#F9F6F0", textTransform:"uppercase" }}>Chat</Typography>
        </Box>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CONTACT — default export
══════════════════════════════════════════════════════════ */
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Styles />
      <FloatingWidget />

      <Box id="contact" sx={{ background:"#F9F6F0", display:"flex", flexDirection:"column" }}>

        {/* ════════════════════════════════════
            SECTION 1 — HERO (dark navy, centred)
        ════════════════════════════════════ */}
        <Box sx={{
          background: "#1A1A2E",
          py: { xs:10, md:14 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": { content:'""', position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(201,168,76,0.07) 1px,transparent 1px)", backgroundSize:"36px 36px" },
        }}>
          {/* Radial glow — always centred */}
          <Box sx={{ position:"absolute", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,111,71,0.12) 0%,transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>

          <Container maxWidth="sm" sx={{ position:"relative", zIndex:1 }}>

            {/* Eyebrow */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:2, mb:3 }}>
              <Box sx={{ width:28, height:"1px", background:"rgba(139,111,71,0.6)" }}/>
              <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.58rem", letterSpacing:"0.42em", textTransform:"uppercase", color:"#8B6F47", whiteSpace:"nowrap" }}>
                Efourge Digital Marketing Agency
              </Typography>
              <Box sx={{ width:28, height:"1px", background:"rgba(139,111,71,0.6)" }}/>
            </Box>

            {/* Headline */}
            <Typography sx={{ fontFamily:"'Playfair Display',serif", fontWeight:400, fontSize:{ xs:"2.4rem", sm:"3.4rem", md:"4.8rem" }, color:"#F9F6F0", lineHeight:1.05, letterSpacing:"-0.02em" }}>
              Let's Grow Your{" "}
              <Box component="em" sx={{ fontStyle:"italic", color:"#C9A84C" }}>Brand</Box>
            </Typography>

            <Ornament opacity={0.5} my={3} />

            {/* Sub copy */}
            <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:{ xs:"0.85rem", md:"0.92rem" }, color:"rgba(249,246,240,0.45)", letterSpacing:"0.06em", lineHeight:2 }}>
              Ready to transform your digital presence?<br/>
              Reach out — we respond within one business day.
            </Typography>

            {/* Quick contact pills */}
            <Box sx={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:{ xs:2, md:4 }, mt:5 }}>
              {[
                { ico:"📞", val:"+91 90435 61290" },
                { ico:"✉️", val:"efourge@gmail.com" },
                { ico:"📍", val:"Udaipur, Rajasthan" },
              ].map(({ ico, val }) => (
                <Box key={val} sx={{ display:"flex", alignItems:"center", gap:"8px" }}>
                  <Typography sx={{ fontSize:"0.95rem", lineHeight:1 }}>{ico}</Typography>
                  <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.8rem", color:"rgba(249,246,240,0.5)", letterSpacing:"0.03em" }}>
                    {val}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            SECTION 2 — CONTACT DETAILS (dark)
        ════════════════════════════════════ */}
        <Box sx={{ background:"#141428", py:{ xs:9, md:12 } }}>
          <Container maxWidth="lg">

            <SectionHeading
              eyebrow="Get In Touch"
              headline={{ text:"Our Contact" }}
              accent="Details"
              dark
            />

            {/* 4 equal-height info cards */}
            <Grid container spacing={3} alignItems="stretch">
              {[
                { icon:<PhoneIcon/>, label:"Phone",          value:"+91 90435 61290",              href:"tel:9043561290" },
                { icon:<MailIcon/>,  label:"Email",          value:"efourge@gmail.com",             href:"mailto:efourge@gmail.com" },
                { icon:<PinIcon/>,   label:"Office Address", value:"45, Shakti Nagar\nUdaipur, Rajasthan" },
                { icon:<ClockIcon/>, label:"Working Hours",  value:"Mon – Sat: 9 AM – 7 PM\nSunday: Closed" },
              ].map(({ icon, label, value, href }) => (
                <Grid item xs={12} sm={6} md={3} key={label} sx={{ display:"flex" }}>
                  <Box
                    component={href ? "a" : "div"}
                    href={href}
                    className="ef-card"
                    sx={{
                      width:"100%",
                      display:"flex", flexDirection:"column", alignItems:"center",
                      textAlign:"center", gap:"18px",
                      p:"28px 20px",
                      border:"1px solid rgba(201,168,76,0.14)",
                      background:"rgba(255,255,255,0.02)",
                      textDecoration:"none",
                    }}
                  >
                    {/* Icon square */}
                    <Box className="ef-ico" sx={{ width:54, height:54, flexShrink:0, border:"1px solid rgba(201,168,76,0.3)", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .3s" }}>
                      {icon}
                    </Box>

                    {/* Label + value */}
                    <Box>
                      <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.54rem", letterSpacing:"0.3em", textTransform:"uppercase", color:"#8B6F47", mb:"6px" }}>
                        {label}
                      </Typography>
                      <Typography className="ef-val" sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.88rem", color:"#F2EDE4", lineHeight:1.7, whiteSpace:"pre-line", transition:"color .3s" }}>
                        {value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Social row — centred */}
            <Box sx={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", mt:{ xs:6, md:8 } }}>
              <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.58rem", letterSpacing:"0.28em", textTransform:"uppercase", color:"#8B6F47", mr:1 }}>
                Follow Us
              </Typography>
              {["IG", "FB", "LI", "TW"].map((s) => (
                <Box key={s} sx={{ width:38, height:38, border:"1px solid rgba(201,168,76,0.22)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .3s", "&:hover":{ background:"#8B6F47", borderColor:"#8B6F47" } }}>
                  <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:400, fontSize:"0.52rem", color:"#C9A84C", letterSpacing:"0.04em" }}>{s}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            SECTION 3 — CONTACT FORM (light ivory)
        ════════════════════════════════════ */}
        <Box sx={{ background:"#FAF8F4", py:{ xs:9, md:13 } }}>
          <Container maxWidth="md">

            <SectionHeading
              eyebrow="Send A Message"
              headline={{ text:"We'd Love to", italic: true }}
              accent="Hear From You"
              sub="Tell us about your project and we'll get back to you within one business day."
            />

            {/* Service interest chips — centred */}
            <Box sx={{ textAlign:"center", mb:5 }}>
              <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.58rem", letterSpacing:"0.25em", textTransform:"uppercase", color:"#9A9088", mb:"14px" }}>
                I need help with
              </Typography>
              <ServiceChips />
            </Box>

            {/* Form card */}
            <Box sx={{ background:"#FFFFFF", border:"1px solid rgba(139,111,71,0.14)", p:{ xs:"28px 24px", sm:"40px", md:"52px" }, boxShadow:"0 4px 40px rgba(26,26,46,0.06)" }}>
              {!submitted
                ? <ContactForm onSuccess={() => setSubmitted(true)} />
                : <SuccessState />
              }
            </Box>
          </Container>
        </Box>

        {/* ════════════════════════════════════
            FOOTER STRIP
        ════════════════════════════════════ */}
        <Box sx={{
          background:"#0D0D1A",
          py:"18px",
          px:{ xs:3, md:6 },
          display:"flex",
          flexDirection:{ xs:"column", sm:"row" },
          justifyContent:"space-between",
          alignItems:"center",
          gap:2,
        }}>
          <Typography sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.65rem", color:"rgba(249,246,240,0.22)", letterSpacing:"0.1em", textAlign:{ xs:"center", sm:"left" } }}>
            © 2025 Efourge Digital Marketing Agency · Udaipur, Rajasthan
          </Typography>
          <Box sx={{ display:"flex", gap:3 }}>
            {["Privacy Policy", "Terms of Service"].map((t) => (
              <Typography key={t} sx={{ fontFamily:"'Lato',sans-serif", fontWeight:300, fontSize:"0.63rem", color:"rgba(249,246,240,0.22)", cursor:"pointer", transition:"color .3s", "&:hover":{ color:"#8B6F47" } }}>
                {t}
              </Typography>
            ))}
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}