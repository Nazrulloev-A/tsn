import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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

const NAV_OFFSET = 96; // fixed navbar height offset (tune if needed)

const Navbar: React.FC = () => {
  const [active, setActive] = useState<SectionKey>("home");
  const [scrolled, setScrolled] = useState(false);

  // underline slider
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileCloseTimer = useRef<number | null>(null);

  // blur background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Accurate scroll spy (prevents wrong underline)
  useEffect(() => {
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
  }, []);

  // ✅ scroll with navbar offset
  const scrollToSection = (id: SectionKey) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const onResize = () => updateUnderline();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const navBgClass = scrolled
    ? "bg-black/20 backdrop-blur-md"
    : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 ${navBgClass} transition-all duration-300`}>
      <div className="w-full flex items-center justify-between px-6 md:px-10 py-5">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          className="text-white text-xl md:text-2xl font-semibold tracking-wide"
        >
          TSN Web
        </button>

        {/* Desktop links */}
        <div className="hidden md:block relative">
          <div
            ref={containerRef}
            className="relative flex items-center gap-10 text-sm uppercase tracking-wider text-white/90"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                ref={(el) => {
                  itemRefs.current[item.key] = el;
                }}
                onClick={() => scrollToSection(item.key)}
                className={`relative transition-colors duration-200 hover:text-white ${
                  active === item.key ? "text-white" : "text-white/75"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* ✅ Yellow sliding underline + glow */}
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

          {/* Dropdown */}
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