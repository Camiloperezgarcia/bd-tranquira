import { useState, useEffect, useRef } from "react";

const BRAND = "Tranquira";
const EMAIL = "soporte@tranquira.com";

const BG_HERO = "https://hypnozio.com/assets/glide/pages/home/female-meditates-with-headphones.jpg?w=1674&fm=jpg&q=80&s=72c314683516f6972aa421983a73ed79";
const BG_HERO_MOBILE = "https://hypnozio.com/assets/glide/pages/home/female-meditates-with-headphones-mobile.jpg?w=487&fm=jpg&q=90&s=ef997d4a9ad55b3ed11591114ad9d107";

const COURSES = [
  {
    id: 1,
    title: "Pérdida de Peso",
    sessions: 18,
    image: "https://hypnozio.com/assets/glide/courses/weight-loss2.png?h=244&w=487&fm=png&q=90&s=bfb3566ce48d8ac0197606a34bb641c5",
    color: "#1a5c4e",
    tag: "Más popular",
    desc: "Reprograma tu mente para adoptar hábitos saludables y alcanzar tu peso ideal de forma natural.",
  },
  {
    id: 2,
    title: "Alivio del Estrés",
    sessions: 20,
    image: "https://via.placeholder.com/487x244/2d7a6a/ffffff?text=Alivio+del+Estrés",
    color: "#2d6a8a",
    tag: "Nuevo",
    desc: "Libérate del estrés crónico y encuentra la paz interior con sesiones guiadas de relajación profunda.",
  },
  {
    id: 3,
    title: "Confianza Personal",
    sessions: 15,
    image: "https://via.placeholder.com/487x244/5a3d7a/ffffff?text=Confianza+Personal",
    color: "#5a3d7a",
    tag: "",
    desc: "Desarrolla una autoestima sólida y actúa con seguridad en todas las áreas de tu vida.",
  },
  {
    id: 4,
    title: "Sueño Profundo",
    sessions: 12,
    image: "https://via.placeholder.com/487x244/1a3a5c/ffffff?text=Sueño+Profundo",
    color: "#1a3a5c",
    tag: "",
    desc: "Combate el insomnio y disfruta de noches de sueño reparador que renuevan cuerpo y mente.",
  },
  {
    id: 5,
    title: "Dejar de Fumar",
    sessions: 10,
    image: "https://via.placeholder.com/487x244/3d5a2a/ffffff?text=Dejar+de+Fumar",
    color: "#3d5a2a",
    tag: "",
    desc: "Elimina la dependencia al tabaco atacando las raíces emocionales del hábito directamente.",
  },
  {
    id: 6,
    title: "Ansiedad & Fobias",
    sessions: 22,
    image: "https://via.placeholder.com/487x244/7a3d3d/ffffff?text=Ansiedad+%26+Fobias",
    color: "#7a3d3d",
    tag: "",
    desc: "Supera tus miedos y vive con libertad reprogramando las respuestas automáticas de tu mente.",
  },
];

const BENEFITS = [
  { icon: "🧠", title: "100+ Sesiones", desc: "Más de cien sesiones de hipnoterapia de alta calidad para transformar tu subconsciente." },
  { icon: "🎯", title: "6 Cursos Especializados", desc: "Programas enfocados en las áreas más importantes de salud y bienestar personal." },
  { icon: "🎧", title: "Acceso 24/7", desc: "Escucha tus sesiones en cualquier momento y lugar, a tu propio ritmo." },
  { icon: "🌿", title: "Basado en Ciencia", desc: "Metodología respaldada por expertos en hipnoterapia clínica y neurociencia." },
];

const TESTIMONIALS = [
  {
    name: "María González",
    avatar: "MG",
    color: "#003C31",
    stars: 5,
    text: "Después de años batallando con el insomnio, el curso de Sueño Profundo cambió mi vida completamente. En 3 semanas dormía como nunca antes.",
    course: "Sueño Profundo",
  },
  {
    name: "Carlos Martínez",
    avatar: "CM",
    color: "#2d6a8a",
    stars: 5,
    text: "Bajé 12 kilos en 4 meses sin dietas estrictas. Tranquira me ayudó a cambiar mi relación con la comida desde adentro.",
    course: "Pérdida de Peso",
  },
  {
    name: "Ana López",
    avatar: "AL",
    color: "#5a3d7a",
    stars: 5,
    text: "Llevaba 15 años fumando. Con el programa de Tranquira lo dejé en 6 semanas. No puedo creerlo todavía.",
    course: "Dejar de Fumar",
  },
];

