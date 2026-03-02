import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeLogo from "../assets/tsn-logo.png";
import { useNavigate, useLocation } from "react-router-dom";

type SectionKey = "home" | "services" | "resources" | "about" | "faq" | "contact";

const NAV_ITEMS: Array<{ key: SectionKey; label: string }> = [
  { key: "home", label: "HOME" },
  { key: "services", label: "OUR SERVICES" },
  { key: "about", label: "ABOUT US" },
  { key: "faq", label: "FAQ" },
  { key: "contact", label: "CONTACT US" },
];

const NAV_OFFSET = 96;

// ✅ service dropdown with routes
const SERVICE_LINKS = [
  { label: "Job Placement-Driven Model", path: "/job-placement-driven-model" },
  { label: "Flexible, Self-Paced Learning", path: "/flexible-self-paced-learning" },
  { label: "Career Advancement Path", path: "/career-advancement-path" },
] as const;

const Navbar: React.FC = () => {
  const [active, setActive] = useState<SectionKey>("home");
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  // underline slider
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileCloseTimer = useRef<number | null>(null);

  // services dropdown
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesClosing, setServicesClosing] = useState(false);
  const servicesCloseTimer = useRef<number | null>(null);

  // ✅ keep active underline correct for routes automatically
  useEffect(() => {
    const p = location.pathname;

    if (
      p === "/job-placement-driven-model" ||
      p === "/flexible-self-paced-learning" ||
      p === "/career-advancement-path"
    ) {
      setActive("services");
      return;
    }

    if (p === "/") return;
  }, [location.pathname]);

  // ✅ scroll bg behavior
  useEffect(() => {
    const onScroll = () => {
      // small buffer so it stays perfectly transparent at very top
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ scroll spy only on home route
  useEffect(() => {
    if (!isHomeRoute) return;

    const onScroll = () => {
      const y = window.scrollY + NAV_OFFSET + 10;
      let current: SectionKey = "home";

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.key);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (y >= top && y < top + height) {
          current = item.key;
          break;
        }
        if (y >= top) current = item.key;
      }

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHomeRoute]);

  // ✅ scroll with navbar offset (works from any route)
  const scrollToSection = (id: SectionKey) => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (!isHomeRoute) {
      navigate("/");
      window.setTimeout(doScroll, 80);
    } else {
      doScroll();
    }

    setMobileOpen(false);
    setServicesOpen(false);
  };

  // underline positioning
  const updateUnderline = () => {
    const container = containerRef.current;
    const activeEl = itemRefs.current[active];
    if (!container || !activeEl) return;

    const cRect = container.getBoundingClientRect();
    const aRect = activeEl.getBoundingClientRect();

    setUnderline({
      left: aRect.left - cRect.left,
      width: aRect.width,
    });
  };

  useLayoutEffect(() => {
    updateUnderline();
  }, [active]);

  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  // hover open/close for hamburger
  const openMobile = () => {
    if (mobileCloseTimer.current) window.clearTimeout(mobileCloseTimer.current);
    setMobileOpen(true);
  };
  const closeMobile = () => {
    if (mobileCloseTimer.current) window.clearTimeout(mobileCloseTimer.current);
    mobileCloseTimer.current = window.setTimeout(() => setMobileOpen(false), 150);
  };

  // ✅ better dropdown open/close with smooth animation
  const openServices = () => {
    if (servicesCloseTimer.current) window.clearTimeout(servicesCloseTimer.current);
    setServicesClosing(false);
    setServicesOpen(true);
  };
  const closeServices = () => {
    if (servicesCloseTimer.current) window.clearTimeout(servicesCloseTimer.current);
    setServicesClosing(true);
    servicesCloseTimer.current = window.setTimeout(() => {
      setServicesOpen(false);
      setServicesClosing(false);
    }, 120);
  };

  // ✅ IMPORTANT FIX:
  // - On HOME at top: fully transparent (NO blur, NO tint)
  // - On HOME when scrolled: dark + blur
  // - On OTHER ROUTES: dark + blur
  const navBgClass = !isHomeRoute
    ? "bg-black/45 backdrop-blur-md"
    : scrolled
      ? "bg-black/45 backdrop-blur-md"
      : "bg-transparent";

  const activeServicePath = location.pathname;

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${navBgClass} transition-all duration-300`}>
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <button
          onClick={() => {
            navigate("/");
            window.setTimeout(() => scrollToSection("home"), 0);
          }}
          className="text-white text-xl md:text-2xl font-semibold tracking-wide"
        >
          <img src={HomeLogo} alt="TSN Logo" className="h-10 w-auto object-contain" />
        </button>

        {/* Desktop links */}
        <div className="hidden md:block relative">
          <div
            ref={containerRef}
            className="relative flex items-center gap-10 text-sm uppercase tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
          >
            {NAV_ITEMS.map((item) => {
              if (item.key === "services") {
                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServices}
                  >
                    <button
                      ref={(el) => {
                        itemRefs.current[item.key] = el;
                      }}
                      onClick={() => scrollToSection(item.key)}
                      className={`relative transition-colors duration-200 ${
                        active === item.key ? "text-white" : "text-white/85"
                      } hover:text-white`}
                      aria-haspopup="menu"
                      aria-expanded={servicesOpen}
                    >
                      {item.label}
                    </button>

                    {/* Dropdown */}
                    {(servicesOpen || servicesClosing) && (
                      <div
                        className={[
                          "absolute left-1/2 -translate-x-1/2 top-[42px] w-[320px]",
                          "rounded-2xl border border-white/10 bg-black/75 backdrop-blur-md shadow-2xl overflow-hidden",
                          servicesClosing ? "animate-dropdownOut" : "animate-dropdownIn",
                        ].join(" ")}
                        onMouseEnter={openServices}
                        onMouseLeave={closeServices}
                        role="menu"
                      >
                        <div className="py-2">
                          {SERVICE_LINKS.map((svc) => {
                            const isActive = activeServicePath === svc.path;

                            return (
                              <button
                                key={svc.path}
                                type="button"
                                onClick={() => {
                                  setServicesOpen(false);
                                  setServicesClosing(false);
                                  navigate(svc.path);
                                  setActive("services");
                                }}
                                className={[
                                  "w-full text-left px-5 py-3 text-sm tracking-wide transition relative",
                                  isActive
                                    ? "text-yellow-200 bg-white/10"
                                    : "text-white/90 hover:bg-white/10",
                                ].join(" ")}
                                role="menuitem"
                              >
                                <span className="flex items-center justify-between">
                                  {svc.label}
                                  {isActive && (
                                    <span
                                      className="ml-3 inline-block h-[2px] w-7 bg-yellow-400 rounded"
                                      style={{ boxShadow: "0 0 10px rgba(250,204,21,0.9)" }}
                                    />
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.key}
                  ref={(el) => {
                    itemRefs.current[item.key] = el;
                  }}
                  onClick={() => scrollToSection(item.key)}
                  className={`relative transition-colors duration-200 ${
                    active === item.key ? "text-white" : "text-white/85"
                  } hover:text-white`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* underline */}
            <span
              className="absolute -bottom-2 h-[2px] rounded bg-yellow-400"
              style={{
                left: underline.left,
                width: underline.width,
                transition: "left 250ms ease, width 250ms ease",
                boxShadow: "0 0 12px rgba(250,204,21,0.9)",
              }}
            />
          </div>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden relative" onMouseEnter={openMobile} onMouseLeave={closeMobile}>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="text-white p-2 rounded hover:bg-white/10 transition"
            aria-label="Open menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <div
            className={`absolute right-0 mt-3 w-60 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md overflow-hidden
                        transition-all duration-200 origin-top-right
                        ${mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`w-full text-left px-4 py-3 text-sm uppercase tracking-wider
                              transition flex items-center justify-between
                              ${active === item.key ? "text-yellow-200" : "text-white/90"}
                              hover:bg-white/10`}
                >
                  <span>{item.label}</span>
                  {active === item.key && (
                    <span
                      className="ml-3 inline-block h-[2px] w-6 bg-yellow-400 rounded"
                      style={{ boxShadow: "0 0 10px rgba(250,204,21,0.9)" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;