import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";

// ─────────────────────────────────────────────
//  Navigation Links
// ─────────────────────────────────────────────
export const NAV_LINKS = [
  {
    id: 1,
    label: "Home",
    path: "/",
    icon: <HomeRoundedIcon fontSize="small" />,
    description: "Back to the main page",
  },
  {
    id: 2,
    label: "About",
    path: "/about",
    icon: <InfoRoundedIcon fontSize="small" />,
    description: "Learn more about us",
  },
  {
    id: 3,
    label: "Shop",
    path: "/shop",
    icon: <ShoppingBagRoundedIcon fontSize="small" />,
    description: "Browse our collection",
  },
  {
    id: 4,
    label: "Services",
    path: "/services",
    icon: <BuildRoundedIcon fontSize="small" />,
    description: "What we offer",
  },
  {
    id: 5,
    label: "Blog",
    path: "/blog",
    icon: <ArticleRoundedIcon fontSize="small" />,
    description: "Stories & updates",
  },
  {
    id: 6,
    label: "Contact",
    path: "/contact",
    icon: <ContactMailRoundedIcon fontSize="small" />,
    description: "Get in touch with us",
  },
];

// ─────────────────────────────────────────────
//  Hero Section Content
// ─────────────────────────────────────────────
export const HERO = {
  tagline: "Crafted with Passion",
  headline: "Elevate Your Experience",
  subheadline:
    "Discover a curated collection of premium products designed to inspire and delight.",
  cta: {
    primary: { label: "Shop Now", path: "/shop" },
    secondary: { label: "Learn More", path: "/about" },
  },
};

// ─────────────────────────────────────────────
//  Features / Why Choose Us
// ─────────────────────────────────────────────
export const FEATURES = [
  {
    id: 1,
    title: "Premium Quality",
    description:
      "Every product is hand-picked and quality-tested to meet the highest standards.",
    emoji: "✦",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "Get your orders delivered swiftly and safely right to your doorstep.",
    emoji: "⚡",
  },
  {
    id: 3,
    title: "24/7 Support",
    description:
      "Our dedicated team is always available to assist you at any time.",
    emoji: "💬",
  },
  {
    id: 4,
    title: "Easy Returns",
    description:
      "Hassle-free returns and refunds with no questions asked.",
    emoji: "↩",
  },
];

// ─────────────────────────────────────────────
//  Testimonials
// ─────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Fashion Designer",
    avatar: "PS",
    rating: 5,
    review:
      "Absolutely love the quality! The products exceeded my expectations. Will definitely shop again.",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    role: "Entrepreneur",
    avatar: "RM",
    rating: 5,
    review:
      "Fast delivery and exceptional customer service. This is my go-to store now!",
  },
  {
    id: 3,
    name: "Anjali Verma",
    role: "Lifestyle Blogger",
    avatar: "AV",
    rating: 4,
    review:
      "Beautiful packaging and premium feel. Highly recommended for anyone who values quality.",
  },
];

// ─────────────────────────────────────────────
//  Footer Links
// ─────────────────────────────────────────────
export const FOOTER_LINKS = {
  company: [
    { label: "About Us", path: "/about" },
    { label: "Careers", path: "/careers" },
    { label: "Press", path: "/press" },
    { label: "Blog", path: "/blog" },
  ],
  support: [
    { label: "Help Center", path: "/help" },
    { label: "Contact Us", path: "/contact" },
    { label: "Returns", path: "/returns" },
    { label: "Order Status", path: "/orders" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
  ],
};

// ─────────────────────────────────────────────
//  Social Links
// ─────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "Instagram", url: "https://instagram.com", icon: "instagram" },
  { label: "Twitter / X", url: "https://x.com", icon: "twitter" },
  { label: "Facebook", url: "https://facebook.com", icon: "facebook" },
  { label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
];

// ─────────────────────────────────────────────
//  Brand / Site Meta
// ─────────────────────────────────────────────
export const BRAND = {
  name: "eFourge",
  tagline: "Crafted for the bold.",
  email: "hello@efourge.com",
  phone: "+91 98765 43210",
  address: "Jaipur, Rajasthan, India",
  copyright: `© ${new Date().getFullYear()} eFourge. All rights reserved.`,
};