import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type SectionKey = "home" | "services" | "resources" | "about" | "faq" | "contact";

const NAV_ITEMS: Array<{ key: SectionKey; label: string }> = [
  { key: "home", label: "HOME" },
  { key: "services", label: "OUR SERVICES" },
  { key: "resources", label: "RESOURCES" },
  { key: "about", label: "ABOUT US" },
  { key: "faq", label: "FAQ" },
  { key: "contact", label: "CONTACT US" },
];

const Navbar: React.FC = () => {
  const [active, setActive] = useState<SectionKey>("home");
  const [scrolled, setScrolled] = useState(false);

  // underline slider position
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileCloseTimer = useRef<number | null>(null);

  // click fade overlay
  const [fadeOn, setFadeOn] = useState(false);

  const scrollToSection = (id: SectionKey) => {
    const el = document.getElementById(id);
    if (!el) return;

    // small fade between sections
    setFadeOn(true);
    window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => setFadeOn(false), 250);
    }, 80);

    setMobileOpen(false);
  };

  // track scroll for blur background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy (active underline follows section in view)
  useEffect(() => {
    const sectionEls = NAV_ITEMS
      .map((i) => document.getElementById(i.key))
      .filter(Boolean) as HTMLElement[];

    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // choose the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) {
          setActive(visible.target.id as SectionKey);
        }
      },
      {
        // makes it feel correct with tall hero sections
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // underline slider positioning
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // hover open/close for hamburger area
  const openMobile = () => {
    if (mobileCloseTimer.current) window.clearTimeout(mobileCloseTimer.current);
    setMobileOpen(true);
  };
  const closeMobile = () => {
    if (mobileCloseTimer.current) window.clearTimeout(mobileCloseTimer.current);
    mobileCloseTimer.current = window.setTimeout(() => setMobileOpen(false), 150);
  };

  const navBgClass = scrolled
    ? "bg-black/20 backdrop-blur-md"
    : "bg-transparent";

  return (
    <>
      {/* Fade overlay between section jumps */}
      <div
        className={`fixed inset-0 z-[60] pointer-events-none transition-opacity duration-300 ${
          fadeOn ? "opacity-40" : "opacity-0"
        } bg-black`}
      />

      <nav className={`fixed top-0 left-0 w-full z-50 ${navBgClass} transition-all duration-300`}>
        <div className="w-full flex items-center justify-between px-6 md:px-10 py-5">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="text-white text-xl md:text-2xl font-semibold tracking-wide"
          >
            TSN Web
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:block relative">
            <div ref={containerRef} className="relative flex items-center gap-10 text-sm uppercase tracking-wider text-white/90">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  ref={(el) => {
                    itemRefs.current[item.key] = el;
                  }}
                  onClick={() => scrollToSection(item.key)}
                  className={`relative transition-colors duration-200 hover:text-white ${
                    active === item.key ? "text-white" : "text-white/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Underline slider + glow */}
              <span
                className="absolute -bottom-2 h-[2px] rounded bg-yellow-400"
                style={{
                  left: underline.left,
                  width: underline.width,
                  transition: "left 250ms ease, width 250ms ease",
                  boxShadow: "0 0 12px rgba(34,211,238,0.8)",
                }}
              />
            </div>
          </div>

          {/* Mobile Hamburger (hover or click) */}
          <div
            className="md:hidden relative"
            onMouseEnter={openMobile}
            onMouseLeave={closeMobile}
          >
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-white p-2 rounded hover:bg-white/10 transition"
              aria-label="Open menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>

            {/* Mobile dropdown panel */}
            <div
              className={`absolute right-0 mt-3 w-56 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md overflow-hidden
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
                                ${active === item.key ? "text-cyan-200" : "text-white/90"}
                                hover:bg-white/10`}
                  >
                    <span>{item.label}</span>
                    {active === item.key && (
                      <span
                        className="ml-3 inline-block h-[2px] w-6 bg-cyan-300 rounded"
                        style={{ boxShadow: "0 0 10px rgba(34,211,238,0.8)" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;