const PLANS = [
  {
    name: "Mensual",
    price: "€19.99",
    period: "/mes",
    features: ["Acceso a 1 curso", "15 sesiones incluidas", "Soporte por email", "App móvil"],
    highlight: false,
    cta: "Empezar ahora",
  },
  {
    name: "Anual",
    price: "€9.99",
    period: "/mes",
    yearly: "€119.88/año",
    badge: "Ahorra 50%",
    features: ["Acceso a todos los cursos", "100+ sesiones", "Soporte prioritario", "App móvil", "Nuevos cursos incluidos"],
    highlight: true,
    cta: "Obtener acceso total",
  },
  {
    name: "Lifetime",
    price: "€299",
    period: "pago único",
    features: ["Acceso de por vida", "Todos los cursos futuros", "Soporte VIP", "App móvil", "Sesiones personalizadas"],
    highlight: false,
    cta: "Acceso permanente",
  },
];

const NAV_LINKS = [
  { label: "Cursos", href: "#cursos" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Precios", href: "#precios" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: "16px" }}>★</span>
      ))}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePlan, setActivePlan] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrar con servicio de email marketing (Mailchimp, etc.)
    if (email) setSubmitted(true);
  };

  const styles = {
    root: {
      fontFamily: "'Poppins', 'Segoe UI', sans-serif",
      background: "#f7f6f2",
      color: "#1B1B1F",
      overflowX: "hidden",
    },
    // NAV
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: "background 0.4s ease, box-shadow 0.4s ease",
      background: scrolled ? "rgba(0,60,49,0.97)" : "transparent",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.18)" : "none",
    },
    navInner: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      color: "#fff",
      fontSize: "22px",
      fontWeight: "700",
      letterSpacing: "-0.5px",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoLeaf: {
      width: "28px",
      height: "28px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "32px",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navLink: {
      color: "rgba(255,255,255,0.85)",
      textDecoration: "none",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    ctaBtn: {
      background: "linear-gradient(135deg, #00c896, #009e77)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "10px 22px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
    },
    hamburger: {
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: "4px",
      display: "flex",
      alignItems: "center",
    },
    // MOBILE MENU
    mobileOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 200,
      opacity: menuOpen ? 1 : 0,
      pointerEvents: menuOpen ? "auto" : "none",
      transition: "opacity 0.3s",
    },
    mobileMenu: {
      position: "fixed",
      top: 0,
      right: 0,
      width: "280px",
      height: "100vh",
      background: "#fff",
      borderRadius: "40px 0 0 40px",
      zIndex: 201,
      transform: menuOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      overflowY: "auto",
    },
    mobileMenuClose: {
      background: "none",
      border: "none",
      cursor: "pointer",
      alignSelf: "flex-end",
      color: "#1B1B1F",
      fontSize: "28px",
      lineHeight: 1,
      padding: "4px",
    },
    mobileNavLink: {
      color: "#1B1B1F",
      textDecoration: "none",
      fontSize: "18px",
      fontWeight: "600",
      padding: "12px 0",
      borderBottom: "1px solid #f0f0f0",
      cursor: "pointer",
      display: "block",
    },
    // HERO
    hero: {
      position: "relative",
      minHeight: "100vh",
      backgroundImage: `url('${BG_HERO}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
    },
    heroGradient: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to right, rgba(0,60,49,0.85) 0%, rgba(0,60,49,0.55) 55%, rgba(0,0,0,0.1) 100%)",
    },
    heroContent: {
      position: "relative",
      zIndex: 2,
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "120px 24px 80px",
      maxWidth: "620px",
      marginLeft: "max(24px, calc((100vw - 1200px)/2))",
    },
    heroBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: "50px",
      padding: "6px 16px",
      color: "#fff",
      fontSize: "13px",
      fontWeight: "500",
      marginBottom: "20px",
    },
    heroTitle: {
      fontSize: "clamp(32px, 5vw, 58px)",
      fontWeight: "700",
      color: "#fff",
      lineHeight: 1.15,
      marginBottom: "20px",
      letterSpacing: "-1px",
    },
    heroTitleAccent: {
      color: "#00e6a8",
    },
    heroDesc: {
      fontSize: "clamp(15px, 2vw, 18px)",
      color: "rgba(255,255,255,0.85)",
      lineHeight: 1.7,
      marginBottom: "36px",
      maxWidth: "500px",
    },
    heroActions: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      alignItems: "center",
    },
    heroPrimaryBtn: {
      background: "linear-gradient(135deg, #00c896, #009e77)",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "14px 32px",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s",
      boxShadow: "0 4px 20px rgba(0,200,150,0.4)",
      textDecoration: "none",
      display: "inline-block",
    },
    heroSecondaryBtn: {
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      border: "2px solid rgba(255,255,255,0.4)",
      borderRadius: "50px",
      padding: "12px 28px",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
    heroStats: {
      display: "flex",
      gap: "32px",
      marginTop: "48px",
      flexWrap: "wrap",
    },
    heroStat: {
      display: "flex",
      flexDirection: "column",
    },
    heroStatNum: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#00e6a8",
      lineHeight: 1,
    },
    heroStatLabel: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.7)",
      marginTop: "4px",
    },
    // SECTION
    section: {
      padding: "80px 24px",
    },
    sectionInner: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    sectionTag: {
      display: "inline-block",
      background: "rgba(0,200,150,0.12)",
      color: "#009e77",
      borderRadius: "50px",
      padding: "5px 14px",
      fontSize: "13px",
      fontWeight: "600",
      letterSpacing: "0.5px",
      marginBottom: "12px",
      textTransform: "uppercase",
    },
    sectionTitle: {
      fontSize: "clamp(24px, 3.5vw, 40px)",
      fontWeight: "700",
      color: "#003C31",
      lineHeight: 1.2,
      marginBottom: "12px",
      letterSpacing: "-0.5px",
    },
    sectionSubtitle: {
      fontSize: "clamp(14px, 1.8vw, 17px)",
      color: "#555",
      lineHeight: 1.7,
      maxWidth: "600px",
      marginBottom: "48px",
    },
    // BENEFITS
    benefitsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "24px",
    },
    benefitCard: {
      background: "#fff",
      borderRadius: "20px",
      padding: "28px 24px",
      boxShadow: "0 2px 16px rgba(0,60,49,0.07)",
      transition: "transform 0.25s, box-shadow 0.25s",
      border: "1px solid rgba(0,60,49,0.06)",
    },
    benefitIcon: {
      fontSize: "36px",
      marginBottom: "16px",
      display: "block",
    },
    benefitTitle: {
      fontSize: "17px",
      fontWeight: "700",
      color: "#003C31",
      marginBottom: "8px",
    },
    benefitDesc: {
      fontSize: "14px",
      color: "#666",
      lineHeight: 1.6,
    },
    // COURSES
    coursesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    courseCard: {
      borderRadius: "20px",
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
      cursor: "pointer",
      transition: "transform 0.3s, box-shadow 0.3s",
      display: "flex",
      flexDirection: "column",
    },
    courseImgWrap: {
      position: "relative",
      height: "200px",
      overflow: "hidden",
    },
    courseImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.4s",
    },
    courseTag: {
      position: "absolute",
      top: "12px",
      left: "12px",
      background: "linear-gradient(135deg, #00c896, #009e77)",
      color: "#fff",
      borderRadius: "50px",
      padding: "3px 12px",
      fontSize: "12px",
      fontWeight: "600",
    },
    courseBody: {
      padding: "20px",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    courseTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#003C31",
      marginBottom: "8px",
    },
    courseDesc: {
      fontSize: "14px",
      color: "#666",
      lineHeight: 1.6,
      flex: 1,
      marginBottom: "16px",
    },
    courseMeta: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    courseSessions: {
      fontSize: "13px",
      color: "#009e77",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    courseBtn: {
      background: "rgba(0,158,119,0.1)",
      color: "#009e77",
      border: "none",
      borderRadius: "50px",
      padding: "7px 16px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    // TESTIMONIALS
    testimonialsSection: {
      background: "linear-gradient(135deg, #003C31 0%, #005c4a 100%)",
      padding: "80px 24px",
    },
    testimonialCard: {
      background: "rgba(255,255,255,0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "24px",
      padding: "32px",
      maxWidth: "680px",
      margin: "0 auto",
    },
    testimonialText: {
      fontSize: "clamp(15px, 2vw, 18px)",
      color: "rgba(255,255,255,0.9)",
      lineHeight: 1.8,
      fontStyle: "italic",
      marginBottom: "24px",
    },
    testimonialAuthor: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
    },
    testimonialAvatar: {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "700",
      fontSize: "16px",
      flexShrink: 0,
    },
    testimonialName: {
      color: "#fff",
      fontWeight: "700",
      fontSize: "15px",
    },
    testimonialCourse: {
      color: "rgba(255,255,255,0.6)",
      fontSize: "13px",
      marginTop: "2px",
    },
    testimonialDots: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginTop: "32px",
    },
    // PRICING
    pricingGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "24px",
      maxWidth: "960px",
      margin: "0 auto",
    },
    planCard: (highlight) => ({
      background: highlight ? "linear-gradient(135deg, #003C31, #005c4a)" : "#fff",
      color: highlight ? "#fff" : "#1B1B1F",
      borderRadius: "24px",
      padding: "32px 28px",
      boxShadow: highlight ? "0 8px 40px rgba(0,60,49,0.35)" : "0 2px 16px rgba(0,0,0,0.07)",
      border: highlight ? "none" : "1px solid rgba(0,60,49,0.1)",
      position: "relative",
      transform: highlight ? "scale(1.05)" : "scale(1)",
      transition: "transform 0.3s, box-shadow 0.3s",
      display: "flex",
      flexDirection: "column",
    }),
    planBadge: {
      position: "absolute",
      top: "-12px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, #00c896, #009e77)",
      color: "#fff",
      borderRadius: "50px",
      padding: "4px 16px",
      fontSize: "12px",
      fontWeight: "700",
      whiteSpace: "nowrap",
    },
    planName: (highlight) => ({
      fontSize: "16px",
      fontWeight: "600",
      color: highlight ? "rgba(255,255,255,0.7)" : "#666",
      marginBottom: "12px",
      textTransform: "uppercase",
      letterSpacing: "1px",
    }),
    planPrice: (highlight) => ({
      fontSize: "42px",
      fontWeight: "700",
      color: highlight ? "#00e6a8" : "#003C31",
      lineHeight: 1,
    }),
    planPeriod: (highlight) => ({
      fontSize: "15px",
      color: highlight ? "rgba(255,255,255,0.6)" : "#888",
      marginBottom: "24px",
    }),
    planFeatures: {
      listStyle: "none",
      padding: 0,
      margin: "0 0 28px",
      flex: 1,
    },
    planFeature: (highlight) => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "8px 0",
      borderBottom: `1px solid ${highlight ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
      fontSize: "14px",
      color: highlight ? "rgba(255,255,255,0.85)" : "#444",
    }),
    planCheckIcon: (highlight) => ({
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: highlight ? "rgba(0,230,168,0.2)" : "rgba(0,158,119,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: highlight ? "#00e6a8" : "#009e77",
      fontSize: "12px",
    }),
    planBtn: (highlight) => ({
      background: highlight ? "linear-gradient(135deg, #00c896, #009e77)" : "transparent",
      color: highlight ? "#fff" : "#009e77",
      border: highlight ? "none" : "2px solid #009e77",
      borderRadius: "50px",
      padding: "13px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
      width: "100%",
      boxShadow: highlight ? "0 4px 16px rgba(0,200,150,0.35)" : "none",
    }),
    // HOW IT WORKS
    howSection: {
      background: "#fff",
      padding: "80px 24px",
    },
    stepsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "32px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    stepItem: {
      textAlign: "center",
    },
    stepNum: {
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #003C31, #009e77)",
      color: "#fff",
      fontSize: "22px",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      boxShadow: "0 4px 16px rgba(0,60,49,0.3)",
    },
    stepTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#003C31",
      marginBottom: "8px",
    },
    stepDesc: {
      fontSize: "14px",
      color: "#666",
      lineHeight: 1.6,
    },
    // CTA BANNER
    ctaBanner: {
      background: "linear-gradient(135deg, #00c896 0%, #003C31 100%)",
      padding: "72px 24px",
      textAlign: "center",
    },
    ctaBannerTitle: {
      fontSize: "clamp(24px, 3.5vw, 42px)",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "16px",
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
    },
    ctaBannerDesc: {
      fontSize: "clamp(14px, 1.8vw, 18px)",
      color: "rgba(255,255,255,0.85)",
      marginBottom: "36px",
      maxWidth: "560px",
      margin: "0 auto 36px",
      lineHeight: 1.7,
    },
    emailForm: {
      display: "flex",
      maxWidth: "480px",
      margin: "0 auto",
      gap: "8px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    emailInput: {
      flex: 1,
      minWidth: "220px",
      padding: "14px 20px",
      borderRadius: "50px",
      border: "none",
      fontSize: "15px",
      outline: "none",
      background: "rgba(255,255,255,0.95)",
      color: "#1B1B1F",
    },
    emailBtn: {
      background: "#003C31",
      color: "#fff",
      border: "none",
      borderRadius: "50px",
      padding: "14px 28px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "background 0.2s",
      whiteSpace: "nowrap",
    },
    // FOOTER
    footer: {
      background: "#0a1a15",
      padding: "60px 24px 32px",
      color: "rgba(255,255,255,0.7)",
    },
    footerInner: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    footerTop: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "48px",
    },
    footerLogo: {
      fontSize: "22px",
      fontWeight: "700",
      color: "#fff",
      marginBottom: "12px",
      display: "block",
    },
    footerTagline: {
      fontSize: "14px",
      lineHeight: 1.6,
      marginBottom: "20px",
    },
    footerHeading: {
      color: "#fff",
      fontWeight: "700",
      fontSize: "15px",
      marginBottom: "16px",
    },
    footerLink: {
      display: "block",
      color: "rgba(255,255,255,0.6)",
      textDecoration: "none",
      fontSize: "14px",
      padding: "4px 0",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    footerBottom: {
      borderTop: "1px solid rgba(255,255,255,0.08)",
      paddingTop: "24px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      fontSize: "13px",
    },
  };

  return (
    <div style={styles.root}>
      {/* ─── NAV ─── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {/* Logo */}
          <a href="#" style={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <span style={styles.logoLeaf}>🌿</span>
            {BRAND}
          </a>

          {/* Desktop nav */}
          <ul style={{ ...styles.navLinks, display: "flex" }} className="desktop-nav">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <span
                  style={styles.navLink}
                  onClick={() => handleNavClick(l.href)}
                  onMouseEnter={(e) => (e.target.style.color = "#00e6a8")}
                  onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.85)")}
                >
                  {l.label}
                </span>
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Desktop CTA */}
            <a
              href="#precios"
              style={styles.ctaBtn}
              onClick={(e) => { e.preventDefault(); handleNavClick("#precios"); }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,200,150,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              Comenzar gratis
            </a>

            {/* Hamburger */}
            <button
              style={{ ...styles.hamburger, display: "none" }}
              className="hamburger-btn"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE MENU ─── */}
      <div style={styles.mobileOverlay} onClick={() => setMenuOpen(false)} />
      <div style={styles.mobileMenu}>
        <button style={styles.mobileMenuClose} onClick={() => setMenuOpen(false)}>×</button>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "20px" }}>🌿</span>
          <span style={{ fontSize: "20px", fontWeight: "700", color: "#003C31" }}>{BRAND}</span>
        </div>
        <div>
          {NAV_LINKS.map((l) => (
            <span
              key={l.href}
              style={styles.mobileNavLink}
              onClick={() => handleNavClick(l.href)}
            >
              {l.label}
            </span>
          ))}
        </div>
        <div style={{ marginTop: "auto", paddingTop: "16px" }}>
          <button
            style={{ ...styles.heroPrimaryBtn, width: "100%", textAlign: "center", border: "none", display: "block" }}
            onClick={() => handleNavClick("#precios")}
          >
            Comenzar gratis 🚀
          </button>
          <div style={{ marginTop: "20px", fontSize: "13px", color: "#888", textAlign: "center" }}>
            ¿Preguntas? <a href={`mailto:${EMAIL}`} style={{ color: "#009e77", textDecoration: "none" }}>{EMAIL}</a>
          </div>
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section style={styles.hero}>
        <div style={styles.heroGradient} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <span>✨</span>
            <span>Hipnoterapia guiada por expertos</span>
          </div>
          <h1 style={styles.heroTitle}>
            Reconecta con tu <span style={styles.heroTitleAccent}>mente</span> y transforma tu vida
          </h1>
          <p style={styles.heroDesc}>
            6 cursos de hipnoterapia enfocados en salud y bienestar. Más de 100 sesiones para reprogramar tu subconsciente y liberar todo tu potencial.
          </p>
          <div style={styles.heroActions}>
            <a
              href="#cursos"
              style={styles.heroPrimaryBtn}
              onClick={(e) => { e.preventDefault(); handleNavClick("#cursos"); }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,200,150,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,200,150,0.4)"; }}
            >
              Explorar cursos
            </a>
            <a
              href="#como-funciona"
              style={styles.heroSecondaryBtn}
              onClick={(e) => { e.preventDefault(); handleNavClick("#como-funciona"); }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Ver demo
            </a>
          </div>
          <div style={styles.heroStats}>
            {[["100+", "Sesiones de audio"], ["6", "Cursos especializados"], ["50k+", "Usuarios activos"], ["4.9★", "Valoración media"]].map(([num, label]) => (
              <div key={label} style={styles.heroStat}>
                <span style={styles.heroStatNum}>{num}</span>
                <span style={styles.heroStatLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="beneficios" style={{ ...styles.section, background: "#f7f6f2" }}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={styles.sectionTag}>Por qué elegir Tranquira</span>
              <h2 style={styles.sectionTitle}>Tu bienestar, respaldado por la ciencia</h2>
              <p style={{ ...styles.sectionSubtitle, margin: "0 auto" }}>
                Nuestra metodología combina hipnoterapia clínica con las últimas investigaciones en neurociencia para resultados reales y duraderos.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={styles.benefitsGrid}>
              {BENEFITS.map((b, i) => (
                <div
                  key={i}
                  style={styles.benefitCard}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,60,49,0.13)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,60,49,0.07)"; }}
                >
                  <span style={styles.benefitIcon}>{b.icon}</span>
                  <div style={styles.benefitTitle}>{b.title}</div>
                  <div style={styles.benefitDesc}>{b.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── COURSES ─── */}
      <section id="cursos" style={{ ...styles.section, background: "#fff" }}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={styles.sectionTag}>Nuestros programas</span>
              <h2 style={styles.sectionTitle}>6 cursos que cambian vidas</h2>
              <p style={{ ...styles.sectionSubtitle, margin: "0 auto" }}>
                Cada curso está diseñado por hipnoterapeutas expertos con sesiones progresivas que profundizan en tu subconsciente.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={styles.coursesGrid}>
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  style={{
                    ...styles.courseCard,
                    transform: hoveredCourse === course.id ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: hoveredCourse === course.id ? "0 16px 40px rgba(0,0,0,0.14)" : "0 2px 20px rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <div style={styles.courseImgWrap}>
                    <img
                      src={course.image}
                      alt={course.title}
                      style={{
                        ...styles.courseImg,
                        transform: hoveredCourse === course.id ? "scale(1.06)" : "scale(1)",
                      }}
                      loading="lazy"
                    />
                    {course.tag && <span style={styles.courseTag}>{course.tag}</span>}
                  </div>
                  <div style={styles.courseBody}>
                    <h3 style={styles.courseTitle}>{course.title}</h3>
                    <p style={styles.courseDesc}>{course.desc}</p>
                    <div style={styles.courseMeta}>
                      <span style={styles.courseSessions}>
                        🎧 {course.sessions} sesiones
                      </span>
                      <button
                        style={styles.courseBtn}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,158,119,0.2)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,158,119,0.1)")}
                        // TODO: Navegar a la página detalle del curso
                      >
                        Ver curso →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="como-funciona" style={styles.howSection}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <span style={styles.sectionTag}>¿Cómo funciona?</span>
              <h2 style={styles.sectionTitle}>Empieza tu transformación en 3 pasos</h2>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={styles.stepsGrid}>
              {[
                { n: "1", title: "Elige tu curso", desc: "Selecciona el área de tu vida que quieres transformar entre nuestros 6 programas especializados." },
                { n: "2", title: "Escucha diariamente", desc: "Dedica 20-30 minutos al día a tus sesiones de hipnoterapia. Puedes hacerlo en cualquier lugar." },
                { n: "3", title: "Observa los cambios", desc: "En pocas semanas notarás cambios profundos en tus pensamientos, hábitos y bienestar general." },
              ].map((step) => (
                <div key={step.n} style={styles.stepItem}>
                  <div style={styles.stepNum}>{step.n}</div>
                  <div style={styles.stepTitle}>{step.title}</div>
                  <div style={styles.stepDesc}>{step.desc}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonios" style={styles.testimonialsSection}>
        <div style={{ ...styles.sectionInner, textAlign: "center" }}>
          <AnimatedSection>
            <span style={{ ...styles.sectionTag, background: "rgba(255,255,255,0.15)", color: "#00e6a8" }}>
              Historias reales
            </span>
            <h2 style={{ ...styles.sectionTitle, color: "#fff", marginBottom: "40px" }}>
              Lo que dicen nuestros usuarios
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div style={styles.testimonialCard}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                <StarRating count={TESTIMONIALS[activeTestimonial].stars} />
              </div>
              <p style={styles.testimonialText}>"{TESTIMONIALS[activeTestimonial].text}"</p>
              <div style={{ ...styles.testimonialAuthor, justifyContent: "center" }}>
                <div style={{ ...styles.testimonialAvatar, background: TESTIMONIALS[activeTestimonial].color }}>
                  {TESTIMONIALS[activeTestimonial].avatar}
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={styles.testimonialName}>{TESTIMONIALS[activeTestimonial].name}</div>
                  <div style={styles.testimonialCourse}>Curso: {TESTIMONIALS[activeTestimonial].course}</div>
                </div>
              </div>
            </div>
            <div style={styles.testimonialDots}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? "28px" : "10px",
                    height: "10px",
                    borderRadius: "5px",
                    background: i === activeTestimonial ? "#00e6a8" : "rgba(255,255,255,0.35)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s",
                    padding: 0,
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="precios" style={{ ...styles.section, background: "#f7f6f2" }}>
        <div style={styles.sectionInner}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: "60px" }}>
              <span style={styles.sectionTag}>Planes y precios</span>
              <h2 style={styles.sectionTitle}>Invierte en tu bienestar</h2>
              <p style={{ ...styles.sectionSubtitle, margin: "0 auto" }}>
                Sin compromisos. Cancela cuando quieras. Garantía de satisfacción de 30 días.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div style={styles.pricingGrid}>
              {PLANS.map((plan, i) => (
                <div key={i} style={styles.planCard(plan.highlight)}>
                  {plan.badge && <div style={styles.planBadge}>{plan.badge}</div>}
                  <div style={styles.planName(plan.highlight)}>{plan.name}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "4px" }}>
                    <span style={styles.planPrice(plan.highlight)}>{plan.price}</span>
                    <span style={styles.planPeriod(plan.highlight)}>{plan.period}</span>
                  </div>
                  {plan.yearly && (
                    <div style={{ fontSize: "12px", color: plan.highlight ? "rgba(255,255,255,0.5)" : "#aaa", marginBottom: "20px" }}>
                      {plan.yearly}
                    </div>
                  )}
                  {!plan.yearly && <div style={{ marginBottom: "20px" }} />}
                  <ul style={styles.planFeatures}>
                    {plan.features.map((f, j) => (
                      <li key={j} style={styles.planFeature(plan.highlight)}>
                        <span style={styles.planCheckIcon(plan.highlight)}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    style={styles.planBtn(plan.highlight)}
                    onMouseEnter={(e) => {
                      if (plan.highlight) {
                        e.currentTarget.style.transform = "scale(1.03)";
                        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,200,150,0.5)";
                      } else {
                        e.currentTarget.style.background = "rgba(0,158,119,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.highlight) {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,200,150,0.35)";
                      } else {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                    // TODO: Integrar pasarela de pago (Stripe, PayPal, etc.)
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "32px", color: "#888", fontSize: "14px" }}>
              🔒 Pago seguro · 💳 Visa, Mastercard, PayPal · ↩️ Reembolso garantizado 30 días
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section style={styles.ctaBanner}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <AnimatedSection>
            <h2 style={styles.ctaBannerTitle}>
              Empieza hoy tu viaje hacia una mente más libre
            </h2>
            <p style={styles.ctaBannerDesc}>
              Únete a miles de personas que ya transformaron su vida con {BRAND}. Accede a tu primera sesión gratis.
            </p>
            {!submitted ? (
              <form style={styles.emailForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.emailInput}
                  required
                />
                <button
                  type="submit"
                  style={styles.emailBtn}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#004d3e")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#003C31")}
                >
                  Empezar gratis →
                </button>
              </form>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "12px", padding: "20px 32px", display: "inline-block", color: "#fff", fontWeight: "600", fontSize: "16px" }}>
                ✅ ¡Genial! Te hemos enviado un email. Revisa tu bandeja de entrada.
              </div>
            )}
            <div style={{ marginTop: "16px", color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
              Sin tarjeta de crédito · Cancela cuando quieras
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerTop}>
            <div>
              <span style={styles.footerLogo}>🌿 {BRAND}</span>
              <p style={styles.footerTagline}>
                Hipnoterapia de alta calidad para transformar tu mente y mejorar tu bienestar de forma natural y duradera.
              </p>
              <a href={`mailto:${EMAIL}`} style={{ color: "#00e6a8", fontSize: "14px", textDecoration: "none" }}>
                {EMAIL}
              </a>
            </div>
            <div>
              <div style={styles.footerHeading}>Cursos</div>
              {COURSES.map((c) => (
                <span key={c.id} style={styles.footerLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e6a8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {c.title}
                </span>
              ))}
            </div>
            <div>
              <div style={styles.footerHeading}>Empresa</div>
              {["Sobre nosotros", "Blog", "Prensa", "Afiliados", "Trabaja con nosotros"].map((l) => (
                <span key={l} style={styles.footerLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e6a8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {/* TODO: Enlazar páginas reales */}
                  {l}
                </span>
              ))}
            </div>
            <div>
              <div style={styles.footerHeading}>Soporte</div>
              {["Centro de ayuda", "Contacto", "Política de privacidad", "Términos de uso", "Cookies"].map((l) => (
                <span key={l} style={styles.footerLink}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e6a8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {/* TODO: Enlazar páginas legales reales */}
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div style={styles.footerBottom}>
            <span>© {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.</span>
            <span style={{ display: "flex", gap: "16px" }}>
              {/* TODO: Añadir redes sociales reales */}
              {["Instagram", "Facebook", "YouTube", "TikTok"].map((s) => (
                <span key={s} style={{ cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00e6a8")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  {s}
                </span>
              ))}
            </span>
          </div>
        </div>
      </footer>

      {/* ─── RESPONSIVE CSS ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }

        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
        }

        @media (max-width: 600px) {
          section { padding: 56px 20px !important; }
        }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #003C31; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #009e77; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}